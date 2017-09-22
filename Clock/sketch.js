function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200, 200)
    rotate(-90)

    // hour, minute and second
    let hr = hour();
    let mn = minute();
    let sc = second();

    strokeWeight(8);
    noFill();

    // hour
    boldness = map(hr, 0, 60, 0, 255);
    stroke(150, 150, boldness)
    angle = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 260, 260, 0, angle);

    push();
    rotate(angle);
    line(0, 0, 65, 0);
    pop();

    push();
    rotate(angle);
    strokeWeight(0.8);
    stroke(0, 0, 255);
    text(hr, 70, 5);
    pop();

    // minute
    boldness = map(mn, 0, 60, 0, 255);
    stroke(boldness, 100, 100)
    angle = map(mn, 0, 60, 0, 360);
    arc(0, 0, 280, 280, 0, angle);

    push();
    rotate(angle);
    line(0, 0, 90, 0);
    pop();

    push();
    rotate(angle);
    strokeWeight(0.8);
    stroke(0, 255, 0);
    text(mn, 95, 5);
    pop();

    // second
    boldness = map(sc, 0, 60, 0, 255);
    stroke(50, 50, boldness);
    angle = map(sc, 0, 60, 0, 360);
    arc(0, 0, 300, 300, 0, angle);

    push();
    rotate(angle);
    line(0, 0, 105, 0);
    pop();

    push();
    rotate(angle);
    strokeWeight(0.8);
    stroke(255,0,0);
    text(sc, 110, 5);
    pop();


}