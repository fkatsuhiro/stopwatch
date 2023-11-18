// script.js
let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let startTime;

function startStopwatch() {
  timer = setInterval(updateTimer, 1000);
  isRunning = true;
  document.getElementById("startStopBtn").textContent = "Stop";
}

function stopStopwatch() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("startStopBtn").textContent = "Start";
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  startTime = null;
  updateDisplay();
  document.getElementById("startStopBtn").textContent = "Start";
}

function updateTimer() {
  const now = new Date();
  const elapsedMilliseconds = now - startTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  seconds = elapsedSeconds % 60;
  minutes = Math.floor(elapsedSeconds / 60) % 60;
  hours = Math.floor(elapsedSeconds / 3600);
  updateDisplay();
}

function updateDisplay() {
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("timer").textContent = formattedTime;
}

function pad(value) {
  return value < 10 ? "0" + value : value;
}

document.getElementById("startStopBtn").addEventListener("click", function () {
  if (isRunning) {
    stopStopwatch();
  } else {
    startStopwatch();
    startTime = new Date();
  }
});

document.getElementById("resetBtn").addEventListener("click", resetStopwatch);
