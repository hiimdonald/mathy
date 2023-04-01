const options = document.querySelectorAll(".options"),
  feedback = document.getElementById("answer-feedback");

let answer = 0,
  numCorrect = 0,
  numWrong = 0,
  isAnswerShown = false;

function generateEquation() {
  const num1 = Math.floor(Math.random() * 13),
    num2 = Math.floor(Math.random() * 13),
    dummyAnswer1 = Math.floor(Math.random() * 10),
    dummyAnswer2 = Math.floor(Math.random() * 10),
    allAnswers = [],
    switchAnswers = [];

  answer = eval(num1 + num2);

  document.getElementById("num1").innerHTML = num1;
  document.getElementById("num2").innerHTML = num2;

  allAnswers.push(answer);
  allAnswers.push(dummyAnswer1);
  allAnswers.push(dummyAnswer2);

  for (let i = allAnswers.length; i--;) {
    switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
  };

  options.forEach((option, index) => {
    option.innerHTML = switchAnswers[index];
    option.addEventListener("click", checkAnswer);
  });
  
  isAnswerShown = false;
}

function checkAnswer(event) {
  if (isAnswerShown) {
    generateEquation();
    feedback.innerHTML = "";
    return;
  }

  if (event.target.innerHTML == answer) {
    feedback.innerHTML = "Correct!";
    numCorrect++;
  } else {
    feedback.innerHTML = "Try Again";
    numWrong++;
  }

  updateScore();
  showAnswer();
}

function showAnswer() {
  const result = document.getElementById("result");
  result.innerHTML = answer;
  feedback.innerHTML = "The correct answer is shown.";
  isAnswerShown = true;
  setTimeout(() => {
    generateEquation();
    result.innerHTML = "?";
    feedback.innerHTML = "";
  }, 1500);
}

function updateScore() {
  document.getElementById("correct-count").innerHTML = "Number Correct: " + numCorrect;
  document.getElementById("incorrect-count").innerHTML = "Number Wrong: " + numWrong;
}

generateEquation();
