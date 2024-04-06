import {assert} from './lib'
import {Game} from './minesweeper/game'

import './style.css'

type BoardProps = {
  rows: number
  columns: number
  mines: number
}

function Board({rows, columns, mines}: BoardProps) {
  const board = new Game(rows, columns, mines)

  return (
    <div id="board">
      {Array.from(Array(board.rows * board.columns)).map(() => (
        <span className="cell"></span>
      ))}
    </div>
  )
}

export function Application() {
  const root = document.querySelector<HTMLElement>(':root')
  assert(root)
  root.style.setProperty('--board-size', '12')

  return (
    <div id="wrapper">
      <Board rows={12} columns={12} mines={5} />
    </div>
  )
}
