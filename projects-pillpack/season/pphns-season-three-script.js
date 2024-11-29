window.onload = function () {
    var endTime = new Date("November 28, 2024 12:00:00 UTC-4").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display);
    console.log("Season Ends on November 28, 2024 12:00:00 UTC-4");
};
