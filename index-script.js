const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
let hasOpened = false;

const closeSidebar = () => {
sidebar.classList.remove('open');
overlay.classList.remove('show');
hamburger.classList.remove('open');
};

hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('open');

    if (!hasOpened) {
        hamburger.classList.remove('rainbow-border');
        localStorage.setItem('openedHamburger', 'true');
        hasOpened = true;
    }
});


overlay.addEventListener('click', () => {
    closeSidebar();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

(function() {
    let W, H, SPACING, GRID_OFF, METACOUNT;
    let gridLayer, metaLayer, metas = [];
    let resizeTimeout;
    let animationFrame;

    function initBubbleBg() {
        gridLayer = document.getElementById('grid-layer');
        metaLayer = document.getElementById('meta-layer');
        W = window.innerWidth;
        H = window.innerHeight;
        SPACING = 20;
        GRID_OFF = SPACING/2;
        METACOUNT = Math.max(100, Math.floor((W * H) / 15000));
        
        createGrid();
        createMetaballs();
        startAnimation();
    }

    function createGrid() {
        gridLayer.innerHTML = '';
        const BUF = Math.hypot(W / 3, H / 3);
        for (let y = -BUF + GRID_OFF; y < H + BUF; y += SPACING) {
            for (let x = -BUF + GRID_OFF; x < W + BUF; x += SPACING) {
                const dot = document.createElement('div');
                dot.className  = 'grid-bubble';
                dot.style.left = `${x - 4}px`;
                dot.style.top  = `${y - 4}px`;
                gridLayer.appendChild(dot);
            }
        }
    }

    function createMetaballs() {
        metaLayer.innerHTML = '';
        metas = [];
        for (let i = 0; i < METACOUNT; i++) {
            const m = document.createElement('div');
            m.className = 'metaball';
            
            const size = 20 + Math.random() * 40;
            m.style.width  = `${size}px`;
            m.style.height = `${size}px`;
            
            m.x = Math.random() * W;
            m.y = Math.random() * H;
            
            m.vy = 0.3 + Math.random() * 0.7;
            
            metaLayer.appendChild(m);
            metas.push(m);
            
            setTimeout(() => {
                m.style.opacity = '1';
                m.style.animation = 'metaballFadeIn 1.5s ease forwards';
            }, 100);
        }
    }

    function startAnimation() {
        function tick() {
            for (let m of metas) {
                m.y -= m.vy;
                if (m.y < -parseFloat(m.style.height)) {
                    m.y = H + Math.random() * 50;
                    m.x = Math.random() * W;
                }
                m.style.transform = `translate(${m.x}px, ${m.y}px)`;
            }
            animationFrame = requestAnimationFrame(tick);
        }
        animationFrame = requestAnimationFrame(tick);
    }

    function handleResize() {
        cancelAnimationFrame(animationFrame);
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newW = window.innerWidth;
            const newH = window.innerHeight;
            
            if (Math.abs(W - newW) > 50 || Math.abs(H - newH) > 50) {
                W = newW;
                H = newH;
                
                const newCount = Math.max(100, Math.floor((W * H) / 15000));
                
                if (newCount > metas.length) {
                    const toAdd = newCount - metas.length;
                    for (let i = 0; i < toAdd; i++) {
                        const m = document.createElement('div');
                        m.className = 'metaball';
                        const size = 20 + Math.random() * 40;
                        m.style.width = `${size}px`;
                        m.style.height = `${size}px`;
                        m.style.opacity = '0';
                        
                        m.x = Math.random() * W;
                        m.y = Math.random() * H;
                        m.vy = 0.3 + Math.random() * 0.7;
                        
                        metaLayer.appendChild(m);
                        metas.push(m);
                        
                        setTimeout(() => {
                            m.style.opacity = '1';
                            m.style.animation = 'metaballFadeIn 1.5s ease forwards';
                        }, 100);
                    }
                } 
                else if (newCount < metas.length) {
                    const toRemove = metas.length - newCount;
                    for (let i = 0; i < toRemove; i++) {
                        const m = metas.pop();
                        metaLayer.removeChild(m);
                    }
                }
                
                createGrid();
                startAnimation();
            }
        }, 300);
    }

    initBubbleBg();
    window.addEventListener('resize', handleResize);
})();

