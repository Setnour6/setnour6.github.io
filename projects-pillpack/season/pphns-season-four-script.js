window.onload = function () {
    var endTime = new Date("January 31, 2025 12:00:13 UTC-4").getTime(); // to verify.
    var display = document.querySelector('#timer');
    startTimer(endTime, display);
    console.log("Season Ends on January 31, 2025 12:00:00 UTC-4");
};
