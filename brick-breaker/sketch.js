function setup() {
    game = new Game();
    // frame rate
    frameRate(Configuration.screen.frameRate);
    // use degree angle
    angleMode(DEGREES);
}

function draw() {
    game.update();
    game.draw();
}