//DATA:
const questions = [
  {
    text: "Which language is primarily used for web app development?",
    options: ["C#", "Python", "JavaScript", "Swift"],
    correct: 2,
  },
  {
    text: "Which of the following is a relational database management system?",
    options: ["Oracle", "Scala", "Perl", "Java"],
    correct: 0,
  },
  {
    text: "In which language is memory management provided by JVM?",
    options: ["Java", "C", "C++", "Python"],
    correct: 0,
  },
  {
    text: "What does HTML stand for?",
    options: [
      "Hyperlink and Text Markup Language",
      "High Technology Modern Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
    ],
    correct: 2,
  },
];

//VARIABLES:
let currentQuestionIndex = 0;
let score = 0;

//QUERY SELECTORS:
const questionTitle = document.querySelector("#question");
const answerList = document.querySelector("#answer-list");
const submitButton = document.querySelector("#submit");
const nextButton = document.querySelector("#next");

//DISPLAY QUESTION AND ANSWER LIST:

function displayQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionTitle.innerText = question.text;
}

function displayOptions(questionIndex) {
  const question = questions[questionIndex];

  answerList.innerHTML = "";
  question.options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.className = `hover-effect`;
    listItem.innerHTML = `
      <input type="radio" id="option-${
        index + 1
      }" name="options" value="${option}" />
      <label for="option-${index + 1}">${option}</label>
    `;
    answerList.appendChild(listItem);
  });
}

//SHOW SUBMIT AND NEXT BUTTONS CONDITIONALLY.
function toggleButtons(isSubmitted) {
  submitButton.style.display = isSubmitted ? "none" : "inline";
  nextButton.style.display = isSubmitted ? "inline" : "none";
}

//CHECK ANSWERS:
function checkAnswer() {
  const selectedOption = document.querySelector(
    'input[type="radio"][name="options"]:checked'
  );

  if (!selectedOption) {
    alert("Please select an answer!");
    return;
  }

  const isCorrect = isOptionCorrect(selectedOption);
  if (isCorrect) score++;
  highlightOption(selectedOption, isCorrect);
  toggleButtons(true);
  disableRadioButtons();
}

function isOptionCorrect(selectedOption) {
  const selectedValue = selectedOption.value;
  console.log("selected value: ", selectedValue);
  const correctAnswer =
    questions[currentQuestionIndex].options[
      questions[currentQuestionIndex].correct
    ];
  console.log("correct answer:", correctAnswer);
  return selectedValue === correctAnswer;
}

function highlightOption(option, isCorrect) {
  option.parentElement.style.backgroundColor = isCorrect ? "lightgreen" : "red";
}

//HANDLE NEXT BUTTON:
function handleNextQuestion() {
  currentQuestionIndex++;
  console.log(currentQuestionIndex);
  if (currentQuestionIndex < questions.length) {
    console.log("jaldi");
    displayQuestion(currentQuestionIndex);
    displayOptions(currentQuestionIndex);
    toggleButtons(false);
    enableRadioButtons();
  } else {
    endQuiz();
  }
}

//ENABLE AND DISABLE RADIO BUTTONS:

function disableRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="options"]'
  );
  radioButtons.forEach((radioButton) => {
    radioButton.disabled = true;
  });
}

function enableRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="options"]'
  );
  radioButtons.forEach((radioButton) => {
    radioButton.disabled = false;
  });
}

//END QUIZ:
function endQuiz() {
  const totalQuestions = questions.length;
  const displayScore = `${score}/${totalQuestions}`;

  alert(`Quiz finished! Your score is: ${displayScore}`);
  submitButton.disabled = true; // Disable the submit button to prevent further submissions
  nextButton.disabled = true; // Disable the next button as the quiz has ended
}

function init() {
  displayQuestion(currentQuestionIndex);
  displayOptions(currentQuestionIndex);
  toggleButtons(false);

  //EVENT LISTENERS:
  submitButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", handleNextQuestion);
}

init();
