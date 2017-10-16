// the paddle
class Paddle extends RegtangleObject{
    constructor(position,size) {
        super(position,size);

        // color
        this.colour = Configuration.paddle.paddleColour;
    }
    // move function
    move(speed) {
        this.position.x += speed;
    }


    // draw function
    draw() {
        stroke(this.colour);
        fill(this.colour);
        super.draw();
    };

    //update function
    update() {
        if (keyIsDown(65)) {
            this.move(-Configuration.paddle.paddleSpeed);
        } else if (keyIsDown(68)) {
            this.move(Configuration.paddle.paddleSpeed);
        }
    }
}