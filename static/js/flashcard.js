const flashcard = document.querySelector(".card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const correctCount = document.querySelector("#correct-count");
const incorrectCount = document.querySelector("#incorrect-count");
const score = document.querySelector("#score");
let correct = 0;
let incorrect = 0;
let scorePercent = 0;

function flipCard() {
  flashcard.classList.toggle("flipped");
}

function handleAnswer(isCorrect) {
  console.log(isCorrect ? "Correct!" : "Incorrect!");
  if (flashcard.classList.contains("flipped")) {
    flipCard();
    setTimeout(() => {
      generateProblem();
    }, 300);
  } else {
    generateProblem();
  }
  isCorrect ? correct++ : incorrect++;
  correctCount.textContent = correct;
  incorrectCount.textContent = incorrect;
  scorePercent = (correct / (correct + incorrect)) * 100;
  score.textContent = scorePercent.toFixed(0) + "%";
}

flashcard.addEventListener("click", flipCard);

function generateProblem() {
  const num1 = Math.floor(Math.random() * 13);
  const num2 = Math.floor(Math.random() * 13);
  const answer = num1 + num2;

  if (flashcard.classList.contains("flipped")) {
    flipCard();
  }

  front.innerHTML = `<h1 class="card-title pt-5" id="back-card">${num1} + ${num2}</h1>
                      <div class="align-bottom mt-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" transform="rotate(90)"><path d="M17 8V13C17 16.3137 14.3137 19 11 19C7.68629 19 5 16.3137 5 13V4H3V13C3 17.4183 6.58172 21 11 21C15.4183 21 19 17.4183 19 13V8H23L18 2L13 8H17Z" fill="#000"></path></svg>                      </div>`;
  back.innerHTML = `<h1 class="card-title pt-5"></h1>
                    <div class="btn-wrapper text-center d-flex justify-content-between pt-3" id="score-buttons">
                     </div>`;

  setTimeout(() => {
    back.querySelector("h1").textContent = answer;
    back.querySelector(
      "#score-buttons"
    ).innerHTML = `<button class="btn btn-success correct-btn m-2" onclick="handleAnswer(true)">Correct</button>
    <button class="btn btn-danger incorrect-btn m-2" onclick="handleAnswer(false)">Incorrect</button>
    `;
  }, 300);
}

generateProblem();
