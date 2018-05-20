let WIDTH = 800
let HEIGHT = 600
let GRAVITY = 0.2
let BIRD_RADIUS = Math.min(WIDTH, HEIGHT) / 40
let jumpVelocity = -7
let bird
let pipeWidth = WIDTH / 30
let pipes = []
let gameOver = false
let xVelocity = 2
function setup () {
  createCanvas(WIDTH, HEIGHT)
  bird = new Bird()
  pipes.push(new Pipe())
  frameRate(60)
}

function draw () {
  if (gameOver) return
  background(0)
  bird.update()
  bird.draw()
  if (frameCount % 100 === 0) {
    pipes.push(new Pipe())
  }
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update()
    pipes[i].draw()
    if (pipes[i].hits(bird)) {
      gameOver = true
      return
    }
    if (pipes[i].isOffScreen()) {
      pipes.splice(i, 1)
    }
  }
}

function keyPressed () {
  if (key === ' ') {
    bird.jump()
  }
}

class Bird {
  constructor () {
    this.y = HEIGHT / 2
    this.x = WIDTH / 3
    this.yVelocity = 0
  }

  draw () {
    fill(255)
    ellipse(this.x, this.y, BIRD_RADIUS * 2, BIRD_RADIUS * 2)
  }

  update () {
    this.yVelocity += GRAVITY
    this.y += this.yVelocity
    if (this.y > HEIGHT) {
      this.y = HEIGHT
      gameOver = true
    }
    if (this.y < 0) {
      this.y = 0
    }
  }

  jump () {
    this.yVelocity = jumpVelocity
  }
}

class Pipe {
  constructor () {
    this.top = random(0, HEIGHT / 2)
    this.bottom = random(0, HEIGHT / 2)
    this.x = WIDTH - pipeWidth
  }

  draw () {
    fill(255)
    rect(this.x, 0, pipeWidth, this.top)
    rect(this.x, HEIGHT - this.bottom, pipeWidth, this.bottom)
  }

  update () {
    this.x -= xVelocity
  }

  hits (bird) {
    if (bird.x + BIRD_RADIUS > this.x && bird.x - BIRD_RADIUS <= this.x + pipeWidth) {
      if (bird.y - BIRD_RADIUS < this.top || HEIGHT - bird.y - BIRD_RADIUS < this.bottom) {
        return true
      }
    }
    return false
  }

  isOffScreen () {
    return this.x < -pipeWidth
  }
}
