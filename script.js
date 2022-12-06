const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("questions");
const answerButtonselement = document.getElementById("answer-buttons");
const challengeRules = document.getElementById("challenge-rules")

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add("hide")
    challengeRules.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        console.log(answer)
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonselement.appendChild(button)
    });
};

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonselement.firstChild) {
        answerButtonselement.removeChild(answerButtonselement.firstChild)
    }
} 

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonselement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }
    
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
};

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
};

const questions = [
    {
        question: "A very useful tool used for developing and debugging for printing content to the debugger is:",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "terminal / bash", correct: false},
            {text: "for loops", correct: false},
            {text: "console.log", correct: true},
        ]
    },  {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true},
        ]
    }, {
        question: "The condition in an if / else statement is enclosed within ________.",
        answers: [
            {text: "quotes", correct: false},
            {text: "parenthesis", correct: true},
            {text: "curly brackets", correct: false},
            {text: "square brackets", correct: false},
        ]
    }, {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "quotes", correct: true},
            {text: "parenthesis", correct: false},
        ]
    }, {
        question: "Commonly used Data Types do NOT Include",
        answers: [
           {text: "alerts", correct: true},
           {text: "strings", correct: false},
           {text: "booleans", correct: false},
           {text: "numbers", correct: false},
        ]
    }, 
];

secondsLeft = 60;

var timerInterval = setInterval(function() { 
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);


