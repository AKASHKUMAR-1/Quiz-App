const quizQuestions = [
  {
    question:  " A's salary is 50% more than B's. How much percent is B's salary less than A's?",
    options: ["33(1/4)", "33(1/3)", "33(1/2)", "33%"],
    answerIndex: 3,
  },
  {
    question: " The price of cooking oil has increased by 25%. By what percent should a family reduce the consumption of cooking oil so as not to increase the expenditure in this account? ",
    options: ["20%", "25%", "18%", "16%"],
    answerIndex: 2,
  },
  {
    question: " Ramesh's salary was reduced by 10% and then the reduced salary was increased by 10%. What was his ultimate loss?",
    options: ["0%", "10%", "1%", "5%"],
    answerIndex: 3,
  },
  {
    question: " In a country 55% population is female. 80% of the male population is literate. How much of females are literate if total literacy is 58%?",
    options: ["45%", "55%", "40%", "22%"],
    answerIndex: 3,
  },
  {
    question: " Two numbers are less than a third number by 30% and 37% respectively. How much percent is the second number less than the first?",
    options: ["7%", "10%", "4%", "3%"],
    answerIndex: 0,
  },
    {
    question: " 40% of greater number is equal to 60% of the smaller. If their sum is 150, then the greater number is",
    options: ["70", "80", "90", "60"],
    answerIndex: 0,
  },
  {
    question: " If X% of Y is 100 and Y% of Z is 200, find a relation between X and Z.",
    options: ["z = x/2", "z = 2x", "x = z/4", "z = 4x"],
    answerIndex: 2,
  },
  {
    question: " If 20% of an electricity bill is deducted, then Rs. 100 is still to be paid. How much was the original bill?",
    options: ["110rs", "115rs", "120rs", "125rs"],
    answerIndex: 1,
  },
  {
    question: " 5% of 5% of Rs. 100 is",
    options: ["0.25rs.", "0.50rs", "10rs", "25rs"],
    answerIndex: 0,
  },
  {
    question: " A town has population of 50,000 in 1988. In one year i.e. by 1989 it increased by 25%. Next year i.e. in 1990, it decreased by 30%. The next year in 1991 there was an increase of 40%. What is the population at end of 1991?",
    options: ["60250", "62250", "66550", "61250"],
    answerIndex: 0,
  },
];

const totalNumberOfQuestions = quizQuestions.length;
let currentQuestionIndex = 0;
let score = 0;

let time;

const total_time = 10;
let sec = total_time;

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionCountDiv = document.getElementById("question-count");
const scoreDiv = document.getElementById("score");

const contentDiv = document.getElementsByClassName("content-div")[0];
const time_element = document.getElementById("timer");


nextButton.style.visibility = "hidden";
questionCountDiv.style.visibility = "hidden";
scoreDiv.style.visibility = "hidden";

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextButtonHandler);

function nextButtonHandler() {
  const userAnswer = document.querySelectorAll("[name='ans']:checked");

  if (userAnswer.length === 0) {
    contentDiv.style.backgroundColor = "red";

    return;
  }

  contentDiv.style.backgroundColor = "#f8c291";

  calculateScore(userAnswer);

  currentQuestionIndex++;

  if (currentQuestionIndex > totalNumberOfQuestions - 1) {
    //Last question has been reached. No more questions to display

    questionCountDiv.style.visibility = "hidden";
    scoreDiv.style.visibility = "hidden";

    contentDiv.innerHTML = `<div style="text-align:center;">You scored ${score} out of ${totalNumberOfQuestions}</div>`;
    nextButton.style.visibility = "hidden";
    return;
  }

  updateProgressBar();

  showQuestion();
}

function calculateScore(userAnswer) {
  quizQuestions[currentQuestionIndex].answerIndex;

  if (
    parseInt(userAnswer[0].value) ===
    quizQuestions[currentQuestionIndex].answerIndex
  ) {
    console.log("Correct Answer");
    score++;
  }
}

function timer(){
  time_element.innerHTML = sec;
  sec--;
  if(sec==0){
    sec = total_time;
    clearInterval(time);
    calculateScore();
    currentQuestionIndex++
    showQuestion();
  }
}

function startQuiz() {
  nextButton.style.visibility = "visible";
  questionCountDiv.style.visibility = "visible";
  scoreDiv.style.visibility = "visible";
  startButton.style.visibility = "hidden";

  updateProgressBar();

  showQuestion();
}




function showQuestion() {
  const questionDiv = document.createElement("div");

  questionDiv.innerText = `${currentQuestionIndex + 1}) ${
    quizQuestions[currentQuestionIndex].question
  }`;

  contentDiv.innerHTML = "";
  contentDiv.append(questionDiv);

  for (
    let index = 0;
    index < quizQuestions[currentQuestionIndex].options.length;
    index++
  ) {
    const option = quizQuestions[currentQuestionIndex].options[index];

    const optionDiv = document.createElement("div");
    const inputTextBox = document.createElement("input");
    const label = document.createElement("label");

    inputTextBox.type = "radio";
    inputTextBox.name = "ans";
    inputTextBox.id = `r${index}`;
    inputTextBox.value = index;
    optionDiv.append(inputTextBox);

    label.htmlFor = `r${index}`;
    label.innerText = option;
    optionDiv.append(label);

    contentDiv.append(optionDiv);

  
      sec = total_time;
      clearInterval(time);
      timer();
      time = setInterval(timer,1000);

  }
}

function updateProgressBar() {
  questionCountDiv.innerText = `Question ${
    currentQuestionIndex + 1
  }/${totalNumberOfQuestions}`;

  scoreDiv.innerText = `Score ${score}`;
}
