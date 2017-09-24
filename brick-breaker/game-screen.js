function GameScreen(width, height) {

    // width, height
    this.width = width
    this.height = height

    // create game canvas
    createCanvas(this.width, this.height);

    // background color
    background(Configuration.gameScreenBackgroundColour);

    // blocks
    this.blocks = {};

    // the paddle
    this.paddle = new Paddle(
        Configuration.paddleWidth,
        Configuration.paddleHeight,
        Configuration.paddleInitialPositionX,
        Configuration.paddleInitialPositionY);

    // the ball
    this.ball = new Ball(Configuration.ballRadius,
        Configuration.ballInitialPositionX,
        Configuration.ballInitialPositionY);

    // draw function
    this.draw = function () {
        this.paddle.draw();
        this.ball.draw();
    };

    // update function
    this.update = function () {

    }


}