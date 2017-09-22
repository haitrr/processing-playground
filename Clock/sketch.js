function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    translate(200,200)
    rotate(-90)

    // hour, minute and second
    let hr = hour();
    let mn = minute();
    let sc = second();

    strokeWeight(8);
    stroke(255,100,150);
    noFill();

    let angle  = map(sc,0,60,0,360);
    arc(0,0,300,300,0,angle);

    push();
    stroke(255);
    rotate(angle);
    line(0,0,120,0);
    pop();

    stroke(150,100,255)
    angle  = map(mn,0,60,0,360);
    arc(0,0,280,280,0,angle);

    push();
    stroke(0,255,0);
    rotate(angle);
    line(0,0,100,0);
    pop();

    stroke(100,255,150)
    angle  = map(hr%12,0,12,0,360);
    arc(0,0,260,260,0,angle);

    push();
    stroke(0,0,255);
    rotate(angle);
    line(0,0,70,0);
    pop();
}