// the ball
class Ball extends CircleObject {
    constructor(position, radius) {

        super(position, radius);
        // color
        this.colour = Configuration.ball.ballColour;

        // speed
        this.speed = Configuration.ball.initialSpeed;

        // direction
        this.direction = Configuration.ball.initialDirection;

        // damage
        this.damage = Configuration.ball.initialDamage;
    }
    // draw function
    draw() {
        stroke(this.colour);
        fill(this.colour);
        super.draw()
    }

    get xSpeed() {
        return this.speed * this.direction.x;
    }

    get ySpeed() {
        return this.speed * this.direction.y;
    }

    // move
    move() {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
    }

    // update function
    update() {
        this.move()
        //todo: implement collision
    }
}