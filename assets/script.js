// connected all the elements from my html file to javascript so that javacript can communicate with my html file
let startButton = document.getElementById("startquiz");
let questionContainerEL = document.getElementById("question-container");
let questionEl = document.getElementById("question");
let scoreBox = document.getElementById("scorebox");
let A1 = document.getElementById('A');
let A2 = document.getElementById('B');
let A3 = document.getElementById('C');
let A4 = document.getElementById('D');
let tryAgain = document.getElementById("Try Again");
let highScoreContainer = document.getElementById("highscore-container");
var answerfeedback = document.getElementById("answerfeedback");
var score_container = document.getElementById("list-scores");

var timer = false;


var shuffledQuestions;
var currentQuestionsIndex = 0;
var user_score = 0;
var countdown = 60;

// made a function for when the game ends due to the timer reaching 0 seconds
function gameOver() {
  alert("Time is up!");
  clearInterval(timer);
  countdown = 60;
  questionContainerEL.classList.add("hide");
  scoreBox.innerText = "You scored:  " + user_score + "   out of 10";
  answerfeedback.innerText = "";
  currentQuestionsIndex = 0;
  highScoreContainer.classList.remove("hide");
}
// added event timers for the buttons added the functions to the clicks 
startButton.addEventListener("click", startGame);
tryAgain.addEventListener("click", tryAgainfnc);


function tryAgainfnc()
{
  clearInterval(timer);
  countdown = 60;
  currentQuestionsIndex = 0;
  startGame();
}
// function created once the start button is pressed 
function startGame() {
  answerfeedback.innerText = "";
  document.getElementById("Name").classList.remove("hide");
  document.getElementById("View Scores").classList.remove("hide");
  score_container.classList.add("hide");
  startButton.classList.add("hide");
  user_score = 0;
  highScoreContainer.classList.add("hide");
  questionContainerEL.classList.remove("hide");

  shuffledQuestions = questions.sort(() => Math.random() - .5);
  setNextQuestion();

  timer = setInterval(() => {
    countdown = countdown - 1;

    document.getElementById("timer").innerHTML = "00:" + countdown;
    if (countdown < 0 || countdown === 0) {
      gameOver();
    }
  }, 950);

}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionsIndex]);

  if (currentQuestionsIndex >= questions.length - 1) {
    gameOver();
  }
}

function showQuestion(question) {
  questionEl.innerText = question.question;

  A1.innerText = question.answers[0];
  A2.innerText = question.answers[1];
  A3.innerText = question.answers[2];
  A4.innerText = question.answers[3];

  A1.addEventListener("click", selectAnswer);
  A2.addEventListener("click", selectAnswer);
  A3.addEventListener("click", selectAnswer);
  A4.addEventListener("click", selectAnswer);
}
// made a function so that the computer can identify the correct answer based on the users button click
function selectAnswer(e) {
  const buttonAnswer = e.target.innerText;
  const currentQuestion = questions[currentQuestionsIndex];
  const answerText = currentQuestion.answers[currentQuestion.correctAnswer];
  
// feedback system to determine what action should be taken based on the answer being correct or incorrect
  currentQuestionsIndex++;
  if (buttonAnswer == answerText) {
    answerfeedback.style.color = "green";
    answerfeedback.innerText = "great that was the correct answer";
    user_score++;
  } else {
    answerfeedback.innerText = "sorry that was wrong 5 seconds have been deducted";
    answerfeedback.style.color = "red";
    countdown -= 5;
  }
  setNextQuestion();
  //console.log(user_score);
}
// added a high score feature to the code 
var highscores = JSON.parse(localStorage.getItem("highscores"));

const scoreview = document.getElementById("user-scores");
const viewScore = document.getElementById("View Scores");


viewScore.addEventListener("click", highScores);


function highScores() {
  let userName = document.getElementById("Name").value;

  if(highscores == undefined) {
    highscores = [];
  }

  highscores.push({'score': user_score, 'username': userName});

  localStorage["highscores"] = JSON.stringify(highscores);
  document.getElementById("Name").classList.add("hide");
  document.getElementById("View Scores").classList.add("hide");
  score_container.classList.remove("hide");

  highscores.sort(compare);

  for (const item in highscores) {
    if(highscores[item].username !== "" && highscores[item].score !== "") {
      score_container.insertAdjacentHTML('beforeend', "<p>"+ highscores[item].username + " - " + highscores[item].score+ "</p>");
    }
  }
}



function saveScorefnc()
{
  //console.log(localStorage);
}

// made a comparison of the high scores so the highest score always gets to the top
function compare(a, b) {
  if (a.score < b.score) return 1;
  if (b.score < a.score) return -1;

  return 0;
}

//nums.sort(compare);
