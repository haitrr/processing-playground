squares = [];
grid = 25;
squareWidth = 0;
hasStart = false;
finished = false;
isRunning = false;
head = [];
wallRate = 0.3;
distance = 0;

function setup() {
    // Set framerate
    frameRate(3);
    // create canvas
    width = window.innerWidth;
    height = window.innerHeight;
    createCanvas(width, height);
    // calculate square width
    squareWidth = 0;
    if (width > height) {
        squareWidth = height;
    } else {
        squareWidth = width;
    }
    squareWidth = squareWidth / grid;
    createSquares();
}

// create square with wall rate
function createSquares() {
    for (var i = 0; i < grid; i++) {
        squares[i] = [];
        for (var j = 0; j < grid; j++) {
            square = new Square(squareWidth * i, squareWidth * j, squareWidth, Math.random() < wallRate);
            squares[i].push(square);
        }
    }

}

// reset program
function reset() {
    squares = [];
    hasStart = false;
    finished = false;
    isRunning = false;
    head = [];
    distance = 0;
    createSquares();
}

function draw() {
    if (isRunning && !finished) {
        spread();
    }
    background("white");
    for (var i = 0; i < grid; i++) {
        for (var j = 0; j < grid; j++) {
            squares[i][j].draw();
        }
    }
}

// Continue to spread the heads 
function spread() {
    if (head.length == 0) {
        finished = true;
        return;
    }
    // new heads
    newHead = [];
    // increase the distance 
    distance += 1;
    for (var i = 0; i < head.length; i++) {
        // Get all the surround square
        surround = getSurround(Math.floor(head[i].x / squareWidth), Math.floor(head[i].y / squareWidth));
        for (var j = 0; j < surround.length; j++) {
            p = squares[surround[j][0]][surround[j][1]]
            // If the square is not start point and not explored yet
            if (p.isGoal == false && p.distance == 0 && !p.isWall) {
                p.distance = distance;
                newHead.push(p);
            }
            // Found goal
            if (p.isStart) {
                finished = true;
            }
        }
    }
    head = newHead;
}

function getSurround(x, y) {
    rs = [];
    if (x > 0) {
        rs.push([x - 1, y]);
    }
    if (x < grid - 1) {
        rs.push([x + 1, y]);
    }
    if (y > 0) {
        rs.push([x, y - 1]);
    }
    if (y < grid - 1) {
        rs.push([x, y + 1]);
    }
    return rs;
}

function mouseClicked() {
    if (isRunning && !finished) return;
    if (finished) {
        reset();
        return;
    }
    x = Math.floor(mouseX / squareWidth);
    y = Math.floor(mouseY / squareWidth);
    if (squares[x][y].isWall) return;
    if (!hasStart) {
        squares[x][y].isStart = true;
        hasStart = true;
    } else {
        squares[x][y].isGoal = true;
        head.push(squares[x][y]);
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

        stroke("black");
        rect(this.x, this.y, this.width, this.width);
        if (this.distance > 0) {
            stroke("blue");
            fill("blue");
            textAlign(CENTER, CENTER);
            text(this.distance,
                this.x,
                this.y,
                this.width,
                this.width
            );
        }
    }
}