window.onload = function () {
    var endTime = new Date("August 18, 2024 12:00:00 UTC-3").getTime();
    var display = document.querySelector('#timer');
    startTimer(endTime, display);
    console.log("Season Ends on unknown (set to August 18, 2024 12:00:00 UTC-3)");
};
