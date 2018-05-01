let board = []
let width = 800
let height = 640
let rowCount = 10
let columnCount = 10
let mineRate = 0.1
let size = Math.min(width / columnCount, height / rowCount)
let penSize = size / 3

function setupBoard () {
  for (let i = 0; i < rowCount; i++) {
    let row = []
    for (let j = 0; j < columnCount; j++) {
      if (random(0, 1) < mineRate) {
        row.push(-1)
      } else {
        row.push(0)
      }
    }
    board.push(row)
  }
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      if (board[i][j] === -1) {
        let around = getAround(i, j)
        around.forEach(element => {
          board[element.r][element.c] += 1
        })
      }
    }
  }
}

function getAround (x, y) {
  let around = []
  for (let i = x - 1; i < x + 2; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      if (
        i >= 0 &&
        i < rowCount &&
        j >= 0 &&
        j < columnCount &&
        board[i][j] !== -1
      ) {
        around.push({ r: i, c: j })
      }
    }
  }
  return around
}

function drawBoard () {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      noFill()
      stroke(0)
      textFont('Symbola')
      textSize(penSize)
      textAlign(CENTER, CENTER)
      let value = board[i][j]
      let x = i * size
      let y = j * size
      if (value != -1) {
        text(value, x, y, size, size)
      } else {
        text('💣', x, y, size, size)
      }
    }
  }
}

function setup () {
  createCanvas(width, height)
  setupBoard()
}

function draw () {
  drawBoard()
}
