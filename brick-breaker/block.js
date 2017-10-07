// the blocks

class Block {
    constructor(width, height, x, y) {
        // width
        this.width = width;

        //height
        this.height = height;

        // position
        this.position = new Point(x, y);

        // color
        // random
        this.colour = Math.floor(Math.random() * 255 + 1);
    }
    // draw function
    draw() {
        stroke(this.colour);
        rect(this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    // update function
    update() {
        //todo: implement
    }
}