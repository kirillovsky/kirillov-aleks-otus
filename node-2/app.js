require('log-timestamp');
const {callNoMoreThanNTimes, randomInt, runAndDone} = require('./supports');
const args = require('./commandLineArgs.js').commandLineArgs();
const {DataProviderStream} = require('./readable.js');
const {MapFirstChunkStream} = require('./transform.js');
const {DataConsumerStream} = require('./writable.js');

const dataProviderStream = new DataProviderStream({
  objectMode: true,
  highWaterMark: args['generator.highWaterMark'],
  dataProvider: callNoMoreThanNTimes(
      args['generator.randomNumbers.count'],
      () => randomInt(1, 100),
  ),
});

const mapFirstChunkStream = new MapFirstChunkStream({
  objectMode: true,
  highWaterMark: args['transformer.highWaterMark'],
  mapFunction: addRandomNumberAndDone,
});

function addRandomNumberAndDone(n, done) {
  return runAndDone(() => n + randomInt(1000, 2000), done);
}

const dataConsumerStream = new DataConsumerStream({
  objectMode: true,
  highWaterMark: args['consumer.highWaterMark'],
  consumeFunction: deferredConsume,
});

function deferredConsume(n, done) {
  return setTimeout(
      () => runAndDone(() => console.log(`Consumed - ${n}`), done),
      args['consumer.deferredConsume.wait.mills'],
  );
}

dataProviderStream.pipe(mapFirstChunkStream).pipe(dataConsumerStream);