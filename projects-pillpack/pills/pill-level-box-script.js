function setupLevelInfoBox(levelContainer, pillIndex, levelDescriptions) {
    const pillLevelInfo = document.getElementById("pillLevelInfo");
    const pillLevelInfoText = document.getElementById("pillLevelInfoText");

    levelContainer.innerHTML = "";

    const pillLevelDescriptions = levelDescriptions[pillIndex];

    for (let level = 1; level <= 10; level++) {
        const levelBox = document.createElement("div");
        levelBox.textContent = level;
        levelContainer.appendChild(levelBox);

        levelBox.addEventListener("mouseenter", (e) => {
            pillLevelInfoText.innerHTML = pillLevelDescriptions[level - 1].replace(/\n/g, '<br>');
            pillLevelInfo.style.display = "block";

            const levelBoxRect = levelBox.getBoundingClientRect();
            pillLevelInfo.style.left = 'auto';
            pillLevelInfo.style.bottom = '20%';
        });

        levelBox.addEventListener("mouseleave", () => {
            pillLevelInfo.style.display = "none";
        });
    }
}

window.setupLevelInfoBox = setupLevelInfoBox;
