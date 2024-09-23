function isDesktop() {
    var userAgent = window.navigator.userAgent;
    let osType = "Non-Desktop/Unknown/Other Operating System";
    const hasPhysicalKeyboard = navigator.keyboard || 
        userAgent.includes('Windows NT') || 
        userAgent.includes('Macintosh') || 
        userAgent.includes('Linux');
    const noTouch = !('ontouchstart' in window) && (navigator.maxTouchPoints === 0);

    if (userAgent.includes('Windows NT')) {
        osType = "Windows";
    } else if (userAgent.includes('Macintosh')) {
        osType = "macOS";
    } else if (userAgent.includes('Linux')) {
        osType = "Linux";
    }
    console.log(`Operating System: ${osType}`);

    return hasPhysicalKeyboard || noTouch;
}

if (isDesktop()) {
    document.body.classList.add('desktop'); // Note for CSS: .desktop
} else {
    document.body.classList.add('non-desktop'); // Note for CSS: .non-desktop
}
