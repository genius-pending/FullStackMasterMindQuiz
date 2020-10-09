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

// added an event listener where by once the start button is clicked it disappears and then the actual quiz and timer pop for the user 

startButton.addEventListener("click", () => {
  
  startGame()
  A1.classList.remove("btn2")
  A2.classList.remove("btn2")
  A3.classList.remove("btn2")
  A4.classList.remove("btn2")
})

//console.log(startButton)

nextButton.addEventListener("click", () => {
  currentQuestionsIndex++
  setNextQuestion()
  A1.classList.remove("btn2")
  A2.classList.remove("btn2")
  A3.classList.remove("btn2")
  A4.classList.remove("btn2")
})

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
      questionContainerEL.classList.add("hide")
      startButton.innerText = "Try Again"
      startButton.classList.remove("hide")
      highScore.classList.remove("hide")
      prompt("Please enter you name to view highscore")



    }
  }, 1000);


  //});

  //console.log('started')

}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionsIndex])

  if (currentQuestionsIndex >= questions.length - 1) {
    questionContainerEL.classList.add("hide")
    startButton.innerText = "Try Again"
    startButton.classList.remove("hide")
    highScore.classList.remove("hide")
    prompt("Please enter you name to view highscore")
  }

}

function showQuestion(question) {
  questionEl.innerText = question.question

  A1.innerText = question.answers[0]
  A2.innerText = question.answers[1]
  A3.innerText = question.answers[2]
  A4.innerText = question.answers[3]

  A1.addEventListener("click", selectAnswer)
  A2.addEventListener("click", selectAnswer)
  A3.addEventListener("click", selectAnswer)
  A4.addEventListener("click", selectAnswer)

}

function selectAnswer(e) {
  console.log(e)
 var buttonAnswer = e.target.innerText
 e.target.classList.toggle("btn2")
 console.log(selectedButton)
 var currentQuestion= questions[currentQuestionsIndex]
 var answerText= currentQuestion.answers[currentQuestion.correctAnswer]
  if (buttonAnswer == answerText) {
    alert("correct answer")
    score++
    scorebox.innerText = "Score:  " +score+  "   out of 10"

  

  }

  else{
    
      countdown -= 5;
  
  }

  console.log(selectAnswer);

}


   //console.log(selectAnswer)




