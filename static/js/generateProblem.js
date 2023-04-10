function generateProblem(problemType) {
  let a, b, operator, answer;

  switch (problemType) {
    case "addition":
      a = Math.floor(Math.random() * 100);
      b = Math.floor(Math.random() * 100);
      operator = "+";
      answer = a + b;
      break;
    case "subtraction":
      a = Math.floor(Math.random() * 100);
      b = Math.floor(Math.random() * 100);
      if (a < b) {
        let temp = a;
        a = b;
        b = temp;
      }
      operator = "-";
      answer = a - b;
      break;
    case "multiplication":
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      operator = "×";
      answer = a * b;
      break;
    case "division":
      b = Math.floor(Math.random() * 12) + 1;
      answer = Math.floor(Math.random() * 12) + 1;
      a = b * answer;
      operator = "÷";
      break;
    default:
      return null;
  }

  return {
    a,
    b,
    operator,
    answer,
  };
}
