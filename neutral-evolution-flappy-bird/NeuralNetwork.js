function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
class NeuralNetwork {
  constructor(inputNumber, hiddenNumber, outputNumber) {
    this.inputNumber = inputNumber;
    this.hiddenNumber = hiddenNumber;
    this.outputNumber = outputNumber;
    this.weight_ih = new Matrix(this.hiddenNumber, this.inputNumber);
    this.weight_ho = new Matrix(this.outputNumber, this.hiddenNumber);
    this.weight_ih.randomize();
    this.weight_ho.randomize();
    this.bias_h = new Matrix(this.hiddenNumber, 1);
    this.bias_h.randomize();
    this.bias_o = new Matrix(this.outputNumber, 1);
    this.bias_o.randomize();
  }

  feedForward(input_array) {
    if (input_array.length != this.inputNumber) {
      throw "Can not feed forward";
    } else {
      let input = Matrix.fromArray(input_array);
      let hidden = Matrix.multiply(this.weight_ih, input);
      hidden.add(this.bias_h);
      hidden.map(sigmoid);
      hidden.print();

      let output = Matrix.multiply(this.weight_ho, hidden);
      output.add(this.bias_o);
      output.print();

      return output.toArray();
    }
  }

  train(inputs, targets) {
    let outputs = this.feedForward(inputs);

    let outputs = Matrix.fromArray(outputs);

    let output_errors = Matrix.subtract(outputs, targets);

    let weight_ho_t = Matrix.transpose(this.weight_ho);

    let hidden_errors = Matrix.multiply(weight_ho_t, output_errors);
  }
}
