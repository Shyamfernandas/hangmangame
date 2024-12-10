const words = ["javascript", "hangman", "programming", "developer", "coding"];
let selectedWord = "";
let guessedLetters = [];
let remainingLives = 6;

const wordDisplay = document.getElementById("word-display");
const wrongGuesses = document.getElementById("wrong-guesses");
const livesDisplay = document.querySelector("#lives span");
const keyboard = document.getElementById("keyboard");
const resetButton = document.getElementById("reset");

function startGame() {
    remainingLives = 6;
    guessedLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];

    wordDisplay.textContent = "_ ".repeat(selectedWord.length);
    wrongGuesses.textContent = "Wrong guesses: ";
    livesDisplay.textContent = remainingLives;

    createKeyboard();
}

function updateWordDisplay() {
    let display = "";
    for (let i = 0; i < selectedWord.length; i++) {
        const letter = selectedWord[i];
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display.trim();

    if (!display.includes("_")) {
        setTimeout(() => {
            alert("You win!");
            resetButton.style.display = "block"; // Show reset button
        }, 200);
    }
}

function updateWrongGuesses(letter) {
    if (!selectedWord.includes(letter)) {
        remainingLives--;
        livesDisplay.textContent = remainingLives;
        wrongGuesses.textContent += letter + " ";

        if (remainingLives === 0) {
            setTimeout(() => {
                alert("Game Over! The word was: " + selectedWord);
                resetButton.style.display = "block"; // Show reset button
            }, 200);
        }
    }
}

function handleKeyPress(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (selectedWord.includes(letter)) {
            updateWordDisplay();
        } else {
            updateWrongGuesses(letter);
        }
    }
}

function createKeyboard() {
    keyboard.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
        const button = document.createElement("button");
        button.textContent = alphabet[i];
        button.classList.add("key");
        button.addEventListener("click", () => {
            button.disabled = true;
            handleKeyPress(button.textContent);
        });
        keyboard.appendChild(button);
    }
}

resetButton.addEventListener("click", () => {
    resetButton.style.display = "none"; // Hide reset button after clicking
    startGame();
});

startGame();
