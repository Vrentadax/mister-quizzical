// Array of objects for q&a?
// Start function that starts timer/quiz
// for loop function to cycle through questions if correct: next q / else next q & timer -- 5s
// end function check if qa array empty/timer === 0
// function to save hs - second script for loading hs.html scores?

var timeRemaining = 60;
var questionNumber = 0;
var timeInterval;

var timerEl = document.getElementById('timer');
var quizEl = document.getElementById('quiz');
var resultEl = document.getElementById('result');


var questionsObj = [
    {
        "question": "What is my favorite color?",
        "answers": ["Green", "Black", "Purple"]
    },
    {
        "question": "My favorite console is:",
        "answers": ["Playstation", "Xbox", "Nintendo"]
    }
];
var highscore = [];

function timer() {
    timeInterval = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timeRemaining;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time's up!";
            endQuiz();
        }
    }, 1000);
};

function answerButtonHandler(event) {
    var targetEl = event.target;
    var result = document.createElement("div");
    console.log(targetEl);

    if (targetEl.matches(".start-btn")) {
        console.log(".start-btn pressed");
        timer();
    }
    else if (targetEl.matches(".Green") || 
    targetEl.matches(".Xbox")) {
        console.log("Correct!");
        result.innerHTML = "<h4 class=result>Correct!</h4>";
        resultEl.appendChild(result);
    }
    else if (targetEl.matches(".Black") || 
    targetEl.matches(".Purple") || 
    targetEl.matches(".Playstation") ||
    targetEl.matches(".Nintendo")) {
        console.log("Wrong!");
        timeRemaining -= 10;
        result.innerHTML = "<h4 class=result>Wrong!</h4>";
        resultEl.appendChild(result);
    }
    
    clearCard();
    theQuiz();
};

function clearCard() {
    var cardSelect = document.querySelector(
        ".quiz-card"
    );
    cardSelect.remove();
};

function startQuiz() {
    console.log("Start!");
    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "quiz-card";

    cardContainerEl.innerHTML =
        "<h3 class='welcome'>'Welcome!'</h3><br><p>'Ready to test your knowlege? Click the start button and let's find out!</p>";

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start!";
    startButtonEl.className = "btn start-btn";

    quizEl.appendChild(cardContainerEl);
    cardContainerEl.appendChild(startButtonEl);
};

function theQuiz() {

    if (questionNumber >= questionsObj.length) {
        endQuiz();
    }
    else {
        console.log("Question #" + questionNumber);

        var cardContainerEl = document.createElement("div");
        cardContainerEl.className = "quiz-card";

        cardContainerEl.innerHTML =
            "<h3 class='question'>" + questionsObj[questionNumber].question + "</h3>";

        quizEl.appendChild(cardContainerEl);

        for (var a = 0; a < questionsObj[questionNumber].answers.length; a++) {
            var answerButtonEl = document.createElement("button");
            answerButtonEl.textContent = questionsObj[questionNumber].answers[a];
            answerButtonEl.className = "btn " + questionsObj[questionNumber].answers[a];
            cardContainerEl.appendChild(answerButtonEl);
        }

        questionNumber++;
    }

};

function endQuiz() {
    console.log("Game Over!");
    clearInterval(timeInterval);
};

function saveHighscore() {

};

quizEl.addEventListener("click", answerButtonHandler);

startQuiz();