const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const bgEffectSelect = document.getElementById('bg-effect-select');
const clearCacheBtn = document.getElementById('clear-cache');

let hasOpenedSettings = false;

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
    settingsBtn.classList.toggle('open');

    if (!hasOpenedSettings) {
        settingsBtn.classList.remove('rainbow-border');
        localStorage.setItem('openedSettings', 'true');
        hasOpenedSettings = true;
    }
});

if (localStorage.getItem('openedHamburger') === 'true') {
    hamburger?.classList.remove('rainbow-border');
}
if (localStorage.getItem('openedSettings') === 'true') {
    settingsBtn?.classList.remove('rainbow-border');
}

const bgSetting = localStorage.getItem('bgEffect') || 'default';
bgEffectSelect.value = bgSetting;
applyBgEffect(bgSetting);

hamburger.addEventListener('click', () => {
    if (!hasOpened) {
        hamburger.classList.remove('rainbow-border');
        localStorage.setItem('openedHamburger', 'true');
        hasOpened = true;
    }
});

bgEffectSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    localStorage.setItem('bgEffect', value);
    applyBgEffect(value);
});

function applyBgEffect(mode) {
    const filter = document.querySelector('feGaussianBlur');
    const gridBubbles = document.querySelectorAll('#grid-layer .grid-bubble');

    if (mode === 'default') {
        filter.setAttribute('stdDeviation', '8');
        gridBubbles.forEach(b => {
            b.style.width = '8px';
            b.style.height = '8px';
        });
        document.getElementById('bubble-bg').style.display = '';
    } else if (mode === 'strong') {
        filter.setAttribute('stdDeviation', '4');
        gridBubbles.forEach(b => {
            b.style.width = '6px';
            b.style.height = '6px';
        });
        document.getElementById('bubble-bg').style.display = '';
    } else if (mode === 'off') {
        document.getElementById('bubble-bg').style.display = 'none';
    }
}

clearCacheBtn.addEventListener('click', () => {
    localStorage.clear();
    showToast('Local storage cleared!');
    setTimeout(() => location.reload(), 1200);
});

function handleAccessibleButton(el, clickHandler) {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickHandler();
        }
    });
}

handleAccessibleButton(hamburger, () => hamburger.click());
handleAccessibleButton(settingsBtn, () => settingsBtn.click());

const musicBtn = document.getElementById('music-btn');
handleAccessibleButton(musicBtn, () => musicBtn.click());

const exitFocusBtn = document.getElementById('exit-focus-btn');
handleAccessibleButton(exitFocusBtn, () => exitFocusBtn.click());

let lastFocusedElement = null;

function setSidebarTabbable(isOpen) {
    const tabbables = sidebar.querySelectorAll('a, button');
    tabbables.forEach(el => {
        if (isOpen) {
            el.setAttribute('tabindex', '0');
        } else {
            el.setAttribute('tabindex', '-1');
        }
    });
}

