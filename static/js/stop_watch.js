document.querySelector("#start-button").addEventListener("click", startTimer);
document.querySelector("#stop-button").addEventListener("click", stopTimer);
document.querySelector("#reset-button").addEventListener("click", resetTimer);

let timerInterval;
let startTime;
let elapsedTime = 0;

function startTimer() {
  document.querySelector("#start-button").disabled = true;

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let formattedTime = new Date(elapsedTime).toISOString().slice(14, 19);
    document.querySelector(".timer").textContent = formattedTime;
  }, 10);
}

function stopTimer() {
  document.querySelector("#start-button").disabled = false;

  clearInterval(timerInterval);
}

function resetTimer() {
  document.querySelector("#start-button").disabled = false;

  clearInterval(timerInterval);
  elapsedTime = 0;
  document.querySelector(".timer").textContent = "00:00";
}
