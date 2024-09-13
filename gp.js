let score = 0;
let timeLeft = 30;
let timerInterval;
let correctAnswer;
let level = 1;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10 * level);
    const num2 = Math.floor(Math.random() * 10 * level);
    correctAnswer = num1 + num2;

    document.getElementById('question').textContent = `${num1} + ${num2}`;
    console.log(`Generated Question: ${num1} + ${num2}`);
    console.log(`Correct Answer: ${correctAnswer}`);
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function updateTimer() {
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const resultElement = document.getElementById('result');

    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Please enter a valid number.';
        resultElement.classList.add('incorrect');
        return;
    }

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.classList.remove('incorrect');
        score++;
        level = Math.floor(score / 5) + 1;
    } else {
        resultElement.textContent = 'Incorrect, try again.';
        resultElement.classList.add('incorrect');
    }

    updateScore();
    generateQuestion();
    document.getElementById('answer').value = '';
}

function endGame() {
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Final Score: ${score}`;
}

function restartGame() {
    score = 0;
    timeLeft = 30;
    level = 1;
    updateScore();
    updateTimer();
    document.getElementById('game-over').classList.add('hidden');
    generateQuestion();
    startTimer();
}

document.addEventListener('DOMContentLoaded', () => {
    generateQuestion();
    startTimer();
});
