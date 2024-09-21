window.onload = function () {
    var endTime = new Date("September 18, 2024 12:00:00 UTC-3").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display);
    console.log("Season Ends on September 18, 2024 12:00:00 UTC-3");
};
