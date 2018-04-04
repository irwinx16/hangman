console.log('It works');

const wordList = [
	{
		"word":"kangaroo",
		"clue":"an animal"
	},
	{
		"word":"starbucks",
		"clue":"a corporation"
	},
	{
		"word":"macaroni",
		"clue":"a type of pasta"
	},
	{
		"word":"washington",
		"clue":"a state"
	},
	{
		"word":"turtle",
		"clue":"a reptile"
	},
	{
		"word":"engine",
		"clue":"a mechanical machine"
	},
	
];

$(document).ready(function() {

	let questionBank = new Array;
	let wordArray = new Array;
	let previousGuesses = new Array;
	let currentWord;
	let currentClue;
	let wrongAnswerCount;

for( let i = 0; i < wordList.length; i++) { 
	questionBank[i] = new Array;
	questionBank[i][0] = wordList[i].word;
	questionBank[i][1] = wordList[i].clue;
}
	titleScreen();	

function titleScreen() {
	
	$('#content').append('<div id="gameTitle">H A N G M A N</div><div id="startButton" class="button">BEGIN</div');
	$('#startButton').on('click', function () {
		gameScreen()
	});
}

function gameScreen () {
	$('#content').empty();
	$('#content').append('<div id="pixHolder"><img id="hangman" src="man.png"></div>');
	$('#content').append('<div id="wordHolder"></div>');
	$('#content').append('<div id="clueHolder"></div>')
	$('#content').append('<div id="guesses">previous Guesses:</div>');
	$('#content').append('<div id="feedback"></div>')

		getWord();
		let numberOfTiles = currentWord.length;
		wrongAnswerCount = 0;
		previousGuesses = [];

		for (let i = 0; i < numberOfTiles; i++) {
			$('#wordHolder').append('<div class="tile" id=t'+i+'></div');
		}
	$('#clueHolder').append("HINT: " + currentClue);

		$(document).on("keyup",handleKeyUp);
}

function getWord() {
	let rand = Math.floor(Math.random() *questionBank.length);
	currentWord = questionBank[rand][0];
	currentClue = questionBank[rand][1];
	questionBank.splice(rand,1);
	wordArray = currentWord.split("");
}

function handleKeyUp(event) {
	if(event.keyCode > 64 && event.keyCode < 91) {
		let found = false;
		let previouslyEntered = false;
		let input = String.fromCharCode(event.keyCode).toLowerCase();

		for (let i = 0; i < previousGuesses.length; i++) {
			if (input == previousGuesses[i]) {
				previouslyEntered = true;
			}
		}

			if (!previouslyEntered) {
				previousGuesses.push(input);

				for (let i = 0; i < wordArray.length; i++) {
					if (input == wordArray[i]) {
						found = true;
						$('#t' + i).append(input);
					}
				}
			} 
			if (found) {
				checkAnswer();
			} else {
				wrongAnswer(input);
			}
	}
}

function checkAnswer() {
	let currentAnswer = "";
	for (let i = 0; i < currentWord.length; i++) {
		currentAnswer += ($('#t' + i).text());
	}
	if (currentAnswer == currentWord) {
		victoryMessage();
	}
}

function wrongAnswer(a) {
	wrongAnswerCount++;
	let pos = (wrongAnswerCount*-75) + 'px'
	$('#guesses').append(" " + a);
	$('#hangman').css('left', pos);
	if (wrongAnswerCount == 6) {
		defeatMessage();
	}
}

function victoryMessage() {
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("CORRECT!<br><br><div id='replay' class='button'>CONTINUE</div>");
	alert("CONGRATULATION!")
	$('#replay').on('click', function() {
		if (questionBank.length > 0) {
			gameScreen()
		} else {
			finalPage()
		}
	})
}

function defeatMessage() {
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("You're Dead!<br>(Answer = "+ currentWord +"<div id='replay' class='button'>CONTINUE</div>");
	alert("YOU'RE DEAD!")
	$('#replay').on('click', function() {
		if (questionBank.length > 0) {
			gameScreen()
		} else {
			finalPage()
		}
	})
}

function finalPage() {
	$('#content').empty();
	$('#content').append('<div id="finalMessage"> You have finished all the words in the game!</div>')
}

});