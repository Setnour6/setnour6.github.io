window.onload = function () {
    var endTime = new Date("September 18, 2024 12:00:00 UTC-3").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display, "NOT STARTED YET");
    console.log("Season Begins on September 18, 2024 12:00:00 UTC-3");
};
