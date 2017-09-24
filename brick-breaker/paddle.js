// the paddle
function Paddle(width,height,x,y){
    // width
    this.width = width;

    // height
    this.height = height;

    // position
    this.position = new Point(x,y);

    // color
    this.colour = 255;

    // draw function
    this.draw = function(){
        stroke(this.colour);
        rect(this.position.x,this.position.y,this.width,this.height);
    };
}