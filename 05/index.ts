function initBoard() {
  const [columns, rows] = [8, 8];
  const board: string[][] = [];
  for (let x = 0; x < rows; x++) {
    board.push([]);
    for (let y = 0; y < columns; y++) {
      board[x].push("0");
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

  const root = document.querySelector<HTMLElement>(":root");
  if (!root) {
    throw new Error("could not get root element");
  }
  root.style.setProperty("--board-size", columns.toString());

  const boardElement = document.querySelector<HTMLDivElement>("#board");

  if (!boardElement) {
    throw new Error("could not get board element");
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      const cell = document.createElement("span");
      cell.dataset.x = x.toString();
      cell.dataset.y = y.toString();
      cell.classList.add("cell");

      boardElement.appendChild(cell);
    }
  }

  document.addEventListener("click", (event): void => {
    if (
      event.target &&
      event.target instanceof HTMLSpanElement &&
      event.target.classList.contains("cell")
    ) {
      const cell = event.target;
      console.log(`click on cell [${cell.dataset.x}, ${cell.dataset.y}]`);
    }
  });
});
