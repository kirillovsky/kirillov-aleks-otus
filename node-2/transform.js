require('log-timestamp');
const {Transform} = require('stream');

class MapFirstChunkStream extends Transform {
  constructor({mapFunction, ...props}) {
    super(props);
    this.mapFunction = mapFunction;
    this.firstChunkReceived = false;
    this.on('finish', () => console.log('Transform. Transformation end!'));
    this.on('drain',
        () => console.log(
            'Transform. Inner queue is empty. Transformation continue!'),
    );
  }

  _transform(chunk, encoding, done) {
    console.log(`Transform. Receive chunk - ${chunk}`);

    if (!this.firstChunkReceived) {
      chunk = this.transformChunk(chunk);
      this.firstChunkReceived = true;
    }

    this.push(chunk);
    done();
  }

  transformChunk(chunk) {
    let transformedChunk = this.mapFunction(chunk);
    console.log(`Transform. ${chunk} -> ${transformedChunk}`);
    return transformedChunk;
  }
}

exports.MapFirstChunkStream = MapFirstChunkStream;