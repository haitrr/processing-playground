class GameScreen {
    constructor(width, height) {
        // score
        this.score = 0;
        // width, height
        this.width = width
        this.height = height

        // level
        this.level = Configuration.screen.inititalLevel;
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
        this.createBlocks();

        // the ball
        this.ball = new Ball(
            new Point(Configuration.ball.ballInitialPositionX,
                Configuration.ball.ballInitialPositionY), Configuration.ball.ballRadius);
    }
    // draw function
    draw() {
        background(Configuration.screen.gameScreenBackgroundColour);
        this.paddle.draw();
        this.ball.draw();
        this.blocks.forEach(function (block) {
            block.draw();
        }, this);
        fill(Configuration.screen.scoreLabel.colour);
        stroke(Configuration.screen.scoreLabel.colour);
        text("Score : " + this.score,
            Configuration.screen.scoreLabel.position.x,
            Configuration.screen.scoreLabel.position.y,
            Configuration.screen.scoreLabel.size.width,
            Configuration.screen.scoreLabel.size.height);
    };

    createBlocks() {
        for (var i = 0; i < Configuration.block.initNumberOfBlock; i++) {
            while (true) {
                var newBlock = new Block(
                    new Point(Math.floor(random(0, this.width - Configuration.block.blockWidth)),
                        Math.floor(random(0, this.paddle.position.y - Configuration.block.blockHeight * 2))), new Size(Configuration.block.blockWidth,
                            Configuration.block.blockHeight),
                    Math.round(random(this.level,this.level*2)));
                if (Util.checkIfBlocksOverlap(newBlock, this.blocks) == false) {
                    this.blocks.push(newBlock);
                    break;
                }
            }
        }
    }

    // handle collision
    collisionHandle() {
        // paddle right
        if (this.paddle.right > this.width - 1) {
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
            if (this.ball.direction.y > 0) {
                this.ball.bottom = this.paddle.top - 1;
            }
            else {
                this.ball.top = this.paddle.bottom + 1;
            }
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
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (this.ball.right > block.left
                && this.ball.left < block.right
                && this.ball.bottom > block.top
                && this.ball.top <= block.bottom) {

                // get the distances of intersect
                // from 4 sides
                var distanceLeft = this.ball.right - block.left
                var distanceRight = block.right - this.ball.left;
                var distanceTop = this.ball.bottom - block.top;
                var distanceBottom = block.bottom - this.ball.top;
                var count = 0;

                // find the real intersect sides
                // base on the distance of the intersections
                // if it is positive and not greater than the speed of the ball
                
                if (distanceLeft >= 0 && distanceLeft <= this.ball.xSpeed) {
                    this.ball.right = block.left - 1;
                    this.ball.direction.x *= -1;
                }
                else if (distanceRight >= 0 && distanceRight <= -this.ball.xSpeed) {
                    this.ball.left = block.right + 1;
                    this.ball.direction.x *= -1;
                }
                else if (distanceTop >= 0 && distanceTop <= this.ball.ySpeed) {
                    this.ball.bottom = block.top - 1;
                    this.ball.direction.y *= -1;
                }
                else if (distanceBottom >= 0 && distanceBottom <= -this.ball.ySpeed) {
                    this.ball.top = block.bottom + 1;
                    this.ball.direction.y *= -1;
                }
                else {
                    print(distanceLeft, distanceRight, this.ball.direction.x, distanceTop, distanceBottom, this.ball.direction.y);
                }

                // increase score
                this.score += 1;
                // smash the block
                if (block.smash(this.ball.damage)) {

                    // if the block is broken 
                    // remove it from the game
                    this.blocks.splice(i, 1);
                }
            }
        };

        // if all the blocks are broken, increase the level
        // and create blocks
        if(this.blocks.length == 0){
            this.level += 1;
            this.createBlocks();
        }
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