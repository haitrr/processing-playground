function setup() {
    game = new Game();
    // frame rate
    frameRate(Configuration.screen.frameRate);
    // use degree angle
    angleMode(DEGREES);
}

function draw() {
    if (game.screen.isPlaying){
        game.update();
    }
    else{
        if (keyIsDown(65) || keyIsDown(68)) {
            game.screen.isPlaying = true;
        }
    }
    game.draw();
}