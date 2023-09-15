const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const DataStore = require('data-store');
const store = new DataStore({ path: 'users.json' });

// Signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    // Check if the user already exists
    if (store.has(username)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store user data (username and hashed password)
    store.set(username, { username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Check if the user exists
    if (!store.has(username)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = store.get(username);
    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create a session or token and send it to the client
    // (In a real application, you would use a session library or JWT for this)
    res.status(200).json({ message: 'Login successful' });
});

// ... Existing Pomodoro Timer and Career Guidance Test routes ...
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


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