function trapSidebarFocus() {
    if (!sidebar.classList.contains('open')) return;
    setSidebarTabbable(true);
    const focusable = sidebar.querySelectorAll('a, button, [tabindex="0"]');
    if (focusable.length === 0) return;
    focusable[0].focus();
    function handleTab(e) {
        if (!sidebar.classList.contains('open')) return;
        const focusables = Array.from(sidebar.querySelectorAll('a, button, [tabindex="0"]'));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeSidebar();
            hamburger.focus();
        }
    }
    sidebar.addEventListener('keydown', handleTab);
    sidebar._trapHandler = handleTab;
}
function releaseSidebarFocus() {
    setSidebarTabbable(false);
    if (sidebar._trapHandler) {
        sidebar.removeEventListener('keydown', sidebar._trapHandler);
        sidebar._trapHandler = null;
    }
}
hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        lastFocusedElement = document.activeElement;
        setTimeout(trapSidebarFocus, 100);
    } else {
        releaseSidebarFocus();
        if (lastFocusedElement) lastFocusedElement.focus();
    }
});
overlay.addEventListener('click', () => {
    releaseSidebarFocus();
    if (lastFocusedElement) lastFocusedElement.focus();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        releaseSidebarFocus();
        if (lastFocusedElement) lastFocusedElement.focus();
    }
});

setSidebarTabbable(false);

let lastFocusedSettings = null;
settingsBtn.addEventListener('click', () => {
    if (settingsPanel.classList.contains('show')) {
        lastFocusedSettings = document.activeElement;
        setTimeout(() => {
            const focusable = settingsPanel.querySelectorAll('select, button, [tabindex="0"]');
            if (focusable.length) focusable[0].focus();
        }, 100);
    } else {
        if (lastFocusedSettings) lastFocusedSettings.focus();
    }
});

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

const bgMusic = document.getElementById('bg-music');
const musicSlash = musicBtn.querySelector('.music-slash');

let isMusicActive = false;
let isMusicMuted = false;
let isMusicPlaying = false;

updateMusicButton();

musicBtn.addEventListener('click', () => {
    try {
        if (!isMusicActive) {
            activateMusic();
        } else if (isMusicPlaying) {
            toggleMute();
        } else {
            togglePlayPause();
        }
    } catch (error) {
        console.error("Music control error:", error);
    }
});

function activateMusic() {
    isMusicActive = true;
    musicBtn.classList.add('active');
    bgMusic.volume = 0;
    const saved = parseFloat(localStorage.getItem('musicProgress') || '0');
    const tryPlay = () => {
        bgMusic.play().then(() => {
            fadeVolume(volumeControl.value, 300);
            isMusicPlaying = true;
            updateMusicButton();
            // showToast('Music started');
        }).catch(error => {
            console.error("Audio playback failed:", error);
            isMusicActive = false;
            musicBtn.classList.remove('active');
        });
    };
    if (saved > 0.5 && bgMusic.duration && saved < bgMusic.duration + 1) {
        promptMusicRestore(saved, bgMusic.duration, (restore) => {
            if (restore) {
                bgMusic.currentTime = saved;
            } else {
                bgMusic.currentTime = 0;
                localStorage.removeItem('musicProgress');
            }
            tryPlay();
        });
    } else if (saved > 0.5 && !bgMusic.duration) {
        bgMusic.addEventListener('loadedmetadata', function handler() {
            bgMusic.removeEventListener('loadedmetadata', handler);
            if (saved < bgMusic.duration - 2) {
                promptMusicRestore(saved, bgMusic.duration, (restore) => {
                    if (restore) {
                        bgMusic.currentTime = saved;
                    } else {
                        bgMusic.currentTime = 0;
                        localStorage.removeItem('musicProgress');
                    }
                    tryPlay();
                });
            } else {
                tryPlay();
            }
        });
        bgMusic.load();
    } else {
        tryPlay();
    }
}

function toggleMute() {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
        updateMusicButton();
        fadeVolume(0, 300, () => {
            bgMusic.muted = true;
            // showToast('Music muted');
        });
    } else {
        bgMusic.muted = false;
        fadeVolume(0.5, 300);
        updateMusicButton();
        // showToast('Music unmuted');
    }
}

function togglePlayPause() {
    if (isMusicPlaying) {
        fadeVolume(0, 300, () => {
            bgMusic.pause();
            isMusicPlaying = false;
            updateMusicButton();
        });
    } else {
        bgMusic.play().then(() => {
            fadeVolume(0.5, 300);
            isMusicPlaying = true;
            updateMusicButton();
        });
    }
}

