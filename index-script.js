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
    location.reload();
});

const musicBtn = document.getElementById('music-btn');
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
    bgMusic.play().then(() => {
        fadeVolume(0.5, 300);
        isMusicPlaying = true;
        updateMusicButton();
    }).catch(error => {
        console.error("Audio playback failed:", error);
        isMusicActive = false;
        musicBtn.classList.remove('active');
    });
}

function toggleMute() {
    isMusicMuted = !isMusicMuted;
    
    if (isMusicMuted) {
        updateMusicButton();
        fadeVolume(0, 300, () => {
            bgMusic.muted = true;
        });
    } else {
        bgMusic.muted = false;
        fadeVolume(0.5, 300);
        updateMusicButton();
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
    volumeControl.value = 0.5;
    bgMusic.volume = 0.5;
}

volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    bgMusic.volume = volume;
    localStorage.setItem('musicVolume', volume);
    
    if (isMusicMuted && volume > 0) {
        isMusicMuted = false;
        bgMusic.muted = false;
        updateMusicButton();
    }
});

bgMusic.muted = isMusicMuted;

document.addEventListener('visibilitychange', () => {
    if (document.hidden && isMusicPlaying) {
        bgMusic.pause();
    } else if (!document.hidden && isMusicActive && !isMusicPlaying) {
        bgMusic.play();
    }
});

let focusMode = false;
let mouseTimeout;
const focusModeBtn = document.getElementById('focus-mode-btn');
const exitFocusBtn = document.getElementById('exit-focus-btn');

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

function toggleFocusMode() {
    if (focusMode) {
        document.body.classList.remove('focus-mode');
        exitFocusBtn.classList.remove('show');
        clearTimeout(mouseTimeout);
        document.body.classList.add('show-cursor');
    } else {
        document.body.classList.add('focus-mode');
        exitFocusBtn.style.display = 'block';
        setTimeout(() => {
            exitFocusBtn.classList.add('show');
            setTimeout(() => exitFocusBtn.classList.remove('show'), 2000);
        }, 100);
        showCursor();
    }
    
    focusMode = !focusMode;
    localStorage.setItem('focusMode', focusMode.toString());
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
    focusMode = true;
    document.body.classList.add('focus-mode');
    exitFocusBtn.style.display = 'block';
    document.body.classList.add('show-cursor');
    cursorTimeout = setTimeout(() => {
        document.body.classList.remove('show-cursor');
        cursorVisible = false;
    }, 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'f') {
        toggleFocusMode();
        showCursor();
        e.preventDefault();
    }
});

document.querySelectorAll('#hamburger, #settings-btn, #music-btn, #exit-focus-btn')
    .forEach(el => {
        el.addEventListener('mouseenter', showCursor);
        el.addEventListener('touchstart', showCursor);
    });