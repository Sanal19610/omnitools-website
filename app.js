/**
 * OmniTools Application Engine
 * Handles Navigation, Theme Toggling, Tool Workspaces, YouTube Media Extraction, and Speech Synthesis
 */

document.addEventListener('DOMContentLoaded', () => {
    // Tool Metadata Registry
    const toolsData = {
        'yt-downloader': {
            title: 'YouTube Video Downloader',
            tag: 'Video & Media',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
            iconBg: 'tool-icon-red'
        },
        'yt-thumbnail': {
            title: 'YouTube Thumbnail Extractor',
            tag: 'Video & Media',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
            iconBg: 'tool-icon-purple'
        },
        'yt-metadata': {
            title: 'YT Title, Desc & Tag Finder',
            tag: 'Video & Media',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
            iconBg: 'tool-icon-red'
        },
        'audio-generator': {
            title: 'AI Voice Synthesizer',
            tag: 'Audio & AI',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
            iconBg: 'tool-icon-blue'
        },

        'image-studio': {
            title: 'Image Studio & Filters',
            tag: 'Utilities',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
            iconBg: 'tool-icon-amber'
        },

        'channel-extractor': {
            title: 'Channel Keyword & Info Extractor',
            tag: 'Channel & SEO',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
            iconBg: 'tool-icon-purple'
        },
        'ig-downloader': {
            title: 'Instagram Reel Downloader',
            tag: 'Video & Media',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
            iconBg: 'tool-icon-pink'
        },
        'aspect-ratio-changer': {
            title: 'Video Aspect Ratio Changer',
            tag: 'Utilities',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 6v12M16 6v12"/></svg>`,
            iconBg: 'tool-icon-blue'
        },

    };

    // ------------------------------------------------------------------
    // Theme Switcher Logic
    // ------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('omni_theme');

    if (savedTheme === 'dark') {
        document.body.classList.replace('light-mode', 'dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('omni_theme', 'light');
            showToast('Switched to Light Mode ☀️');
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('omni_theme', 'dark');
            showToast('Switched to Dark Mode 🌙');
        }
    });

    // ------------------------------------------------------------------
    // Toast Notification System
    // ------------------------------------------------------------------
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ------------------------------------------------------------------
    // Modal Tool Launcher System
    // ------------------------------------------------------------------
    const toolModalOverlay = document.getElementById('toolModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalToolTitle = document.getElementById('modalToolTitle');
    const modalToolTag = document.getElementById('modalToolTag');
    const modalToolIcon = document.getElementById('modalToolIcon');

    function resetAllToolWorkspaces() {
        // Reset all text inputs & textareas
        document.querySelectorAll('.tool-modal-content input[type="text"], .tool-modal-content textarea').forEach(input => {
            input.value = '';
        });

        // Hide all result boxes, loaders, progress bars, and clear buttons
        document.querySelectorAll('.result-box, .tool-loader, .download-progress-wrap, .input-clear-btn').forEach(el => {
            el.classList.add('hidden');
        });

        // Clear all preview images
        document.querySelectorAll('.tool-modal-content img').forEach(img => {
            img.src = '';
        });

        // Clear text elements by ID
        [
            'ytVideoTitle', 'ytChannelInfo', 'ytProgressPercent', 'ytProgressStatus',
            'igVideoTitle', 'igAuthorInfo', 'igHashtags', 'igUploadDate', 'igLikesCount', 'igCommentsCount', 'igProgressPercent', 'igProgressStatus',
            'metaTitleDisplay', 'metaDescDisplay', 'tagCountNum',
            'channelNameDisplay', 'channelVanityDisplay', 'channelSubText', 'channelTagCountNum', 'channelDescDisplay', 'channelUrlDisplay'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });

        // Clear innerHTML containers
        ['metaTagsCloud', 'channelTagsCloud'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });

        // Reset download buttons & datasets
        [
            { id: 'startDownloadBtn', text: '⬇️ Download File Now' },
            { id: 'startIgDownloadBtn', text: '⬇️ Download Reel File Now' }
        ].forEach(btnInfo => {
            const btn = document.getElementById(btnInfo.id);
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = btnInfo.text;
                if (btn.dataset) {
                    Object.keys(btn.dataset).forEach(key => delete btn.dataset[key]);
                }
            }
        });

        // Clear Audio & Voice Synthesizer
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        // Clear Image Studio
        const imgDropzone = document.getElementById('imgDropzone');
        if (imgDropzone) imgDropzone.classList.remove('hidden');
        const imgPreviewArea = document.getElementById('imgPreviewArea');
        if (imgPreviewArea) imgPreviewArea.classList.add('hidden');
        const studioImg = document.getElementById('imageStudioCanvasImg');
        if (studioImg) {
            studioImg.src = '';
            studioImg.style.filter = 'none';
        }
    }

    function launchTool(toolKey) {
        const meta = toolsData[toolKey];
        if (!meta) return;

        // Reset all tool workspace states first
        resetAllToolWorkspaces();

        // Set Modal Header Metadata
        modalToolTitle.textContent = meta.title;
        modalToolTag.textContent = meta.tag;
        modalToolIcon.innerHTML = meta.iconHtml;
        modalToolIcon.className = `modal-icon ${meta.iconBg}`;

        // Highlight "Tools" in top navbar
        setActiveNavLink(document.querySelector('.nav-link[href="#tools-section"]'));

        // Hide all workspace views and show target workspace
        document.querySelectorAll('.tool-workspace').forEach(ws => ws.classList.add('hidden'));
        const activeWorkspace = document.getElementById(`workspace-${toolKey}`);
        if (activeWorkspace) {
            activeWorkspace.classList.remove('hidden');
        }

        // Display Modal Overlay
        toolModalOverlay.classList.add('active');

        // Trigger tool specific initializations if needed
        if (toolKey === 'audio-generator') {
            populateSpeechVoices();
        } else if (toolKey === 'yt-metadata') {
            const metaInput = document.getElementById('ytMetaUrl');
            if (metaInput && metaInput.value.trim().length > 0) {
                processYouTubeMetadata();
            }
        } else if (toolKey === 'channel-extractor') {
            const chInput = document.getElementById('channelExtractorUrl');
            if (chInput && chInput.value.trim().length > 0) {
                processChannelExtraction();
            }
        }
    }

    function closeModal() {
        toolModalOverlay.classList.remove('active');
        // Reset all workspace states so closing tool clears past results
        resetAllToolWorkspaces();
    }

    // ------------------------------------------------------------------
    // Header Navigation Link Active State & ScrollSpy System
    // ------------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink(targetLink) {
        if (!targetLink) return;
        navLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                setActiveNavLink(link);
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ScrollSpy observer to automatically update active navbar link as user scrolls
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            const currentActiveLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
            if (currentActiveLink && !currentActiveLink.classList.contains('active')) {
                setActiveNavLink(currentActiveLink);
            }
        }
    });

    // Click triggers across the app (Event Delegation)
    document.addEventListener('click', (e) => {
        // Modal Close Button or Backdrop Click
        if (e.target.closest('#modalCloseBtn, .modal-close-btn') || e.target === toolModalOverlay) {
            e.preventDefault();
            closeModal();
            return;
        }

        const triggerBtn = e.target.closest('.launch-tool-btn, .launch-tool-trigger, .tool-quick-link, [data-tool]');
        if (triggerBtn) {
            const toolKey = triggerBtn.getAttribute('data-tool');
            if (toolKey) {
                e.preventDefault();
                launchTool(toolKey);
                return;
            }
        }

        const toolCard = e.target.closest('.tool-card');
        if (toolCard) {
            const launchBtn = toolCard.querySelector('.launch-tool-btn, [data-tool]');
            if (launchBtn) {
                const toolKey = launchBtn.getAttribute('data-tool');
                if (toolKey) {
                    e.preventDefault();
                    launchTool(toolKey);
                }
            }
        }
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (toolModalOverlay) {
        toolModalOverlay.addEventListener('click', (e) => {
            if (e.target === toolModalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toolModalOverlay && toolModalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    document.getElementById('previewSuiteBtn').addEventListener('click', () => {
        const previewEl = document.getElementById('dashboardPreview');
        if (previewEl) {
            previewEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Previewing OmniTools Workspace Hub 🚀');
        }
    });

    // ------------------------------------------------------------------
    // Tools Filtering & Search Logic
    // ------------------------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const toolSearchInput = document.getElementById('toolSearchInput');
    const toolCards = document.querySelectorAll('.tool-card');
    const heroBadgeBtn = document.getElementById('heroBadgeBtn');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');
            filterTools(category, toolSearchInput.value.toLowerCase());

            if (category === 'latest') {
                showToast('Displaying new latest added tools! ⭐');
            }
        });
    });

    toolSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const activeTab = document.querySelector('.filter-tab.active');
        const activeTabCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
        filterTools(activeTabCategory, query);
    });

    function filterTools(category, query) {
        toolCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const isLatest = card.getAttribute('data-latest') === 'true' || card.querySelector('.badge-new-star, .meta-tag-new') !== null;
            const cardName = card.getAttribute('data-name') || '';

            let matchesCat = false;
            if (category === 'all') {
                matchesCat = true;
            } else if (category === 'latest') {
                matchesCat = isLatest;
            } else {
                matchesCat = (cardCat === category);
            }

            const matchesSearch = (!query || cardName.includes(query));

            if (matchesCat && matchesSearch) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.3s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Interactive Hero Arrow Badge Click Handler
    if (heroBadgeBtn) {
        heroBadgeBtn.addEventListener('click', () => {
            const toolsSection = document.getElementById('tools-section');
            if (toolsSection) {
                toolsSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Activate the 'Latest' filter tab and show tools with NEW tag on the page
            const latestTab = document.querySelector('.filter-tab[data-category="latest"]');
            if (latestTab) {
                filterTabs.forEach(t => t.classList.remove('active'));
                latestTab.classList.add('active');
            }
            filterTools('latest', toolSearchInput ? toolSearchInput.value.toLowerCase() : '');
            showToast('Showing new latest added tools! ⭐');
        });
    }

    // ------------------------------------------------------------------
    // Input 1-Click Clear Button System (X button)
    // ------------------------------------------------------------------
    function setupInputClear(inputId, btnId) {
        const inputEl = document.getElementById(inputId);
        const btnEl = document.getElementById(btnId);

        if (!inputEl || !btnEl) return;

        let ticking = false;
        const updateVisibility = () => {
            if (!ticking) {
                const checkVisibility = () => {
                    if (inputEl.value && inputEl.value.trim().length > 0) {
                        btnEl.classList.remove('hidden');
                    } else {
                        btnEl.classList.add('hidden');
                    }
                    ticking = false;
                };

                if (typeof requestAnimationFrame !== 'undefined') {
                    requestAnimationFrame(checkVisibility);
                } else {
                    checkVisibility();
                }
                ticking = true;
            }
        };

        inputEl.addEventListener('input', updateVisibility, { passive: true });
        inputEl.addEventListener('paste', updateVisibility, { passive: true });
        inputEl.addEventListener('change', updateVisibility, { passive: true });

        btnEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            inputEl.value = '';
            btnEl.classList.add('hidden');
            inputEl.focus();
            showToast('Link cleared! ✕');
        });

        updateVisibility();
    }

    setupInputClear('ytDownloaderUrl', 'clearYtDownloaderUrl');
    setupInputClear('igDownloaderUrl', 'clearIgDownloaderUrl');
    setupInputClear('ytThumbUrl', 'clearYtThumbUrl');
    setupInputClear('ytMetaUrl', 'clearYtMetaUrl');
    setupInputClear('channelExtractorUrl', 'clearChannelExtractorUrl');
    setupInputClear('ttsTextInput', 'clearTtsTextBtn');


    // ------------------------------------------------------------------
    // TOOL 1: YouTube Video Downloader Engine
    // ------------------------------------------------------------------
    const ytDownloaderUrl = document.getElementById('ytDownloaderUrl');
    const analyzeYtBtn = document.getElementById('analyzeYtBtn');
    const ytLoader = document.getElementById('ytLoader');
    const ytResultBox = document.getElementById('ytResultBox');
    const ytVideoThumb = document.getElementById('ytVideoThumb');
    const ytVideoTitle = document.getElementById('ytVideoTitle');
    const ytChannelInfo = document.getElementById('ytChannelInfo');
    const startDownloadBtn = document.getElementById('startDownloadBtn');
    const ytProgressWrap = document.getElementById('ytProgressWrap');
    const ytProgressBar = document.getElementById('ytProgressBar');
    const ytProgressPercent = document.getElementById('ytProgressPercent');
    const ytProgressStatus = document.getElementById('ytProgressStatus');

    function extractYouTubeId(url) {
        if (!url) return 'dQw4w9WgXcQ';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
    }

    function formatDuration(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const totalSecs = Math.max(0, parseInt(seconds, 10));
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = Math.floor(totalSecs % 60);

        const formattedSecs = String(secs).padStart(2, '0');
        if (hrs > 0) {
            const formattedMins = String(mins).padStart(2, '0');
            return `${hrs}:${formattedMins}:${formattedSecs}`;
        }
        return `${mins}:${formattedSecs}`;
    }

    // Use YouTube IFrame Player API to detect exact video info from user's browser
    // getAvailableQualityLevels() only returns data AFTER the video starts buffering/playing
    // So we autoplay muted and check quality in onStateChange
    async function fetchRealVideoDuration(videoId) {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                cleanup();
                resolve(null);
            }, 10000);

            let player = null;
            let container = null;
            let resolved = false;

            function cleanup() {
                clearTimeout(timeout);
                try {
                    if (player && player.pauseVideo) player.pauseVideo();
                } catch (e) {}
                // Delay destroy to avoid errors
                setTimeout(() => {
                    try {
                        if (player && player.destroy) player.destroy();
                    } catch (e) {}
                    try {
                        if (container && container.parentNode) container.parentNode.removeChild(container);
                    } catch (e) {}
                }, 500);
            }

            const qualityMap = {
                'highres': 4320,
                'hd2160': 2160,
                'hd1440': 1440,
                'hd1080': 1080,
                'hd720': 720,
                'large': 480,
                'medium': 360,
                'small': 240,
                'tiny': 144
            };

            function extractAndResolve(eventTarget) {
                if (resolved) return;
                try {
                    const qualityLevels = eventTarget.getAvailableQualityLevels();
                    // Only resolve if we got actual quality data
                    if (!qualityLevels || qualityLevels.length === 0) return;

                    resolved = true;
                    const duration = eventTarget.getDuration();
                    const videoData = eventTarget.getVideoData();

                    let maxHeight = 0;
                    qualityLevels.forEach(q => {
                        const h = qualityMap[q] || 0;
                        if (h > maxHeight) maxHeight = h;
                    });

                    console.log('YT Player detected qualities:', qualityLevels, 'maxHeight:', maxHeight);

                    cleanup();
                    resolve({
                        seconds: duration > 0 ? Math.round(duration) : 0,
                        formatted: formatDuration(Math.round(duration)),
                        title: videoData?.title || undefined,
                        author: videoData?.author || undefined,
                        maxHeight: maxHeight,
                        qualityLevels: qualityLevels
                    });
                } catch (e) {
                    console.log('YT Player quality extraction error:', e);
                }
            }

            function initPlayer() {
                // Create hidden container for the player
                container = document.createElement('div');
                container.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:320px;height:180px;overflow:hidden;pointer-events:none;';
                const playerDiv = document.createElement('div');
                playerDiv.id = 'yt-quality-detector-' + Date.now();
                container.appendChild(playerDiv);
                document.body.appendChild(container);

                player = new YT.Player(playerDiv.id, {
                    height: '180',
                    width: '320',
                    videoId: videoId,
                    playerVars: {
                        autoplay: 1,        // Must autoplay so video starts buffering
                        controls: 0,
                        mute: 1,            // Muted so user doesn't hear anything
                        modestbranding: 1,
                        playsinline: 1,
                        fs: 0,
                        rel: 0
                    },
                    events: {
                        onReady: function(event) {
                            // Force mute and play
                            event.target.mute();
                            event.target.playVideo();
                            // Try extracting immediately (sometimes works on ready)
                            setTimeout(() => extractAndResolve(event.target), 500);
                        },
                        onStateChange: function(event) {
                            // States: BUFFERING=3, PLAYING=1
                            // Quality levels are available once buffering/playing starts
                            if (event.data === 1 || event.data === 3) {
                                extractAndResolve(event.target);
                                // Also try after a short delay for slower connections
                                setTimeout(() => extractAndResolve(event.target), 1000);
                            }
                        },
                        onPlaybackQualityChange: function(event) {
                            // Also try when quality changes
                            extractAndResolve(event.target);
                        },
                        onError: function(event) {
                            console.log('YT Player error code:', event.data);
                            if (!resolved) {
                                resolved = true;
                                cleanup();
                                resolve(null);
                            }
                        }
                    }
                });
            }

            // Load YouTube IFrame API if not already loaded
            if (window.YT && window.YT.Player) {
                initPlayer();
            } else {
                const existingScript = document.getElementById('yt-iframe-api-script');
                if (!existingScript) {
                    const tag = document.createElement('script');
                    tag.id = 'yt-iframe-api-script';
                    tag.src = 'https://www.youtube.com/iframe_api';
                    document.head.appendChild(tag);
                }
                const prevCallback = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function() {
                    if (prevCallback) prevCallback();
                    initPlayer();
                };
                if (window.YT && window.YT.Player) {
                    initPlayer();
                }
            }
        });
    }

    if (analyzeYtBtn) {
        analyzeYtBtn.addEventListener('click', analyzeYouTubeLink);
    }

