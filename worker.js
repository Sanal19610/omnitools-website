console.log('[FFmpeg Worker] worker.js execution started.');

// Self-contained constants & message types for classic worker (no ES module syntax)
const MIME_TYPE_JAVASCRIPT = "text/javascript";
const MIME_TYPE_WASM = "application/wasm";
const CORE_VERSION = "0.12.10";
const CORE_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/umd/ffmpeg-core.js`;

const FFMessageType = {
    LOAD: "LOAD",
    EXEC: "EXEC",
    FFPROBE: "FFPROBE",
    WRITE_FILE: "WRITE_FILE",
    READ_FILE: "READ_FILE",
    DELETE_FILE: "DELETE_FILE",
    RENAME: "RENAME",
    CREATE_DIR: "CREATE_DIR",
    LIST_DIR: "LIST_DIR",
    DELETE_DIR: "DELETE_DIR",
    ERROR: "ERROR",
    DOWNLOAD: "DOWNLOAD",
    PROGRESS: "PROGRESS",
    LOG: "LOG",
    MOUNT: "MOUNT",
    UNMOUNT: "UNMOUNT"
};

const ERROR_UNKNOWN_MESSAGE_TYPE = new Error("unknown message type");
const ERROR_NOT_LOADED = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first");
const ERROR_TERMINATED = new Error("called FFmpeg.terminate()");
const ERROR_IMPORT_FAILURE = new Error("failed to import ffmpeg-core.js");

// Catch any unhandled worker errors or promise rejections immediately
self.addEventListener('error', (event) => {
    const errorDetails = `Worker unhandled error: ${event.message || 'unknown'} at ${event.filename || 'worker.js'}:${event.lineno || '?'}:${event.colno || '?'}`;
    console.error('[FFmpeg Worker Error Event]:', errorDetails, event.error);
    try {
        self.postMessage({
            type: FFMessageType.ERROR,
            data: errorDetails
        });
    } catch (_) {}
});

self.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const reasonMsg = reason?.message || (typeof reason === 'string' ? reason : 'unknown rejection');
    const rejectionDetails = `Worker unhandled rejection: ${reasonMsg}${reason?.stack ? '\n' + reason.stack : ''}`;
    console.error('[FFmpeg Worker Unhandled Rejection]:', rejectionDetails);
    try {
        self.postMessage({
            type: FFMessageType.ERROR,
            data: rejectionDetails
        });
    } catch (_) {}
});

let ffmpeg;

const load = async ({ coreURL: _coreURL, wasmURL: _wasmURL, workerURL: _workerURL } = {}) => {
    const first = !ffmpeg;
    console.log('[FFmpeg Worker] load() triggered with options:', { coreURL: _coreURL, wasmURL: _wasmURL, workerURL: _workerURL });

    // ── 1. Import Core Script via importScripts with try/catch ───────────────────
    try {
        if (!_coreURL) _coreURL = CORE_URL;
        console.log('[FFmpeg Worker] Executing importScripts(coreURL)...', _coreURL);
        importScripts(_coreURL);
        console.log('[FFmpeg Worker] importScripts(coreURL) completed successfully.');
    } catch (importScriptsErr) {
        const fullImportMsg = `Failed to load FFmpeg core script via importScripts(${_coreURL}): ${importScriptsErr?.message || importScriptsErr}`;
        console.error('[FFmpeg Worker] ' + fullImportMsg);
        self.postMessage({
            type: FFMessageType.ERROR,
            data: fullImportMsg
        });
        throw new Error(fullImportMsg);
    }

    // Verify self.createFFmpegCore is available
    if (typeof self.createFFmpegCore !== 'function' && typeof createFFmpegCore === 'function') {
        self.createFFmpegCore = createFFmpegCore;
    }
    if (typeof self.createFFmpegCore !== 'function') {
        const missingCoreMsg = `createFFmpegCore is not defined after importScripts(${_coreURL}). Please ensure ffmpeg-core.js is the UMD build.`;
        console.error('[FFmpeg Worker] ' + missingCoreMsg);
        self.postMessage({
            type: FFMessageType.ERROR,
            data: missingCoreMsg
        });
        throw new Error(missingCoreMsg);
    }

    const coreURL = _coreURL;
    const wasmURL = _wasmURL ? _wasmURL : _coreURL.replace(/.js$/g, ".wasm");
    const workerURL = _workerURL
        ? _workerURL
        : _coreURL.replace(/.js$/g, ".worker.js");

    // ── 2. WebAssembly Core Instantiation with try/catch ────────────────────────
    console.log('[FFmpeg Worker] Starting WebAssembly instantiation (createFFmpegCore)...', { coreURL, wasmURL, workerURL });
    try {
        ffmpeg = await self.createFFmpegCore({
            // Fix `Overload resolution failed.` when using multi-threaded ffmpeg-core.
            // Encoded wasmURL and workerURL in the URL as a hack to fix locateFile issue.
            mainScriptUrlOrBlob: `${coreURL}#${btoa(JSON.stringify({ wasmURL, workerURL }))}`,
        });
        console.log('[FFmpeg Worker] WebAssembly core instantiated successfully!');
    } catch (wasmErr) {
        const wasmDetails = `WebAssembly instantiation failed inside Worker: ${wasmErr?.message || wasmErr}${wasmErr?.stack ? '\n' + wasmErr.stack : ''}`;
        console.error('[FFmpeg Worker] ' + wasmDetails);
        self.postMessage({
            type: FFMessageType.ERROR,
            data: wasmDetails
        });
        throw new Error(wasmDetails);
    }

    ffmpeg.setLogger((data) => self.postMessage({ type: FFMessageType.LOG, data }));
    ffmpeg.setProgress((data) => self.postMessage({
        type: FFMessageType.PROGRESS,
        data,
    }));
    return first;
};

