// the paddle
function Paddle(width, height, x, y) {
    // width
    this.width = width;

    // height
    this.height = height;

    // position
    this.position = new Point(x, y);

    // color
    this.colour = Configuration.paddle.paddleColour;
    
    // move function
    this.move = function(speed){
        this.position.x+=speed;
    }


    // draw function
    this.draw = function () {
        stroke(this.colour);
        fill(this.colour);
        rect(this.position.x,
            this.position.y,
            this.width,
            this.height);
    };

    //update function
    this.update = function(){
        if (keyIsDown(65)){

        }
    }
}