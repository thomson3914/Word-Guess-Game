// grab reference to my Dom Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $imageGuess = document.getElementById('image-guess');

//create variables for game
var wordBank = ['boston', 'dachshund', 'pomeranian', 'schnauzer', 'shih tzu', 'yorkie'];
var imageBank = ["assets/images/boston.jpg", "assets/images/dachshund.jpg", "assets/images/pom.jpg", "assets/images/schnauzer.jpg", "assets/images/shihtzu.jpg", "assets/images/yorkie.jpg"];

var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedImage = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// newGame function to reset all stats, pick new word and placeholders
function newGame() {
    //reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    console.log(wordBank.length);
    var index = Math.floor(Math.random() * wordBank.length); 
    
    //pick a new word
    pickedWord = wordBank[index];
    pickedImage = imageBank[index];

    console.log("pickedWord: " + pickedWord);

    // Create placeholder out of new pickedWord
    for (var i  = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ')
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    console.log("pickedImage: " + pickedImage);
    $("#image-guess").attr("src", pickedImage);        

    // Write all new game info to DOM 
  
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
}


// letterGuess function, takes in the letter you pressed and sees if it is in the selected words
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning  === true && guessedLetterBank.indexOf(letter) === -1) {
        // Run Game Logic
        guessedLetterBank.push(letter);

        // check if guessed letter is in my picked word
        for (var i = 0; i < pickedWord.length; i++) {
            // convert both values to lower case so i can compare them correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                //if a match, swap out that character in the placeholder with the actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join(' ');
        // Pass letter into our checkIncorrect function
        checkIncorrect(letter);

    } 
    else {
        if (!gameRunning) {
        alert("The game isnt running, click on the new game button to start over.");
        } else {
        alert("You've already guessed this letter, try a new one!");
        }
    }
}

// checkIncorrect(letter)
function checkIncorrect(letter) {
    //Check to see if letter didnt make it into our pickedwordplaceholder thus incorrect
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 
    && 
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
    // decrement guesses
    guessesLeft--;
    // add incorrect letter to incorrectletterbank
    incorrectLetterBank.push(letter);
    // write new bank of incorrect letter guessed to dom
    $guessedLetters.textContent = incorrectLetterBank.join(' ');
    // write new ammount of guesses left to dom
    $guessesLeft.textContent = guessesLeft;
    }
    // check to see if you lose
    checkLoss();
}

//checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    // check to see if you win
    checkWin();
}


//checkWin
function checkWin() {
    if(pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}

//Add event listener for new game button
$newGameButton.addEventListener('click', newGame);

//Add onkeyuo event to trigger letterGuess
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }

}


