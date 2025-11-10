document.addEventListener("DOMContentLoaded", function () {
  // array of box buttons
  let boxes = document.querySelectorAll(".box");

  let turn = document.querySelector("#turn-indicator");
  let resetBtn = document.querySelector("#reset-btn");
  let newGameBtn = document.querySelector("#new-btn");
  let resultContainer = document.querySelector(".result-container");
  let result = document.querySelector("#result");

  let turnO = true;
  let gameCount = 0;

  //   sounds
  const clickSound = new Audio("./sounds/click.mp3");
  const winSound = new Audio("./sounds/win.mp3");

  const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();

      // to show the turns of players alternatingly
      if (turnO) {
        box.innerText = "O";
        turnO = false;
        turn.innerText = "Player X's Turn";
      } else {
        box.innerText = "X";
        turnO = true;
        turn.innerText = "Player O's Turn";
      }
      box.disabled = true;
      gameCount++;

      checkWinner(gameCount);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
      resetGame();
    }
  });

  //   checking the winning condition
  const checkWinner = (gameCount) => {
    let winnerFound = false;
    // loop to check winner
    for (pattern of winningPattern) {
      let position1Value = boxes[pattern[0]].innerText;
      let position2Value = boxes[pattern[1]].innerText;
      let position3Value = boxes[pattern[2]].innerText;

      if (
        position1Value != "" &&
        position2Value != "" &&
        position3Value != ""
      ) {
        if (
          position1Value === position2Value &&
          position2Value == position3Value
        ) {
          winnerFound = true;
          highlightWinner(pattern);
          winSound.play();

          setTimeout(() => {
            showWinner(position1Value);
          }, 1000);
          break;
        }
      }
    }
    if (!winnerFound && gameCount === 9) {
      drawGame();
    }
  };

  //   highlighting the winning box
  const highlightWinner = (winPattern) => {
    winPattern.forEach((index) => {
      boxes[index].classList.add("winner");
    });
  };

  //   displaying the winner in UI
  const showWinner = (winner) => {
    result.innerText = `🥳Congratulations, Winner is ${winner}`;
    resultContainer.classList.remove("hide");
    turn.innerText = "";
    disableBoxes();
  };

  //   displaying graw game
  const drawGame = () => {
    result.innerText = "⚖️It's a Draw, Better luck next time!";
    resultContainer.classList.remove("hide");
    turn.innerText = "";
  };

  //   to disable all the boxes
  const disableBoxes = () => {
    for (box of boxes) {
      box.disabled = true;
    }
  };

  //   to enable all the boxes
  const enableBoxes = () => {
    for (box of boxes) {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("winner");
    }
  };

  //   to reset the game to initial state
  const resetGame = () => {
    turnO = true;
    gameCount = 0;
    enableBoxes();
    resultContainer.classList.add("hide");
    turn.innerText = "Player O's Turn";
  };

  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);
});
