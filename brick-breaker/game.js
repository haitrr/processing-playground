function Game(width, height) {
    // the game screen
    this.screen = new GameScreen(Configuration.screenWidth,
        Configuration.screenHeight);


    // draw function
    this.draw = function () {
        this.screen.draw();
    }
}