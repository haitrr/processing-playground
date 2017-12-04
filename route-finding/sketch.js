squares = [];
grid = 25;
squareWidth = 0;
hasStart = false;
finished = false;
isRunning = false;

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    squareWidth = 0;
    if (width > height) {
        squareWidth = height;
    } else {
        squareWidth = width;
    }
    squareWidth = squareWidth / grid;
    for (var i = 0; i < grid; i++) {
        squares[i] = [];
        for (var j = 0; j < grid; j++) {
            square = new Square(squareWidth * i, squareWidth * j, squareWidth, Math.random() < 0.3);
            squares[i].push(square);
        }
    }
}

function draw() {
    background("white");
    for (var i = 0; i < grid; i++) {
        for (var j = 0; j < grid; j++) {
            squares[i][j].draw();
        }
    }
}

function mouseClicked() {
    if (isRunning) return;
    x = Math.floor(mouseX / squareWidth);
    y = Math.floor(mouseY / squareWidth);
    if (squares[x][y].isWall) return;
    if (!hasStart) {
        squares[x][y].isStart = true;
        hasStart = true;
    } else {
        squares[x][y].isGoal = true;
        isRunning = true;
    }

}

class Square {
    constructor(x, y, width, isWall = fasle, isStart = false, isGoal = false) {
        this.width = width;
        this.isWall = isWall;
        this.isStart = isStart;
        this.isGoal = isGoal;
        this.distance = 0;
        this.x = x;
        this.y = y;
    }
    draw() {
        stroke("black");
        if (this.isWall) {
            fill("gray");
        } else {
            if (this.isStart) {
                fill("green");
            } else if (this.isGoal) {
                fill("red");
            } else {
                fill("white");
            }
        }
        if (this.distance > 0) {
            stroke("blue");
            textAlign(CENTER, CENTER);
            text(this.distance,
                this.x,
                this.y,
                this.width,
                this.width
            );
        }
        rect(this.x, this.y, this.width, this.width);
    }
}