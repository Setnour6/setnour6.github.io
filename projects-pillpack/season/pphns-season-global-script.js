const bubbleCount = 20;
const smallBubbleCount = 60;
const body = document.body;

for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    const size = Math.random() * 50 + 10;
    const speed = Math.random() * 30 + 20;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    bubble.classList.add('bubble');
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startX}vw`;
    bubble.style.top = `${startY}vh`;
    bubble.style.animationDuration = `${speed}s, ${speed}s`;
    bubble.style.animationDelay = `-1s, -1s`;

    body.appendChild(bubble);
}

for (let i = 0; i < smallBubbleCount; i++) {
    const bubble = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const speed = Math.random() * 460 + 140;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    bubble.classList.add('bubble');
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startX}vw`;
    bubble.style.top = `${startY}vh`;
    bubble.style.animationDuration = `${speed}s, ${speed}s`;
    bubble.style.animationDelay = `-1s, -1s`;

    body.appendChild(bubble);
}