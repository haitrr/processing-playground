let board = []
let status = []
let width = 800
let height = 640
let rowCount = 20
let columnCount = 20
let mineRate = 0.15
let size = Math.min(width / columnCount, height / rowCount)
let penSize = size / 3
let CLOSED = 0
let FLAGGED = -1
let OPENED = 1
let BOMB = -1
let gameOver = false

function onContextMenu (e) {
  e.preventDefault()
}

document.addEventListener('contextmenu', onContextMenu)

function setupStatus () {
  for (let i = 0; i < rowCount; i++) {
    let row = []
    for (let j = 0; j < columnCount; j++) {
      row.push(CLOSED)
    }
    status.push(row)
  }
}

// eslint-disable-next-line
function mousePressed() {
  if (gameOver) {
    return
  }
  if (mouseButton === RIGHT) {
    let row = int(mouseX / size)
    let column = int(mouseY / size)
    if (row < rowCount && column < columnCount) {
      if (status[row][column] === CLOSED) {
        status[row][column] = FLAGGED
      } else if (status[row][column] === FLAGGED) {
        status[row][column] = CLOSED
      }
    }
  }
  return false
}

// eslint-disable-next-line
function mouseReleased() {
  console.log('Not working')
  return false
}

function open (row, column) {
  if (row < rowCount && column < columnCount) {
    if (status[row][column] === CLOSED) {
      status[row][column] = OPENED
      if (board[row][column] === BOMB) {
        gameOver = true
        return
      }
      if (board[row][column] === 0) {
        let around = getAround(row, column)
        around.forEach(e => open(e.r, e.c))
      }
    }
  }
}

// eslint-disable-next-line
function mouseClicked() {
  if (gameOver) {
    return
  }
  let row = int(mouseX / size)
  let column = int(mouseY / size)
  if (row < rowCount && column < columnCount) {
    open(row, column)
  }
  return false
}

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
      let x = i * size
      let y = j * size
      if (status[i][j] === CLOSED) {
        fill(0)
        stroke(255)
        strokeWeight(2)
        rect(x, y, size, size)
      } else if (status[i][j] === FLAGGED) {
        noFill()
        stroke(0)
        textFont('Symbola')
        textSize(penSize)
        textAlign(CENTER, CENTER)
        text('🚩', x, y, size, size)
      } else {
        noFill()
        stroke(0)
        textFont('Symbola')
        textSize(penSize)
        textAlign(CENTER, CENTER)
        let value = board[i][j]

        if (value !== -1) {
          if (value === 0) {
            value = ''
          }
          text(value, x, y, size, size)
        } else {
          text('💣', x, y, size, size)
        }
      }
    }
  }
}

// eslint-disable-next-line
function setup() {
  createCanvas(width, height)
  setupBoard()
  setupStatus()
}

// eslint-disable-next-line
function draw() {
  background(255)
  drawBoard()
}
