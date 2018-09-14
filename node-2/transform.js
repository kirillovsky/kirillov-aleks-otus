require('log-timestamp');
const {Transform} = require('stream');

class MapFirstChunkStream extends Transform {
  constructor({mapFunction, ...props}) {
    super(props);
    this.mapFunction = mapFunction;
    this.firstChunkReceived = false;
    this.on('finish', () => console.log('Transformation end!'));
    this.on('drain',
        () => console.log('Inner queue is empty. Transformation continue!'),
    );
  }

  _transform(chunk, encoding, done) {
    if (!this.firstChunkReceived) {
      const transformedItem = this.mapFunction(chunk, done);
      this.push(transformedItem);
      this.firstChunkReceived = true;
      console.log(`Transform ${chunk} -> ${transformedItem}`);
    } else {
      this.push(chunk);
      console.log(`Transform skipped for ${chunk}`);
      done();
    }
  }
}

exports.MapFirstChunkStream = MapFirstChunkStream;