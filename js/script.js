//unordered list for guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");

//guess button
const guessButton = document.querySelector(".guess");

//word in progess appears in this paragraph
const wordProgress = document.querySelector(".word-in-progress");

//text input for letter guess
const letterInput = document.querySelector(".letter");

//remaining guess count paragraph
const remainingGuessesElement = document.querySelector(".remaining");

//span in remaing guess count paragraph
const remainingGuessesSpan = document.querySelector(".remaining span");

//paragraph with message display
const message = document.querySelector(".message");

//hidden message to play again at end of game
const playAgainButton = document.querySelector(".play-again");

//starting word
let word = "magnolia";
//empty array contains all the letters that player already guessed
let guessedLetters = [];
//maximum number of guesses
let remainingGuesses = 8;

//fetch data from API
const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //delimiter to separate words into an array
    const wordArray = words.split("\n");
    //select a random index in array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circleSymbol(word);
};

//the word for the game
getWord();



//circle symbol display function as placeholder for the word
const circleSymbol = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join(""); 
};

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
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1){
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter A to Z.";
    } else {
        return input;
    }
};

//check if guess is unique and show letters 
const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed this letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        countDownGuesses(guess);
        displayPreviousGuesses();
        updateProgress(guessedLetters);
    }  
        
    };

    //update li with letters guessed function
    const displayPreviousGuesses = function(){
        guessedLettersElement.innerHTML = "";
        for (const letter of guessedLetters){
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
        }
    };

    //update the hidden word function
    const updateProgress = function (guessedLetters){
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        const revealWord = [];
        for (const letter of wordArray){
            if (guessedLetters.includes(letter)){
                revealWord.push(letter.toUpperCase());
            } else {
                revealWord.push("●");
            }
        }
        wordProgress.innerText = revealWord.join("");
        checkIfWin();
    };


    // function to count down the remaining guesses
    const countDownGuesses = function(guess){
        const upperWord = word.toUpperCase();
        if (!upperWord.includes(guess)){
            message.innerText = `The word does not contain ${guess}. Try again.`;
            remainingGuesses -= 1; 
        } else {
            message.innerText = `Good guess! The word contains ${guess}.`;
        }
        
        if (remainingGuesses === 0){
            message.innerHTML = `Oh no! You have no more guesses. The word was <span class="highlight">${word}</span>.`;
            startOver();
        } else if (remainingGuesses === 1){
            remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
        } else {
            remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        }
    };


    //check if player wins function
    const checkIfWin = function(){
        if (word.toUpperCase() === wordProgress.innerText){
            message.classList.add("win");
            message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

            startOver();
        }
    };

    //function to hide and show elements at end of game
    const startOver = function(){
        guessButton.classList.add("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        playAgainButton.classList.remove("hide");
    };

    playAgainButton.addEventListener("click", function(){
        message.classList.remove("win");
        guessedLetters = [];
        remainingGuesses = 8;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        //removes the li that were appended to it
        guessedLettersElement.innerHTML = "";
        message.innerText = "";
        
        //grab a new word
        getWord();

        //show the correct elements
        guessButton.classList.remove("hide");
        playAgainButton.classList.add("hide");
        remainingGuessesElement.classList.remove("hide");
        guessedLettersElement.classList.remove("hide");
    });