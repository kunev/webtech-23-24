import {assert} from '../lib'

const cellValues = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '*'
] as const

export type CellValue = (typeof cellValues)[number]

export type CellState = {
  open: boolean
  marked: boolean
}

export class Game {
  private cells: CellValue[][]
  private open: boolean[][]
  private marked: boolean[][]
  private state: 'won' | 'lost' | false
  private badCellCoordinates?: [number, number][]

  constructor(
    public readonly rows: number,
    public readonly columns: number,
    public readonly mines: number,
    private readonly onCellStateChange: (
      x: number,
      y: number,
      state: CellState
    ) => void
  ) {
    this.cells = []
    this.open = []
    this.marked = []
    let minesPlaced = 0

    for (let i = 0; i < rows; i++) {
      this.cells.push([])
      this.open.push([])
      this.marked.push([])
      for (let j = 0; j < columns; j++) {
        this.cells[i].push('0')
        this.open[i].push(false)
        this.marked[i].push(false)
      }
    }

    while (minesPlaced < mines) {
      const [x, y] = [Math.random() * rows, Math.random() * columns].map(
        Math.floor
      )

      if (this.cells[x][y] !== '*') {
        this.placeMine(x, y)
        minesPlaced++
      }
    }
  }

  openCell(x: number, y: number) {
    if (this.open[x][y] || !this.inBoard(x, y) || this.marked[x][y]) {
      return
    }

    this.open[x][y] = true
    this.emitCellStateChange(x, y)

    if (this.cells[x][y] === '*') {
      this.loseGame([[x, y]])
    } else if (
      this.open.filter(row => row.filter(v => v)).length ===
      this.rows * this.columns
    ) {
      this.state = 'won'
    }

    if (this.cells[x][y] === '0') {
      this.forEachNeighbour(x, y, (x, y) => {
        this.openCell(x, y)
      })
    }
  }

  toggleMarkCell(x: number, y: number) {
    if (!this.inBoard(x, y) || this.open[x][y]) {
      return
    }

    this.marked[x][y] = !this.marked[x][y]
    this.emitCellStateChange(x, y)
  }

  openWhenDiffused(x: number, y: number) {
    if (!this.inBoard(x, y)) {
      return
    }

    const markedNeighbours: {x: number; y: number; v: CellValue}[] = []
    this.forEachNeighbour(x, y, (x, y) => {
      if (this.marked[x][y]) {
        markedNeighbours.push({x, y, v: this.cells[x][y]})
      }
    })

    if (markedNeighbours.length.toString() !== this.cells[x][y]) {
      return
    }

    const wrongMarks = markedNeighbours.filter(({v}) => v != '*')
    if (wrongMarks.length > 0) {
      this.loseGame(wrongMarks.map(({x, y}) => [x, y]))
    }

    this.forEachNeighbour(x, y, (x, y) => {
      if (!this.marked[x][y]) {
        this.openCell(x, y)
      }
    })
  }

  valueAt(x: number, y: number): CellValue {
    return this.cells[x][y]
  }

  get isComplete() {
    return this.state
  }

  get badCells() {
    return this.badCellCoordinates
  }

  private loseGame(becauseOf: [number, number][]) {
    this.state = 'lost'
    this.badCellCoordinates = becauseOf
    this.open = Array.from(Array(this.rows)).map(_ =>
      Array.from(Array(this.columns)).map(_ => true)
    )
    this.emitCellStateChange(...becauseOf[0])
  }

  private placeMine(x: number, y: number): void {
    this.cells[x][y] = '*'
    this.forEachNeighbour(x, y, (x, y) => {
      if (this.cells[x][y] !== '*') {
        this.cells[x][y] = this.incremented(this.cells[x][y])
      }
    })
  }

  private forEachNeighbour(
    x: number,
    y: number,
    f: (x: number, y: number) => void
  ) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.inBoard(x + i, y + j)) {
          f(x + i, y + j)
        }
      }
    }
  }

  private incremented(value: string): Exclude<CellValue, '*'> {
    const num = parseInt(value)
    assert(num >= 0 && num < 8, `Can not increment ${num}`)
    return (num + 1).toString() as Exclude<CellValue, '*'>
  }

  private inBoard(x: number, y: number): boolean {
    return x >= 0 && x < this.rows && y >= 0 && y < this.columns
  }

  private toString(lense?: (CellValue | boolean)[][]) {
    lense ||= this.cells
    let output = ''
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const value = lense[i][j]
        output += `${typeof value === 'boolean' ? +value : value} `
      }
      output += '\n'
    }

    return output
  }

  private emitCellStateChange(x: number, y: number) {
    this.onCellStateChange(x, y, {
      open: this.open[x][y],
      marked: this.marked[x][y]
    })
  }
}
