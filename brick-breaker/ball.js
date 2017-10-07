// the ball
class Ball {
    constructor(radius, x, y) {
        // radius
        this.radius = radius;

        // color
        this.colour = Configuration.ball.ballColour;

        // this.pos
        this.position = new Point(x, y);

        // speed
        this.speed = Configuration.ball.initialSpeed;

        // direction
        this.direction = Configuration.ball.initialDirection;
    }
    // draw function
    draw() {
        stroke(this.colour);
        fill(this.colour);
        ellipse(
            this.position.x,
            this.position.y,
            this.radius * 2,
            this.radius * 2);
    }

    // update function
    update() {
        var sX = this.speed * this.direction.x
        var sY = this.speed * this.direction.y;
        this.position.x += sX;
        this.position.y += sY;

        //todo: implement collision
    }
}