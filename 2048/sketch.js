let grid = [];
let size = 4;
let width = 800;
let height = 640;

function setup() {
    createCanvas(width, height);
    setupGrid();
}

function draw() {
    background(0);
}

// get blank tiles
function getBlank() {
    let blanks = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] == 0) {
                blanks.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    return blanks;
}

function addNumber() {
    blanks = getBlank();
    tile = random(blanks);
    grid[tile.x][tile.y] = random([2, 4]);
}

function setupGrid() {
    for (let i = 0; i < size; i++) {
        row = [];
        for (let j = 0; j < size; j++) {
            row.push(0);
        }
        grid.push(row);
    }
}