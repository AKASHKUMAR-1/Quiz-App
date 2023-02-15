const quizQuestions = [
  {
    question: "If two pipes function simultaneously, tbe reservoir will be filled in 12 hours. One pipe fills the reservoir 10 hours faster than tbe otber. How many hours does it take the second pipe to fill the reservoir?",
    options: ["45hr", "17hr", "40", "30hr"],
    answerIndex: 3,
  },
  {
    question: " A cistern has two taps which fill it in 12 minutes and 15minutes respectively. There is also a waste pipe in the cistern. When all the 3 are opened , the empty cistern is full in 20 minutes. How long will the waste pipe take to empty the full cistern?",
    options: ["20min", "40min", "10min", "5min"],
    answerIndex: 2,
  },
  {
    question: "If two pipes function simultaneously, tbe reservoir will be filled in 12 hours. One pipe fills the reservoir 10 hours faster than tbe otber. How many hours does it take the second pipe to fill the reservoir?",
    options: ["45hr", "17hr", "40", "30hr"],
    answerIndex: 3,
  },
  {
    question: " Two pipes can fill a tank in 10hours and 12 hours respectively while a third, pipe empties the full tank in 20 hours. If all the three pipes operate simultaneously, in how much time will the tank be filled?",
    options: ["10hrs 10min", "5hrs 50min", "8hrs 50min", "7hrs 30min"],
    answerIndex: 3,
  },
  {
    question: " An electric pump can fill a tank in 3 hours. Because of a leak in ,the tank it took 3(1/2) hours to fill the tank. If the tank is full, how much time will the leak take to empty it ?",
    options: ["21hrs", "12hrs", "10hrs", "32hrs"],
    answerIndex: 0,
  },
    {
    question: "Two pipes A and B can fill a tank in 36 min. and 45 min. respectively. A water pipe C can empty the tank in 30 min. First A and B are opened. after 7 min,C is also opened. In how much time, the tank is full?",
    options: ["39min", "40min", "45min", "50min"],
    answerIndex: 0,
  },
  {
    question: " Two pipes can fill a cistern in 14 hours and 16 hours respectively. The pipes are opened simultaneously and it is found that due to leakage in the bottom it took 32 minutes more to fill the cistern.When the cistern is full, in what time will the leak empty it?",
    options: ["20hrs", "90hrs", "112hrs", "78hrs"],
    answerIndex: 2,
  },
  {
    question: "Two pipes A,B can fill a tank in 24 min. and 32 min. respectively. If both the pipes are opened simultaneously, after how much time B should be closed so that the tank is full in 18 min.?",
    options: ["10min", "8min", "6min", "12min"],
    answerIndex: 1,
  },
  {
    question: " An electric pump can fill a tank in 3 hours. Because of a leak in ,the tank it took 3(1/2) hours to fill the tank. If the tank is full, how much time will the leak take to empty it ?",
    options: ["21hrs", "12hrs", "10hrs", "32hrs"],
    answerIndex: 0,
  },
  {
    question: " An electric pump can fill a tank in 3 hours. Because of a leak in ,the tank it took 3(1/2) hours to fill the tank. If the tank is full, how much time will the leak take to empty it ?",
    options: ["21hrs", "12hrs", "10hrs", "32hrs"],
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
