class RegtangleObject extends GameObject {
    constructor(position, size) {
        super(position);
        this.size = size;
    }

    get left() {
        return this.position.x;
    }

    set left(value){
        this.position.x = value;
    }

    get right() {
        return this.position.x + this.size.width;
    }

    set right(value){
        this.position.x = value - this.size.width;
    }

    get bottom() {
        return this.position.y + this.size.height;
    }

    set bottom(value){
        this.position.y = value - this.size.height; 
    }

    get top(){
        return this.position.y;
    }

    set top(value){
        this.position.y = value;
    }

    draw(){
        rect(this.position.x,
            this.position.y,
            this.size.width,
            this.size.height);
    }
}