const options = document.querySelectorAll(".options");

let answer = 0,
  numCorrect = 0,
  numWrong = 0,
  score = 0,
  isAnswerShown = false;

  function generateEquation() {
    const num1 = Math.floor(Math.random() * 13);
    const num2 = Math.floor(Math.random() * 13);
    const correctAnswer = num1 + num2;
    
    let allAnswers = [correctAnswer];
    while (allAnswers.length < options.length) {
      const newAnswer = correctAnswer + Math.floor(Math.random() * 11) - 5;
      if (newAnswer !== correctAnswer && !allAnswers.includes(newAnswer)) {
        allAnswers.push(newAnswer);
      }
    }
  
    allAnswers = allAnswers.sort(() => Math.random() - 0.5);
  
    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;
    answer = correctAnswer;
  
    options.forEach((option, index) => {
      option.innerHTML = allAnswers[index];
      option.addEventListener("click", checkAnswer);
    });
  
    isAnswerShown = false;
  }
  
  

function checkAnswer(event) {
  if (isAnswerShown) {
    generateEquation();
    return;
  }

  if (event.target.innerHTML == answer) {
    numCorrect++;
    event.target.classList.add("correct");
    setTimeout(() => {
      event.target.classList.remove("correct");
    }, 800);
  } else {
    numWrong++;
    event.target.classList.add("incorrect");
    setTimeout(() => {
      event.target.classList.remove("incorrect");
    }, 800);
  }

  score = (numCorrect / (numCorrect + numWrong)) * 100;

  updateScore();
  showAnswer();
}

function showAnswer() {
  const result = document.getElementById("result");
  result.innerHTML = answer;
  isAnswerShown = true;
  setTimeout(() => {
    generateEquation();
    result.innerHTML = "?";
    feedback.innerHTML = "";
  }, 800);
}

function updateScore() {
  document.getElementById("correct-count").innerHTML = numCorrect;
  document.getElementById("incorrect-count").innerHTML = numWrong;
  document.getElementById("score").innerHTML = Math.trunc(score) + "%";
}

generateEquation();
