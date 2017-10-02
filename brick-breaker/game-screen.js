function GameScreen(width, height) {

    // width, height
    this.width = width
    this.height = height

    // create game canvas
    createCanvas(this.width, this.height);

    // background color
    background(Configuration.screen.gameScreenBackgroundColour);

    // blocks
    this.blocks = {};

    // the paddle
    this.paddle = new Paddle(
        Configuration.paddle.paddleWidth,
        Configuration.paddle.paddleHeight,
        Configuration.paddle.paddleInitialPositionX,
        Configuration.paddle.paddleInitialPositionY);

    // the ball
    this.ball = new Ball(Configuration.ball.ballRadius,
        Configuration.ball.ballInitialPositionX,
        Configuration.ball.ballInitialPositionY);

    // draw function
    this.draw = function () {
        background(Configuration.screen.gameScreenBackgroundColour);
        this.paddle.draw();
        this.ball.draw();
    };


        // handle collision
    this.collisionHandle = function(){
        // paddle right
        if(this.paddle.position.x + this.paddle.width > this.width-1){
            this.paddle.position.x = this.width -this.paddle.width - 1;
        }
        
        // paddle left
        if(this.paddle.position.x<0){
            this.paddle.position.x = 0;
        }

        // ball paddle
        if( (this.ball.position.x + this.ball.radius >= this.paddle.position.x
        && this.ball.position.x - this.ball.radius <= this.paddle.position.x + this.paddle.width)
        && 
        (this.ball.position.y + this.ball.radius >= this.paddle.position.y
        && this.ball.position.y - this.ball.radius <= this.paddle.position.y + this.paddle.height)
        ){
            this.ball.direction.y*=-1;
        }

        // ball wall right  and left
        if (this.ball.position.x + this.ball.radius > this.width || this.ball.position.x - this.ball.radius < 0){
            this.ball.direction.x *=-1;
        }

        // ball wall top and bottom
        if (this.ball.position.y - this.ball.radius < 0 || this.ball.position.y + this.ball.radius > this.height - 1){
            this.ball.direction.y *=-1;
        }
    }

    // update function
    this.update = function () {
        this.paddle.update();
        this.ball.update();
        for(block in this.blocks){
            block.update();
        }
        this.collisionHandle();
    }


}