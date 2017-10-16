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
            new Point(Configuration.paddle.paddleInitialPositionX,
                Configuration.paddle.paddleInitialPositionY), new Size(Configuration.paddle.paddleWidth,
                    Configuration.paddle.paddleHeight));


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
        this.ball = new Ball(
            new Point(Configuration.ball.ballInitialPositionX,
            Configuration.ball.ballInitialPositionY),Configuration.ball.ballRadius);
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
        if (this.paddle.right> this.width - 1) {
            this.paddle.right = this.width - 1;
        }

        // paddle left
        if (this.paddle.left < 0) {
            this.paddle.left = 0;
        }

        // ball paddle
        if (this.ball.right >= this.paddle.left &&
            this.ball.left <= this.paddle.right &&  
            this.ball.bottom >= this.paddle.top &&
                this.ball.top <= this.paddle.bottom
        ) {
            this.ball.direction.y *= -1;
        }

        // ball wall right  and left
        if (this.ball.right > this.width || this.ball.left < 0) {
            this.ball.direction.x *= -1;
        }

        // ball wall top and bottom
        if (this.ball.top < 0 || this.ball.bottom > this.height - 1) {
            this.ball.direction.y *= -1;
        }

        // ball block
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