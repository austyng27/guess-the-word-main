//unordered list for guesses letters
const guessedLetters = document.querySelector(".guessed-letters");

//guess button
const guessButton = document.querySelector(".guess");

//word in progess appears in this paragraph
const wordProgress = document.querySelector(".word-in-progress");

//text input for letter guess
const letterInput = document.querySelector(".letter");

//remaining guess count paragraph
const remainingGuesses = document.querySelector(".remaining");

//span in remaing guess count paragraph
const remainingGuessesSpan = document.querySelector(".remaining span");

//paragraph with message display
const message = document.querySelector(".message");

//hidden message to play again at end of game
const playAgainButton = document.querySelector(".play-again");

//starting word
const word = "magnolia";

//circle symbol display function as placeholder for the word
const circleSymbol = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join(""); 
};

circleSymbol(word);

// click event for the guess button
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const typedGuess = letterInput.value;
    console.log(typedGuess);
    letterInput.value = "";
});