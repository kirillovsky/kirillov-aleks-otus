const {Transform} = require('stream');

class MapFirstChunkStream extends Transform {
  constructor({mapFunction, ...props}) {
    super(props);
    this.mapFunction = mapFunction;
    this.firstChunkReceived = false;
  }

  _transform(chunk, encoding, done) {
    if (this._isNotFirstChunkReceived()) {
      this.push(this.mapFunction(chunk));
      this._firstChunkReceivedSuccessfully();
    } else {
      this.push(chunk);
    }
    done();
  }

  _isNotFirstChunkReceived() {
    return !this.firstChunkReceived;
  }

  _firstChunkReceivedSuccessfully() {
    this.firstChunkReceived = true;
  }
}

exports.MapFirstChunkStream = MapFirstChunkStream;