function calculateTime(endTime) {
    var now = new Date().getTime();
    var distance = endTime - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return { days, hours, minutes, seconds, distance };
}

function startTimer(endTime, display, endMessage = "SEASON ENDED") {
    function updateTimer() {
        var { days, hours, minutes, seconds, distance } = calculateTime(endTime);

        display.textContent = days + ":" + hours + ":" + minutes + ":" + seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            display.textContent = endMessage;
        }
    }

    updateTimer(); // Initial call to display timer right away
    var timerInterval = setInterval(updateTimer, 1000);
}
