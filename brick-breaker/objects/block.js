// the blocks

class Block extends RegtangleObject{
    constructor(position,size,durability) {

        super(position,size);

        // color
        // random
        this.colour = [Math.floor(Math.random() * 255 + 1),Math.floor(Math.random() * 255 + 1),Math.floor(Math.random() * 255 + 1)];
        // durability
        this.durability = durability;
    }
    // draw function
    draw() {
        stroke(this.colour);
        fill(this.colour);
        super.draw();
        stroke(255-this.colour[0],255-this.colour[1],255-this.colour[2]);
        fill(255-this.colour[0],255-this.colour[1],255-this.colour[2]);
        textAlign(CENTER,CENTER);
        text(this.durability,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        )
    }

    // When the ball collide with the block
    // it will lose the durability base on damage of the ball
    // and will broke when the durability < = 0
    smash(damage) {
        this.durability -= damage;
        if (this.durability <= 0) {
            return true;
        }
        return false;
    }

    // update function
    update() {
        //todo: implement
    }
}