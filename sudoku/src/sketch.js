const size = 600;
const cellSize = size / 9;
let selectedCell = [0, 0];
function setup() {
  // put setup code here
  createCanvas(size, size);
}

let sudoku = [];
let notes = [];
for(let i = 0; i < 9; i++) {
  notes[i] = [];
  for(let j = 0; j < 9; j++) {
    notes[i][j] = [1,2,3,4,5,6,7,8,9];
  }
}

for(let i = 0; i < 9; i++) {
  sudoku[i] = [];
  for(let j = 0; j < 9; j++) {
    sudoku[i][j] = 0;
  }
}


function draw() {
  // put drawing code here
  background(255);
  for (let i = 0; i < 9; i++) {
    line(i * cellSize, 0, i * cellSize, size);
    line(0, i * cellSize, size, i * cellSize);
  }
  line(0, size, size, size);
  line(size, 0, size, size);
  drawSudoku();
  drawSelectedCell();
}

function mouseClicked() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  selectedCell = [x, y];
}

function drawSelectedCell() {
  fill(0, 0, 255, 100);
  rect(selectedCell[0] * cellSize, selectedCell[1] * cellSize, cellSize, cellSize);
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    selectedCell[0]--;
    if(selectedCell[0] < 0) {
      selectedCell[0] = 8;
    }
  }

  if(keyCode === RIGHT_ARROW) {
    selectedCell[0]++;
    if(selectedCell[0] > 8) {
      selectedCell[0] = 0;
    }
  }
  if(keyCode === UP_ARROW) {
    selectedCell[1]--;
    if(selectedCell[1] < 0) {
      selectedCell[1] = 8;
    }
  }
  if(keyCode === DOWN_ARROW) {
    selectedCell[1]++;
    if(selectedCell[1] > 8) {
      selectedCell[1] = 0;
    }
  }
}

function drawSudoku() {
  textAlign(CENTER, CENTER);
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      if(sudoku[i][j] != 0) {
        fill(0);
        textSize(cellSize);
        text(sudoku[i][j], i * cellSize + cellSize / 2, j * cellSize + cellSize / 2);
      }
      else {
        fill(0);
        let sect = cellSize/4;
        textSize(cellSize/5);
        for(let k = 0; k < notes[i][j].length; k++) {
          let note = notes[i][j][k];
          let note_y = Math.floor((note-1)/3) * sect + sect;
          let note_x = (note-1)%3 * sect + sect;
          text(notes[i][j][k], i * cellSize + note_x, j * cellSize + note_y);
        }
      }
    }
  }
}