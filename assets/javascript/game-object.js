// grab reference to my Dom Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// create object variables
var game = {
    wordBank: ['morkie', 'labradoodle', 'maltipoo', 'cavapoo', 'shorkie', 'teddybear', 'schnoodle'],
    imageBank: ["../images/"]
    wins: 0,
    losses: 0,
    guessesLeft: 8,
    gameRunning: false,
    pickedWord: '',
    pickedWordPlaceholderArr: [],
    guessedLetterBank: [],
    incorrectLetterBank: [], 

    // newGame 
    newGame: function() {
        //reset all game info
        this.gameRunning = true;
        this.guessesLeft = 8;
        this.guessedLetterBank = [];
        this.incorrectLetterBank = [];
        this.pickedWordPlaceholderArr = []; 

        //pick a new word
        this.pickedWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        // Create placeholder out of new pickedWord
        console.log("this.pickedWord" + this.pickedWord);
        for (var i = 0; i < this.pickedWord.length; i++) {
            if (this.pickedWord[i] === ' ') {
                this.pickedWordPlaceholderArr.push(' ');
            } else {
                this.pickedWordPlaceholderArr.push('_');
            }
        }

        // Write all new game info to DOM
        $guessesLeft.textContent = this.guessesLeft;
        $placeholders.textContent = this.pickedWordPlaceholderArr.join('');
        $guessedLetters.textContent = this.incorrectLetterBank;       
    },


    letterGuess: function(letter) {
        if (this.gameRunning  === true && this.guessedLetterBank.indexOf(letter) === -1) {
            // Run Game Logic
            this.guessedLetterBank.push(letter);
    
            // check if guessed letter is in my picked word
            for (var i = 0; i < this.pickedWord.length; i++) {
                // convert both values to lower case so i can compare them correctly
                if (this.pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                    //if a match, swap out that character in the placeholder with the actual letter
                    this.pickedWordPlaceholderArr[i] = this.pickedWord[i];
                }
            }
            $placeholders.textContent = this.pickedWordPlaceholderArr.join('');
            // Pass letter into our checkIncorrect function
            this.checkIncorrect(letter);
    
        } 
        else {
            if (!this.gameRunning) {
                alert("The game isnt running, click on the new game button to start over.");
            } else {
                alert("You've already guessed this letter, try a new one!");
            }
        }
    },

    // checkIncorrect(letter)
    checkIncorrect: function(letter) {
        //Check to see if letter didnt make it into our pickedwordplaceholder thus incorrect
        if (this.pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && 
        this.pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1)  {
        // decrement guesses
        this.guessesLeft--;
        // add incorrect letter to incorrectletyterbank
        this.incorrectLetterBank.push(letter);
        // write new bank of incorrect letter guessed to dom
        $guessedLetters.textContent = this.incorrectLetterBank.join('');
        // write new ammount of guesses left to dom
        $guessesLeft.textContent = this.guessesLeft;
        }
        // check to see if you lose
        this.checkLoss();
    },
    
    //checkLoss
    checkLoss: function() {
        // Check if you lose
        if (this.guessesLeft === 0) {
            this.losses++;
            //end game
            this.gameRunning = false;
            $losses.textContent = this.losses;
            $placeholders.textContent = this.pickedWord;
        }
        // check to see if you win
        this.checkWin();
    },


    //checkWin
    checkWin: function() {
        if(this.pickedWord.toLowerCase() === this.pickedWordPlaceholderArr.join("").toLowerCase())
        {
            this.wins++;
            // end game
            this.gameRunning = false;
            $wins.textContent = this.wins;
        }
    },

};

//Add event listener for new game button
$newGameButton.addEventListener('click', function() {
    game.newGame();
});

//Add onkeyuo event to trigger letterGuess
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        game.letterGuess(event.key);
    }

};


