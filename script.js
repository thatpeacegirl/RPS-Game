"use strict";

// working elements
const userChoice = document.querySelector(".your-choice");
const computerChoice = document.querySelector(".computer-choice");
const userScore = document.querySelector(".your--score");
const computerScore = document.querySelector(".computer--score");
const gameMessage = document.querySelector(".game__message");
const playBtns = document.querySelectorAll(".btn--play");
const resetBtn = document.querySelector(".btn--reset");
const btnWrapper = document.querySelector(".btn-wrapper");
const winnerMessageElem = document.querySelector(".game__winner");

// state variables
const gameChoices = ["rock", "paper", "scissors"];
let playerWin, computerWin;

// initial game state
const init = function () {
  userChoice.classList.add("hidden");
  computerChoice.classList.add("hidden");
  gameMessage.classList.add("hidden");

  playerWin = 0;
  computerWin = 0;

  // change display info
  userScore.textContent = playerWin;
  computerScore.textContent = computerWin;
  winnerMessageElem.style.display = "none";
  btnWrapper.classList.remove("hidden");
};

// call initial function
init();

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

// Get the winner of each round of the game
const getRoundWinner = function (info) {
  const [message, winner] = info;

  gameMessage.classList.remove("hidden");
  gameMessage.textContent = message;

  // increment winners variables
  if (winner === "player") {
    playerWin++;
    userScore.textContent = playerWin;
  } else if (winner === "computer") {
    computerWin++;
    computerScore.textContent = computerWin;
  }
};

// determine the winner of the game
const getGameWinner = function () {
  let winnerMessage;

  if (computerWin === playerWin) {
    winnerMessage = "No Winner - It's a tie!";
  } else if (playerWin > computerWin) {
    winnerMessage = "Game Winner - You!";
  } else {
    winnerMessage = "Game Winner - Computer!";
  }

  // Display and hide info
  winnerMessageElem.style.display = "block";
  winnerMessageElem.textContent = winnerMessage;
  btnWrapper.classList.add("hidden");
};

// play game and get winner
// the winner is the first player to win five rounds
const game = function (btn) {
  if (playerWin <= 5 && computerWin <= 5) {
    // get user choice and computer choice
    const computerSelection = getComputerChoice(gameChoices);
    const playerSelection = btn.textContent;

    // Display info
    userChoice.classList.remove("hidden");
    userChoice.textContent = playerSelection;
    computerChoice.classList.remove("hidden");
    computerChoice.textContent = capitalizeWord(computerSelection);

    // play a round of the game and get winner and message
    const gameInfo = playRound(playerSelection, computerSelection);
    getRoundWinner(gameInfo);

    // check if there is a winner
    if (playerWin === 5) {
      getGameWinner();
    } else if (computerWin === 5) {
      getGameWinner();
    }
  }
};

// play the game when you click any of the buttons
const playGame = function () {
  for (let i = 0; i < playBtns.length; i++) {
    const btn = playBtns[i];
    btn.addEventListener("click", function () {
      game(btn);
    });
  }
};

playGame();

// reset button

resetBtn.addEventListener("click", init);
