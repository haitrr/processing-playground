let grid = []
let size = 4
let tileWidth = 100
let width = 800
let height = 640

/* eslint-disable no-unused-vars */
function setup () {
  /* eslint-enable no-unused-vars */
  createCanvas(width, height)
  setupGrid()
  addNumber()
  addNumber()
  addNumber()
  addNumber()
  addNumber()
}

/* eslint-disable no-unused-vars */
function draw () {
  /* eslint-enable no-unused-vars */
  createCanvas(width, height)
  background(255)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      noFill()
      strokeWeight(2)
      stroke(0)
      let x = i * tileWidth
      let y = j * tileWidth
      rect(x, y, tileWidth, tileWidth)
      let value = grid[i][j]
      if (value != null && value !== 0) {
        textAlign(CENTER, CENTER)
        fill(0)
        noStroke()
        textSize(tileWidth / 2)
        text(value, x, y, tileWidth, tileWidth)
      }
    }
  }
}

// get blank tiles
function getBlank () {
  let blanks = []
  for (var i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === 0) {
        blanks.push({
          x: i,
          y: j
        })
      }
    }
  }
  return blanks
}

function addNumber () {
  let blanks = getBlank()
  let tile = random(blanks)
  grid[tile.x][tile.y] = random([2, 4])
}

function setupGrid () {
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push(0)
    }
    grid.push(row)
  }
}
