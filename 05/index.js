function initBoard() {
  const [columns, rows] = [8, 8];
  const board = [];
  for (let x = 0; x < rows; x++) {
    board.push([]);
    for (let y = 0; y < columns; y++) {
      board[x].push(0);
    }
  }
  console.log(board);
  const numberOfMines = 3;
  let placedMines = 0;

  while (placedMines < numberOfMines) {
    const [x, y] = [
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * columns),
    ];
    if (board[x][y] !== "#") {
      board[x][y] = "#";
      placedMines++;
    }
  }

  return { columns, rows, board };
}

document.addEventListener("DOMContentLoaded", () => {
  const { columns, rows } = initBoard();

  const root = document.querySelector(":root");
  root.style.setProperty("--board-size", columns);

  const boardElement = document.querySelector("#board");

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      const cell = document.createElement("span");
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.classList.add("cell");

      boardElement.appendChild(cell);
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
      const cell = event.target;
      console.log(`click on cell [${cell.dataset.x}, ${cell.dataset.y}]`);
    }
  });
});