const exec = ({ args, timeout = -1 }) => {
    ffmpeg.setTimeout(timeout);
    ffmpeg.exec(...args);
    const ret = ffmpeg.ret;
    ffmpeg.reset();
    return ret;
};

const ffprobe = ({ args, timeout = -1 }) => {
    ffmpeg.setTimeout(timeout);
    ffmpeg.ffprobe(...args);
    const ret = ffmpeg.ret;
    ffmpeg.reset();
    return ret;
};

const writeFile = ({ path, data }) => {
    ffmpeg.FS.writeFile(path, data);
    return true;
};

const readFile = ({ path, encoding }) => ffmpeg.FS.readFile(path, { encoding });

const deleteFile = ({ path }) => {
    ffmpeg.FS.unlink(path);
    return true;
};

const rename = ({ oldPath, newPath }) => {
    ffmpeg.FS.rename(oldPath, newPath);
    return true;
};

const createDir = ({ path }) => {
    ffmpeg.FS.mkdir(path);
    return true;
};

const listDir = ({ path }) => {
    const names = ffmpeg.FS.readdir(path);
    const nodes = [];
    for (const name of names) {
        const stat = ffmpeg.FS.stat(`${path}/${name}`);
        const isDir = ffmpeg.FS.isDir(stat.mode);
        nodes.push({ name, isDir });
    }
    return nodes;
};

const deleteDir = ({ path }) => {
    ffmpeg.FS.rmdir(path);
    return true;
};

const mount = ({ fsType, options, mountPoint }) => {
    const str = fsType;
    const fs = ffmpeg.FS.filesystems[str];
    if (!fs) return false;
    ffmpeg.FS.mount(fs, options, mountPoint);
    return true;
};

const unmount = ({ mountPoint }) => {
    ffmpeg.FS.unmount(mountPoint);
    return true;
};

self.onmessage = async ({ data: { id, type, data: _data } }) => {
    console.log('[FFmpeg Worker] onmessage received type:', type, 'id:', id);
    const trans = [];
    let data;
    try {
        if (type !== FFMessageType.LOAD && !ffmpeg) {
            throw ERROR_NOT_LOADED;
        }
        switch (type) {
            case FFMessageType.LOAD:
                data = await load(_data);
                break;
            case FFMessageType.EXEC:
                data = exec(_data);
                break;
            case FFMessageType.FFPROBE:
                data = ffprobe(_data);
                break;
            case FFMessageType.WRITE_FILE:
                data = writeFile(_data);
                break;
            case FFMessageType.READ_FILE:
                data = readFile(_data);
                break;
            case FFMessageType.DELETE_FILE:
                data = deleteFile(_data);
                break;
            case FFMessageType.RENAME:
                data = rename(_data);
                break;
            case FFMessageType.CREATE_DIR:
                data = createDir(_data);
                break;
            case FFMessageType.LIST_DIR:
                data = listDir(_data);
                break;
            case FFMessageType.DELETE_DIR:
                data = deleteDir(_data);
                break;
            case FFMessageType.MOUNT:
                data = mount(_data);
                break;
            case FFMessageType.UNMOUNT:
                data = unmount(_data);
                break;
            default:
                throw ERROR_UNKNOWN_MESSAGE_TYPE;
        }
    } catch (e) {
        const errorString = (e && e.message) ? e.message : (e ? e.toString() : 'Unknown worker error');
        console.error('[FFmpeg Worker] Error processing message type', type, 'id', id, ':', errorString);
        self.postMessage({
            id,
            type: FFMessageType.ERROR,
            data: errorString,
        });
        return;
    }

    if (data instanceof Uint8Array) {
        trans.push(data.buffer);
    }
    self.postMessage({ id, type, data }, trans);
};
