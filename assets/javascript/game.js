
var wins = 0;
var losses = 0;
var guesses = 8;
var usedGuesses = 0;
var guessedLetter = [];
var a = "";
var wordIndex = 0;
var imgIndex = 0;
var play = true;


var wordsArray = ["apple", "orange", "up", "down", "baby", "book", "cycle", "sleepy", "jelly", "kite", "wave"];
var imageArray = ["apple.jpg", "orange.jpg", "up.png", "down.png", "baby.jpg", "book.jpg", "cycle.jpg", "sleepy.jpg", "jelly.jpg", "kite.jpg", "wave.jpg"];

// Randomly chooses a choice from the options array. This is the Computer's guess.
wordIndex = Math.floor(Math.random() * wordsArray.length);
imgIndex = wordIndex;
var computerGuess = wordsArray[wordIndex];

console.log("The Word is: ", computerGuess);
console.log("The word length is: ", computerGuess.length);

function drawLine() {
    a = "";
    for (var i = 0; i < computerGuess.length; i++) {
        a = a + "_";
    }
    document.getElementById("word").innerHTML = a;

}
drawLine();
document.getElementById("guessLeft").innerHTML = guesses;


document.onkeyup = function (event) {

    var key = event.keyCode;

    //Checks if the key pressed is an aplbhabet
    if ((key >= 65 && key <= 90)) {

        // Determines which key was pressed.
        var userGuess = (event.key).toLowerCase();

        if (play){
            document.getElementById("message").innerHTML = "Press any key to start!!";
            document.getElementById("matchingImg").src = "assets/images/questionmark.jpg";
        } 

        if(!guessedLetter.includes(userGuess))
        {
            usedGuesses++;
            guesses--;
            guessedLetter.push(userGuess);
            document.getElementById("guessLeft").innerHTML = guesses;

        }
        var indices = [];

        //Check whether userguessed letter is in the computer guessed word, if so take it's index
        for (var i = 0; i < computerGuess.length; i++) {
            if (computerGuess[i] === userGuess) {
                indices.push(i);
            }
        }
        //Display the matched letter in the guess word column
        for (var i = 0; i < indices.length; i++) {
            a = setCharAt(a, indices[i], userGuess);
            document.getElementById("word").innerHTML = a;
        }
        document.getElementById("guessedLetters").innerHTML = guessedLetter;

        if ((document.getElementById("word").innerHTML === computerGuess) && (usedGuesses <= 8)) {
            wins++;
            document.getElementById("guessedLetters").innerHTML = guessedLetter;
            document.getElementById("winScore").innerHTML = wins;
            console.log(imageArray[imgIndex]);
            var src = "assets/images/" + imageArray[imgIndex];
            document.getElementById("matchingImg").src = src;  
            //document.getElementById("message").innerHTML = "Press any key to start!!";
            reset();
        }

        if ((document.getElementById("word").innerHTML != computerGuess) && (usedGuesses == 8)) {
            losses++;
            document.getElementById("guessedLetters").innerHTML = guessedLetter;
            document.getElementById("loseScore").innerHTML = losses;
            var src = "assets/images/" + imageArray[imgIndex];
            document.getElementById("matchingImg").src = src;
            //document.getElementById("message").innerHTML = "Press any key to start!!";
            reset();            
        }
    }
    else {
        alert("Please press only alphabets!!");
    }

}

//Function to reset all the values
function reset() {
    usedGuesses = 0; // resets the number used guess
    guesses = 8; // resets the number of guesses left
    document.getElementById("guessLeft").innerHTML = guesses;
    wordIndex = Math.floor(Math.random() * wordsArray.length);
    imgIndex = wordIndex;
    computerGuess = wordsArray[wordIndex];
    drawLine();//resets the line
    console.log("Computer Guessed letter: " + computerGuess);
    guessedLetter = []; //clears the guessed letter array
    document.getElementById("guessedLetters").innerHTML = guessedLetter; //displays the new cleared array 
    play = true;    
    // document.getElementById("matchingImg").src = "assets/images/questionmark.jpg";

}

//Function to insert the correctly guessed letters in the blank
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