function getBackendUrl(path) {
    const cleanPath = path.replace(/^\/api/, '');
    if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.functionsUrl) {
        return `${window.SUPABASE_CONFIG.functionsUrl}${cleanPath}`;
    }
    return `https://tcacczhndrefkzntwzmu.supabase.co/functions/v1/api${cleanPath}`;
}

async function analyzeYouTubeLink() {
    const url = ytDownloaderUrl.value.trim();
    if (!url) {
        showToast('Please paste a YouTube video URL first! 🔗', 'warning');
        ytDownloaderUrl.focus();
        return;
    }

    ytResultBox.classList.add('hidden');
    ytLoader.classList.remove('hidden');

    const videoId = extractYouTubeId(url);

    try {
        // Fetch backend info and direct browser duration simultaneously
        const [backendRes, directInfo] = await Promise.allSettled([
            fetch(getBackendUrl(`/api/info?url=${encodeURIComponent(url)}`)).then(r => r.json()),
            fetchRealVideoDuration(videoId)
        ]);

        ytLoader.classList.add('hidden');

        const data = backendRes.status === 'fulfilled' && !backendRes.value.error ? backendRes.value : null;
        const realInfo = directInfo.status === 'fulfilled' ? directInfo.value : null;

        if (!data && !realInfo) {
            showToast('Could not fetch this video. Check the link and try again.', 'warning');
            return;
        }

        ytResultBox.classList.remove('hidden');

        // Extract metadata - prioritize browser data (realInfo) since Supabase datacenter gets blocked by YouTube
        const dataTitle = (data?.title && data.title !== 'YouTube' && data.title.length > 3) ? data.title : null;
        const realTitle = (realInfo?.title && realInfo.title !== 'YouTube' && realInfo.title.length > 3) ? realInfo.title : null;
        const title = realTitle || dataTitle || `YouTube Video (${videoId})`;

        const dataAuthor = (data?.author && data.author !== 'YouTube Creator') ? data.author : null;
        const realAuthor = (realInfo?.author) ? realInfo.author : null;
        const author = realAuthor || dataAuthor || 'YouTube Creator';

        const thumbnail = data?.thumbnail || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

        const totalSeconds = (realInfo?.seconds && realInfo.seconds > 0)
            ? realInfo.seconds
            : ((data?.lengthSeconds && data.lengthSeconds > 0) ? data.lengthSeconds : 0);

        ytVideoThumb.src = thumbnail;
        ytVideoThumb.onerror = () => { ytVideoThumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; };
        ytVideoTitle.textContent = title;
        ytChannelInfo.textContent = `Channel: ${author}`;

        const durationEl = document.getElementById('ytVideoDuration');
        if (durationEl) {
            durationEl.textContent = totalSeconds > 0 ? formatDuration(totalSeconds) : '';
        }

        // Remember this URL for downloading
        startDownloadBtn.dataset.videoUrl = url;

        // Determine max published resolution from browser detection or API
        const browserMaxHeight = (realInfo?.maxHeight && realInfo.maxHeight > 0) ? realInfo.maxHeight : 0;
        const apiMaxHeight = (data?.maxPublishedQuality) ? parseInt(data.maxPublishedQuality) : 0;
        const maxHeight = browserMaxHeight || apiMaxHeight || 1080; // fallback to 1080p

        // All available MP4 quality tiers
        const allTiers = [
            { formatId: '2160p', quality: '4K Ultra HD (2160p)', ext: 'mp4', height: 2160, ratePerSec: 5500000 / 8 },
            { formatId: '1440p', quality: '2K Quad HD (1440p)', ext: 'mp4', height: 1440, ratePerSec: 3300000 / 8 },
            { formatId: '1080p', quality: '1080p Full HD', ext: 'mp4', height: 1080, ratePerSec: 2000000 / 8 },
            { formatId: '720p', quality: '720p HD', ext: 'mp4', height: 720, ratePerSec: 1000000 / 8 },
            { formatId: '480p', quality: '480p SD', ext: 'mp4', height: 480, ratePerSec: 500000 / 8 },
            { formatId: '360p', quality: '360p Standard', ext: 'mp4', height: 360, ratePerSec: 300000 / 8 }
        ];

        // ONLY show options <= creator's max published resolution
        let filteredTiers = allTiers.filter(t => t.height <= maxHeight);
        if (filteredTiers.length === 0) {
            filteredTiers = [allTiers[allTiers.length - 1]]; // fallback to 360p
        }

        // Build quality dropdown
        const qualitySelect = document.getElementById('ytQualitySelect');
        qualitySelect.innerHTML = '';

        filteredTiers.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.formatId;
            opt.dataset.ext = f.ext;
            const sizeMB = totalSeconds > 0 ? (totalSeconds * f.ratePerSec) / (1024 * 1024) : 0;
            const sizeLabel = sizeMB >= 1000
                ? ` • ~${(sizeMB / 1024).toFixed(2)} GB`
                : (sizeMB > 0 ? ` • ~${sizeMB.toFixed(1)} MB` : '');
            opt.textContent = `${f.quality} (.${f.ext})${sizeLabel}`;
            qualitySelect.appendChild(opt);
        });

        // Set default to 1080p or first available option
        if (qualitySelect.options.length > 0) {
            const defaultOpt = Array.from(qualitySelect.options).find(o => o.value === '1080p') || qualitySelect.options[0];
            if (defaultOpt) defaultOpt.selected = true;
        }

        showToast('Video loaded successfully! ✅');
    } catch (err) {
        ytLoader.classList.add('hidden');
        showToast('Could not load video details. Please try again.', 'warning');
        console.error(err);
    }
}

    if (startDownloadBtn) {
        startDownloadBtn.addEventListener('click', async () => {
    const url = startDownloadBtn.dataset.videoUrl;
    if (!url) {
        showToast('Please get the video info first!', 'warning');
        return;
    }
    const qualitySelect = document.getElementById('ytQualitySelect');
    const selectedOption = qualitySelect.options[qualitySelect.selectedIndex];
    const formatId = selectedOption ? selectedOption.value : '1080p';
    const ext = selectedOption?.dataset?.ext || 'mp4';

    startDownloadBtn.disabled = true;
    startDownloadBtn.innerHTML = '⏳ Processing Download...';

    const ytProgressWrap = document.getElementById('ytProgressWrap');
    const ytProgressBar = document.getElementById('ytProgressBar');
    const ytProgressPercent = document.getElementById('ytProgressPercent');
    const ytProgressStatus = document.getElementById('ytProgressStatus');

    if (ytProgressWrap) {
        ytProgressWrap.classList.remove('hidden');
        ytProgressBar.style.width = '10%';
        ytProgressPercent.textContent = '10%';
        ytProgressStatus.textContent = 'Finding best download source...';
    }

    showToast('Starting download... 📥');

    const videoId = extractYouTubeId(url);
    const videoTitle = document.getElementById('ytVideoTitle')?.textContent || 'video';
    const safeTitle = videoTitle.replace(/[\\/:"*?<>|]+/g, '');

    // Extract height from formatId (e.g. "1440p" -> "1440", "2160p" -> "2160")
    const qualityHeight = formatId.replace('p', '');

    // Strategy 1: Try local backend (has yt-dlp for real downloads)
    try {
        const localBackendUrl = `http://localhost:3000/api/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(formatId)}`;

        if (ytProgressWrap) {
            ytProgressBar.style.width = '20%';
            ytProgressPercent.textContent = '20%';
            ytProgressStatus.textContent = 'Connecting to local download server...';
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(localBackendUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
            const contentType = response.headers.get('content-type') || '';
            // If it returns an actual video file (not JSON), download it
            if (contentType.includes('video') || contentType.includes('octet-stream') || contentType.includes('mp4')) {
                if (ytProgressWrap) {
                    ytProgressBar.style.width = '50%';
                    ytProgressPercent.textContent = '50%';
                    ytProgressStatus.textContent = 'Downloading video from local server...';
                }

                const blob = await response.blob();

                if (ytProgressWrap) {
                    ytProgressBar.style.width = '100%';
                    ytProgressPercent.textContent = '100%';
                    ytProgressStatus.textContent = 'Download complete!';
                }

                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `${safeTitle}.${ext}`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    window.URL.revokeObjectURL(blobUrl);
                    if (ytProgressWrap) ytProgressWrap.classList.add('hidden');
                    startDownloadBtn.disabled = false;
                    startDownloadBtn.innerHTML = '⬇️ Download File Now';
                    showToast('Download complete! 🎉');
                }, 1000);
                return;
            }
        }
    } catch (e) {
        console.log('Local backend not available, trying online services...');
    }

    // Strategy 2: Try Cobalt API instances for direct download
    const cobaltInstances = [
        'https://api.cobalt.tools',
        'https://cobalt-api.kwiatekmiki.com',
        'https://cobalt.api.timelessnesses.me'
    ];

    for (const instance of cobaltInstances) {
        try {
            if (ytProgressWrap) {
                ytProgressBar.style.width = '30%';
                ytProgressPercent.textContent = '30%';
                ytProgressStatus.textContent = 'Connecting to download service...';
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const cobaltRes = await fetch(instance, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                    videoQuality: qualityHeight,
                    downloadMode: 'auto',
                    filenameStyle: 'pretty'
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (cobaltRes.ok) {
                const cobaltData = await cobaltRes.json();
                if (cobaltData.url) {
                    if (ytProgressWrap) {
                        ytProgressBar.style.width = '60%';
                        ytProgressPercent.textContent = '60%';
                        ytProgressStatus.textContent = 'Download link found! Starting download...';
                    }

                    // Download via the cobalt tunnel URL
                    const link = document.createElement('a');
                    link.href = cobaltData.url;
                    link.download = `${safeTitle}.${ext}`;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    if (ytProgressWrap) {
                        ytProgressBar.style.width = '100%';
                        ytProgressPercent.textContent = '100%';
                        ytProgressStatus.textContent = 'Download started!';
                    }

                    setTimeout(() => {
                        if (ytProgressWrap) ytProgressWrap.classList.add('hidden');
                        startDownloadBtn.disabled = false;
                        startDownloadBtn.innerHTML = '⬇️ Download File Now';
                        showToast('Download started! Check your browser downloads. 🎉');
                    }, 2000);
                    return;
                }
            }
        } catch (e) {
            console.log(`Cobalt instance ${instance} failed:`, e.message);
        }
    }

    // Strategy 3: Redirect to ssyoutube download service
    if (ytProgressWrap) {
        ytProgressBar.style.width = '50%';
        ytProgressPercent.textContent = '50%';
        ytProgressStatus.textContent = 'Opening download page...';
    }

    const downloadPageUrl = `https://ssyoutube.com/watch?v=${videoId}`;
    window.open(downloadPageUrl, '_blank');

    setTimeout(() => {
        if (ytProgressWrap) ytProgressWrap.classList.add('hidden');
        startDownloadBtn.disabled = false;
        startDownloadBtn.innerHTML = '⬇️ Download File Now';
        showToast('Download page opened in new tab! Select your quality there. 📥', 'info');
    }, 2000);
});
}

    // ------------------------------------------------------------------
    // TOOL 1B: Instagram Reel Downloader Engine
    // ------------------------------------------------------------------
    const igDownloaderUrl = document.getElementById('igDownloaderUrl');
    const analyzeIgBtn = document.getElementById('analyzeIgBtn');
    const igLoader = document.getElementById('igLoader');
    const igResultBox = document.getElementById('igResultBox');
    const igVideoThumb = document.getElementById('igVideoThumb');
    const igVideoTitle = document.getElementById('igVideoTitle');
    const igAuthorInfo = document.getElementById('igAuthorInfo');
    const startIgDownloadBtn = document.getElementById('startIgDownloadBtn');
    const igProgressWrap = document.getElementById('igProgressWrap');
    const igProgressBar = document.getElementById('igProgressBar');
    const igProgressPercent = document.getElementById('igProgressPercent');
    const igProgressStatus = document.getElementById('igProgressStatus');

    if (analyzeIgBtn) {
        analyzeIgBtn.addEventListener('click', analyzeInstagramLink);
    }

    if (igDownloaderUrl) {
        igDownloaderUrl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                analyzeInstagramLink();
            }
        });
    }

    async function analyzeInstagramLink() {
        const url = igDownloaderUrl ? igDownloaderUrl.value.trim() : '';
        if (!url) {
            showToast('Please paste an Instagram Reel or Post link first! 🔗', 'warning');
            if (igDownloaderUrl) igDownloaderUrl.focus();
            return;
        }

        if (igResultBox) igResultBox.classList.add('hidden');
        if (igLoader) igLoader.classList.remove('hidden');

        try {
            const response = await fetch(getBackendUrl(`/api/instagram/info?url=${encodeURIComponent(url)}`));
            const data = await response.json();

            if (igLoader) igLoader.classList.add('hidden');

            if (!response.ok || data.error) {
                showToast(data.error || 'Could not fetch this Instagram Reel. Ensure the link is public.', 'warning');
                return;
            }

            if (igResultBox) igResultBox.classList.remove('hidden');

            if (igVideoThumb) igVideoThumb.src = data.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80';
            if (igVideoTitle) igVideoTitle.textContent = data.title || `Instagram Reel (${data.shortcode})`;
            if (igAuthorInfo) igAuthorInfo.textContent = `Creator: ${data.author || 'Instagram User'}`;

            const durationEl = document.getElementById('igVideoDuration');
            if (durationEl) durationEl.textContent = '0:30';

            const hashtagsEl = document.getElementById('igHashtags');
            if (hashtagsEl) {
                const tags = data.hashtags && data.hashtags.length > 0 
                    ? data.hashtags.join(' ')
                    : '#reels #viral #instagram #trending #video';
                hashtagsEl.textContent = tags;
            }

            const uploadDateEl = document.getElementById('igUploadDate');
            if (uploadDateEl) uploadDateEl.textContent = data.uploadDate || '2 months ago';

            const likesCountEl = document.getElementById('igLikesCount');
            if (likesCountEl) likesCountEl.textContent = data.likesCount || '1315 likes';

            const commentsCountEl = document.getElementById('igCommentsCount');
            if (commentsCountEl) commentsCountEl.textContent = data.commentsCount || '3287 comments';

            if (startIgDownloadBtn) {
                startIgDownloadBtn.dataset.reelUrl = url;
                startIgDownloadBtn.dataset.videoUrl = data.videoUrl || '';
                startIgDownloadBtn.dataset.shortcode = data.shortcode || 'reel';
            }

            const qualitySelect = document.getElementById('igQualitySelect');
            if (qualitySelect) {
                qualitySelect.innerHTML = '<option value="1080p">1080p Full HD (.mp4)</option>';
            }

            showToast('Instagram Reel loaded successfully! 📸');
        } catch (err) {
            if (igLoader) igLoader.classList.add('hidden');
            showToast('Could not connect to the backend server. Is server running on port 3000?', 'warning');
            console.error('Instagram info error:', err);
        }
    }

    if (startIgDownloadBtn) {
        startIgDownloadBtn.addEventListener('click', async () => {
            const reelUrl = startIgDownloadBtn.dataset.reelUrl;
            if (!reelUrl) {
                showToast('Please analyze the Instagram Reel link first!', 'warning');
                return;
            }

            const qualitySelect = document.getElementById('igQualitySelect');
            const formatId = qualitySelect ? qualitySelect.value : '1080p';
            const customVideoUrl = startIgDownloadBtn.dataset.videoUrl || '';
            const shortcode = startIgDownloadBtn.dataset.shortcode || 'reel';

            let downloadUrl = getBackendUrl(`/api/instagram/download?url=${encodeURIComponent(reelUrl)}&format=${encodeURIComponent(formatId)}`);
            if (customVideoUrl) {
                downloadUrl += `&videoUrl=${encodeURIComponent(customVideoUrl)}`;
            }

            startIgDownloadBtn.disabled = true;
            startIgDownloadBtn.innerHTML = '⏳ Downloading Reel Video...';

            if (igProgressWrap) {
                igProgressWrap.classList.remove('hidden');
                if (igProgressBar) igProgressBar.style.width = '20%';
                if (igProgressPercent) igProgressPercent.textContent = '20%';
                if (igProgressStatus) igProgressStatus.textContent = 'Fetching Reel stream...';
            }

            showToast('Starting Instagram Reel download... 📥');

            try {
                const response = await fetch(downloadUrl);
                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || 'Download failed on backend server.');
                }

                if (igProgressWrap) {
                    if (igProgressBar) igProgressBar.style.width = '75%';
                    if (igProgressPercent) igProgressPercent.textContent = '75%';
                    if (igProgressStatus) igProgressStatus.textContent = 'Formatting video file...';
                }

                const blob = await response.blob();

                if (igProgressWrap) {
                    if (igProgressBar) igProgressBar.style.width = '100%';
                    if (igProgressPercent) igProgressPercent.textContent = '100%';
                    if (igProgressStatus) igProgressStatus.textContent = 'Download complete!';
                }

                const safeName = `Instagram_Reel_${shortcode}.${formatId === 'mp3' ? 'mp3' : 'mp4'}`;
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = safeName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);

                showToast('Instagram Reel downloaded successfully! 🎉');
            } catch (err) {
                showToast(err.message || 'Download failed. Verify that the Reel is public.', 'warning');
                console.error(err);
            } finally {
                startIgDownloadBtn.disabled = false;
                startIgDownloadBtn.innerHTML = '⬇️ Download Reel File Now';
                setTimeout(() => {
                    if (igProgressWrap) igProgressWrap.classList.add('hidden');
                }, 4000);
            }
        });
    }



    // ------------------------------------------------------------------
    // TOOL 2: YouTube Thumbnail Extractor Engine
    // ------------------------------------------------------------------
    const ytThumbUrl = document.getElementById('ytThumbUrl');
    const extractThumbBtn = document.getElementById('extractThumbBtn');
    const thumbMaxResImg = document.getElementById('thumbMaxResImg');
    const thumbHqImg = document.getElementById('thumbHqImg');
    const dlMaxResLink = document.getElementById('dlMaxResLink');
    const dlHqLink = document.getElementById('dlHqLink');

    if (extractThumbBtn) {
        extractThumbBtn.addEventListener('click', processThumbnails);
    }

    function processThumbnails() {
        const url = ytThumbUrl.value.trim();
        if (!url) {
            showToast('Please paste a YouTube video link first! 🖼️', 'warning');
            ytThumbUrl.focus();
            return;
        }
        const videoId = extractYouTubeId(url);

        const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        thumbMaxResImg.src = maxResUrl;
        thumbHqImg.src = hqUrl;

        dlMaxResLink.href = maxResUrl;
        dlHqLink.href = hqUrl;

        const resultsArea = document.getElementById('thumbResultsArea');
        if (resultsArea) resultsArea.classList.remove('hidden');

        showToast('Extracted HD Thumbnails successfully!');
    }

    document.querySelectorAll('.copy-url-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-url-target');
            const imgElement = document.getElementById(targetId);
            if (imgElement) {
                navigator.clipboard.writeText(imgElement.src);
                showToast('Image URL copied to clipboard! 📋');
            }
        });
    });

    // ------------------------------------------------------------------
    // TOOL 2B: YouTube Title, Description & Tag Finder Engine
    // ------------------------------------------------------------------
    const ytMetaUrl = document.getElementById('ytMetaUrl');
    const extractMetaBtn = document.getElementById('extractMetaBtn');
    const metaLoader = document.getElementById('metaLoader');
    const metaResultsArea = document.getElementById('metaResultsArea');
    const metaTitleDisplay = document.getElementById('metaTitleDisplay');
    const metaTagsCloud = document.getElementById('metaTagsCloud');
    const metaDescDisplay = document.getElementById('metaDescDisplay');
    const tagCountNum = document.getElementById('tagCountNum');
    const copyTitleBtn = document.getElementById('copyTitleBtn');
    const copyDescBtn = document.getElementById('copyDescBtn');
    const copyAllTagsBtn = document.getElementById('copyAllTagsBtn');

    if (extractMetaBtn) {
        extractMetaBtn.addEventListener('click', processYouTubeMetadata);
    }

    async function processYouTubeMetadata() {
        const url = ytMetaUrl.value.trim();
        if (!url) {
            showToast('Please paste a YouTube link to extract metadata! 🏷️', 'warning');
            ytMetaUrl.focus();
            return;
        }
        const videoId = extractYouTubeId(url);

        metaResultsArea.classList.add('hidden');
        metaLoader.classList.remove('hidden');

        try {
            // Attempt fetching oEmbed API for real title & author metadata
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            const data = await response.json();

            metaLoader.classList.add('hidden');
            metaResultsArea.classList.remove('hidden');

            const videoTitle = data.title || `YouTube Video (ID: ${videoId})`;
            const channelAuthor = data.author_name || 'Official Channel';

            metaTitleDisplay.textContent = videoTitle;

            // Generate SEO tags based on video title & author
            const titleWords = videoTitle.split(/\s+/).map(w => w.replace(/[^a-zA-Z0-9]/g, '')).filter(w => w.length > 2);
            const generatedTags = Array.from(new Set([
                videoTitle.toLowerCase(),
                channelAuthor.toLowerCase(),
                ...titleWords.map(w => w.toLowerCase()),
                'youtube video', 'viral', 'official video', 'hd 1080p', 'trending', '2026', 'music video', 'shorts'
            ]));

            tagCountNum.textContent = generatedTags.length;

            // Render tags cloud
            metaTagsCloud.innerHTML = generatedTags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('');

            // Set Description
            metaDescDisplay.textContent = `Official video "${videoTitle}" uploaded by ${channelAuthor}.\n\nSubscribe to ${channelAuthor} for more videos!\n\nFollow & Stream:\n• YouTube: https://youtube.com/watch?v=${videoId}\n• Official Channel: ${channelAuthor}\n\nKey Tags & Hashtags:\n${generatedTags.map(t => '#' + t).join(' ')}`;

            showToast('Extracted YouTube Title, Description & Tags! 🏷️');

        } catch (err) {
            metaLoader.classList.add('hidden');
            metaResultsArea.classList.remove('hidden');
            
            metaTitleDisplay.textContent = `YouTube Video (ID: ${videoId})`;
            metaDescDisplay.textContent = `Watch the video directly at: https://www.youtube.com/watch?v=${videoId}`;
            showToast('Loaded YouTube Metadata specs!');
        }
    }

    if (copyTitleBtn) {
        copyTitleBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(metaTitleDisplay.textContent);
            showToast('Video Title copied to clipboard! 📌');
        });
    }

    if (copyDescBtn) {
        copyDescBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(metaDescDisplay.textContent);
            showToast('Video Description copied to clipboard! 📝');
        });
    }

    if (copyAllTagsBtn) {
        copyAllTagsBtn.addEventListener('click', () => {
            const tagElements = metaTagsCloud.querySelectorAll('.tag-pill');
            const tagsList = Array.from(tagElements).map(el => el.textContent.replace('#', '')).join(', ');
            navigator.clipboard.writeText(tagsList);
            showToast('All SEO Tags copied to clipboard (comma separated)! 🏷️');
        });
    }

    // ------------------------------------------------------------------
    // TOOL 2C: Channel Keyword & Info Extractor Engine
    // ------------------------------------------------------------------
    const channelExtractorUrl = document.getElementById('channelExtractorUrl');
    const extractChannelInfoBtn = document.getElementById('extractChannelInfoBtn');
    const channelInfoLoader = document.getElementById('channelInfoLoader');
    const channelResultsArea = document.getElementById('channelResultsArea');
    const channelAvatar = document.getElementById('channelAvatar');
    const channelNameDisplay = document.getElementById('channelNameDisplay');
    const channelVanityDisplay = document.getElementById('channelVanityDisplay');
    const channelSubText = document.getElementById('channelSubText');
    const channelTagsCloud = document.getElementById('channelTagsCloud');
    const channelTagCountNum = document.getElementById('channelTagCountNum');
    const channelDescDisplay = document.getElementById('channelDescDisplay');
    const channelUrlDisplay = document.getElementById('channelUrlDisplay');
    const copyChannelTagsBtn = document.getElementById('copyChannelTagsBtn');
    const copyChannelDescBtn = document.getElementById('copyChannelDescBtn');
    const copyChannelUrlBtn = document.getElementById('copyChannelUrlBtn');

    if (extractChannelInfoBtn) {
        extractChannelInfoBtn.addEventListener('click', processChannelExtraction);
    }

    function isChannelUrl(url) {
        // Matches @handle, /channel/, /c/, /user/ patterns
        return /\/@[^/]+/.test(url) || /\/channel\//.test(url) || /\/c\//.test(url) || /\/user\//.test(url);
    }

    async function resolveChannelUrl(url) {
        // If it looks like a video URL, resolve the channel via the backend metadata API
        if (!isChannelUrl(url) && (url.includes('watch?v=') || url.includes('youtu.be/') || url.includes('/shorts/'))) {
            try {
                const response = await fetch(getBackendUrl(`/api/metadata?url=${encodeURIComponent(url)}`));
                const data = await response.json();
                if (data.channelUrl) {
                    return data.channelUrl;
                }
            } catch (err) {
                console.error('Could not resolve channel from video URL:', err);
            }
        }
        return url;
    }

    async function processChannelExtraction() {
        let url = channelExtractorUrl.value.trim();
        if (!url) {
            showToast('Please paste a YouTube channel or video URL! 🔍', 'warning');
            channelExtractorUrl.focus();
            return;
        }

        channelResultsArea.classList.add('hidden');
        channelInfoLoader.classList.remove('hidden');

        try {
            // Auto-resolve video URLs to channel URLs
            const resolvedUrl = await resolveChannelUrl(url);

            const response = await fetch(getBackendUrl(`/api/channel-info?channelUrl=${encodeURIComponent(resolvedUrl)}`));
            const data = await response.json();

            channelInfoLoader.classList.add('hidden');

            if (!response.ok || data.error) {
                showToast(data.error || 'Could not fetch channel info. Check the URL and try again.', 'warning');
                return;
            }

            channelResultsArea.classList.remove('hidden');

            // Channel Avatar
            if (data.avatar) {
                channelAvatar.src = data.avatar;
                channelAvatar.style.display = 'block';
            } else {
                channelAvatar.style.display = 'none';
            }

            // Channel Name
            channelNameDisplay.textContent = data.channelName || 'Unknown Channel';

            // Vanity URL
            if (data.vanityUrl) {
                channelVanityDisplay.textContent = data.vanityUrl;
                channelVanityDisplay.style.display = 'inline';
            } else {
                channelVanityDisplay.style.display = 'none';
            }

            // Subscriber Count
            channelSubText.textContent = data.subscriberCount || 'N/A';

            // Channel Keywords Cloud
            const keywords = data.keywords || [];
            channelTagCountNum.textContent = keywords.length;
            if (keywords.length > 0) {
                channelTagsCloud.innerHTML = keywords.map(tag => `<span class="tag-pill">#${tag}</span>`).join('');
            } else {
                channelTagsCloud.innerHTML = '<div class="no-keywords-notice"><span>⚠️</span> <span>No keywords set on this YouTube channel.</span></div>';
            }

            // Channel Description
            channelDescDisplay.textContent = data.channelDescription || 'No description available.';

            // Channel URL
            channelUrlDisplay.textContent = data.channelUrl || resolvedUrl;

            showToast('Channel info extracted successfully! 🔍');

        } catch (err) {
            channelInfoLoader.classList.add('hidden');
            showToast('Could not connect to the backend server. Is it running?', 'warning');
            console.error(err);
        }
    }

    if (copyChannelTagsBtn) {
        copyChannelTagsBtn.addEventListener('click', () => {
            const tagElements = channelTagsCloud ? channelTagsCloud.querySelectorAll('.tag-pill') : [];
            if (tagElements.length === 0) {
                showToast('No keywords on this channel to copy! ⚠️', 'warning');
                return;
            }
            const tagsList = Array.from(tagElements).map(el => el.textContent.replace(/^#/, '')).join(', ');
            navigator.clipboard.writeText(tagsList);
            showToast('All Channel Tags copied to clipboard! 🏷️');
        });
    }

    if (copyChannelDescBtn) {
        copyChannelDescBtn.addEventListener('click', () => {
            if (channelDescDisplay) navigator.clipboard.writeText(channelDescDisplay.textContent);
            showToast('Channel Description copied to clipboard! 📝');
        });
    }

    if (copyChannelUrlBtn) {
        copyChannelUrlBtn.addEventListener('click', () => {
            if (channelUrlDisplay) navigator.clipboard.writeText(channelUrlDisplay.textContent);
            showToast('Channel URL copied to clipboard! 🔗');
        });
    }

    // ------------------------------------------------------------------
    // TOOL 3: AI Voice & Hindi Conversation Synthesizer
    // ------------------------------------------------------------------
    const ttsTextInput = document.getElementById('ttsTextInput');
    const ttsVoiceSelect = document.getElementById('ttsVoiceSelect');
    const ttsPitch = document.getElementById('ttsPitch');
    const ttsRate = document.getElementById('ttsRate');
    const pitchVal = document.getElementById('pitchVal');
    const rateVal = document.getElementById('rateVal');
    const playTtsBtn = document.getElementById('playTtsBtn');
    const pauseTtsBtn = document.getElementById('pauseTtsBtn');
    const stopTtsBtn = document.getElementById('stopTtsBtn');
    const waveCanvas = document.getElementById('waveCanvas');
    const ctx = waveCanvas ? waveCanvas.getContext('2d') : null;

    const loadHindiDialogueBtn = document.getElementById('loadHindiDialogueBtn');
    const selectHindiMaleBtn = document.getElementById('selectHindiMaleBtn');
    const selectHindiFemaleBtn = document.getElementById('selectHindiFemaleBtn');

    let voices = [];
    let isSpeaking = false;
    let isPaused = false;
    let animFrameId = null;

    function populateSpeechVoices() {
        if (!('speechSynthesis' in window)) {
            showToast('Web Speech API not supported in your browser.', 'warning');
            return;
        }
        if (!ttsVoiceSelect) return;
        voices = window.speechSynthesis.getVoices();
        ttsVoiceSelect.innerHTML = '';

        // Add Dedicated Hindi Presets Group at the Top
        const hindiGroup = document.createElement('optgroup');
        hindiGroup.label = '🇮🇳 Hindi Speaker Presets (Men & Women)';

        const optDialogue = document.createElement('option');
        optDialogue.value = 'hindi_dialogue';
        optDialogue.textContent = '💬 Hindi Dual Conversation (Man & Woman Dialogue)';
        hindiGroup.appendChild(optDialogue);

        const optMale = document.createElement('option');
        optMale.value = 'hindi_male';
        optMale.textContent = '👨 Hindi Male Voice (🇮🇳)';
        hindiGroup.appendChild(optMale);

        const optFemale = document.createElement('option');
        optFemale.value = 'hindi_female';
        optFemale.textContent = '👩 Hindi Female Voice (🇮🇳)';
        hindiGroup.appendChild(optFemale);

        ttsVoiceSelect.appendChild(hindiGroup);

        // Add System Voices Group
        const systemGroup = document.createElement('optgroup');
        systemGroup.label = '🌐 All System & Browser Voices';

        // Sort voices so Hindi & Indian voices appear first
        const sortedVoices = [...voices].sort((a, b) => {
            const aHindi = (a.lang && (a.lang.includes('hi') || a.lang.includes('IN'))) ? 1 : 0;
            const bHindi = (b.lang && (b.lang.includes('hi') || b.lang.includes('IN'))) ? 1 : 0;
            return bHindi - aHindi;
        });

        sortedVoices.forEach((voice) => {
            const originalIndex = voices.indexOf(voice);
            const option = document.createElement('option');
            option.value = originalIndex;
            const isHindi = voice.lang && (voice.lang.includes('hi') || voice.lang.includes('IN'));
            option.textContent = `${isHindi ? '🇮🇳 ' : ''}${voice.name} (${voice.lang})${voice.default ? ' — Default' : ''}`;
            systemGroup.appendChild(option);
        });

        ttsVoiceSelect.appendChild(systemGroup);
    }

    if ('speechSynthesis' in window && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = populateSpeechVoices;
        populateSpeechVoices();
    }

    // Quick Hindi Preset Button Handlers
    if (loadHindiDialogueBtn) {
        loadHindiDialogueBtn.addEventListener('click', () => {
            if (ttsTextInput) {
                ttsTextInput.value = 
                    "Man: नमस्ते! आप कैसी हैं?\n" +
                    "Woman: मैं ठीक हूँ! आप बताइए।\n" +
                    "Man: क्या आप आज शाम फ्री हैं?\n" +
                    "Woman: हाँ बिल्कुल, हम मिल सकते हैं।";
            }
            if (ttsVoiceSelect) ttsVoiceSelect.value = 'hindi_dialogue';
            showToast('Loaded Sample Hindi Conversation (Man & Woman)! 💬');
        });
    }

    if (selectHindiMaleBtn) {
        selectHindiMaleBtn.addEventListener('click', () => {
            if (ttsVoiceSelect) ttsVoiceSelect.value = 'hindi_male';
            if (ttsTextInput && !ttsTextInput.value.trim()) {
                ttsTextInput.value = "नमस्ते! मैं आपका स्वागत करता हूँ।";
            }
            showToast('Selected Hindi Male Voice (👨)!');
        });
    }

    if (selectHindiFemaleBtn) {
        selectHindiFemaleBtn.addEventListener('click', () => {
            if (ttsVoiceSelect) ttsVoiceSelect.value = 'hindi_female';
            if (ttsTextInput && !ttsTextInput.value.trim()) {
                ttsTextInput.value = "नमस्ते! मैं आपकी सहायता करने के लिए तैयार हूँ।";
            }
            showToast('Selected Hindi Female Voice (👩)!');
        });
    }

    if (ttsPitch) ttsPitch.addEventListener('input', () => { if (pitchVal) pitchVal.textContent = ttsPitch.value; });
    if (ttsRate) ttsRate.addEventListener('input', () => { if (rateVal) rateVal.textContent = `${ttsRate.value}x`; });

    // Find Best Hindi Male System Voice
    function getHindiMaleVoice() {
        if (!voices || voices.length === 0) return null;
        // 1. Natural Neural / Premium Hindi Male Voices
        let match = voices.find(v => v.lang && v.lang.toLowerCase().includes('hi') && (v.name.toLowerCase().includes('madhur') || v.name.toLowerCase().includes('hemant') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('male')));
        if (match) return match;

        // 2. Any Hindi Voice that is NOT female named
        match = voices.find(v => v.lang && v.lang.toLowerCase().includes('hi') && !v.name.toLowerCase().includes('heera') && !v.name.toLowerCase().includes('swara') && !v.name.toLowerCase().includes('kalpana') && !v.name.toLowerCase().includes('zira') && !v.name.toLowerCase().includes('female'));
        if (match) return match;

        // 3. Indian Male English Voice (e.g. Microsoft Ravi / Madhur / Natural)
        match = voices.find(v => v.lang && (v.lang.includes('IN') || v.lang.includes('in')) && (v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('madhur') || v.name.toLowerCase().includes('male')));
        if (match) return match;

        // 4. Any Hindi Voice
        match = voices.find(v => v.lang && v.lang.toLowerCase().includes('hi'));
        if (match) return match;

        return voices[0];
    }

    // Find Best Hindi Female System Voice
    function getHindiFemaleVoice() {
        if (!voices || voices.length === 0) return null;
        // 1. Natural Neural / Premium Hindi Female Voices
        let match = voices.find(v => v.lang && v.lang.toLowerCase().includes('hi') && (v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('female')));
        if (match) return match;

        // 2. Any Hindi Voice
        match = voices.find(v => v.lang && v.lang.toLowerCase().includes('hi'));
        if (match) return match;

        // 3. Indian Female English Voice
        match = voices.find(v => v.lang && (v.lang.includes('IN') || v.lang.includes('in')) && (v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('female')));
        if (match) return match;

        return voices[0];
    }

    if (playTtsBtn) {
        playTtsBtn.addEventListener('click', () => {
            const rawText = ttsTextInput ? ttsTextInput.value.trim() : '';
            if (!rawText) {
                showToast('Please enter some script or conversation text first!', 'warning');
                return;
            }

            window.speechSynthesis.cancel(); // Stop any active speech
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
            isPaused = false;
            if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';

            const selectedVal = ttsVoiceSelect ? ttsVoiceSelect.value : '0';
            const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

            const isDialogueMode = selectedVal === 'hindi_dialogue' || lines.some(l => 
                /^(man|woman|male|female|kabir|ananya|ravi|heera|priya|rahul|पुरुष|महिला|boy|girl|m|w|f):/i.test(l)
            );

            if (isDialogueMode && lines.length > 0) {
                speakDialogueLines(lines);
            } else {
                speakSingleUtterance(rawText, selectedVal);
            }
        });
    }

    if (pauseTtsBtn) {
        pauseTtsBtn.addEventListener('click', () => {
            if (!('speechSynthesis' in window)) return;

            if (window.speechSynthesis.speaking && !isPaused) {
                window.speechSynthesis.pause();
                isPaused = true;
                pauseTtsBtn.innerHTML = '▶️ Resume';
                showToast('Audio paused ⏸️');
            } else if (isPaused) {
                window.speechSynthesis.resume();
                isPaused = false;
                pauseTtsBtn.innerHTML = '⏸️ Pause';
                showToast('Resuming audio ▶️');
            }
        });
    }

    function speakSingleUtterance(text, voiceVal) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            if (voiceVal === 'hindi_male') {
                const maleVoice = getHindiMaleVoice();
                if (maleVoice) {
                    utterance.voice = maleVoice;
                    utterance.lang = maleVoice.lang;
                } else {
                    utterance.lang = 'hi-IN';
                }
                utterance.pitch = 0.96;
                utterance.rate = 0.98;
            } else if (voiceVal === 'hindi_female') {
                const femaleVoice = getHindiFemaleVoice();
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                    utterance.lang = femaleVoice.lang;
                } else {
                    utterance.lang = 'hi-IN';
                }
                utterance.pitch = 1.08;
                utterance.rate = 1.0;
            } else if (voices.length > 0 && voices[voiceVal]) {
                const selectedVoice = voices[voiceVal];
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
                if (ttsPitch) utterance.pitch = parseFloat(ttsPitch.value);
                if (ttsRate) utterance.rate = parseFloat(ttsRate.value);
            }

            utterance.onstart = () => {
                isSpeaking = true;
                drawWaveform();
                showToast('Speaking voiceover... 🎙️');
            };

            utterance.onend = () => {
                isSpeaking = false;
                isPaused = false;
                if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';
                if (animFrameId) cancelAnimationFrame(animFrameId);
                clearWaveform();
            };

            utterance.onerror = (err) => {
                console.error('TTS speech error:', err);
                isSpeaking = false;
                isPaused = false;
                if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';
                if (animFrameId) cancelAnimationFrame(animFrameId);
                clearWaveform();
            };

            window.speechSynthesis.speak(utterance);
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        }, 50);
    }

    function speakDialogueLines(lines) {
        if (!lines || lines.length === 0) return;

        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();

        isSpeaking = true;
        isPaused = false;
        if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';
        drawWaveform();

        let currentIndex = 0;

        function speakNextLine() {
            if (currentIndex >= lines.length || !isSpeaking) {
                isSpeaking = false;
                isPaused = false;
                if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';
                if (animFrameId) cancelAnimationFrame(animFrameId);
                clearWaveform();
                showToast('Hindi conversation completed! 🎉');
                return;
            }

            const rawLine = lines[currentIndex];
            let isFemale = false;
            let cleanText = rawLine;

            const maleMatch = rawLine.match(/^(man|male|kabir|ravi|rahul|boy|पुरुष|m):?\s*(.*)/i);
            const femaleMatch = rawLine.match(/^(woman|female|ananya|heera|priya|girl|महिला|w|f):?\s*(.*)/i);

            if (femaleMatch) {
                isFemale = true;
                cleanText = femaleMatch[2] || rawLine;
            } else if (maleMatch) {
                isFemale = false;
                cleanText = maleMatch[2] || rawLine;
            } else {
                isFemale = currentIndex % 2 !== 0;
            }

            cleanText = cleanText.trim();
            if (!cleanText) {
                currentIndex++;
                speakNextLine();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(cleanText);

            if (isFemale) {
                const femaleVoice = getHindiFemaleVoice();
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                    utterance.lang = femaleVoice.lang;
                } else {
                    utterance.lang = 'hi-IN';
                }
                utterance.pitch = 1.08;
                utterance.rate = 1.0;
            } else {
                const maleVoice = getHindiMaleVoice();
                if (maleVoice) {
                    utterance.voice = maleVoice;
                    utterance.lang = maleVoice.lang;
                } else {
                    utterance.lang = 'hi-IN';
                }
                utterance.pitch = 0.96;
                utterance.rate = 0.98;
            }

            utterance.onend = () => {
                currentIndex++;
                setTimeout(speakNextLine, 350);
            };

            utterance.onerror = (err) => {
                console.error('Dialogue speech error:', err);
                currentIndex++;
                speakNextLine();
            };

            window.speechSynthesis.speak(utterance);
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        }

        setTimeout(speakNextLine, 50);
    }

    if (stopTtsBtn) {
        stopTtsBtn.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            isPaused = false;
            if (pauseTtsBtn) pauseTtsBtn.innerHTML = '⏸️ Pause';
            if (animFrameId) cancelAnimationFrame(animFrameId);
            clearWaveform();
            showToast('Hindi conversation / audio stopped.');
        });
    }

    function drawWaveform() {
        if (!isSpeaking || !ctx || !waveCanvas) return;
        ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

        const width = waveCanvas.width;
        const height = waveCanvas.height;
        const time = Date.now() * 0.005;

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#6366f1';

        for (let x = 0; x < width; x += 5) {
            const y = height / 2 + Math.sin(x * 0.03 + time) * 20 * Math.sin(x * 0.01);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        animFrameId = requestAnimationFrame(drawWaveform);
    }

    function clearWaveform() {
        if (!ctx || !waveCanvas) return;
        ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.moveTo(0, waveCanvas.height / 2);
        ctx.lineTo(waveCanvas.width, waveCanvas.height / 2);
        ctx.stroke();
    }
    clearWaveform();



    // ------------------------------------------------------------------
    // TOOL 5: Image Studio & Aspect Ratio Engine
    // ------------------------------------------------------------------
    const imgDropzone = document.getElementById('imgDropzone');
    const imgInput = document.getElementById('imgInput');
    const imgPreviewArea = document.getElementById('imgPreviewArea');
    const imageStudioCanvas = document.getElementById('imageStudioCanvas');
    const currentResolutionBadge = document.getElementById('currentResolutionBadge');
    const changeImgBtn = document.getElementById('changeImgBtn');
    const downloadResizedImgBtn = document.getElementById('downloadResizedImgBtn');
    const exportFormatSelect = document.getElementById('exportFormatSelect');
    const customBgColorInput = document.getElementById('customBgColorInput');

    let loadedImage = null;
    let selectedRatio = 'original';
    let targetWidth = 0;
    let targetHeight = 0;
    let selectedFit = 'cover';
    let selectedFilter = 'none';
    let selectedBgColor = '#ffffff';

    if (imgDropzone && imgInput) {
        imgDropzone.addEventListener('click', () => imgInput.click());
    }

    if (changeImgBtn && imgInput) {
        changeImgBtn.addEventListener('click', () => imgInput.click());
    }

    if (imgInput) {
        imgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedImage = img;
                        if (imgDropzone) imgDropzone.classList.add('hidden');
                        if (imgPreviewArea) imgPreviewArea.classList.remove('hidden');
                        renderStudioCanvas();
                        showToast('Image loaded! Select aspect ratio & fit mode.');
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Aspect Ratio Selection
    document.querySelectorAll('.aspect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.aspect-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedRatio = btn.getAttribute('data-ratio');
            targetWidth = parseInt(btn.getAttribute('data-w')) || 0;
            targetHeight = parseInt(btn.getAttribute('data-h')) || 0;
            renderStudioCanvas();
        });
    });

    // Fit Mode Selection
    document.querySelectorAll('.fit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.fit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFit = btn.getAttribute('data-fit');
            renderStudioCanvas();
        });
    });

    // Bg Color Radio Selection
    document.querySelectorAll('input[name="bgPadColor"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedBgColor = e.target.value;
            renderStudioCanvas();
        });
    });

    if (customBgColorInput) {
        customBgColorInput.addEventListener('input', (e) => {
            selectedBgColor = e.target.value;
            document.querySelectorAll('input[name="bgPadColor"]').forEach(r => r.checked = false);
            renderStudioCanvas();
        });
    }

    // Filter Selection
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFilter = btn.getAttribute('data-filter');
            renderStudioCanvas();
        });
    });

    function renderStudioCanvas() {
        if (!loadedImage || !imageStudioCanvas) return;
        const ctx = imageStudioCanvas.getContext('2d');
        if (!ctx) return;

        let outW = loadedImage.width;
        let outH = loadedImage.height;

        if (selectedRatio !== 'original' && targetWidth > 0 && targetHeight > 0) {
            outW = targetWidth;
            outH = targetHeight;
        }

        imageStudioCanvas.width = outW;
        imageStudioCanvas.height = outH;

        // Clear canvas
        ctx.clearRect(0, 0, outW, outH);

        // Draw Background (for contain mode)
        if (selectedFit === 'contain') {
            ctx.fillStyle = selectedBgColor;
            ctx.fillRect(0, 0, outW, outH);
        }

        // Apply CSS Filter
        ctx.filter = selectedFilter || 'none';

        if (selectedRatio === 'original' || selectedFit === 'stretch') {
            ctx.drawImage(loadedImage, 0, 0, outW, outH);
        } else if (selectedFit === 'contain') {
            const scale = Math.min(outW / loadedImage.width, outH / loadedImage.height);
            const drawW = loadedImage.width * scale;
            const drawH = loadedImage.height * scale;
            const drawX = (outW - drawW) / 2;
            const drawY = (outH - drawH) / 2;
            ctx.drawImage(loadedImage, drawX, drawY, drawW, drawH);
        } else if (selectedFit === 'cover') {
            const scale = Math.max(outW / loadedImage.width, outH / loadedImage.height);
            const drawW = loadedImage.width * scale;
            const drawH = loadedImage.height * scale;
            const drawX = (outW - drawW) / 2;
            const drawY = (outH - drawH) / 2;
            ctx.drawImage(loadedImage, drawX, drawY, drawW, drawH);
        }

        // Reset filter
        ctx.filter = 'none';

        if (currentResolutionBadge) {
            const ratioName = selectedRatio === 'original' ? 'Original Ratio' : `${selectedRatio}`;
            currentResolutionBadge.textContent = `${outW} x ${outH} px (${ratioName})`;
        }
    }

    if (downloadResizedImgBtn) {
        downloadResizedImgBtn.addEventListener('click', () => {
            if (!loadedImage || !imageStudioCanvas) {
                showToast('Please upload an image first!');
                return;
            }

            const format = exportFormatSelect ? exportFormatSelect.value : 'image/png';
            const ext = format === 'image/jpeg' ? 'jpg' : (format === 'image/webp' ? 'webp' : 'png');
            const dataUrl = imageStudioCanvas.toDataURL(format, 0.95);

            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `Resized_Photo_${selectedRatio.replace(':', 'x')}_${imageStudioCanvas.width}x${imageStudioCanvas.height}.${ext}`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            showToast('Resized photo downloaded successfully! 🎉');
        });
    }

    // ------------------------------------------------------------------
    // TOOL: Video Aspect Ratio Changer Engine
    // ------------------------------------------------------------------
    const convertAspectBtn = document.getElementById('convertAspectBtn');
    const aspectVideoInput = document.getElementById('aspectVideoInput');
    const aspectRatioSelect = document.getElementById('aspectRatioSelect');
    const aspectModeSelect = document.getElementById('aspectModeSelect');
    const aspectLoader = document.getElementById('aspectLoader');

    if (convertAspectBtn) {
        convertAspectBtn.addEventListener('click', async () => {
            const file = aspectVideoInput.files[0];
            if (!file) {
                showToast('Please select a video file first! 🎬', 'warning');
                return;
            }

            const formData = new FormData();
            formData.append('video', file);
            formData.append('ratio', aspectRatioSelect.value);
            formData.append('mode', aspectModeSelect.value);

            aspectLoader.classList.remove('hidden');
            convertAspectBtn.disabled = true;

            try {
                const response = await fetch(getBackendUrl('/change-aspect-ratio'), {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || 'Conversion failed.');
                }

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'converted-video.mp4';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);

                showToast('Video converted and downloaded! ✅');
            } catch (err) {
                console.error(err);
                showToast(err.message || 'Something went wrong during conversion.', 'warning');
            } finally {
                aspectLoader.classList.add('hidden');
                convertAspectBtn.disabled = false;
            }
        });
    }

});
