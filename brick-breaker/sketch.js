function setup() {
    game = new Game();

    // use degree angle
    angleMode(DEGREES);
}

function draw() {
    game.update();
    game.draw();
}