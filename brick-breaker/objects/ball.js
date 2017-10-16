// the ball
class Ball extends CircleObject {
    constructor(position,radius) {

        super(position,radius);
        // color
        this.colour = Configuration.ball.ballColour;

        // speed
        this.speed = Configuration.ball.initialSpeed;

        // direction
        this.direction = Configuration.ball.initialDirection;
    }
    // draw function
    draw() {
        stroke(this.colour);
        fill(this.colour);
        super.draw()
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