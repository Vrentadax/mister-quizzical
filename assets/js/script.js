var timeRemaining = 60;
var questionNumber = 0;
var timeInterval;

var timerEl = document.getElementById('timer');
var quizEl = document.getElementById('quiz');
var resultEl = document.getElementById('result');
var highscoreEl = document.getElementById('highscore');

var highscore;

var questionsObj = [
    {
        "question": "Commonly used data types DO NOT include:",
        "answers": ["Strings", "Booleans", "Alerts"]
    },
    {
        "question": "String values are enclosed in:",
        "answers": ["Parenthesis", "Quotes", "Commas"]
    },
    {
        "question": "When declaring a varible you use:",
        "answers": ["Var", "Variable", "Assign"]
    },
    {
        "question": "Which of these is NOT used in interval methods?:",
        "answers": ["setInterval", "addInterval", "clearInterval"]
    }
];

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
    result.innerHTML = "<h4 class=result>''</h4>";
    resultEl.appendChild(result);
    // console.log(targetEl);

    var resultRefresh = document.querySelector(
        ".result"
    );
    if (resultRefresh) {
        resultRefresh.remove();
    }

    if (targetEl.matches(".start-btn")) {
        console.log(".start-btn pressed");

        timer();
        clearCard();
        theQuiz();

    }
    else if (targetEl.matches(".highscore-btn")) {
        loadHighscore();
    }
    else if (targetEl.matches(".Alerts") ||
        targetEl.matches(".Quotes") ||
        targetEl.matches(".Var") ||
        targetEl.matches(".addInterval")) {
        console.log("Correct!");
        result.innerHTML = "<h4 class=result>Correct!</h4>";
        resultEl.appendChild(result);
        clearCard();
        theQuiz();

    }
    else if (targetEl.matches(".Strings") ||
        targetEl.matches(".Booleans") ||
        targetEl.matches(".Parenthesis") ||
        targetEl.matches(".Commas") ||
        targetEl.matches(".Variable") ||
        targetEl.matches(".Assign") ||
        targetEl.matches(".setInterval") ||
        targetEl.matches(".clearInterval")) {
        console.log("Wrong!");
        timeRemaining -= 10;
        console.log(timeRemaining);
        result.innerHTML = "<h4 class=result>Wrong!</h4>";
        resultEl.appendChild(result);
        clearCard();
        theQuiz();

    }
    else if (targetEl.matches(".save-initials")) {
        var initialsInput = document.querySelector("input[name='initials'").value;

        var highscoreObj = {
            initials: initialsInput,
            time: timeRemaining,
        };
        highscore.push(highscoreObj);
        localStorage.setItem("highscore", JSON.stringify(highscore));
        loadHighscore();
    }
    else if (targetEl.matches(".return-btn")) {
        clearCard();
        startQuiz();
    }
    else if (targetEl.matches(".clear-btn")) {
        highscore = [];
        localStorage.setItem("highscore", JSON.stringify(highscore));
        loadHighscore();
    }
};

function clearCard() {
    var cardSelect = document.querySelector(
        ".quiz-card"
    );
    cardSelect.remove();
};

function initialize() {
    // debugger
    highscore = [];
    var savedHighscore = localStorage.getItem("highscore");
    savedHighscore = JSON.parse(savedHighscore);

    for (var i = 0; i < savedHighscore.length; i++) {
        highscore.push(savedHighscore[i]);
    }


    startQuiz();
};

function startQuiz() {
    console.log("Start!");
    timeRemaining = 60;
    questionNumber = 0;
    timerEl.textContent = "Time Remaining: " + timeRemaining;

    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "quiz-card";

    cardContainerEl.innerHTML =
        "<h3 class='welcome'>'Welcome!'</h3><br><p>'Ready to test your knowlege? Click the start button and let's find out!</p>";

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start!";
    startButtonEl.className = "btn start-btn";

    var highscoreButtonEl = document.createElement("button");
    highscoreButtonEl.textContent = "Highscores";
    highscoreButtonEl.className = "btn highscore-btn";

    quizEl.appendChild(cardContainerEl);
    cardContainerEl.appendChild(startButtonEl);
    cardContainerEl.appendChild(highscoreButtonEl);
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
    timerEl.textContent = "Time Remaining: " + timeRemaining;
    resultEl.remove();


    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "quiz-card";

    cardContainerEl.innerHTML =
        "<h3 class='question'>Game Over!</h3><br><p>You finished with a score of " + timeRemaining + "!</p><br><input type='text' name='initials' placeholder='Enter Your Initials!'><br><button class='btn save-initials' type='submit'>Submit!</button>";

    quizEl.appendChild(cardContainerEl);

};

function loadHighscore() {
    clearCard();

    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "quiz-card";
    var cardListEl = document.createElement("ol");

    var returnButtonEl = document.createElement("button");
    returnButtonEl.textContent = "Return";
    returnButtonEl.className = "btn return-btn";

    var clearHighscoreEl = document.createElement("button");
    clearHighscoreEl.textContent = "Clear";
    clearHighscoreEl.className = "btn clear-btn";

    var savedHighscore = localStorage.getItem("highscore");
    // if there are no highscores, set highscores to an empty array and return out of the function
    if (!savedHighscore) {
        cardContainerEl.innerHTML =
            "<h3 class='question'>Oops! Looks like no scores are here yet!</h3>";

        quizEl.appendChild(cardContainerEl);

        cardContainerEl.appendChild(returnButtonEl);
        return false;
    }
    console.log("Saved highscores found!");
    // else, load up saved highscores

    // parse into array of objects
    savedHighscore = JSON.parse(savedHighscore);

    cardContainerEl.appendChild(cardListEl);
    quizEl.appendChild(cardContainerEl);

    // loop through highscore array
    // debugger;
    for (var i = 0; i < savedHighscore.length; i++) {
        // create card to display scores
        var cardLiEl = document.createElement("li");
        cardLiEl.innerHTML =
            "<h3 class='highscore'>" + savedHighscore[i].initials + '  ||  ' + savedHighscore[i].time + "</h3>";

        cardListEl.appendChild(cardLiEl);
    }
    cardContainerEl.appendChild(returnButtonEl);
    cardContainerEl.appendChild(clearHighscoreEl);
};

quizEl.addEventListener("click", answerButtonHandler);

initialize();