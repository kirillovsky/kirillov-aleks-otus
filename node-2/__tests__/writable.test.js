const {ReadableMock} = require('stream-mock');
const {DataConsumerStream} = require('../writable');

describe('DataConsumerStream test', () => {
  test('consume data', () => {
    const consumedData = [];
    const generatedData = [1, 2, 3, 4, 5];
    const upstream = new ReadableMock(generatedData, {objectMode: true});
    const dataConsumerStream = new DataConsumerStream({
      objectMode: true,
      consumeFunction: (n, done) => {
        consumedData.push(n);
        done();
      },
    });

    upstream.pipe(dataConsumerStream);

    upstream.on('finish', () => {
      expect(consumedData).toEqual(generatedData);
    });
  });
});