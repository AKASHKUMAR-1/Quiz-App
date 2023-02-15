const quizQuestions = [
  {
    question: " In the India-Australia one day match, due to rain, India needed 324 runs in 48 overs to win. In initial 10 overs, the average scoring rate was 6, but in next 10 overs it increased to 8.5. It then declined to 5.5 in next 10 overs and again rose to 7 in next 10 overs. To win the match now what average is needed?",
    options: ["8.25", "6.75", "7.75", "7.0"],
    answerIndex: 1,
  },
  {
    question: "Average age of 7 family members is 75 years. But average age of 6 of them is 74 years 6 months. What is the age of the 7th family member?",
    options: ["75.5", "78", "68", "80"],
    answerIndex: 1,
  },
  {
    question: " Average age of 5 people is 42 years. Another group has 8 people who have average age of 81 years. When both groups are mixed what is average age of all people?",
    options: ["64 years", "66 years", "61.5 years", "70 years"],
    answerIndex: 1,
  },
  {
    question: "  Average age of 5 people in a family is 55 years. However it is seen that 3 of the 5 people also have an average age of 55 years. What will be the average age of remaining two people of the family?",
    options: ["82.5 years", "27.5 years", "55 years", "110 years"],
    answerIndex: 2,
  },
  {
    question: " Which of the following exactly denotes the average price of all the goods together if, Ramesh buys a number of goods of type A at price of Rs. E each, b number of goods of type B at price of Rs. F each and c number of goods of type C at price of Rs.G each?",
    options: ["(E+F+G) / (a+b+c)", "(AE+BF+CG) / (a+b+c)", " (aE+bF+cG) / (a+b+c)", " (aE+bF+cG) / (a+b+c)"],
    answerIndex: 2,
  },
    {
    question: " The average of fifty numbers is 28. If two numbers, namely 25 and 35 are discarded, the average of the remaining numbers is nearly,",
    options: ["29.27", "27.92", "27.29", "29.72"],
    answerIndex: 1,
  },
  {
    question: "The average of three numbers is 77. The first number is twice the second and the second number is twice the third. Find the first number.",
    options: ["33", "66", "77", "132"],
    answerIndex: 3,
  },
  {
    question: "  Average age of A and B is 30 years, that of B and C is 32 years and the average age of C and A is 34 years. The age of C is",
    options: ["33 years", "34 years", "35 years", "36 years"],
    answerIndex: 3,
  },
  {
    question: "3 boxes have some average weight. When one box which weighs 89 kg is replaced by another box, the average weight increases by 5 kg. How much the new box weighs?",
    options: ["109 kg", "94 kg", "104 kg", "84 kg"],
    answerIndex: 2,
  },
  {
    question: " Knowing that Vijay’s expenditure for first 3 days is Rs. 100, Rs. 125 and Rs. 85, what is his 4th day expenditure as his 4 days average expenditure Rs. 90?",
    options: ["220 rs", "60 rs", "50 rs", "90 rs"],
    answerIndex: 2,
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
