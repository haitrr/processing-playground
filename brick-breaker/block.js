// the blocks

class Block {
    constructor(width, height, x, y,durability) {
        // width
        this.width = width;

        //height
        this.height = height;

        // position
        this.position = new Point(x, y);

        // color
        // random
        this.colour = Math.floor(Math.random() * 255 + 1);

        // durability
        this.durability = durability;
    }
    // draw function
    draw() {
        fill(this.colour);
        rect(this.position.x,
            this.position.y,
            this.width,
            this.height);
        stroke(255-this.colour);
        textAlign(CENTER,CENTER);
        text(this.durability,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    // update function
    update() {
        //todo: implement
    }
}