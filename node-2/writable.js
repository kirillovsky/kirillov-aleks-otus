const {Writable} = require('stream');

class DataConsumerStream extends Writable {
  constructor({consumeFunction, ...rest}) {
    super(rest);
    this.consumeFunction = consumeFunction;
  }

  _write(chunk, encoding, done) {
    this.consumeFunction(chunk);
    done();
  }
}

exports.DataConsumerStream = DataConsumerStream;