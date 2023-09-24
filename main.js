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
    console.log(playerOne.getName());
    console.log(playerTwo.getName());
    return { playerOne, playerTwo };
  }
  return { getPlayers, addEventListener };
})();

initPlayers.addEventListener();

const gamePlay = (() => {
  let circleTurn = false;
  const gameBoard = document.querySelector(".game-board");

  const showCircleTurn = () => {
    return circleTurn;
  };

  function switchTurn() {
    circleTurn = !circleTurn;
  }

  function addEventListener() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("x") ||
          e.target.classList.contains("o")
        )
          return;
        else {
          e.target.classList.add(circleTurn ? "o" : "x");
        }
        switchTurn();
        gamePlay.updateTurnDisplay();
        gamePlay.setGameboardClass();
        // displayWinner();
      });
    });
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
  };
})();

function displayWinner() {
  const winningText = document.querySelector(".winning-message");
  const winningScreen = document.querySelector(".winning-screen");

  winningText.innerText = gamePlay.showCircleTurn()
    ? `${initPlayers.getPlayers().playerOne.getName()} has won!`
    : `${initPlayers.getPlayers().playerTwo.getName()} has won!`;
  winningScreen.style.display = "flex";
}
