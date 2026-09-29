/**
 * OmniTools Application Engine
 * Handles Navigation, Theme Toggling, Tool Workspaces, YouTube Media Extraction, and Speech Synthesis
 */

document.addEventListener('DOMContentLoaded', () => {
    // Tool Metadata Registry
    const toolsData = {
        'yt-downloader': {
            title: 'YouTube Video Downloader (Coming Soon)',
            tag: 'Coming Soon',
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
        'keyword-extractor': {
            title: 'Keyword & Tag Extractor',
            tag: 'Channel SEO',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>`,
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

        'ig-downloader': {
            title: 'Instagram Reel Downloader',
            tag: 'Video & Media',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
            iconBg: 'tool-icon-pink'
        },
        'video-aspect-ratio': {
            title: 'Video Aspect Ratio Changer',
            tag: 'Utility',
            iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 4v16M16 4v16"/><polygon points="10 9 15 12 10 15 10 9" fill="currentColor"/></svg>`,
            iconBg: 'tool-icon-indigo'
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

    // Video Aspect Ratio tool state
    let currentVideoFile = null;
    let currentVideoUrl = null;
    let convertedVideoBlob = null;
    let convertedVideoUrl = null;
    let convertedVideoFileName = 'converted-video.mp4';

    function resetAllToolWorkspaces() {
        // Reset all text inputs & textareas
        document.querySelectorAll('.tool-modal-content input[type="text"], .tool-modal-content textarea').forEach(input => {
            input.value = '';
        });

        // Hide all result boxes, loaders, progress bars, and clear buttons
        document.querySelectorAll('.result-box, .tool-loader, .download-progress-wrap, .input-clear-btn, .keyword-error-alert, .keyword-empty-state').forEach(el => {
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
            'keywordEntityTitle', 'keywordEntitySub', 'keywordCountNum'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });

        // Clear innerHTML containers
        ['metaTagsCloud', 'keywordTagsCloud'].forEach(id => {
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

        // Clear Video Aspect Ratio Workspace
        const videoDropzone = document.getElementById('videoDropzone');
        if (videoDropzone) videoDropzone.classList.remove('hidden');
        const videoPreviewArea = document.getElementById('videoPreviewArea');
        if (videoPreviewArea) videoPreviewArea.classList.add('hidden');
        const videoDropError = document.getElementById('videoDropError');
        if (videoDropError) videoDropError.classList.add('hidden');
        const videoProcessError = document.getElementById('videoProcessError');
        if (videoProcessError) videoProcessError.classList.add('hidden');
        const videoPreviewPlayer = document.getElementById('videoPreviewPlayer');
        if (videoPreviewPlayer) {
            videoPreviewPlayer.pause();
            videoPreviewPlayer.removeAttribute('src');
            videoPreviewPlayer.style.objectFit = 'contain';
            videoPreviewPlayer.load();
        }
        if (currentVideoUrl) {
            URL.revokeObjectURL(currentVideoUrl);
            currentVideoUrl = null;
        }
        currentVideoFile = null;
        if (convertedVideoUrl) {
            URL.revokeObjectURL(convertedVideoUrl);
            convertedVideoUrl = null;
        }
        convertedVideoBlob = null;
        const videoResultBox = document.getElementById('videoResultBox');
        if (videoResultBox) videoResultBox.classList.add('hidden');
        const videoResultPlayer = document.getElementById('videoResultPlayer');
        if (videoResultPlayer) {
            videoResultPlayer.pause();
            videoResultPlayer.removeAttribute('src');
            videoResultPlayer.load();
        }
        const videoFileInput = document.getElementById('videoFileInput');
        if (videoFileInput) videoFileInput.value = '';
        const videoProcessBox = document.getElementById('videoProcessBox');
        if (videoProcessBox) videoProcessBox.classList.add('hidden');
        const videoProcessBar = document.getElementById('videoProcessBar');
        if (videoProcessBar) videoProcessBar.style.width = '0%';
        const videoProcessStatus = document.getElementById('videoProcessStatus');
        if (videoProcessStatus) videoProcessStatus.textContent = 'Ready to convert';
        const convertBtn = document.getElementById('convertVideoBtn') || document.getElementById('processVideoAspectBtn');
        if (convertBtn) {
            convertBtn.disabled = false;
            convertBtn.innerHTML = '⚡ Convert Video';
        }

        // Reset Video Aspect Ratio and Mode Highlight States
        const videoAspectRatioGroup = document.getElementById('videoAspectRatioGroup');
        if (videoAspectRatioGroup) {
            const aspectButtons = videoAspectRatioGroup.querySelectorAll('.video-ratio-btn, .aspect-btn');
            aspectButtons.forEach(btn => {
                if (btn.dataset.ratio === '16:9') btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
        const videoFitModeGroup = document.getElementById('videoFitModeGroup');
        if (videoFitModeGroup) {
            const modeButtons = videoFitModeGroup.querySelectorAll('.video-mode-btn, .fit-btn');
            modeButtons.forEach(btn => {
                const btnMode = btn.dataset.mode || (btn.dataset.fit === 'cover' ? 'crop' : 'pad');
                if (btnMode === 'pad') btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
        const videoAspectCanvasWrap = document.getElementById('videoAspectCanvasWrap');
        if (videoAspectCanvasWrap) {
            videoAspectCanvasWrap.style.aspectRatio = '16 / 9';
            videoAspectCanvasWrap.style.backgroundColor = '#000000';
        }
        const videoAspectBadge = document.getElementById('videoAspectBadge');
        if (videoAspectBadge) {
            videoAspectBadge.textContent = '16:9 Landscape (1920x1080)';
        }
        const videoBgColorBox = document.getElementById('videoBgColorBox');
        if (videoBgColorBox) {
            videoBgColorBox.classList.remove('hidden');
        }
    }

    function launchTool(toolKey) {
        if (toolKey === 'yt-downloader') {
            showToast('YouTube Video Downloader is coming soon! 🚀 Stay tuned.', 'warning');
            return;
        }

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
        } else if (toolKey === 'keyword-extractor') {
            const kwInput = document.getElementById('keywordExtractorInput');
            if (kwInput && kwInput.value.trim().length > 0) {
                processKeywordExtraction();
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
                matchesCat = (cardCat === category || (cardCat && cardCat.split(' ').includes(category)));
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
    setupInputClear('keywordExtractorInput', 'clearKeywordExtractorInput');
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
    const envBackendUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BACKEND_URL)
        || (typeof window !== 'undefined' && (window.NEXT_PUBLIC_BACKEND_URL || window.ENV?.NEXT_PUBLIC_BACKEND_URL || window.SUPABASE_CONFIG?.NEXT_PUBLIC_BACKEND_URL || window.SUPABASE_CONFIG?.backendUrl))
        || 'https://omnitools-backend.onrender.com';

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (envBackendUrl) {
        const cleanBase = envBackendUrl.replace(/\/+$/, '');
        const apiPath = (normalizedPath.startsWith('/api/') || normalizedPath === '/api') ? normalizedPath : `/api${normalizedPath}`;
        return `${cleanBase}${apiPath}`;
    }

    const cleanPath = normalizedPath.replace(/^\/api/, '');
    if (typeof window !== 'undefined' && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.functionsUrl) {
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
        if (startDownloadBtn) {
            startDownloadBtn.dataset.videoUrl = url;
        }

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

        // Populate dropdown select if present
        const ytQualitySelect = document.getElementById('ytQualitySelect');
        if (ytQualitySelect) {
            ytQualitySelect.innerHTML = '';
            filteredTiers.forEach((f, idx) => {
                const opt = document.createElement('option');
                opt.value = f.formatId;
                opt.textContent = `${f.quality} (.${f.ext})`;
                if (idx === 0) opt.selected = true;
                ytQualitySelect.appendChild(opt);
            });
            const mp3Opt = document.createElement('option');
            mp3Opt.value = 'mp3';
            mp3Opt.textContent = 'Audio Only (.mp3)';
            ytQualitySelect.appendChild(mp3Opt);
        }

        // Populate direct 1-click quality download buttons list
        const ytQualityList = document.getElementById('ytQualityList');
        if (ytQualityList) {
            ytQualityList.innerHTML = '';
            filteredTiers.forEach(f => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'btn-quality-download';
                btn.dataset.format = f.formatId;
                btn.dataset.ext = f.ext;

                const sizeMB = totalSeconds > 0 ? (totalSeconds * f.ratePerSec) / (1024 * 1024) : 0;
                const sizeLabel = sizeMB >= 1000
                    ? `~${(sizeMB / 1024).toFixed(2)} GB`
                    : (sizeMB > 0 ? `~${sizeMB.toFixed(1)} MB` : '');

                const badgeClass = f.height >= 2160 ? 'quality-badge-4k' : (f.height >= 720 ? 'quality-badge-hd' : '');

                btn.innerHTML = `
                    <div class="quality-info-left">
                        <span class="quality-badge ${badgeClass}">${f.formatId}</span>
                        <span class="quality-name">${f.quality} (.${f.ext})</span>
                    </div>
                    <div class="quality-info-right">
                        ${sizeLabel ? `<span class="quality-filesize">${sizeLabel}</span>` : ''}
                        <span class="btn-download-action">⬇️ Download</span>
                    </div>
                `;

                btn.addEventListener('click', () => {
                    downloadYouTubeVideo(url, f.formatId, f.ext, btn);
                });

                ytQualityList.appendChild(btn);
            });
        }

        showToast('Video loaded successfully! ✅');
    } catch (err) {
        ytLoader.classList.add('hidden');
        showToast('Could not load video details. Please try again.', 'warning');
        console.error(err);
    }
}

    // Direct, single-action video download engine
    async function downloadYouTubeVideo(url, formatId = '1080p', ext = 'mp4', triggerBtn = null) {
        if (!url) {
            showToast('Please get the video info first!', 'warning');
            return;
        }

        // Disable all quality buttons and main button during active download
        const allQualityBtns = document.querySelectorAll('.btn-quality-download');
        allQualityBtns.forEach(b => { b.disabled = true; });
        if (startDownloadBtn) {
            startDownloadBtn.disabled = true;
        }

        let originalBtnHtml = '';
        if (triggerBtn) {
            originalBtnHtml = triggerBtn.innerHTML;
            const actionSpan = triggerBtn.querySelector('.btn-download-action');
            if (actionSpan) {
                actionSpan.innerHTML = '⏳ Downloading...';
            } else {
                triggerBtn.innerHTML = '⏳ Processing Download...';
            }
        }

        const ytProgressWrap = document.getElementById('ytProgressWrap');
        const ytProgressBar = document.getElementById('ytProgressBar');
        const ytProgressPercent = document.getElementById('ytProgressPercent');
        const ytProgressStatus = document.getElementById('ytProgressStatus');

        if (ytProgressWrap) {
            ytProgressWrap.classList.remove('hidden');
            ytProgressBar.style.width = '15%';
            ytProgressPercent.textContent = '15%';
            ytProgressStatus.textContent = `Preparing ${formatId} video stream...`;
        }

        showToast(`Starting ${formatId} video download... 📥`);

        const videoId = extractYouTubeId(url);
        const videoTitle = document.getElementById('ytVideoTitle')?.textContent || 'video';
        const safeTitle = videoTitle.replace(/[\\/:"*?<>|]+/g, '').trim() || `YouTube_${videoId}`;

        // Download endpoint targeting configured backend (Render / local)
        const downloadApiPath = `/api/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(formatId)}`;
        const backendEndpoints = [
            getBackendUrl(downloadApiPath)
        ];

        let downloadSuccess = false;

        for (const endpoint of backendEndpoints) {
            try {
                if (ytProgressWrap) {
                    ytProgressBar.style.width = '35%';
                    ytProgressPercent.textContent = '35%';
                    ytProgressStatus.textContent = 'Connecting to download engine...';
                }

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 90000);
                const response = await fetch(endpoint, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const contentType = response.headers.get('content-type') || '';
                    if (contentType.includes('video') || contentType.includes('octet-stream') || contentType.includes('mp4') || contentType.includes('audio') || contentType.includes('mpeg')) {
                        if (ytProgressWrap) {
                            ytProgressBar.style.width = '75%';
                            ytProgressPercent.textContent = '75%';
                            ytProgressStatus.textContent = 'Transferring file to your device...';
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
                        link.download = `${safeTitle}_${formatId}.${ext}`;
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        setTimeout(() => {
                            window.URL.revokeObjectURL(blobUrl);
                            if (ytProgressWrap) ytProgressWrap.classList.add('hidden');
                            allQualityBtns.forEach(b => { b.disabled = false; });
                            if (startDownloadBtn) {
                                startDownloadBtn.disabled = false;
                                startDownloadBtn.innerHTML = '⬇️ Download File Now';
                            }
                            if (triggerBtn && originalBtnHtml) triggerBtn.innerHTML = originalBtnHtml;
                            showToast('Video downloaded successfully! 🎉');
                        }, 1000);

                        downloadSuccess = true;
                        break;
                    }
                }
            } catch (e) {
                console.log(`Backend endpoint ${endpoint} unavailable:`, e.message);
            }
        }

        if (!downloadSuccess) {
            if (ytProgressWrap) {
                ytProgressBar.style.width = '100%';
                ytProgressPercent.textContent = 'Failed';
                ytProgressStatus.textContent = 'Download server offline or request failed.';
            }
            showToast('Could not download. Please check backend server status.', 'warning');
            setTimeout(() => {
                if (ytProgressWrap) ytProgressWrap.classList.add('hidden');
                allQualityBtns.forEach(b => { b.disabled = false; });
                if (startDownloadBtn) {
                    startDownloadBtn.disabled = false;
                    startDownloadBtn.innerHTML = '⬇️ Download File Now';
                }
                if (triggerBtn && originalBtnHtml) triggerBtn.innerHTML = originalBtnHtml;
            }, 3000);
        }
    }

    if (startDownloadBtn) {
        startDownloadBtn.addEventListener('click', async () => {
            const url = (startDownloadBtn.dataset && startDownloadBtn.dataset.videoUrl) || ytDownloaderUrl.value.trim();
            if (!url) {
                showToast('Please get the video info first! 🔗', 'warning');
                return;
            }

            const qualitySelect = document.getElementById('ytQualitySelect');
            const formatId = qualitySelect ? qualitySelect.value : '1080p';
            const ext = formatId === 'mp3' ? 'mp3' : 'mp4';

            await downloadYouTubeVideo(url, formatId, ext, startDownloadBtn);
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

        async function downloadDirectImage(imageUrl, filename) {
            try {
                showToast('Downloading thumbnail... 🖼️');
                const res = await fetch(imageUrl);
                const blob = await res.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);
                showToast('Thumbnail saved! ✅');
            } catch (e) {
                const a = document.createElement('a');
                a.href = imageUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        }

        if (dlMaxResLink) {
            dlMaxResLink.onclick = (e) => {
                e.preventDefault();
                downloadDirectImage(maxResUrl, `YouTube_Thumbnail_1080p_${videoId}.jpg`);
            };
        }
        if (dlHqLink) {
            dlHqLink.onclick = (e) => {
                e.preventDefault();
                downloadDirectImage(hqUrl, `YouTube_Thumbnail_HQ_${videoId}.jpg`);
            };
        }

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
    // TOOL 2C: Keyword & Tag Extractor Engine (Video & Channel SEO)
    // ------------------------------------------------------------------
    const keywordExtractorInput = document.getElementById('keywordExtractorInput');
    const extractKeywordsBtn = document.getElementById('extractKeywordsBtn');
    const keywordLoader = document.getElementById('keywordLoader');
    const keywordResultsArea = document.getElementById('keywordResultsArea');
    const keywordErrorAlert = document.getElementById('keywordErrorAlert');
    const keywordErrorTitle = document.getElementById('keywordErrorTitle');
    const keywordErrorMessage = document.getElementById('keywordErrorMessage');
    const keywordEntityCard = document.getElementById('keywordEntityCard');
    const keywordEntityImage = document.getElementById('keywordEntityImage');
    const keywordEntityBadge = document.getElementById('keywordEntityBadge');
    const keywordEntityTitle = document.getElementById('keywordEntityTitle');
    const keywordEntitySub = document.getElementById('keywordEntitySub');
    const keywordCountNum = document.getElementById('keywordCountNum');
    const keywordTagsCloud = document.getElementById('keywordTagsCloud');
    const keywordEmptyState = document.getElementById('keywordEmptyState');
    const keywordEmptyMessage = document.getElementById('keywordEmptyMessage');
    const copyAllKeywordsBtn = document.getElementById('copyAllKeywordsBtn');

    let currentExtractedKeywords = [];

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function showKeywordError(title, message) {
        if (keywordErrorAlert) {
            if (keywordErrorTitle) keywordErrorTitle.textContent = title || 'Extraction Failed';
            if (keywordErrorMessage) keywordErrorMessage.textContent = message || 'An error occurred while fetching tags.';
            keywordErrorAlert.classList.remove('hidden');
        }
        showToast(message || title, 'warning');
    }

    function hideKeywordError() {
        if (keywordErrorAlert) {
            keywordErrorAlert.classList.add('hidden');
        }
    }

    if (extractKeywordsBtn) {
        extractKeywordsBtn.addEventListener('click', processKeywordExtraction);
    }

    if (keywordExtractorInput) {
        keywordExtractorInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                processKeywordExtraction();
            }
        });
    }

    async function processKeywordExtraction() {
        const input = (keywordExtractorInput ? keywordExtractorInput.value : '').trim();
        if (!input) {
            showToast('Please paste a YouTube video link or channel handle! 🏷️', 'warning');
            if (keywordExtractorInput) keywordExtractorInput.focus();
            return;
        }

        hideKeywordError();
        if (keywordResultsArea) keywordResultsArea.classList.add('hidden');
        if (keywordEmptyState) keywordEmptyState.classList.add('hidden');
        if (keywordLoader) keywordLoader.classList.remove('hidden');

        try {
            const endpoint = getBackendUrl(`/api/keywords?url=${encodeURIComponent(input)}`);
            const response = await fetch(endpoint);
            const data = await response.json();

            if (keywordLoader) keywordLoader.classList.add('hidden');

            if (!response.ok || data.error) {
                const errMsg = data.error || `Error fetching tags (Status ${response.status})`;
                showKeywordError('Extraction Failed', errMsg);
                return;
            }

            // Populate Entity Header Card
            if (data.type === 'channel') {
                if (keywordEntityBadge) {
                    keywordEntityBadge.textContent = 'YouTube Channel';
                    keywordEntityBadge.style.background = 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)';
                }
                if (keywordEntityTitle) keywordEntityTitle.textContent = data.channelName || 'YouTube Channel';
                if (keywordEntitySub) {
                    keywordEntitySub.innerHTML = `<span>👤 Channel</span> ${data.formattedSubscribers ? `<span>• 👥 ${data.formattedSubscribers}</span>` : ''}`;
                }
                if (keywordEntityImage) {
                    keywordEntityImage.src = data.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                    keywordEntityImage.classList.add('is-avatar');
                }
            } else {
                if (keywordEntityBadge) {
                    keywordEntityBadge.textContent = 'YouTube Video';
                    keywordEntityBadge.style.background = 'var(--primary-gradient)';
                }
                if (keywordEntityTitle) keywordEntityTitle.textContent = data.title || 'YouTube Video';
                if (keywordEntitySub) {
                    keywordEntitySub.innerHTML = `<span>📺 ${data.channelName || 'YouTube Creator'}</span>`;
                }
                if (keywordEntityImage) {
                    keywordEntityImage.src = data.thumbnail || '';
                    keywordEntityImage.classList.remove('is-avatar');
                }
            }

            currentExtractedKeywords = Array.isArray(data.tags) ? data.tags : [];
            if (keywordCountNum) keywordCountNum.textContent = currentExtractedKeywords.length;

            if (currentExtractedKeywords.length === 0) {
                if (keywordTagsCloud) keywordTagsCloud.innerHTML = '';
                if (keywordEmptyMessage) {
                    keywordEmptyMessage.textContent = `This ${data.type === 'channel' ? 'channel' : 'video'} hasn't set any tags.`;
                }
                if (keywordEmptyState) keywordEmptyState.classList.remove('hidden');
            } else {
                if (keywordEmptyState) keywordEmptyState.classList.add('hidden');
                if (keywordTagsCloud) {
                    keywordTagsCloud.innerHTML = currentExtractedKeywords.map((tag, idx) => `
                        <span class="tag-pill-interactive" style="--tag-index: ${idx}" data-tag="${escapeHtml(tag)}">
                            <span class="pill-tag-text">#${escapeHtml(tag)}</span>
                            <span class="pill-copy-btn" title="Copy tag">Copy 📋</span>
                        </span>
                    `).join('');

                    // Attach 1-click copy handler to each tag pill
                    keywordTagsCloud.querySelectorAll('.tag-pill-interactive').forEach(pill => {
                        pill.addEventListener('click', () => {
                            const tagText = pill.getAttribute('data-tag');
                            if (tagText) {
                                navigator.clipboard.writeText(tagText);
                                const copyBtn = pill.querySelector('.pill-copy-btn');
                                if (copyBtn) copyBtn.textContent = 'Copied! ✓';
                                setTimeout(() => {
                                    if (copyBtn) copyBtn.textContent = 'Copy 📋';
                                }, 1500);
                                showToast(`Copied tag: "${tagText}" 📋`);
                            }
                        });
                    });
                }
            }

            if (keywordResultsArea) keywordResultsArea.classList.remove('hidden');
            showToast(`Extracted ${currentExtractedKeywords.length} ${data.type === 'channel' ? 'keywords' : 'tags'}! 🏷️`);

        } catch (err) {
            if (keywordLoader) keywordLoader.classList.add('hidden');
            showKeywordError('Connection Error', 'Failed to reach backend server. Please verify the server is running.');
            console.error('Keyword extraction error:', err);
        }
    }

    if (copyAllKeywordsBtn) {
        copyAllKeywordsBtn.addEventListener('click', () => {
            if (!currentExtractedKeywords || currentExtractedKeywords.length === 0) {
                showToast('No tags to copy!', 'warning');
                return;
            }
            const csv = currentExtractedKeywords.join(', ');
            navigator.clipboard.writeText(csv);
            showToast(`Copied all ${currentExtractedKeywords.length} tags as CSV! 📋`);
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
    // TOOL 6: Video Aspect Ratio Changer Engine
    // ------------------------------------------------------------------
    const videoDropzone = document.getElementById('videoDropzone');
    const videoFileInput = document.getElementById('videoFileInput');
    const videoPreviewArea = document.getElementById('videoPreviewArea');
    const videoDropError = document.getElementById('videoDropError');
    const videoDropErrorTitle = document.getElementById('videoDropErrorTitle');
    const videoDropErrorMsg = document.getElementById('videoDropErrorMsg');
    const closeVideoDropError = document.getElementById('closeVideoDropError');
    
    const videoFileName = document.getElementById('videoFileName');
    const videoFileSize = document.getElementById('videoFileSize');
    const videoFileFormatBadge = document.getElementById('videoFileFormatBadge');
    const videoFileDimensions = document.getElementById('videoFileDimensions');
    const videoFileDuration = document.getElementById('videoFileDuration');
    const changeVideoBtn = document.getElementById('changeVideoBtn');

    const videoAspectCanvasWrap = document.getElementById('videoAspectCanvasWrap');
    const videoPreviewPlayer = document.getElementById('videoPreviewPlayer');
    const videoAspectBadge = document.getElementById('videoAspectBadge');
    const videoAspectRatioGroup = document.getElementById('videoAspectRatioGroup');
    const videoFitModeGroup = document.getElementById('videoFitModeGroup');
    const videoBgColorBox = document.getElementById('videoBgColorBox');
    const convertVideoBtn = document.getElementById('convertVideoBtn') || document.getElementById('processVideoAspectBtn');
    const processVideoAspectBtn = convertVideoBtn;
    const videoExportFormatSelect = document.getElementById('videoExportFormatSelect');
    const videoProcessBox = document.getElementById('videoProcessBox');
    const videoProcessBar = document.getElementById('videoProcessBar');
    const videoProcessStatus = document.getElementById('videoProcessStatus');

    const videoProcessError = document.getElementById('videoProcessError');
    const videoProcessErrorTitle = document.getElementById('videoProcessErrorTitle');
    const videoProcessErrorMsg = document.getElementById('videoProcessErrorMsg');
    const closeVideoProcessError = document.getElementById('closeVideoProcessError');

    // 100MB File Size Limit for In-Browser FFmpeg.wasm Stability
    const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
    const MAX_VIDEO_SIZE_LABEL = '100MB';

    const videoResultBox = document.getElementById('videoResultBox');
    const videoResultPlayer = document.getElementById('videoResultPlayer');
    const videoResultCanvasWrap = document.getElementById('videoResultCanvasWrap');
    const videoResultAspectBadge = document.getElementById('videoResultAspectBadge');
    const videoResultModeBadge = document.getElementById('videoResultModeBadge');
    const videoResultResolutionBadge = document.getElementById('videoResultResolutionBadge');
    const videoResultSizeBadge = document.getElementById('videoResultSizeBadge');
    const downloadConvertedVideoBtn = document.getElementById('downloadConvertedVideoBtn');
    const resultFormatBadge = document.getElementById('resultFormatBadge');
    const resultDownloadTitle = document.getElementById('resultDownloadTitle');
    const resultDownloadSize = document.getElementById('resultDownloadSize');
    const directDownloadBtn = document.getElementById('directDownloadBtn');

    let selectedVideoRatio = '16:9';
    let selectedVideoMode = 'pad'; // 'crop' or 'pad'
    let selectedVideoFit = 'contain'; // 'contain' for pad, 'cover' for crop
    let selectedVideoBgColor = '#000000';

    const videoRatioLabels = {
        '16:9': '16:9 Landscape (1920x1080)',
        '9:16': '9:16 Vertical (1080x1920)',
        '1:1': '1:1 Square (1080x1080)',
        '4:5': '4:5 Portrait (1080x1350)'
    };

    // Format file sizes into human-readable strings
    function formatFileSize(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Format video duration seconds into MM:SS
    function formatTimeDuration(seconds) {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Dismiss error alert
    if (closeVideoDropError) {
        closeVideoDropError.addEventListener('click', () => {
            if (videoDropError) videoDropError.classList.add('hidden');
        });
    }

    // Dismiss conversion process error alert
    if (closeVideoProcessError) {
        closeVideoProcessError.addEventListener('click', () => {
            if (videoProcessError) videoProcessError.classList.add('hidden');
        });
    }

    // Show error alert with message
    function showVideoDropError(title, message) {
        if (!videoDropError) return;
        if (videoDropErrorTitle) videoDropErrorTitle.textContent = title;
        if (videoDropErrorMsg) videoDropErrorMsg.textContent = message;
        videoDropError.classList.remove('hidden');

        // Shake dropzone
        if (videoDropzone) {
            videoDropzone.style.animation = 'none';
            void videoDropzone.offsetWidth; // trigger reflow
            videoDropzone.style.animation = 'shake 0.4s ease';
            setTimeout(() => { videoDropzone.style.animation = ''; }, 450);
        }

        showToast(message, 'warning');
    }

    // Show conversion process error alert with message
    function showVideoProcessError(title, message) {
        if (!videoProcessError) return;
        if (videoProcessErrorTitle) videoProcessErrorTitle.textContent = title;
        if (videoProcessErrorMsg) videoProcessErrorMsg.textContent = message;
        videoProcessError.classList.remove('hidden');
        videoProcessError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Validation function for dropped or selected files
    function isAllowedVideoFile(file) {
        if (!file) return false;
        const validExtensions = ['.mp4', '.mov', '.webm'];
        const name = (file.name || '').toLowerCase();
        const hasValidExt = validExtensions.some(ext => name.endsWith(ext));
        const hasValidMime = file.type ? (
            file.type === 'video/mp4' ||
            file.type === 'video/quicktime' ||
            file.type === 'video/webm' ||
            file.type.startsWith('video/')
        ) : false;

        return hasValidExt || hasValidMime;
    }

    // Load and process valid video file
    function handleSelectedVideoFile(file) {
        if (!file) return;

        // Strict validation: Only accept MP4, MOV, and WebM video files
        if (!isAllowedVideoFile(file)) {
            const fileName = file.name || 'Unknown file';
            const fileExt = fileName.includes('.') ? fileName.split('.').pop().toUpperCase() : 'UNKNOWN';
            showVideoDropError(
                'Invalid File Type',
                `"${fileName}" (${fileExt}) is not a supported video file. Please upload an MP4, MOV, or WebM video.`
            );
            if (videoFileInput) videoFileInput.value = '';
            return;
        }

        // File size limit validation: Max 100MB
        if (file.size > MAX_VIDEO_SIZE_BYTES) {
            const fileName = file.name || 'Selected file';
            const formattedSize = formatFileSize(file.size);
            showVideoDropError(
                'File Size Exceeded (Max 100MB)',
                `"${fileName}" is ${formattedSize}, which exceeds the 100MB browser limit. Since FFmpeg.wasm operates client-side inside browser memory, very large files can crash your tab. Please select a video file under 100MB.`
            );
            if (videoFileInput) videoFileInput.value = '';
            return;
        }

        // Hide any previous error
        if (videoDropError) videoDropError.classList.add('hidden');
        if (videoProcessError) videoProcessError.classList.add('hidden');

        // Hide previous conversion result and revoke blob url
        if (videoResultBox) videoResultBox.classList.add('hidden');
        if (videoResultPlayer) {
            videoResultPlayer.pause();
            videoResultPlayer.removeAttribute('src');
            videoResultPlayer.load();
        }
        if (convertedVideoUrl) {
            URL.revokeObjectURL(convertedVideoUrl);
            convertedVideoUrl = null;
        }
        convertedVideoBlob = null;

        currentVideoFile = file;

        // Cleanup previous object URL
        if (currentVideoUrl) {
            URL.revokeObjectURL(currentVideoUrl);
        }

        currentVideoUrl = URL.createObjectURL(file);

        // Update file info display
        if (videoFileName) videoFileName.textContent = file.name;
        if (videoFileSize) videoFileSize.textContent = formatFileSize(file.size);

        // Determine extension badge
        const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
        const ext = extMatch ? extMatch[1].toUpperCase() : 'VIDEO';
        if (videoFileFormatBadge) videoFileFormatBadge.textContent = ext;

        if (videoFileDimensions) videoFileDimensions.textContent = 'Loading dimensions...';
        if (videoFileDuration) videoFileDuration.textContent = '--:--';

        // Load into HTML5 video player with standard play/pause controls via local object URL
        if (videoPreviewPlayer) {
            videoPreviewPlayer.src = currentVideoUrl;
            videoPreviewPlayer.load();
            videoPreviewPlayer.onloadedmetadata = () => {
                const width = videoPreviewPlayer.videoWidth;
                const height = videoPreviewPlayer.videoHeight;
                const dur = videoPreviewPlayer.duration;

                if (videoFileDimensions) videoFileDimensions.textContent = `${width} x ${height} px`;
                if (videoFileDuration) videoFileDuration.textContent = formatTimeDuration(dur);
            };
        }

        // Hide dropzone, show preview area
        if (videoDropzone) videoDropzone.classList.add('hidden');
        if (videoPreviewArea) videoPreviewArea.classList.remove('hidden');

        showToast(`Video loaded: ${file.name} (${formatFileSize(file.size)}) 🎬`, 'info');
    }

    // Click on dropzone to trigger native file dialog
    if (videoDropzone && videoFileInput) {
        videoDropzone.addEventListener('click', (e) => {
            if (e.target.closest('input')) return;
            videoFileInput.click();
        });

        videoFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleSelectedVideoFile(e.target.files[0]);
            }
        });

        // Drag and Drop Events
        ['dragenter', 'dragover'].forEach(evtName => {
            videoDropzone.addEventListener(evtName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                videoDropzone.classList.add('dragover');
            });
        });

        ['dragleave', 'dragend'].forEach(evtName => {
            videoDropzone.addEventListener(evtName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                videoDropzone.classList.remove('dragover');
            });
        });

        videoDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            videoDropzone.classList.remove('dragover');

            const dt = e.dataTransfer;
            if (dt && dt.files && dt.files.length > 0) {
                handleSelectedVideoFile(dt.files[0]);
            }
        });
    }

    // Change / Upload New Video Button
    if (changeVideoBtn && videoFileInput) {
        changeVideoBtn.addEventListener('click', () => {
            videoFileInput.click();
        });
    }

    // Function to apply and visually highlight aspect ratio selection
    function setVideoAspectRatio(ratio) {
        selectedVideoRatio = ratio;

        // Visually highlight the selected ratio button in the UI row
        if (videoAspectRatioGroup) {
            const aspectButtons = videoAspectRatioGroup.querySelectorAll('.video-ratio-btn, .aspect-btn');
            aspectButtons.forEach(btn => {
                if (btn.dataset.ratio === ratio) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Apply dynamic aspect ratio to canvas wrapper
        if (videoAspectCanvasWrap) {
            const ratioCSS = ratio.replace(':', ' / ');
            videoAspectCanvasWrap.style.aspectRatio = ratioCSS;
        }

        // Update instant preview badge
        if (videoAspectBadge) {
            videoAspectBadge.textContent = videoRatioLabels[ratio] || `${ratio} Aspect Preview`;
        }

        showToast(`Selected aspect ratio: ${ratio} 📐`);
    }

    // Function to apply and visually highlight framing mode (Crop vs Pad)
    function setVideoFramingMode(mode) {
        selectedVideoMode = mode;
        selectedVideoFit = (mode === 'crop') ? 'cover' : 'contain';

        // Visually highlight the selected mode button in the toggle group
        if (videoFitModeGroup) {
            const modeButtons = videoFitModeGroup.querySelectorAll('.video-mode-btn, .fit-btn');
            modeButtons.forEach(btn => {
                const btnMode = btn.dataset.mode || (btn.dataset.fit === 'cover' ? 'crop' : 'pad');
                if (btnMode === mode) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Update video preview element object-fit
        if (videoPreviewPlayer) {
            videoPreviewPlayer.style.objectFit = selectedVideoFit;
        }

        // Show/hide letterbox background color picker
        if (videoBgColorBox) {
            if (selectedVideoMode === 'pad') {
                videoBgColorBox.classList.remove('hidden');
            } else {
                videoBgColorBox.classList.add('hidden');
            }
        }

        showToast(`Framing mode: ${selectedVideoMode === 'crop' ? 'Crop (Fill Canvas) ✂️' : 'Pad (Letterbox Bars) ⬛'}`);
    }

    // Aspect Ratio Selection Buttons (16:9, 9:16, 1:1, 4:5)
    if (videoAspectRatioGroup) {
        const aspectButtons = videoAspectRatioGroup.querySelectorAll('.video-ratio-btn, .aspect-btn');
        aspectButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const ratio = btn.dataset.ratio || '16:9';
                setVideoAspectRatio(ratio);
            });
        });
    }

    // Framing Mode Toggle Buttons ('Crop' vs 'Pad')
    if (videoFitModeGroup) {
        const modeButtons = videoFitModeGroup.querySelectorAll('.video-mode-btn, .fit-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode || (btn.dataset.fit === 'cover' ? 'crop' : 'pad');
                setVideoFramingMode(mode);
            });
        });
    }

    // Background Padding Color Radios
    const videoBgColorRadios = document.querySelectorAll('input[name="videoBgColor"]');
    videoBgColorRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedVideoBgColor = e.target.value;
            if (videoAspectCanvasWrap) {
                videoAspectCanvasWrap.style.backgroundColor = selectedVideoBgColor;
            }
        });
    });

    // Process / Transcode Video Aspect Ratio with FFmpeg.wasm
    // Convert / Transcode Video Aspect Ratio with FFmpeg.wasm
    if (convertVideoBtn) {
        convertVideoBtn.addEventListener('click', async () => {
            // Dismiss previous error alert
            if (videoProcessError) videoProcessError.classList.add('hidden');

            if (!currentVideoFile) {
                showToast('Please upload a video file first! 🎬', 'warning');
                return;
            }

            // Guard against oversized file (>100MB)
            if (currentVideoFile.size > MAX_VIDEO_SIZE_BYTES) {
                const formattedSize = formatFileSize(currentVideoFile.size);
                showVideoProcessError(
                    'File Size Exceeded (Max 100MB)',
                    `This video is ${formattedSize}, which exceeds the 100MB browser limit. Very large files can crash the browser tab during processing. Please select a video under 100MB.`
                );
                return;
            }

            // Disable button while processing
            convertVideoBtn.disabled = true;
            convertVideoBtn.innerHTML = '⏳ Converting Video...';

            if (videoProcessBox) videoProcessBox.classList.remove('hidden');
            if (videoProcessBar) videoProcessBar.style.width = '5%';
            if (videoProcessStatus) videoProcessStatus.textContent = 'Initializing FFmpeg.wasm engine...';

            let ffmpeg = null;
            let progressHandler = null;
            let logHandler = null;
            let lastFfmpegLog = '';
            let inputName = null;
            let outputName = null;

            try {
                // Ensure FFmpeg is loaded with timeout safeguard to prevent silent freeze
                const loadPromise = window.loadFFmpeg();
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('FFmpeg initialization timed out (60s). Please check your internet connection and verify WebAssembly support.')), 60000)
                );
                ffmpeg = await Promise.race([loadPromise, timeoutPromise]);

                if (!ffmpeg) {
                    throw new Error('FFmpeg instance could not be initialized.');
                }

                // Attach log listener to capture engine diagnostics
                logHandler = ({ type, message }) => {
                    if (message) {
                        lastFfmpegLog = message;
                        if (type === 'error' || message.toLowerCase().includes('error')) {
                            console.warn('[FFmpeg Log Error]:', message);
                        }
                    }
                };
                if (typeof ffmpeg.on === 'function') {
                    ffmpeg.on('log', logHandler);
                }

                // Attach progress listener using ffmpeg's built-in progress event
                progressHandler = ({ progress, time }) => {
                    const pct = Math.min(Math.max(Math.round(progress * 100), 0), 100);
                    if (videoProcessBar) {
                        videoProcessBar.style.width = `${pct}%`;
                    }
                    if (videoProcessStatus) {
                        videoProcessStatus.textContent = `Converting video with FFmpeg... ${pct}%`;
                    }
                };
                if (typeof ffmpeg.on === 'function') {
                    ffmpeg.on('progress', progressHandler);
                }

                if (videoProcessBar) videoProcessBar.style.width = '15%';
                if (videoProcessStatus) videoProcessStatus.textContent = 'Loading video file into memory...';

                const inputExt = (currentVideoFile.name.split('.').pop() || 'mp4').toLowerCase();
                inputName = `input_${Date.now()}.${inputExt}`;
                const outFormat = videoExportFormatSelect ? videoExportFormatSelect.value : 'mp4';
                outputName = `output_${Date.now()}.${outFormat}`;

                let fileData;
                try {
                    if (window.FFmpegUtil && typeof window.FFmpegUtil.fetchFile === 'function') {
                        fileData = await window.FFmpegUtil.fetchFile(currentVideoFile);
                    } else {
                        fileData = new Uint8Array(await currentVideoFile.arrayBuffer());
                    }
                } catch (readErr) {
                    throw new Error(`Failed to load video file into memory: ${readErr.message || 'File access error or browser memory exhausted'}`);
                }

                try {
                    await ffmpeg.writeFile(inputName, fileData);
                } catch (writeErr) {
                    throw new Error(`Failed to write video into virtual filesystem: ${writeErr.message || 'Virtual filesystem memory error'}`);
                }

                if (videoProcessBar) videoProcessBar.style.width = '25%';
                if (videoProcessStatus) videoProcessStatus.textContent = 'Configuring aspect ratio filter...';

                // Target dimensions based on selected ratio
                const ratioMap = {
                    '16:9': [1920, 1080],
                    '9:16': [1080, 1920],
                    '1:1': [1080, 1080],
                    '4:5': [1080, 1350]
                };
                const [targetW, targetH] = ratioMap[selectedVideoRatio] || [1920, 1080];

                // Build filter string: crop filter for Crop mode, pad filter (with black background) for Pad mode
                let filterStr;
                if (selectedVideoMode === 'crop') {
                    // Use ffmpeg's crop filter for Crop mode (scale to fill target ratio, then crop excess)
                    filterStr = `scale=${targetW}:${targetH}:force_original_aspect_ratio=increase,crop=${targetW}:${targetH}`;
                } else {
                    // Use ffmpeg's pad filter (with a black background) for Pad mode
                    filterStr = `scale=${targetW}:${targetH}:force_original_aspect_ratio=decrease,pad=${targetW}:${targetH}:(ow-iw)/2:(oh-ih)/2:color=black`;
                }

                console.log(`[FFmpeg Convert] Starting transcode ratio=${selectedVideoRatio} mode=${selectedVideoMode} filter="${filterStr}"`);

                // Execute transcode with ultra-fast preset
                const exitCode = await ffmpeg.exec([
                    '-i', inputName,
                    '-vf', filterStr,
                    '-c:v', 'libx264',
                    '-preset', 'ultrafast',
                    '-crf', '26',
                    '-c:a', 'copy',
                    outputName
                ]);

                if (exitCode !== 0 && typeof exitCode === 'number') {
                    const logSnippet = lastFfmpegLog ? ` (Details: ${lastFfmpegLog.slice(0, 140)})` : '';
                    throw new Error(`FFmpeg processing failed with exit code ${exitCode}${logSnippet}. The video format or codec might not be supported.`);
                }

                if (videoProcessBar) videoProcessBar.style.width = '100%';
                if (videoProcessStatus) videoProcessStatus.textContent = 'Conversion complete! 100%';

                const outputData = await ffmpeg.readFile(outputName);
                if (!outputData || outputData.byteLength === 0) {
                    throw new Error('Converted video output file was empty or could not be generated.');
                }

                const mimeType = outFormat === 'webm' ? 'video/webm' : 'video/mp4';
                const resultBlob = new Blob([outputData.buffer], { type: mimeType });

                // Revoke old converted URL if present
                if (convertedVideoUrl) {
                    URL.revokeObjectURL(convertedVideoUrl);
                    convertedVideoUrl = null;
                }

                convertedVideoBlob = resultBlob;
                convertedVideoUrl = URL.createObjectURL(resultBlob);
                convertedVideoFileName = `converted-video.${outFormat}`;

                // Display in second preview player
                if (videoResultPlayer) {
                    videoResultPlayer.src = convertedVideoUrl;
                    videoResultPlayer.load();
                }

                // Match canvas aspect ratio and background styling
                if (videoResultCanvasWrap) {
                    const ratioCssMap = {
                        '16:9': '16 / 9',
                        '9:16': '9 / 16',
                        '1:1': '1 / 1',
                        '4:5': '4 / 5'
                    };
                    videoResultCanvasWrap.style.aspectRatio = ratioCssMap[selectedVideoRatio] || '16 / 9';
                    videoResultCanvasWrap.style.backgroundColor = selectedVideoMode === 'pad' ? selectedVideoBgColor : '#000000';
                }

                // Update result badges and download labels
                const [targetWRes, targetHRes] = ratioMap[selectedVideoRatio] || [1920, 1080];
                if (videoResultAspectBadge) {
                    videoResultAspectBadge.textContent = `${selectedVideoRatio} ${selectedVideoRatio === '16:9' ? 'Landscape' : selectedVideoRatio === '9:16' ? 'Vertical' : selectedVideoRatio === '1:1' ? 'Square' : 'Portrait'}`;
                }
                if (videoResultModeBadge) {
                    videoResultModeBadge.textContent = selectedVideoMode === 'crop' ? 'Framing: Crop' : 'Framing: Pad';
                }
                if (videoResultResolutionBadge) {
                    videoResultResolutionBadge.textContent = `${targetWRes}x${targetHRes}`;
                }
                if (videoResultSizeBadge) {
                    videoResultSizeBadge.textContent = formatFileSize(resultBlob.size);
                }
                if (resultFormatBadge) {
                    resultFormatBadge.textContent = outFormat.toUpperCase();
                }
                if (resultDownloadTitle) {
                    resultDownloadTitle.textContent = convertedVideoFileName;
                }
                if (resultDownloadSize) {
                    resultDownloadSize.textContent = formatFileSize(resultBlob.size);
                }
                if (directDownloadBtn) {
                    directDownloadBtn.textContent = `⬇️ Download ${convertedVideoFileName}`;
                }

                // Show the second preview player & download area
                if (videoResultBox) {
                    videoResultBox.classList.remove('hidden');
                    videoResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                showToast('Video converted successfully! Preview player & Download ready 🎉', 'success');

                // Cleanup virtual files from ffmpeg FS
                try {
                    await ffmpeg.deleteFile(inputName);
                    await ffmpeg.deleteFile(outputName);
                } catch (_) {}

                setTimeout(() => {
                    if (videoProcessBox) videoProcessBox.classList.add('hidden');
                }, 3000);

            } catch (procErr) {
                console.error('[FFmpeg Aspect Ratio] Processing error:', procErr);

                // Format a clear, friendly error message instead of freezing silently
                let friendlyMsg = procErr.message || 'An unexpected error occurred during conversion.';
                const lowerErr = (friendlyMsg + ' ' + (lastFfmpegLog || '')).toLowerCase();

                if (lowerErr.includes('out of memory') || lowerErr.includes('oom') || lowerErr.includes('memory') || lowerErr.includes('heap')) {
                    friendlyMsg = 'The browser ran out of memory while converting this video. In-browser WebAssembly memory is limited—please try a shorter clip or smaller video under 100MB.';
                } else if (lowerErr.includes('codec') || lowerErr.includes('unsupported') || lowerErr.includes('format')) {
                    friendlyMsg = 'Unsupported video codec or corrupted video stream. Please ensure your video uses standard H.264/AAC or VP8/VP9 codecs.';
                } else if (lowerErr.includes('timed out') || lowerErr.includes('timeout')) {
                    friendlyMsg = 'Conversion or FFmpeg initialization timed out. Please check your network connection and reload the page.';
                } else if (lowerErr.includes('abort') || lowerErr.includes('killed')) {
                    friendlyMsg = 'The video conversion process was interrupted or aborted by the browser.';
                }

                // Show friendly inline error alert
                showVideoProcessError('Conversion Failed', friendlyMsg);
                showToast(`Conversion failed: ${friendlyMsg}`, 'error');

                if (videoProcessBox) videoProcessBox.classList.add('hidden');

                // Cleanup virtual files if possible
                try {
                    if (ffmpeg && inputName) await ffmpeg.deleteFile(inputName);
                    if (ffmpeg && outputName) await ffmpeg.deleteFile(outputName);
                } catch (_) {}

            } finally {
                // Detach listeners
                try {
                    if (ffmpeg) {
                        if (progressHandler && typeof ffmpeg.off === 'function') {
                            ffmpeg.off('progress', progressHandler);
                        }
                        if (logHandler && typeof ffmpeg.off === 'function') {
                            ffmpeg.off('log', logHandler);
                        }
                    }
                } catch (_) {}

                // Always re-enable button to guarantee page never freezes silently
                convertVideoBtn.disabled = false;
                convertVideoBtn.innerHTML = '⚡ Convert Video';
            }
        });
    }

    // Direct Download Action for Converted Video (via local Blob URL)
    function downloadConvertedVideo() {
        if (!convertedVideoUrl || !convertedVideoBlob) {
            showToast('No converted video available to download!', 'warning');
            return;
        }

        const a = document.createElement('a');
        a.href = convertedVideoUrl;
        a.download = convertedVideoFileName || 'converted-video.mp4';
        document.body.appendChild(a);
        a.click();
        a.remove();

        showToast(`Downloading ${convertedVideoFileName}... 💾`, 'success');
    }

    if (downloadConvertedVideoBtn) {
        downloadConvertedVideoBtn.addEventListener('click', downloadConvertedVideo);
    }
    if (directDownloadBtn) {
        directDownloadBtn.addEventListener('click', downloadConvertedVideo);
    }

    // ------------------------------------------------------------------
    // FFmpeg Engine Integration Log
    // ------------------------------------------------------------------
    console.log('[OmniTools] FFmpeg.wasm engine initialized. Call window.loadFFmpeg() or window.OmniFFmpeg.load() to load the wasm core.');
});

// ==================================================================
// FFmpeg.wasm Engine Integration (@ffmpeg/ffmpeg & @ffmpeg/util)
// Plain browser environment compatible (no bundler assumed)
// ==================================================================

let _ffmpegInstance = null;
let _ffmpegLoadingPromise = null;

/**
 * Dynamically resolves and loads @ffmpeg/ffmpeg and @ffmpeg/util
 * Works in vanilla browser with <script type="importmap">, direct local path, or CDN fallback.
 */
async function loadFFmpegModules() {
    let FFmpeg = null;
    let FFmpegUtil = null;

    // 1. Attempt bare specifier import (via importmap in index.html)
    try {
        const ffmpegMod = await import('@ffmpeg/ffmpeg');
        const utilMod = await import('@ffmpeg/util');
        FFmpeg = ffmpegMod.FFmpeg;
        FFmpegUtil = utilMod;
    } catch (importMapErr) {
        console.warn('[FFmpeg] Import map resolution skipped or unavailable, trying local node_modules path:', importMapErr?.message);
    }

    // 2. Fallback to direct relative path within local server's node_modules
    if (!FFmpeg || !FFmpegUtil) {
        try {
            const ffmpegMod = await import('./node_modules/@ffmpeg/ffmpeg/dist/esm/index.js');
            const utilMod = await import('./node_modules/@ffmpeg/util/dist/esm/index.js');
            FFmpeg = ffmpegMod.FFmpeg;
            FFmpegUtil = utilMod;
        } catch (localPathErr) {
            console.warn('[FFmpeg] Local node_modules relative import failed, falling back to CDN:', localPathErr?.message);
        }
    }

    // 3. Fallback to high-availability CDN (unpkg)
    if (!FFmpeg || !FFmpegUtil) {
        try {
            const ffmpegMod = await import('https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js');
            const utilMod = await import('https://unpkg.com/@ffmpeg/util@0.12.2/dist/esm/index.js');
            FFmpeg = ffmpegMod.FFmpeg;
            FFmpegUtil = utilMod;
        } catch (cdnErr) {
            console.error('[FFmpeg] Failed to load FFmpeg modules from all sources:', cdnErr);
            throw new Error('Unable to load FFmpeg modules: ' + cdnErr.message);
        }
    }

    return { FFmpeg, FFmpegUtil };
}

/**
 * Loads and initializes the ffmpeg.wasm instance with wasm core files.
 * Correctly resolves wasm core files on the local server.
 *
 * @param {Object} [options]
 * @param {Function} [options.onLog] - Callback for ffmpeg log messages ({ type, message })
 * @param {Function} [options.onProgress] - Callback for transcode progress ({ progress, time })
 * @returns {Promise<FFmpeg>}
 */
async function loadFFmpeg(options = {}) {
    if (_ffmpegInstance && _ffmpegInstance.loaded) {
        if (options.onLog) _ffmpegInstance.on('log', options.onLog);
        if (options.onProgress) _ffmpegInstance.on('progress', options.onProgress);
        return _ffmpegInstance;
    }

    if (_ffmpegLoadingPromise) {
        return _ffmpegLoadingPromise;
    }

    _ffmpegLoadingPromise = (async () => {
        const { FFmpeg, FFmpegUtil } = await loadFFmpegModules();
        const ffmpeg = new FFmpeg();

        if (options.onLog) ffmpeg.on('log', options.onLog);
        if (options.onProgress) ffmpeg.on('progress', options.onProgress);

        // Core URLs: Resolve local server files first, fallback to CDN
        const localCoreBase = new URL('./node_modules/@ffmpeg/core/dist/esm', window.location.href).href;
        const cdnCoreBase = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

        let coreURL = `${localCoreBase}/ffmpeg-core.js`;
        let wasmURL = `${localCoreBase}/ffmpeg-core.wasm`;

        try {
            // Verify local server serves the core wasm file
            const check = await fetch(coreURL, { method: 'HEAD' });
            if (!check.ok) {
                throw new Error(`Local core file check returned status ${check.status}`);
            }
            console.log('[FFmpeg] Loading wasm core from local server:', localCoreBase);
        } catch (netErr) {
            console.warn('[FFmpeg] Local wasm core not accessible, switching to CDN core:', netErr.message);
            coreURL = `${cdnCoreBase}/ffmpeg-core.js`;
            wasmURL = `${cdnCoreBase}/ffmpeg-core.wasm`;
        }

        // Load FFmpeg WebAssembly core inside worker
        await ffmpeg.load({
            coreURL,
            wasmURL,
        });

        console.log('[FFmpeg] ffmpeg.wasm core loaded successfully! Ready for processing.');
        _ffmpegInstance = ffmpeg;

        // Expose to window for app-wide and console access
        window.ffmpeg = ffmpeg;
        window.FFmpeg = FFmpeg;
        window.FFmpegUtil = FFmpegUtil;

        return ffmpeg;
    })();

    return _ffmpegLoadingPromise;
}

// Expose public API
window.loadFFmpeg = loadFFmpeg;
window.getFFmpeg = () => _ffmpegInstance;
window.OmniFFmpeg = {
    load: loadFFmpeg,
    getInstance: () => _ffmpegInstance,
    loadModules: loadFFmpegModules,
};

