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

  correctCount.textContent = stats[currentMultiplier].correct;
  incorrectCount.textContent = stats[currentMultiplier].incorrect;
  scorePercent =
    (stats[currentMultiplier].correct /
      (stats[currentMultiplier].correct + stats[currentMultiplier].incorrect)) *
    100;
  score.textContent = scorePercent.toFixed(0) + "%";
}

flashcard.addEventListener("click", flipCard);

function createAnswerButton(isCorrect) {
  const button = document.createElement("button");
  button.className = isCorrect
    ? "btn btn-success correct-btn m-2"
    : "btn btn-danger incorrect-btn m-2";
  button.textContent = isCorrect ? "Correct" : "Incorrect";
  button.addEventListener("click", () => handleAnswer(isCorrect));
  return button;
}

function generateEquation() {
  const num = Math.floor(Math.random() * 13);
  const answer = num * currentMultiplier;

  if (flashcard.classList.contains("flipped")) {
    flipCard();
  }

  front.innerHTML = `<h1 class="card-title pt-5" id="back-card">${currentMultiplier} x ${num}</h1>
                      <div class="align-bottom mt-4">
                        (click to flip)
                      </div>`;
  back.innerHTML = `<h1 class="card-title pt-5">${answer}</h1>
                    <div class="btn-wrapper text-center d-flex justify-content-between pt-3" id="score-buttons">
                     </div>`;

  const correctButton = createAnswerButton(true);
  const incorrectButton = createAnswerButton(false);

  back.querySelector("#score-buttons").append(correctButton, incorrectButton);
}

function updateCards(num) {
  currentMultiplier = num;
  correctCount.textContent = stats[currentMultiplier].correct;
  incorrectCount.textContent = stats[currentMultiplier].incorrect;
  scorePercent =
    (stats[currentMultiplier].correct /
      (stats[currentMultiplier].correct + stats[currentMultiplier].incorrect)) *
    100;
  score.textContent = isNaN(scorePercent)
    ? "0%"
    : scorePercent.toFixed(0) + "%";
  generateEquation();
}

function selectButton(num) {
  const buttons = document.querySelectorAll(".multiplier-btn");
  buttons.forEach((button) => {
    if (parseInt(button.dataset.value) === num) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
  updateCards(num);
}

// Initialize the first button as selected
selectButton(currentMultiplier);
generateEquation();
