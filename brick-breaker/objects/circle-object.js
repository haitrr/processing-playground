class CircleObject extends GameObject {
    constructor(position, radius) {
        super(position);
        this.radius = radius;
    }

    get left() {
        return this.position.x - this.radius;
    }

    get right() {
        return this.position.x + this.radius;
    }

    get top() {
        return this.position.y - this.radius;
    }

    get bottom() {
        return this.position.y + this.radius;
    }

    draw() {
        ellipse(
            this.position.x,
            this.position.y,
            this.radius * 2,
            this.radius * 2);
    }
}