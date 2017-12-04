class Game {
    constructor(width, height) {
        // the game screen
        this.screen = new GameScreen(Configuration.screen.screenWidth,
            Configuration.screen.screenHeight);

    }
    // draw function
    draw() {
        this.screen.draw();
    }

    // update function
    update() {
        this.screen.update();
    }
}