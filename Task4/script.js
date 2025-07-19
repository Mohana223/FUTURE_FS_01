let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const userGuess = parseInt(document.getElementById('guessInput').value);
  const message = document.getElementById('message');
  const attemptsDisplay = document.getElementById('attempts');

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "Please enter a number between 1 and 100!";
    message.style.color = "#ff0000";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (userGuess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}.`;
    message.style.color = "green";
  } else if (userGuess < secretNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "#a364af";
  } else {
    message.textContent = "Too high! Try again.";
    message.style.color = "#a364af";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById('message').textContent = "";
  document.getElementById('attempts').textContent = "Attempts: 0";
  document.getElementById('guessInput').value = "";
}
