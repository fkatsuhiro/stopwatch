// script.js
let startTime;
let isRunning = false;
let lapTimes = [];
let timer;
let elapsedTime = 0;

function startStopwatch() {
  isRunning = true;
  startTime = performance.now() - elapsedTime;
  document.getElementById("startStopBtn").textContent = "Stop";
  requestAnimationFrame(updateTimer);
}

function stopStopwatch() {
  isRunning = false;
  document.getElementById("startStopBtn").textContent = "Start";
}

function resetStopwatch() {
  isRunning = false;
  lapTimes = [];
  elapsedTime = 0;
  updateDisplay(0);
  updateLapList();
  document.getElementById("startStopBtn").textContent = "Start";
}

function updateTimer(timestamp) {
  if (!isRunning) {
    return;
  }

  const elapsedMilliseconds = timestamp - startTime;
  const elapsedCentiseconds = Math.floor(elapsedMilliseconds / 10);
  const milliseconds = elapsedCentiseconds % 10;
  const seconds = Math.floor(elapsedCentiseconds / 10) % 60;
  const minutes = Math.floor(elapsedCentiseconds / 600) % 60;
  const hours = Math.floor(elapsedCentiseconds / 36000);

  updateDisplay(hours, minutes, seconds, milliseconds);
  requestAnimationFrame(updateTimer);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  document.getElementById("milliseconds").textContent = milliseconds;
}

function pad(value) {
  return value < 10 ? "0" + value : value;
}

function updateLapList() {
  const lapListElement = document.getElementById("lapList");
  lapListElement.innerHTML = "";
  lapTimes.forEach((lapTime, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapListElement.appendChild(listItem);
  });
}

function addLapTime() {
    const lapElapsedTime = performance.now() - startTime;
    const lapCentiseconds = Math.floor(lapElapsedTime / 10);
    const lapMilliseconds = lapCentiseconds % 10;
    const lapSeconds = Math.floor(lapCentiseconds / 10) % 60;
    const lapMinutes = Math.floor(lapCentiseconds / 600) % 60;
    const lapHours = Math.floor(lapCentiseconds / 36000);
  
    const formattedTime = pad(lapHours) + ":" + pad(lapMinutes) + ":" + pad(lapSeconds) + "." + lapMilliseconds;
    lapTimes.push(formattedTime);
    updateLapList();
  }

document.getElementById("startStopBtn").addEventListener("click", function () {
  if (isRunning) {
    stopStopwatch();
    elapsedTime = performance.now() - startTime;
  } else {
    startStopwatch();
  }
});

document.getElementById("resetBtn").addEventListener("click", resetStopwatch);

document.getElementById("lapBtn").addEventListener("click", function () {
  if (isRunning) {
    addLapTime();
  }
});

function resetStopwatch() {
    isRunning = false;
    lapTimes = [];
    elapsedTime = 0;
    updateDisplay(0, 0, 0, 0); // 初期表示に設定
    updateLapList();
    document.getElementById("startStopBtn").textContent = "Start";
  }
  