let tree;
function setup() {
  tree = new BTree(3);
  let insertTo = 10;
  for (let i = 0; i < insertTo; i++) {
    tree.insert(Math.floor(Math.random() * 100) );
    console.log(i);
    //     console.log(JSON.stringify(tree, function(key, val) {
    //     if (key !== "parent")
    //         return val;
    // }, 2))
    console.log('---------------');
  }

  createCanvas(displayWidth, displayHeight);
  background(0);
  textAlign(CENTER, CENTER);
  input = createInput();
  input.position(20, 20);
  button = createButton('Insert');
  button.position(100, 20);
  button.mousePressed(insertButtonPressed);
}

function draw() {
  // put drawing code here

  background(0);
  tree.draw(50, 50, 20);
}

const insertButtonPressed = () => {
  const value = parseInt(input.value());
  if (value !== null) {
    var rs = tree.insert(value);
    if (rs) {
      tree.divide(rs.left, rs.right, rs.middle);
    }
    tree.log();
  }
};

class BTree {
  constructor(degree, parent) {
    this.degree = degree;
    this.parent = parent;
    this.values = [];
    this.childs = [];
  }

  log = () => {
    console.log(
      JSON.stringify(
        this,
        function(key, val) {
          if (key !== 'parent') return val;
        },
        2,
      ),
    );
    console.log('---------------');
  };

  divide(left, right, middle) {
    let i = 0;
    while (middle > this.values[i] && i < this.values.length) {
      i += 1;
    }
    this.values.splice(i, 0, middle);
    left.parent = this;
    right.parent = this;
    this.childs[i] = left;
    this.childs.splice(i + 1, 0, right);
    if (this.values.length === this.degree) {
      let left = new BTree(this.degree, this);
      let right = new BTree(this.degree, this);
      let middle = Math.floor(this.degree / 2);
      for (i = 0; i < this.values.length; i++) {
        if (i < middle) {
          left.insert(this.values[i]);
          this.childs[i].parent = left;
          left.childs.push(this.childs[i]);
        }

        if (i === middle) {
          this.childs[i].parent = left;
          left.childs.push(this.childs[i]);
        }

        if (i > middle) {
          right.insert(this.values[i]);
          right.childs.push(this.childs[i]);
          this.childs[i].parent = right;
        }
      }
      right.childs.push(this.childs[i]);
      this.childs[i].parent = right;
      middle = this.values[middle];
      if (this.parent) {
        this.parent.divide(left, right, middle);
      } else {
        left.log();
        right.log();
        console.log(middle);
        right.parent = this;
        left.parent = this;
        this.values = [middle];
        this.childs = [left, right];
      }
    }
  }

  insert(value) {
    let i = 0;
    while (value > this.values[i] && i < this.values.length) {
      i += 1;
    }

    if (this.childs[i]) {
      var result = this.childs[i].insert(value);
    } else {
      this.values.push(value);
      this.values.sort(function(a, b) {
        return a - b;
      });

      if (this.values.length === this.degree) {
        let left = new BTree(this.degree, this);
        let right = new BTree(this.degree, this);
        let middle = Math.floor(this.degree / 2);
        for (i = 0; i < this.values.length; i++) {
          if (i < middle) {
            left.insert(this.values[i]);
          }

          if (i > middle) {
            right.insert(this.values[i]);
          }
        }
        middle = this.values[middle];
        if (this.parent) {
          this.parent.divide(left, right, middle);
        } else {
          this.values = [middle];
          this.childs = [left, right];
        }
      }
    }
  }

  draw(x, y, size = 10, split = 10) {
    this.values.map((value, index) => {
      const valX = x + index * size;
      stroke(255);
      square(valX, y, size);
      stroke(0);
      text(value, valX + size / 2, y + size / 2);
    });

    let currentX = x + size * this.values.length + split;
    this.childs.map((child, index) => {
      stroke(255);
      line(x, y, currentX, y + size + split);
      currentX = child.draw(currentX, y + size + split, size, split);
    });

    return currentX;
  }
}
