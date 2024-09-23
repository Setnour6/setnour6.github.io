window.onload = function () {
    var endTime = new Date("November 23, 2024 12:00:00 UTC-4").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display, "NOT STARTED YET");
    console.log("Season Ends on November 23, 2024 12:00:00 UTC-4");
};
