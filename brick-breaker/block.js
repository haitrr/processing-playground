// the blocks

function Block(width,height,x,y){
    // width
    this.width = width;

    //height
    this.height =height;

    // position
    this.position  = new Point(x,y);

    // color
    // random
    this.colour = Math.floor(Math.random()*255 + 1);

    // draw function
    this.draw = function(){
        stroke(this.colour);
        rect(this.position.x,this.position.y,this.width,this.height);
    }

}