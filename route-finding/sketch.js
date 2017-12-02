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
}