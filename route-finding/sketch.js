function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw() {
    background("white");
  
}


class Square{
    constructor(x,y,width) {
        this.width = width;
        this.color = "blue";
        this.x = x;
        this.y = y;
    }
    draw() {
        stroke("black");
        fill(this.color);
        rect(this.x, this.y, this, width, this.width);
    }
}