const initPlayers = (() => {
  const playerOneName = document.querySelector("#playerOneName");
  const playerTwoName = document.querySelector("#playerTwoName");
  const startBtn = document.querySelector("#start-btn");

  function addEventListener() {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getPlayers();
      gamePlay.updateTurnDisplay();
      placeMark.addEventListener();
      placeMark.setGameboardClass();
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
  function updateTurnDisplay() {
    const displayScreen = document.querySelector(".text-display");
    displayScreen.innerText = placeMark.circleTurn
      ? `Its ${initPlayers.getPlayers().playerTwo.getName()}'s turn`
      : `Its ${initPlayers.getPlayers().playerOne.getName()}'s turn`;
  }

  return { updateTurnDisplay };
})();

const placeMark = (() => {
  let circleTurn = false;
  function switchTurn() {
    circleTurn = !circleTurn;
  }
  const gameBoard = document.querySelector(".game-board");
  function addEventListener() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        e.target.classList.add(circleTurn ? "o" : "x");
        gamePlay.updateTurnDisplay();
        switchTurn();
        placeMark.setGameboardClass();
      });
    });
  }
  function setGameboardClass() {
    if (circleTurn) {
      gameBoard.classList.remove("x");
      gameBoard.classList.add("o");
    } else {
      gameBoard.classList.remove("o");
      gameBoard.classList.add("x");
    }
    console.log(circleTurn);
  }
  return { addEventListener, setGameboardClass, switchTurn };
})();
