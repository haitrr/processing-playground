class RegtangleObject extends GameObject {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    get left() {
        return this.position.x;
    }

    get right() {
        return this.position.x + this.width;
    }

    get bottom() {
        return this.position.y + this.height;
    }

    get top(){
        return this.position.y;
    }

    draw(){
        rect(this.position.x,
            this.position.y,
            this.width,
            this.height);
    }
}