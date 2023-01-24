const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("questions");
const answerButtonsElement = document.getElementById("answer-buttons");
const challengeRules = document.getElementById("challenge-rules")
const initialsInput = document.getElementById("initialsInput")
const submitBtn = document.getElementById("submitBtn")
const endContainer = document.getElementById("endContainer")
const scoreList = document.getElementById("scoreList")
const scoreListContainer = document.getElementById("scoreListContainer")
let shuffledQuestions, currentQuestionIndex
var score = 0

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
    timerStart()
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
};

function gameScore(correct) {
    console.log("TEST")
    if (!correct) {
        score - 1
        secondsLeft -= 10
    } else {
        score += 2
    }
};

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset
    console.log(correct.correct)
    if (correct.correct === "true") {

        gameScore(correct.correct)
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)

    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }

};

function showQuestion(question) {
    console.log(currentQuestionIndex)
    if (currentQuestionIndex >= 4) {
        endGame()
    }
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
        answerButtonsElement.appendChild(button)
    });
};

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
};

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
};


const questions = [
    {
        question: "A very useful tool used for developing and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal / bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true },
        ]
    }, {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true },
        ]
    }, {
        question: "The condition in an if / else statement is enclosed within ________.",
        answers: [
            { text: "quotes", correct: false },
            { text: "parenthesis", correct: true },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false },
        ]
    }, {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parenthesis", correct: false },
        ]
    }, {
        question: "Commonly used Data Types do NOT Include",
        answers: [
            { text: "alerts", correct: true },
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "numbers", correct: false },
        ]
    },
];
var timerInterval
secondsLeft = 60;
function timerStart() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endGame()
        }
    }, 1000);

}
function endGame() {
    alert("game end")
    questionContainerElement.classList.add("hide")
    clearInterval(timerInterval)
    endContainer.classList.remove("hide")
    handlesScores()
    console.log(score)
}

function handlesScores() {
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault()
        console.log(initialsInput.value)
        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        var player = {
            name: initialsInput.value,
            score: score
        };

        highScores.push(player)
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
    })
}

// function incorrect() {
//     if (!answer.correct) {

//     };
// };



//arrays to save into local storage instead of an object, display for loop
//document.createElement