function updateMusicButton() {
    if (isMusicMuted) {
        musicBtn.classList.add('muted');
    } else {
        musicBtn.classList.remove('muted');
    }
}

function fadeVolume(target, duration, callback) {
    const startVolume = bgMusic.volume;
    const delta = target - startVolume;
    const startTime = performance.now();

    function updateVolume() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic easing for smooth fade
        const easedProgress = progress < 0.5 ? 
            4 * progress * progress * progress : 
            1 - Math.pow(-2 * progress + 2, 3) / 2;
            
        bgMusic.volume = startVolume + (delta * easedProgress);
        
        if (progress < 1) {
            requestAnimationFrame(updateVolume);
        } else if (callback) {
            callback();
        }
    }
    
    updateVolume();
}

const volumeControl = document.getElementById('volume-control');
const savedVolume = localStorage.getItem('musicVolume');
if (savedVolume !== null) {
    volumeControl.value = savedVolume;
    bgMusic.volume = parseFloat(savedVolume);
} else {
    volumeControl.value = 1;
    bgMusic.volume = 1;
}

const volumeDisplay = document.querySelector('.volume-display');

const volumePopup = document.getElementById('volume-popup');
const volumeContainer = document.querySelector('.volume-container');
let volumePopupTimeout = null;
function showVolumePopup(vol) {
    if (!volumePopup || !volumeContainer) return;
    volumePopup.textContent = `${Math.round(vol * 100)}%`;
    volumePopup.classList.add('show');
    volumeContainer.appendChild(volumePopup);

    const slider = volumeControl;
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const percent = (vol - min) / (max - min);
    const sliderWidth = slider.offsetWidth;
    const knobRadius = 10; // should be half of thumb width (20px)
    const knobX = percent * (sliderWidth - knobRadius * 2) + knobRadius;

    volumePopup.style.left = `${knobX - volumePopup.offsetWidth / 2 + 2}px`;

    clearTimeout(volumePopupTimeout);
    volumePopupTimeout = setTimeout(() => {
        volumePopup.classList.remove('show');
    }, 1000);
}

function updateVolumeDisplay() {
    const volume = volumeControl.value;
    volumeDisplay.style.width = `${volume * 160}px`;
}
updateVolumeDisplay();

volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    bgMusic.volume = volume;
    localStorage.setItem('musicVolume', volume);
    updateVolumeDisplay();

    showVolumePopup(volume);

    if (isMusicMuted && volume > 0) {
        isMusicMuted = false;
        bgMusic.muted = false;
        updateMusicButton();
    }
});

const musicRestoreModal = document.getElementById('music-restore-modal');
const musicRestoreTime = document.getElementById('music-restore-time');
const musicRestoreYes = document.getElementById('music-restore-yes');
const musicRestoreNo = document.getElementById('music-restore-no');

