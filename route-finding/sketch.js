let squares = []
let grid = 50
let squareWidth = 0
let hasStart = false
let finished = false
let isRunning = false
let start = null
let head = []
let wallRate = 0.3
let distance = 0
let WILD = -1

// eslint-disable-next-line
function setup () {
  // Set framerate
  frameRate(3)
  // create canvas
  width = window.innerWidth
  height = window.innerHeight
  createCanvas(width, height)
  // calculate square width
  squareWidth = 0
  if (width > height) {
    squareWidth = height
  } else {
    squareWidth = width
  }
  squareWidth = squareWidth / grid
  createSquares()
}

// create square with wall rate
function createSquares () {
  squares = []
  for (var i = 0; i < grid; i++) {
    let row = []
    for (var j = 0; j < grid; j++) {
      let square = new Square(i, j, squareWidth, Math.random() < wallRate)
      row.push(square)
    }
    squares.push(row)
  }
}

// reset program
function reset () {
  squares = []
  start = null
  hasStart = false
  finished = false
  isRunning = false
  head = []
  distance = 0
  createSquares()
}

// eslint-disable-next-line
function draw () {
  if (isRunning && !finished) {
    spread()
  }
  background('white')
  for (var i = 0; i < grid; i++) {
    for (var j = 0; j < grid; j++) {
      squares[i][j].draw()
    }
  }
}

// Continue to spread the heads
function spread () {
  if (head.length === 0) {
    finished = true
    return
  }
  // new heads
  let newHead = []
  // increase the distance
  distance += 1
  for (var i = 0; i < head.length; i++) {
    // Get all the surround square
    let surround = getSurround(head[i].row, head[i].column)
    for (var j = 0; j < surround.length; j++) {
      let p = squares[surround[j][0]][surround[j][1]]
      // If the square is not start point and not explored yet
      if (p.isGoal === false && p.distance === WILD && !p.isWall) {
        p.distance = distance
        newHead.push(p)
      }
      // Found goal
      if (p.isStart) {
        p.distance = distance
        finished = true
        // draw the path between the start and the goal
        drawPath()
        return
      }
    }
  }
  head = newHead
}

function getSurround (x, y) {
  let around = []
  for (let i = x - 1; i < x + 2; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      if (
        (i === x && j < grid && j >= 0 && j !== y) || (j === y && i < grid && i >= 0 && i !== x)
      ) {
        around.push([i, j])
      }
    }
  }
  return around
}

// eslint-disable-next-line
function mouseClicked () {
  if (isRunning && !finished) return
  if (finished) {
    reset()
    return
  }
  let x = Math.floor(mouseX / squareWidth)
  let y = Math.floor(mouseY / squareWidth)
  if (x >= grid || y >= grid) return

  if (squares[x][y].isWall) return
  if (!hasStart) {
    squares[x][y].isStart = true
    start = squares[x][y]
    hasStart = true
  } else {
    squares[x][y].isGoal = true
    head.push(squares[x][y])
    isRunning = true
  }
}

function drawPath () {
  let present = start
  while (true) {
    let around = getSurround(present.row, present.column)
    for (let i = 0; i < around.length; i++) {
      let s = squares[around[i][0]][around[i][1]]
      if (s.isGoal) {
        return
      }
      if (s.distance === present.distance - 1) {
        present = s

        present.isPath = true
        break
      }
    }
  }
}

class Square {
  constructor (x, y, width, isWall = false, isStart = false, isGoal = false) {
    this.width = width
    this.isWall = isWall
    this.isStart = isStart
    this.isGoal = isGoal
    this.distance = WILD
    this.x = x * width
    this.y = y * width
    this.row = x
    this.column = y
    this.isPath = false
  }
  draw () {
    stroke('black')
    if (this.isWall) {
      fill('gray')
    } else {
      if (this.isStart) {
        fill('green')
      } else if (this.isGoal) {
        fill('red')
      } else if (this.isPath) {
        fill('yellow')
      } else {
        fill('white')
      }
    }

    stroke('black')
    rect(this.x, this.y, this.width, this.width)
    if (this.distance > 0) {
      stroke('blue')
      fill('blue')
      textAlign(CENTER, CENTER)
      textSize(this.width / String(this.distance).length)
      text(this.distance,
        this.x,
        this.y,
        this.width,
        this.width
      )
    }
  }
}
