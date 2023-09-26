const initPlayers = (() => {
  const playerOneName = document.querySelector("#playerOneName");
  const playerTwoName = document.querySelector("#playerTwoName");
  const startBtn = document.querySelector("#start-btn");

  function addEventListener() {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getPlayers();
      gamePlay.updateTurnDisplay();
      gamePlay.addEventListener();
      gamePlay.setGameboardClass();
    });
  }
  const createPlayer = (name) => {
    const getName = () => name;
    return { name, getName };
  };

  function getPlayers() {
    const playerOne = createPlayer(playerOneName.value);
    const playerTwo = createPlayer(playerTwoName.value);

    return { playerOne, playerTwo };
  }

  return { getPlayers, addEventListener };
})();

const cells = document.querySelectorAll(".cell");

function addEventListener() {
  cells.forEach((cell) => {
    cell.addEventListener("click", gamePlay.runGame);
  });
}

const gamePlay = (() => {
  let circleTurn = false;
  const gameBoard = document.querySelector(".game-board");

  function runGame(e) {
    if (e.target.classList.contains("x") || e.target.classList.contains("o"))
      return;
    else {
      e.target.classList.add(circleTurn ? "o" : "x");
    }
    if (checkWinnerMod.checkWin(checkWinnerMod.currentClass())) {
      checkWinnerMod.displayWinner();
    }
    if (checkWinnerMod.isDraw()) {
      //checkWinnerMod.displayWinner(draw);
      console.log("draw");
    }

    switchTurn();
    gamePlay.updateTurnDisplay();
    gamePlay.setGameboardClass();
  }

  const showCircleTurn = () => {
    return circleTurn;
  };

  function switchTurn() {
    circleTurn = !circleTurn;
  }

  function updateTurnDisplay() {
    const displayScreen = document.querySelector(".text-display");
    displayScreen.innerText = circleTurn
      ? `Its ${initPlayers.getPlayers().playerTwo.getName()}'s turn`
      : `Its ${initPlayers.getPlayers().playerOne.getName()}'s turn`;
  }

  function setGameboardClass() {
    if (circleTurn) {
      gameBoard.classList.remove("x");
      gameBoard.classList.add("o");
    } else {
      gameBoard.classList.remove("o");
      gameBoard.classList.add("x");
    }
  }
  return {
    addEventListener,
    setGameboardClass,
    switchTurn,
    updateTurnDisplay,
    showCircleTurn,
    circleTurn,
    cells,
    gameBoard,
    runGame,
  };
})();

const checkWinnerMod = (() => {
  const winningText = document.querySelector(".winning-message");
  const winningScreen = document.querySelector(".winning-screen");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function currentClass() {
    if (gamePlay.showCircleTurn()) {
      return "o";
    } else {
      return "x";
    }
  }

  function isDraw() {
    cells.forEach(
      (cell) => cell.classList.contains("x") || cell.classList.contains("o")
    );
  }

  function displayWinner(draw) {
    winningText.innerText = gamePlay.showCircleTurn()
      ? `${initPlayers.getPlayers().playerTwo.getName()} has won!`
      : `${initPlayers.getPlayers().playerOne.getName()} has won!`;
    winningScreen.style.display = "flex";
  }
  function checkWin(currentClass) {
    return winningCombos.some((combo) => {
      return combo.every((index) => {
        return gamePlay.cells[index].classList.contains(currentClass);
      });
    });
  }
  return {
    displayWinner,
    checkWin,
    currentClass,
    isDraw,
    winningScreen,
  };
})();

const restart = document.querySelector("#restart");
const displayScreen = document.querySelector(".text-display");
restart.addEventListener("click", () => {
  displayScreen.innerText = "Enter players names";
  checkWinnerMod.winningScreen.style.display = "none";
  gamePlay.cells.forEach((cell) => {
    cell.removeEventListener("click", gamePlay.runGame);
    clearNameInputs();
    cell.classList.remove("x") || cell.classList.remove("o");
  });
  gamePlay.gameBoard.classList.remove("x") ||
    gamePlay.gameBoard.classList.remove("o");

  function clearNameInputs() {
    playerOneName.value = "";
    playerTwoName.value = "";
  }
  return { clearNameInputs };
});

initPlayers.addEventListener();
