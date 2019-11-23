class Matrix {
  constructor(rowNumber, columnNumber) {
    this.rowNumber = rowNumber;
    this.columnNumber = columnNumber;
    this.value = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.rowNumber; i++) {
      this.value[i] = [];
      for (let j = 0; j < this.columnNumber; j++) {
        this.value[i][j] = 0;
      }
    }
  }

  static transpose(matrix) {
    let result = new Matrix(matrix.columnNumber, matrix.rowNumber);
    for (let i = 0; i < matrix.rowNumber; i++) {
      for (let j = 0; j < matrix.columnNumber; j++) {
        result.value[j][i] = matrix.value[i][j];
      }
    }
    return result;
  }

  static fromArray(array) {
    let matrix = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++) {
      matrix.value[i][0] = array[i];
    }
    return matrix;
  }

  toArray() {
    let array = [];
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        array.push(this.value[i][j]);
      }
    }
    return array;
  }

  randomize() {
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        this.value[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  static multiply(matrix1, matrix2) {
    if (matrix1.columnNumber != matrix2.rowNumber) {
      throw "Can not multiply";
    }
    let result = new Matrix(matrix1.rowNumber, matrix2.columnNumber);
    for (let i = 0; i < result.rowNumber; i++) {
      for (let j = 0; j < result.columnNumber; j++) {
        for (let k; k < matrix1.rowNumber; k++) {
          result.value[i][j] += matrix1.value[i][k] * matrix2.value[k][j];
        }
      }
    }
    return result;
  }
  multiply(n) {
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        this.value[i][j] *= n;
      }
    }
  }

  map(func) {
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        var val = this.value[i][j];
        this.value[i][j] = func(val);
      }
    }
  }

  static subtract(matrix1, matrix2) {
    let result = new Matrix(matrix1.rowNumber, matrix1.columnNumber);
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        result.value[i][j] = matrix1.value[i][j] - matrix2.value[i][j];
      }
    }
  }

  add(n) {
    if (n instanceof Matrix) {
      if (
        n.rowNumber != this.rowNumber &&
        n.columnNumber != this.columnNumber
      ) {
        throw "Can not add";
      }
      for (let i = 0; i < this.rowNumber; i++) {
        for (let j = 0; j < this.columnNumber; j++) {
          this.value[i][j] += n.value[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rowNumber; i++) {
        for (let j = 0; j < this.columnNumber; j++) {
          this.value[i][j] += n;
        }
      }
    }
  }

  print() {
    console.table(this.value);
  }
}
