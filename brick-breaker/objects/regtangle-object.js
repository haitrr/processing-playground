class RegtangleObject extends GameObject {
    constructor(position, size) {
        super(position);
        this.size = size;
    }

    get left() {
        return this.position.x;
    }

    get right() {
        return this.position.x + this.size.width;
    }

    get bottom() {
        return this.position.y + this.size.height;
    }

    get top(){
        return this.position.y;
    }

    draw(){
        rect(this.position.x,
            this.position.y,
            this.size.width,
            this.size.height);
    }
}