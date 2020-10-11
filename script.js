// connected all the elements from my html file to javascript so that javacript can communicate with my html file
var startButton = document.getElementById("startquiz")
var nextButton = document.getElementById("nextbtn")
var questionContainerEL = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var scorebox = document.getElementById("scorebox")
var A1 = document.getElementById('A')
var A2 = document.getElementById('B')
var A3 = document.getElementById('C')
var A4 = document.getElementById('D')
var highScore = document.getElementById("highscore")
var highScoreContainer = document.getElementById("highscore-container")
var answerfeedback = document.getElementById("answerfeedback")

var shuffledQuestions
var currentQuestionsIndex = 0
var score = 0
var selectedButton

//used the below function to hide the highscores button until the game is completed
// once game completed user can click highscore and enter name to view scores.

function highFunction() {
  highScore.classList.add("hide")
}

highScore.addEventListener("click", function () {
  highScoreContainer.classList.remove("hide")
})

function gameOver(){
  clearInterval(timer);
  questionContainerEL.classList.add("hide")
  startButton.innerText = "Try Again"
  startButton.classList.remove("hide")
  highScore.classList.remove("hide")
  prompt("Please enter you name to view highscore")
  scorebox.innerText =""
  score = 0
  A1.classList.remove("btn2")
  A2.classList.remove("btn2")
  A3.classList.remove("btn2")
  A4.classList.remove("btn2")
  answerfeedback.innerText = ""
  
}

// added an event listener where by once the start button is clicked it disappears and then the actual quiz and timer pop for the user 

startButton.addEventListener("click", () => {

  startGame()
 
})

//console.log(startButton)



function startGame() {
  startButton.classList.add("hide")
  highScore.classList.add("hide")
  highScoreContainer.classList.add("hide")

  // added a function to generate questions randomly making it harder for the user to memorise 
  //the order of question if they want to retake the quiz

  shuffledQuestions = questions.sort(() => Math.random() - .5)
  questionContainerEL.classList.remove("hide")
  setNextQuestion()

  // timer set for 60 seconds once timer elapses an alertbox pops up advising user time is up I then changed the inner html of the start button
  // to try again so it restarts the quiz I also populate a high scores chart and a prompt to enter a name that is displayed against the high score

  var countdown = 60
  var timer = setInterval(() => {
    countdown = countdown - 1
    //console.log(countdown);
    document.getElementById("timer").innerHTML = "00:" + countdown
    if (countdown < 0) {
      clearInterval(timer);
      alert("Time is up!")
      gameOver()
    }
  }, 1000);




  //console.log('started')
 

}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionsIndex])

  if (currentQuestionsIndex >= questions.length - 1) {
    gameOver()

  }
  //console.log(setNextQuestion)
}

function showQuestion(question) {
  questionEl.innerText = question.question

  A1.innerText = question.answers[0]
  A2.innerText = question.answers[1]
  A3.innerText = question.answers[2]
  A4.innerText = question.answers[3]

  A1.addEventListener("click", selectAnswer);
  A2.addEventListener("click", selectAnswer);
  A3.addEventListener("click", selectAnswer);
  A4.addEventListener("click", selectAnswer);

}

function selectAnswer(e) {
  console.log(e)
  var buttonAnswer = e.target.innerText
  console.log(selectedButton)
  var currentQuestion = questions[currentQuestionsIndex];
  var answerText = currentQuestion.answers[currentQuestion.correctAnswer];
  if (buttonAnswer == answerText) {
    currentQuestionsIndex++
    setNextQuestion()
    answerfeedback.style.color="green";
    answerfeedback.innerText = "great that was the correct answer"
    score++
    scorebox.innerText = "Score:  " + score + "   out of 10"
  }

  else {
    currentQuestionsIndex++
    setNextQuestion()
    answerfeedback.style.color="red";
    // if user gets the wrong answer then 5 seconds is deducted.
    answerfeedback.innerText = "sorry that was wrong 5 seconds have been deducted"
    countdown -= 5;



  }
  
  //get highscore
  var highscores = JSON.parse(localStorage.getItem("highscores"));

  var scoreboard = {

    score : score
  
  }

  

  //console.log(selectAnswer);

}









