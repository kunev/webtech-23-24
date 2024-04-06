import {useState} from 'react'
import {assert} from './lib'
import {CellState, CellValue, Game} from './minesweeper/game'

import './style.css'

type BoardProps = {
  rows: number
  columns: number
  mines: number
}

type CellProps = {
  x: number
  y: number
  open: boolean
  marked: boolean
  board: Game
}

function Cell({x, y, open, marked, board}: CellProps) {
  return (
    <span
      className="cell"
      onContextMenu={e => {
        e.preventDefault()
      }}
      onMouseUp={event => {
        event.preventDefault()
        switch (event.button) {
          case 0:
            board.openCell(x, y)
            break
          case 1:
            board.openWhenDiffused(x, y)
            break
          case 2:
            board.toggleMarkCell(x, y)
        }
      }}
    >
      {marked ? 'M' : open ? board.valueAt(x, y) : ''}
    </span>
  )
}

function Board({rows, columns, mines}: BoardProps) {
  const [cellStates, setCellStates] = useState(
    Array.from(Array(rows)).map(_ =>
      Array.from(Array(columns)).map(
        _ =>
          ({
            open: false,
            marked: false
          }) as CellState
      )
    )
  )
  const [board] = useState(
    new Game(rows, columns, mines, (x, y, state) => {
      cellStates[x][y] = state
      setCellStates(JSON.parse(JSON.stringify(cellStates)))
    })
  )

  return (
    <div id="board">
      {Array.from(Array(board.rows * board.columns)).map((_, position) => {
        const [x, y] = [
          Math.floor(position / board.rows),
          position % board.rows
        ]
        return (
          <Cell
            key={position}
            x={x}
            y={y}
            open={cellStates[x][y].open}
            marked={cellStates[x][y].marked}
            board={board}
          />
        )
      })}
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
