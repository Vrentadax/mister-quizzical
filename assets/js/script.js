// Array of objects for q&a?
// Start function that starts timer/quiz
// for loop function to cycle through questions if correct: next q / else next q & timer -- 5s
// end function check if qa array empty/timer === 0
// function to save hs - second script for loading hs.html scores?

var timerEl = document.getElementById('timer');
var quizEl = document.getElementById('quiz');

function timer() {
    var timeRemaining = 60;

    var timeInterval = setInterval(function() {
        timerEl.textContent = "Time Remaining: " + timeRemaining;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time's up!";
            // endQuiz();
        }
    }, 1000);
};

