"use strict";

const gameChoices = ["rock", "paper", "scissors"];

// capitalize the first letter of a word
const capitalizeWord = function (word) {
  // change the first character to uppercase
  const firstChar = word.charAt(0).toUpperCase();

  // concatenate the capitalized first letter and the
  // rest of the word
  const capWord = firstChar + word.slice(1, word.length);
  return capWord;
};

// get computer choice for game
const getComputerChoice = function (choiceArr) {
  // choose a random number between 0 and the length of the choice array
  const choiceIndex = Math.trunc(Math.random() * choiceArr.length);
  const computerChoice = choiceArr[choiceIndex];

  return computerChoice;
};

// play a game round
const playRound = function (playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  let message, winner;

  //check for round winner
  if (playerSelection === computerSelection) {
    message = "It's a tie for this round!";
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    message = "You win this round! Rock beats Scissors";
    winner = "player";
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    message = "You win this round! Paper beats Rock";
    winner = "player";
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    message = "You win this round! Scissors beats Paper";
    winner = "player";
  } else {
    message = `Computer wins this round! ${capitalizeWord(
      computerSelection
    )} beats ${capitalizeWord(playerSelection)}`;
    winner = "computer";
  }

  return [message, winner];
};

// play game and get winner after 5 rounds
const game = function () {
  // variables to track down number of wins
  let playerWin = 0,
    computerWin = 0;

  // play 5 rounds of the game
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt(
      "Enter your choice (Rock, Paper or Scissors)"
    );

    // play a round of the game and get winner and message
    const computerSelection = getComputerChoice(gameChoices);
    const gameInfo = playRound(playerSelection, computerSelection);
    const [message, winner] = gameInfo;

    console.log(message);

    // increment winners variables
    if (winner === "player") {
      playerWin++;
    } else if (winner === "computer") {
      computerWin++;
    }
  }

  // determine the winner of the game
  if (computerWin === playerWin) {
    console.log("No Winner - It's a tie!");
  } else if (playerWin > computerWin) {
    console.log("Game Winner - You");
  } else {
    console.log("Game Winner - Computer");
  }
};

game();
