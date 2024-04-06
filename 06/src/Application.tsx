import {useState} from 'react'
import {assert} from './lib'
import {CellValue, Game} from './minesweeper/game'

import './style.css'

type BoardProps = {
  rows: number
  columns: number
  mines: number
}

function Cell({x, y, board}: {x: number; y: number; board: Game}) {
  const [open, setOpen] = useState(false)
  const [marked, setMarked] = useState(false)

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
            setOpen(true)
            break
          case 1:
            board.openWhenDiffused(x, y)
            break
          case 2:
            board.toggleMarkCell(x, y)
            setMarked(marked => marked)
        }
      }}
    >
      {marked ? 'M' : open ? board.valueAt(x, y) : ''}
    </span>
  )
}

function Board({rows, columns, mines}: BoardProps) {
  const board = new Game(rows, columns, mines)

  return (
    <div id="board">
      {Array.from(Array(board.rows * board.columns)).map((_, position) => (
        <Cell
          key={position}
          x={Math.floor(position / board.rows)}
          y={position % board.rows}
          board={board}
        />
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
