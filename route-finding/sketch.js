function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw() {
    background("white");
  
}


class Square{
    constructor(x,y,width,isWall=fasle) {
        this.width = width;
        this.isWall = isWall;
        this.distance = 0;
        this.x = x;
        this.y = y;
    }
    draw() {
        stroke("black");
        if (this.isWall) {
            fill("gray");
        }
        else {
            fill("white");
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
        rect(this.x, this.y, this, width, this.width);
    }
}