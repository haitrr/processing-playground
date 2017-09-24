function Game(width,height){

    // the game screen
    this.screen = new GameScreen(600,600);


    // draw function
    this.draw = function(){
        this.screen.draw();
    }
}