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
        this.paddle.draw();
        this.ball.draw();
    };

    // update function
    this.update = function () {
        this.paddle.update();
        this.ball.update();
        for(block in this.blocks){
            block.update();
        }
    }


}