function Game(width,height){

    // create game canvas
    createCanvas(width, height);

    // background color
    background(0);

    // blocks
    this.blocks = {};

    // the paddle
    this.paddle = new Paddle(100,10,250,580);

    // the ball
    this.ball = new Ball(10,100,100);

    // draw function
    this.draw = function(){
        this.paddle.draw();
        this.ball.draw();
    };

    // update function
    this.update = function(){

    }


}