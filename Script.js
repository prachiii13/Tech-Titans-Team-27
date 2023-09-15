// Pomodoro Timer
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function startPomodoroTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        document.getElementById("startTimer").textContent = "Pause";
    } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startTimer").textContent = "Resume";
    }
}

function resetPomodoroTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
    document.getElementById("startTimer").textContent = "Start";
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startTimer").textContent = "Start";
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const minutesDisplay = String(minutes).padStart(2, '0');
    const secondsDisplay = String(seconds).padStart(2, '0');
    document.getElementById("minutes").textContent = minutesDisplay;
    document.getElementById("seconds").textContent = secondsDisplay;
}

document.getElementById("startTimer").addEventListener("click", startPomodoroTimer);
document.getElementById("resetTimer").addEventListener("click", resetPomodoroTimer);

// Career Guidance Test
document.getElementById("submitAnswer").addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answer = selectedAnswer.value;
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Your suggest career path is: ${answer}`;
    }
});
