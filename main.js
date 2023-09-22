const initPlayers = (() => {
  const playerOneName = document.querySelector("#playerOneName");
  const playerTwoName = document.querySelector("#playerTwoName");
  const startBtn = document.querySelector("#start-btn");

  function addEventListener() {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getPlayers();
      gamePlay.setTurn();
    });
  }
  const createPlayer = (name) => {
    return { name };
  };
  function getPlayers() {
    const playerOne = createPlayer(playerOneName.value);
    playerOne.mark = "x";
    const playerTwo = createPlayer(playerTwoName.value);
    playerTwo.mark = "o";
    console.log(playerOne, playerTwo);
  }

  return { addEventListener, getPlayers };
})();

initPlayers.addEventListener();

const gamePlay = (() => {
  const gameBoard = document.querySelector(".game-board");
  let circleTurn = false;

  function setTurn() {
    if (circleTurn) {
      gameBoard.classList.remove("x");
      gameBoard.classList.add("o");
    } else {
      gameBoard.classList.remove("o");
      gameBoard.classList.add("x");
    }
  }
  return { setTurn };
})();
