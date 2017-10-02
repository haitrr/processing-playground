// configurations of the game
var Configuration = new function () {
    // screen
    this.screen = new function () {
        this.screenWidth = 600;
        this.screenHeight = 600;
        this.gameScreenBackgroundColour = "yellow";
        this.frameRate = 60;
    }

    // paddle
    this.paddle = new function (screen) {
        this.paddleWidth = Math.floor(screen.screenWidth / 5);
        this.paddleHeight = Math.floor(screen.screenHeight / 50);
        this.paddleInitialPositionX = Math.floor(screen.screenWidth / 2);
        this.paddleInitialPositionY = Math.floor(screen.screenHeight * 0.9);
        this.paddleColour = "blue";
        this.paddleSpeed = 5;
    }(this.screen);

    //ball
    this.ball = new function (screen) {
        this.ballRadius = Math.floor((screen.screenWidth + screen.screenHeight) / 100);
        this.ballInitialPositionX = Math.floor(screen.screenWidth / 2);
        this.ballInitialPositionY = Math.floor(screen.screenHeight / 2);
        this.ballColour = "orange";
        this.initialSpeed = 2;
        this.initialDirection = new Vector(0.5,0.8);
    }(this.screen);

    //block
    this.block = new function(screen){
        this.blockWidth = Math.floor((screen.screenWidth + screen.screenHeight) / 75);
        this.blockHeight = Math.floor((screen.screenWidth + screen.screenHeight) / 75);
        
    }(this.screen);
}