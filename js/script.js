//unordered list for guesses letters
const guessedLettersElement = document.querySelector(".guessed-letters");

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

//empty array contains all the letters that player already guessed
const guessedLetters = [];

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
    //prevent from refreshing page when button clicked
    e.preventDefault();
    //empty the message paragraph
    message.innerText = "";
    //grab what was entered in input below
    const guess = letterInput.value;
    //lets make sure it was a single letter
    const goodGuess = validateInput(guess);
    //console.log(goodGuess);
    if (goodGuess){
        makeGuess(guess);
     }   
    
    letterInput.value = "";
});

//validates input is single letter and returns correct input
const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0){
        message.innerText = "Please enter a letter.";
    } else if (input.lenght > 1){
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed this letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }  
        
    };