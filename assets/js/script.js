// Array of objects for q&a?
// Start function that starts timer/quiz
// for loop function to cycle through questions if correct: next q / else next q & timer -- 5s
// end function check if qa array empty/timer === 0
// function to save hs - second script for loading hs.html scores?

var timeRemaining = 60;

var timerEl = document.getElementById('timer');
var quizEl = document.getElementById('quiz');


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
    var timeInterval = setInterval(function() {
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
    console.log(targetEl);

    if (targetEl.matches(".start-btn")) {
        timer();
        clearCard();
        theQuiz();
    }
    else if (targetEl.matches(".Green" || ".Xbox")) {
        // return true;
    }
    else if (targetEl.matches(!".Green" || !".Xbox")) {
        // return false;
    }
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
    for (var i = 0; i < questionsObj.length; i++) {
        console.log("Question #" + i);

        var cardContainerEl = document.createElement("div");
        cardContainerEl.className = "quiz-card";
        
        cardContainerEl.innerHTML = 
        "<h3 class='question'>" + questionsObj[i].question + "</h3>";

        quizEl.appendChild(cardContainerEl);

        for (var a = 0; a < questionsObj[i].answers.length; a++) {
            var answerButtonEl = document.createElement("button");
            answerButtonEl.textContent = questionsObj[i].answers[a];
            answerButtonEl.className = "btn " + questionsObj[i].answers[a];
            cardContainerEl.appendChild(answerButtonEl);
        }
    }
    // console.log("Wrong!");
    // timeRemaining -= 20;
};

function endQuiz() {
    clearCard();
    console.log("Game Over!");
};

function saveHighscore() {

};

quizEl.addEventListener("click", answerButtonHandler);

startQuiz();