window.addEventListener('orientationchange', function() {
    if (Screen.orientation === 0 || Screen.orientation === 180) {
        alert("Please rotate your device to landscape mode for the best experience.");
    }
});