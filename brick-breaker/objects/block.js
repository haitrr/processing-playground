// the blocks

class Block extends RegtangleObject{
    constructor(position,size,durability) {

        super(position,size);

        // color
        // random
        this.colour = Math.floor(Math.random() * 255 + 1);

        // durability
        this.durability = durability;
    }
    // draw function
    draw() {
        fill(this.colour);
        super.draw();
        stroke(255-this.colour);
        textAlign(CENTER,CENTER);
        text(this.durability,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        )
    }

    // update function
    update() {
        //todo: implement
    }
}