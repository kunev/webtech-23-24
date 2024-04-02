function initBoard(columns: number, rows: number) {
  const board: string[][] = [];
  for (let x = 0; x < rows; x++) {
    board.push([]);
    for (let y = 0; y < columns; y++) {
      board[x].push("0");
    }
  }
  const numberOfMines = 3;
  let placedMines = 0;

  while (placedMines < numberOfMines) {
    const [x, y] = [
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * columns),
    ];
    if (board[x][y] !== "#") {
      board[x][y] = "#";
      incrementNeigbours(board, x, y);
      placedMines++;
    }
  }

  return { columns, rows, board };
}

function incrementNeigbours(board: string[][], x: number, y: number): void {
  [-1, 0, 1].forEach((i) => {
    [-1, 0, 1].forEach((j) => {
      if (
        x + i >= 0 &&
        x + i < board.length &&
        y + j >= 0 &&
        y + j < board[x + i].length &&
        board[x + i][y + j] != "#"
      ) {
        board[x + i][y + j] = (parseInt(board[x + i][y + j]) + 1).toString();
      }
    });
  });
}

function assert(value: any, msg?: string): asserts value {
  if (!value) {
    throw new Error(msg);
  }
}

const state: { board: string[][]; columns: number; rows: number } = {} as any;

function updateState(newState: typeof state) {
  state.board = newState.board;
  state.columns = newState.columns;
  state.rows = newState.rows;
}

document.addEventListener("DOMContentLoaded", () => {
  updateState(initBoard(8, 8));

  const root = document.querySelector<HTMLElement>(":root");
  assert(root);
  root.style.setProperty("--board-size", state.columns.toString());

  const boardElement = document.querySelector<HTMLDivElement>("#board");

  assert(boardElement);

  for (let x = 0; x < state.rows; x++) {
    for (let y = 0; y < state.columns; y++) {
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
      assert(cell.dataset.x);
      assert(cell.dataset.y);
      cell.innerText =
        state.board[parseInt(cell.dataset.x)][parseInt(cell.dataset.y)];
    }
  });

  const columnsInput = document.querySelector("input[name=columns]");
  const rowsInput = document.querySelector("input[name=rows]");

  columnsInput?.addEventListener("change", (event) => {
    const input = event.target;
    assert(input);
    assert(input instanceof HTMLInputElement);

    updateState(initBoard(parseInt(input.value), state.rows));
  });

  rowsInput?.addEventListener("change", (event) => {
    const input = event.target;
    assert(input);
    assert(input instanceof HTMLInputElement);

    updateState(initBoard(state.columns, parseInt(input.value)));
  });
});
