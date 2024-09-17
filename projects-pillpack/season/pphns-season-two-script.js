function startTimer(endTime, display) {
    function updateTimer() {
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

        display.textContent = days + ":" + hours + ":" + minutes + ":" + seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            display.textContent = "ENDED";
        }
    }

    updateTimer(); // Initial call to display timer right away
    var timerInterval = setInterval(updateTimer, 1000);
}

window.onload = function () {
    var endTime = new Date("September 18, 2024 12:00:00 UTC-3").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display);
    console.log("Season Ends on September 18, 2024 12:00:00 UTC-3")
};