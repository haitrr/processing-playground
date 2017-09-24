// the ball
function Ball(radius,x,y){
    // radius
    this.radius = radius;

    // color
    this.colour = 136;

    // this.pos
    this.position = new Point(x,y);
    
    // draw function
    this.draw = function (){
        stroke(this.colour);
        ellipse(this.position.x,this.position.y,this.radius,this.radius);
    }

}