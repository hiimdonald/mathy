const flashcard = document.querySelector("#flashcard");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const correctCount = document.querySelector("#correct-count");
const incorrectCount = document.querySelector("#incorrect-count");
const score = document.querySelector("#score");
let scorePercent = 0;
let currentMultiplier = 5;

const stats = {};
for (let i = 1; i <= 12; i++) {
  stats[i] = { correct: 0, incorrect: 0 };
}

function flipCard() {
  flashcard.classList.toggle("flipped");
}

function handleAnswer(isCorrect) {
  console.log(isCorrect ? "Correct!" : "Incorrect!");
  if (flashcard.classList.contains("flipped")) {
    flipCard();
    setTimeout(() => {
      generateEquation();
    }, 200);
  } else {
    generateEquation();
  }

  if (isCorrect) {
    stats[currentMultiplier].correct++;
  } else {
    stats[currentMultiplier].incorrect++;
  }

  document.querySelector(`#correct-count-${currentMultiplier}`).textContent =
    stats[currentMultiplier].correct;
  document.querySelector(`#incorrect-count-${currentMultiplier}`).textContent =
    stats[currentMultiplier].incorrect;
  totalCount =
    stats[currentMultiplier].incorrect + stats[currentMultiplier].correct;
  document.querySelector(`#total-count-${currentMultiplier}`).textContent =
    totalCount;
  scorePercent =
    (stats[currentMultiplier].correct /
      (stats[currentMultiplier].correct + stats[currentMultiplier].incorrect)) *
    100;
  document.querySelector(`#score-${currentMultiplier}`).textContent =
    scorePercent.toFixed(0) + "%";
}

flashcard.addEventListener("click", flipCard);

function generateEquation() {
  const num = Math.floor(Math.random() * 13);
  const answer = num * currentMultiplier;

  if (flashcard.classList.contains("flipped")) {
    flipCard();
  }

  front.innerHTML = `<h1 class="card-title pt-5" id="back-card">${currentMultiplier} x ${num}</h1>
                      <div class="align-bottom mt-4">
                      <i class="fa-solid fa-share fa-xl"></i>
                      </div>`;
  back.innerHTML = `<h1 class="card-title pt-5"></h1>
                    <div class="btn-wrapper text-center d-flex justify-content-between pt-3" id="score-buttons">
                     </div>`;

  setTimeout(() => {
    back.querySelector("h1").textContent = answer;
    back.querySelector(
      "#score-buttons"
    ).innerHTML = `<button class="btn btn-success correct-btn p-3 m-2" onclick="handleAnswer(true)"><i class="fa-solid fa-thumbs-up fa-xl" style="color: #fff;"></i></button>
    <button class="btn btn-danger incorrect-btn p-3 m-2" onclick="handleAnswer(false)"><i class="fa-solid fa-thumbs-down fa-xl" style="color: #fff;"></i></button>
    `;
  }, 300);

  // Get the starting button based on the initial value of currentMultiplier
  const multiplierButtons = document.querySelectorAll(".btn-primary");
  multiplierButtons.forEach((button) => {
    if (parseInt(button.textContent) === currentMultiplier) {
      button.classList.add("active");
    }
  });
}

function updateCards(num) {
  currentMultiplier = num;
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    if (parseInt(button.textContent) === num) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  document.querySelector(`#correct-count-${currentMultiplier}`).textContent =
    stats[currentMultiplier].correct;
  document.querySelector(`#incorrect-count-${currentMultiplier}`).textContent =
    stats[currentMultiplier].incorrect;
  totalCount =
    stats[currentMultiplier].incorrect + stats[currentMultiplier].correct;
  document.querySelector(`#total-count-${currentMultiplier}`).textContent =
    totalCount;

  scorePercent =
    (stats[currentMultiplier].correct /
      (stats[currentMultiplier].correct + stats[currentMultiplier].incorrect)) *
    100;
  document.querySelector(`#score-${currentMultiplier}`).textContent = isNaN(
    scorePercent
  )
    ? "0%"
    : scorePercent.toFixed(0) + "%";

  generateEquation();
}

generateEquation();
