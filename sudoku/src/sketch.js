const size = 600;
const cellSize = size / 9;
let selectedCell = [0, 0];
let difficulty = "easy";
function setup() {
  // put setup code here
  createCanvas(size, size);
  newBoard();
}

let sudoku = [];
let notes = [];


function draw() {
  // put drawing code here
  background(255);
  for (let i = 0; i < 9; i++) {
    if (i % 3 == 0) {
      strokeWeight(3);
    }
    else {
      strokeWeight(1);
    }
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
  if (x >= 0 && x < 9 && y >= 0 && y < 9) {
    selectedCell = [x, y];
  }
}

function drawSelectedCell() {
  fill(0, 0, 255, 100);
  rect(selectedCell[0] * cellSize, selectedCell[1] * cellSize, cellSize, cellSize);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    selectedCell[0]--;
    if (selectedCell[0] < 0) {
      selectedCell[0] = 8;
    }
  }

  if (keyCode === RIGHT_ARROW) {
    selectedCell[0]++;
    if (selectedCell[0] > 8) {
      selectedCell[0] = 0;
    }
  }
  if (keyCode === UP_ARROW) {
    selectedCell[1]--;
    if (selectedCell[1] < 0) {
      selectedCell[1] = 8;
    }
  }
  if (keyCode === DOWN_ARROW) {
    selectedCell[1]++;
    if (selectedCell[1] > 8) {
      selectedCell[1] = 0;
    }
  }

  if (keyCode > 47 && keyCode < 58) {
    setSelectCellValue(keyCode - 48);
  }
}

function setSelectCellValue(value) {
  sudoku[selectedCell[0]][selectedCell[1]] = value;
  updateNotes();
}

function newBoard() {
  generateBoard();
  let prefilled = 0;
  switch (difficulty) {
    case "easy":
      prefilled = 35;
      break;
    case "medium":
      prefilled = 30;
      break;
    case "hard":
      prefilled = 25;
      break;
    case "very hard":
      prefilled = 15;
      break;
  }
  let removeCount = 81 - prefilled;
  while (removeCount > 0) {
    let i = Math.floor(Math.random() * 9);
    let j = Math.floor(Math.random() * 9);
    if (sudoku[i][j] != 0) {
      sudoku[i][j] = 0;
      removeCount--;
    }
  }
  updateNotes();
}
function getRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

// recursively fill the cells to a valid sudoku board
function fillCell(i, j) {
  let posibility = new Set();
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(x => posibility.add(x));
  found = false;
  while (posibility.size > 0) {
    let k = getRandomItem(posibility);
    if (isValid(i, j, k)) {
      sudoku[i][j] = k;
      count += 1;
      posibility.delete(k);
      if (i == 8 && j == 8) {
        return true
      }
      newJ = j + 1;
      newI = i;
      if (newJ == 9) {
        newJ = 0;
        newI += 1;
      }
      if (fillCell(newI, newJ)) {
        found = true;
        break;
      }
    }
    else {
      posibility.delete(k);
    }
  }
  if (!found) {
    sudoku[i][j] = 0;
    return false
  }
  return true;
}

function generateBoard() {
  let limit = 10000;
  for (let i = 0; i < 9; i++) {
    sudoku[i] = [];
    notes[i] = [];
    for (let j = 0; j < 9; j++) {
      sudoku[i][j] = 0;
      notes[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  }
  count = 0
  let i = 0;
  let j = 0;
  fillCell(0, 0);
  return sudoku;
}

function updateRelatedNotes(i, j, value) {
  for (let k = 0; k < 9; k++) {
    if (k != j) {
      notes[i][k].delete(value);
    }
  }
  for (let k = 0; k < 9; k++) {
    if (k != i) {
      notes[k][j].delete(value);
    }
  }
  let x = Math.floor(i / 3) * 3;
  let y = Math.floor(j / 3) * 3;
  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      if (x + k != i && y + l != j) {
        notes[x + k][y + l].delete(value);
      }
    }
  }
}

function updateNotes() {
  for (let i = 0; i < 9; i++) {
    notes[i] = []
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] != 0) {
        notes[i][j] = [];
      }
      else {
        notes[i][j] = [];
        for (let k = 1; k < 10; k++) {
          if (isValid(i, j, k)) {
            notes[i][j].push(k);
          }
        }
      }
    }
  }
}

function isValid(i, j, k) {
  for (let l = 0; l < 9; l++) {
    if (sudoku[i][l] == k) {
      return false;
    }
  }
  for (let l = 0; l < 9; l++) {
    if (sudoku[l][j] == k) {
      return false;
    }
  }
  let x = Math.floor(i / 3) * 3;
  let y = Math.floor(j / 3) * 3;
  for (let l = 0; l < 3; l++) {
    for (let m = 0; m < 3; m++) {
      if (sudoku[x + l][y + m] == k) {
        return false;
      }
    }
  }
  return true;
}

function getSelectedCellValue() {
  return sudoku[selectedCell[0]][selectedCell[1]];
}

function drawSudoku() {
  textAlign(CENTER, CENTER);
  const selectedCellValue = getSelectedCellValue();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] != 0) {
        value = sudoku[i][j];
        if (value == selectedCellValue) {
          fill(255, 0, 0);
        }
        else {
          fill(0);
        }
        textSize(cellSize / 2);
        text(sudoku[i][j], i * cellSize + cellSize / 2, j * cellSize + cellSize / 2);
      }
      else {
        fill(0);
        let sect = cellSize / 4;
        textSize(cellSize / 5);
        for (let k = 0; k < notes[i][j].length; k++) {
          let note = notes[i][j][k];
          let note_y = Math.floor((note - 1) / 3) * sect + sect;
          let note_x = (note - 1) % 3 * sect + sect;
          if (note == selectedCellValue) {
            fill(255, 0, 0);
          }
          else {
            fill(0);
          }
          text(notes[i][j][k], i * cellSize + note_x, j * cellSize + note_y);
        }
      }
    }
  }
}