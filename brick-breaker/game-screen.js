class GameScreen {
    constructor(width, height) {
        // width, height
        this.width = width
        this.height = height

        // create game canvas
        createCanvas(this.width, this.height);

        // background color
        background(Configuration.screen.gameScreenBackgroundColour);

        // the paddle
        this.paddle = new Paddle(
            Configuration.paddle.paddleWidth,
            Configuration.paddle.paddleHeight,
            Configuration.paddle.paddleInitialPositionX,
            Configuration.paddle.paddleInitialPositionY);


        // blocks
        this.blocks = [];
        for (var i = 0; i < Configuration.block.initNumberOfBlock; i++) {
            while (true) {
                var newBlock = new Block(Configuration.block.blockWidth,
                    Configuration.block.blockHeight,
                    Math.floor(random(0, this.width - Configuration.block.blockWidth)),
                    Math.floor(random(0, this.paddle.position.y - Configuration.block.blockHeight * 2)),
                    Configuration.block.initDurability);
                if (Util.checkIfBlocksOverlap(newBlock, this.blocks) == false) {
                    this.blocks.push(newBlock);
                    break;
                }
            }
        }

        // the ball
        this.ball = new Ball(Configuration.ball.ballRadius,
            Configuration.ball.ballInitialPositionX,
            Configuration.ball.ballInitialPositionY);
    }
    // draw function
    draw() {
        background(Configuration.screen.gameScreenBackgroundColour);
        this.paddle.draw();
        this.ball.draw();
        this.blocks.forEach(function (block) {
            block.draw();
        }, this);
    };


    // handle collision
    collisionHandle() {
        // paddle right
        if (this.paddle.position.x + this.paddle.width > this.width - 1) {
            this.paddle.position.x = this.width - this.paddle.width - 1;
        }

        // paddle left
        if (this.paddle.position.x < 0) {
            this.paddle.position.x = 0;
        }

        // ball paddle
        if ((this.ball.position.x + this.ball.radius >= this.paddle.position.x &&
                this.ball.position.x - this.ball.radius <= this.paddle.position.x + this.paddle.width) &&
            (this.ball.position.y + this.ball.radius >= this.paddle.position.y &&
                this.ball.position.y - this.ball.radius <= this.paddle.position.y + this.paddle.height)
        ) {
            this.ball.direction.y *= -1;
        }

        // ball wall right  and left
        if (this.ball.position.x + this.ball.radius > this.width || this.ball.position.x - this.ball.radius < 0) {
            this.ball.direction.x *= -1;
        }

        // ball wall top and bottom
        if (this.ball.position.y - this.ball.radius < 0 || this.ball.position.y + this.ball.radius > this.height - 1) {
            this.ball.direction.y *= -1;
        }

        // 
    }

    // update function
    update() {
        this.paddle.update();
        this.ball.update();
        this.blocks.forEach(function (block) {
            block.update();
        }, this);
        this.collisionHandle();
    }


}