// the paddle
class Paddle {
    constructor(width, height, x, y) {
        // width
        this.width = width;

        // height
        this.height = height;

        // position
        this.position = new Point(x, y);

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
        rect(this.position.x,
            this.position.y,
            this.width,
            this.height);
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