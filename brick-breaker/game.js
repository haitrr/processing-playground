function Game(width, height) {
    // the game screen
    this.screen = new GameScreen(Configuration.screen.screenWidth,
        Configuration.screen.screenHeight);


    // draw function
    this.draw = function () {
        this.screen.draw();
    }

    this.update = function(){
        this.screen.update();
    }
}