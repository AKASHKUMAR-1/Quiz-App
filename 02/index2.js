const quizQuestions = [
  {
    question: "1)   A person sold a stove for Rs. 423 and incurred a loss of 6%. At what price would it be sold so as to earn a profit of 8%?",
    options: ["RS.525", "Rs.500", "Rs.490", "Rs.486"],
    answerIndex: 3,
  },
  {
    question: "A fruit seller buys lemons at 2 for a rupee and sells then at 5 for three rupees. His gain percent is",
    options: ["10%", "15%", "20%", "25%"],
    answerIndex: 2,
  },
  {
    question: "A sells a car to B at 10% loss. If B sells it for Rs. 54000 and gains 20%, the cost price of the car for A was",
    options: ["Rs.25000", "Rs.50000", "Rs.37500", "Rs.60000"],
    answerIndex: 1,
  },
  {
    question: "Ramesh sold a statue for a price 25% higher than the original price of the statue. He had however bought the statue at 20% discount on the original price. With the profit of Rs. 2025, find the original price of the statue.",
    options: ["6000", "7500", "3500", "4500"],
    answerIndex: 3,
  },
  {
    question: " If selling price of 40 articles is equal to cost price of 50 articles, the loss or gain percent is",
    options: ["25% loss", "20% loss", "25%gain", "20%gain"],
    answerIndex: 2,
  },
    {
    question: "Two bicycles were sold for Rs. 3990 each, gaining 5% on one and losing 5% on the other. The gain or loss percent on the whole transaction is",
    options: ["neither gain nor loss", "2.5% gain", "2.5% loss", "0.25% loss"],
    answerIndex: 3,
  },
  {
    question: "The ratio of cost price and selling price is 4:5. The profit percent is",
    options: ["10%", "20%", "25%", "30%"],
    answerIndex: 2,
  },
  {
    question: " If a person sells a (sari) for Rs. 5200, making a profit of 30%, then the cost price of the sari is",
    options: ["4420", "4000", "3900", "3800"],
    answerIndex: 1,
  },
  {
    question: " A shopkeeper earns a profit of 15% after selling a book at 20% discount on the printed price. The ratio of the cost price and printed price of the book is?",
    options: ["20:23", "23:20", "16:23", "23:16"],
    answerIndex: 2,
  },
  {
    question: "Simran bought pet food worth Rs. 56000. She then sold 1/3rd of it incurring a loss of 40%. What profit she must earn on rest of the supplies to nullify this loss?",
    options: ["25%", "20%", "45%", "50%"],
    answerIndex: 1,
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