function formatTime(secs) {
    secs = Math.floor(secs);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

setInterval(() => {
    if (isMusicPlaying && bgMusic.currentTime > 0) {
        localStorage.setItem('musicProgress', bgMusic.currentTime);
    }
}, 2000);

function promptMusicRestore(progress, duration, cb) {
    if (!musicRestoreModal) return cb(false);
    musicRestoreTime.textContent = formatTime(progress);
    musicRestoreModal.style.display = '';
    setTimeout(() => musicRestoreModal.classList.add('show'), 10);
    let handled = false;
    function cleanup() {
        musicRestoreModal.classList.remove('show');
        setTimeout(() => { musicRestoreModal.style.display = 'none'; }, 180);
        musicRestoreYes.removeEventListener('click', yesHandler);
        musicRestoreNo.removeEventListener('click', noHandler);
        musicRestoreModal.removeEventListener('keydown', keyHandler);
    }
    function yesHandler() {
        if (handled) return;
        handled = true;
        cleanup();
        cb(true);
    }
    function noHandler() {
        if (handled) return;
        handled = true;
        cleanup();
        cb(false);
    }
    function keyHandler(e) {
        if (e.key === 'Escape') {
            noHandler();
        }
        if (e.key === 'Enter' || e.key === ' ') {
            yesHandler();
        }
    }
    musicRestoreYes.addEventListener('click', yesHandler);
    musicRestoreNo.addEventListener('click', noHandler);
    musicRestoreModal.addEventListener('keydown', keyHandler);
    musicRestoreModal.tabIndex = -1;
    musicRestoreModal.focus();
}

let focusMode = false;
let mouseTimeout;
const focusModeBtn = document.getElementById('focus-mode-btn');
let cursorTimeout;
let cursorVisible = true;

function showCursor() {
    if (!focusMode) return;
    document.body.classList.add('show-cursor');
    cursorVisible = true;
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
        if (focusMode) {
            document.body.classList.remove('show-cursor');
            cursorVisible = false;
        }
    }, 2000);
}

function showExitButton() {
    if (!focusMode) return;
    exitFocusBtn.classList.add('show');
    showCursor();
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        exitFocusBtn.classList.remove('show');
    }, 2000);
}

function setFocusMode(on) {
    focusMode = on;
    if (focusMode) {
        document.body.classList.add('focus-mode');
        exitFocusBtn.style.display = 'block';
        setTimeout(() => {
            exitFocusBtn.classList.add('show');
            setTimeout(() => exitFocusBtn.classList.remove('show'), 2000);
        }, 100);
        showCursor();
    } else {
        document.body.classList.remove('focus-mode');
        exitFocusBtn.classList.remove('show');
        exitFocusBtn.style.display = 'none';
        clearTimeout(mouseTimeout);
        document.body.classList.add('show-cursor');
    }
    localStorage.setItem('focusMode', focusMode.toString());
}

function toggleFocusMode() {
    setFocusMode(!focusMode);
}

focusModeBtn.addEventListener('click', toggleFocusMode);
exitFocusBtn.addEventListener('click', toggleFocusMode);

document.addEventListener('mousemove', () => {
    showExitButton();
    showCursor();
});

document.addEventListener('touchmove', () => {
    showExitButton();
    showCursor();
});

const savedFocusMode = localStorage.getItem('focusMode');
if (savedFocusMode === 'true') {
    setFocusMode(true);
    cursorTimeout = setTimeout(() => {
        document.body.classList.remove('show-cursor');
        cursorVisible = false;
    }, 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && (e.key === 'f' || e.key === 'F')) {
        toggleFocusMode();
        showCursor();
        e.preventDefault();
    }
});

const tooltip = document.getElementById('tooltip');
const tooltipTargets = [
    { el: document.getElementById('hamburger'), text: 'Menu' },
    { el: document.getElementById('settings-btn'), text: 'Settings' },
    { el: document.getElementById('music-btn'), text: 'Music' }
];

tooltipTargets.forEach(({el, text}) => {
    if (!el) return;
    function showTip(e) {
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.classList.add('show');
        const rect = el.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();
        let top, left;
        const margin = 10;
        if (rect.top > window.innerHeight / 2) {
            top = rect.top - tipRect.height - margin;
        } else {
            top = rect.bottom + margin;
        }
        left = rect.left + rect.width/2 - tipRect.width/2;
        left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    function hideTip() {
        tooltip.classList.remove('show');
        setTimeout(() => { tooltip.style.display = 'none'; }, 180);
    }
    el.addEventListener('mouseenter', showTip);
    el.addEventListener('mouseleave', hideTip);
    el.addEventListener('focus', showTip);
    el.addEventListener('blur', hideTip);
    el.addEventListener('touchstart', showTip, {passive:true});
    el.addEventListener('touchend', hideTip, {passive:true});
    el.addEventListener('touchcancel', hideTip, {passive:true});
});