document.addEventListener("DOMContentLoaded", () => {
    const pillContainer = document.getElementById("pillContainer");
    const pillInfo = document.getElementById("pillInfo");
    const pillInfoTitle = document.getElementById("pillInfoTitle");
    //const pillLevelInfo = document.getElementById("pillLevelInfo");
    //const pillLevelInfoText = document.getElementById("pillLevelInfoText");
    const pillDescription = document.getElementById("pillDescription");
    const backButton = document.getElementById("backButton");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const whooshSound = document.getElementById("whooshSound");
    const settingsIcon = document.getElementById("settingsIcon");
    const settingsMenu = document.getElementById("settingsMenu");
    const transitionSpeedInput = document.getElementById("transitionSpeed");

    let transitionSpeed = localStorage.getItem("transitionSpeed");

    if (transitionSpeed === null || isNaN(transitionSpeed)) {
        transitionSpeed = 0;
    } else {
        transitionSpeed = parseInt(transitionSpeed, 10);
    }
    transitionSpeedInput.value = transitionSpeed;

    // let transitionSpeed = parseInt(transitionSpeedInput.value, 10);
    document.documentElement.style.setProperty('--transition-speed', transitionSpeed);

    const pillImages = [
        "../media/pillignitedfreddy.png",
        "../media/pillignitedbonnie.png",
        "../media/pillignitedchica.png",
        "../media/pillignitedfoxy.png",
        "../media/pill5.jpg",
        "../media/pill6.jpg",
        "../media/pill7.jpg",
        "../media/pill8.jpg"
    ];

    const pillTitles = [
        "Ignited Freddy", 
        "Ignited Bonnie", 
        "Ignited Chica", 
        "Ignited Foxy", 
        "Pill 5",
        "Pill 6",
        "Pill 7",
        "Pill 8"
    ];

    const pillDescriptions = [
        "A charred, hollow and demonic doppelgänger of the original Freddy Fazbear, with most of his suit burned and torn away. His right eye glows a sinister yellow, while his left is usually blank, leaving an empty-looking socket.",
        "A horrifying remnant and demonic doppelgänger of the once-friendly animatronic bunny. His faceplate is gone, exposing a terrifyingly detailed endoskeleton with sharp, jagged teeth. His glowing red eyes pierce through the darkness.",
        "A nightmarish version and demonic doppelgänger of the cheerful chicken mascot, with her suit scorched and broken. Her orange beak is cracked and chipped, with sharp teeth visible inside. Her bib, which once said 'Let's Eat!' is now filthy, charred, and stained, barely legible.",
        "A mangled and burnt version and demonic doppelgänger of the cunning pirate fox. Most of his suit is gone, leaving behind an exposed endoskeleton and tattered scraps of red fabric. His hook is rusted but still sharp, and one glowing eye flickers ominously.",
        "",
        "",
        "",
        ""
    ];

    const levelDescriptions = [
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: 10+ Running Movement Speed",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: 15+ Running Movement Speed",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: 20+ Running Movement Speed",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
        [
            "Points: 7500\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 10000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 15000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 20000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 25000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 30000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 35000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 40000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 45000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
            "Points: 50000\n\nCosmetic: N/A\n\nPill Upgrade: N/A",
        ],
    ];

    const muteButton = document.createElement("button");
    muteButton.textContent = "Mute Audio";
    muteButton.classList.add("mute-button");
    document.body.appendChild(muteButton);

    const playButton = document.createElement("button");
    playButton.textContent = "Play Audio";
    playButton.classList.add("play-button");
    playButton.style.display = "none";
    document.body.appendChild(playButton);

    backgroundMusic.addEventListener('ended', () => {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });

    let isMuted = localStorage.getItem("isMuted") === "true";
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? "Unmute Audio" : "Mute Audio";

    muteButton.addEventListener("click", () => {
        isMuted = !isMuted;
        backgroundMusic.muted = isMuted;
        whooshSound.muted = isMuted;
        localStorage.setItem("isMuted", isMuted);
        muteButton.textContent = isMuted ? "Unmute Audio" : "Mute Audio";
    });

    playButton.addEventListener("click", () => {
        backgroundMusic.play();
        playButton.style.display = "none";
    });

    setInterval(() => {
        if (backgroundMusic.paused) {
            playButton.style.display = "block";
        }
    }, 1000);

    backgroundMusic.play().catch(() => {
        playButton.style.display = "block";
    });

    settingsIcon.addEventListener("click", () => {
        settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
    });

    transitionSpeedInput.addEventListener("input", (e) => {
        transitionSpeed = parseInt(e.target.value, 10);
        localStorage.setItem("transitionSpeed", transitionSpeed);
    });

    for (let i = 1; i <= 8; i++) {
        const pillBox = document.createElement("div");
        pillBox.classList.add("pill-box");

        const pillImageDiv = document.createElement("div");
        pillImageDiv.classList.add("pill-image");
        pillImageDiv.style.backgroundImage = `url(${pillImages[i - 1]})`;
        pillBox.appendChild(pillImageDiv);

        const pillTitle = document.createElement("div");
        pillTitle.classList.add("pill-title");
        pillTitle.textContent = pillTitles[i - 1];
        pillBox.appendChild(pillTitle);

        const pillButton = document.createElement("button");
        pillButton.classList.add("pill-button");
        pillButton.textContent = "View Pill Info";
        pillButton.addEventListener("click", () => {
            if (parseFloat(window.getComputedStyle(pillContainer).opacity) < 0.99) return;
            whooshSound.currentTime = 0;
            whooshSound.play();
        
            pillContainer.style.opacity = "0";
            pillContainer.style.transition = `opacity ${transitionSpeed}ms ease`;
            setTimeout(() => {
                pillContainer.style.display = "none";
                pillInfo.style.display = "flex";
                pillInfo.classList.add("active");
                pillInfo.style.opacity = "0";
                pillInfo.style.transition = `opacity ${transitionSpeed}ms ease`;
        
                pillInfoTitle.textContent = `${pillTitles[i - 1]}`;
                pillDescription.textContent = `${pillDescriptions[i - 1]}`;
                setTimeout(() => {
                    pillInfo.style.opacity = "1";
                }, 1);
                const pillImage = document.getElementById("pillImage");
                if (pillImage) {
                    pillImage.style.backgroundImage = `url(${pillImages[i - 1]})`;
                }
                const pillLevels = document.getElementById("pillLevels");
                pillLevels.innerHTML = "";
                if (window.setupLevelInfoBox) {
                    window.setupLevelInfoBox(pillLevels, i - 1, levelDescriptions);
                }
                // for (let level = 1; level <= 10; level++) {
                //     const levelBox = document.createElement("div");
                //     levelBox.textContent = level;
                //     pillLevels.appendChild(levelBox);
                //     levelBox.addEventListener("mouseenter", (e) => {
                //         pillLevelInfoText.textContent = levelDescriptions[level - 1];
                //         pillLevelInfo.style.display = "block";
            
                //         const levelBoxRect = levelBox.getBoundingClientRect();
                //         pillLevelInfo.style.left = `${levelBoxRect.left + window.scrollX + (levelBoxRect.width / 2) - (pillLevelInfo.offsetWidth / 2) - 85}px`;
                //         pillLevelInfo.style.top = `${levelBoxRect.top + window.scrollY - pillLevelInfo.offsetHeight - 60}px`;
                //     });
            
                //     levelBox.addEventListener("mouseleave", () => {
                //         pillLevelInfo.style.display = "none";
                //     });
                // }
        
                backgroundMusic.pause();
                backgroundMusic.src = "../media/pillmusicmenu.mp3";
                backgroundMusic.play();
            }, transitionSpeed);
        });

        
        pillBox.appendChild(pillButton);

        pillContainer.appendChild(pillBox);
    }

    backButton.addEventListener("click", () => {
        if (parseFloat(window.getComputedStyle(pillInfo).opacity) < 0.99) return;
        whooshSound.currentTime = 0;
        whooshSound.play();

        pillInfo.style.opacity = "0";
        pillInfo.style.transition = `opacity ${transitionSpeed}ms ease`;

        setTimeout(() => {
            pillInfo.style.display = "none";
            pillContainer.style.display = "flex";
            setTimeout(() => {
                pillContainer.style.opacity = "1";
            }, transitionSpeed / 16);

            backgroundMusic.pause();
            backgroundMusic.src = "../media/shopmainmenu.mp3";
            backgroundMusic.play();
        }, transitionSpeed);
    });
    pillInfo.style.display = "none";
});