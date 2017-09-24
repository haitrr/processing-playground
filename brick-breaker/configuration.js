// configurations of the game
var Configuration = new function () {
    this.screenWidth = 600;
    this.screenHeight = 600;
    this.paddleWidth = Math.floor(this.screenWidth / 5);
    this.paddleHeight = Math.floor(this.screenHeight / 50);
    this.paddleInitialPositionX = Math.floor(this.screenWidth / 2);
    this.paddleInitialPositionY = Math.floor(this.screenHeight * 0.9);
    this.ballRadius = Math.floor((this.screenWidth + this.screenHeight) / 100);
    this.ballInitialPositionX = Math.floor(this.screenWidth / 2);
    this.ballInitialPositionY = Math.floor(this.screenHeight / 2);
    this.ballColour = "orange";
    this.gameScreenBackgroundColour = "yellow";
    this.paddleColour = "blue";
}