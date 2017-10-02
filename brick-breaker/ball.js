// the ball
function Ball(radius,x,y){
    // radius
    this.radius = radius;

    // color
    this.colour = Configuration.ball.ballColour;

    // this.pos
    this.position = new Point(x,y);
    
    // speed
    this.speed = Configuration.ball.initialSpeed;

    // direction
    this.direction = Configuration.ball.initialDirection;

    // draw function
    this.draw = function (){
        stroke(this.colour);
        fill(this.colour);
        ellipse(
            this.position.x,
            this.position.y,
            this.radius*2,
            this.radius*2);
    }

    // update function
    this.update = function(){
        sX = this.speed*this.direction.x
        sY = this.speed*this.direction.y;
        this.position.x+=sX;
        this.position.y+=sY;

        //todo: implement collision
    }
}