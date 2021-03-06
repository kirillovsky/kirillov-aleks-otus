require('log-timestamp');
const {Writable} = require('stream');

class DataConsumerStream extends Writable {
  constructor({consumeFunction, ...rest}) {
    super(rest);
    this.consumeFunction = consumeFunction;
    this.on('finish', () => console.log('Writable. Subscription end!'));
    this.on('drain',
        () => console.log('Writable. Inner queue is empty. Consumption continue!'),
    );
  }

  _write(chunk, encoding, done) {
    this.consumeFunction(chunk, done);
  }
}

exports.DataConsumerStream = DataConsumerStream;