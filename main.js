const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");
const startBtn = document.querySelector("#start-btn");

const createPlayer = (name) => {
  return { name };
};

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getPlayers();
});

function getPlayers() {
  const playerOne = createPlayer(playerOneName.value);
  playerOne.mark = "x";
  const playerTwo = createPlayer(playerTwoName.value);
  playerTwo.mark = "o";
  console.log(playerOne, playerTwo);
}
