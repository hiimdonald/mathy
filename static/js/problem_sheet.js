const form = document.getElementById("worksheet-form");
const worksheetContainer = document.getElementById("worksheet-container");

form.addEventListener("submit", generateWorksheet);

function generateWorksheet(event) {
  event.preventDefault();

  const problemTypes = [];
  const checkboxes = document.querySelectorAll(
    'input[name="problem-type"]:checked'
  );
  checkboxes.forEach((checkbox) => problemTypes.push(checkbox.value));

  const numProblems = document.getElementById("num-problems").value;

  // Generate the worksheet HTML
  let worksheetHTML = "";
  let answerHTML = "";
  for (let i = 0; i < numProblems; i++) {
    let problemType =
      problemTypes[Math.floor(Math.random() * problemTypes.length)];
    let { a, b, operator, answer } = generateProblem(problemType);
    worksheetHTML += `
      <div class="col g-1">
      <div class="card">
        <div class="text-start fw-medium fs-6 px-1 py-0">${i + 1}</div>
        <div class="card-body mx-auto pb-1 pt-0">
          <table class="table table-borderless table-sm d-flex">
            <tr>
              <td></td>
              <td class="text-end" width="40">
                <p class="card-text lh-1 fs-3">${a}</p>
              </td>
              <td></td>
            </tr>
            <tr>
              <td class="text-end pl-2 lh-1 fs-3" width="10">
                ${operator}
              </td>
              <td class="text-end">
                <p class="card-text lh-1 fs-3">${b}</p>
              </td>
            </tr>
            <tr>
              <td class="text-center pb-4" colspan="3" width="20">
                <hr
                  width="75"
                  class="border border-primary border-1 opacity-100 m-0 p-0"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
        `;
    answerHTML += `
    <div class="col-md-auto p-2">
        <span class="fw-semibold">${i + 1}.</span> ${answer}
      </div>
    `;
  }

  // Set the worksheet HTML and answer HTML as the content of the worksheet container
  worksheetContainer.innerHTML = `
  <h1 class="pb-3" >${problemTypes} Worksheet</h1>
    <div class="row row-cols-6 g-3">
    ${worksheetHTML}
    </div>
      `;

  const showAnswers = document.getElementById("show-answers");
  if (showAnswers.checked) {
    worksheetContainer.innerHTML += `
      <div class="row text-start  g-1 pt-4">
        ${answerHTML}
      </div>
    `;
  }

  // Open the print dialog for the worksheet container
  window.print();
}
