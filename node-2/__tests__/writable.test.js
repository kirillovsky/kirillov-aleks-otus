const {ReadableMock} = require('stream-mock');
const {DataConsumerStream} = require('../writable');

describe('DataConsumerStream test', () => {
  test('consume data', () => {
    const consumedData = [];
    const generatedData = [1, 2, 3, 4, 5];
    const upstream = new ReadableMock(generatedData, {objectMode: true});
    const dataConsumerStream = new DataConsumerStream({
      consumeFunction: consumedData.push,
      objectMode: true,
    });

    upstream.pipe(dataConsumerStream);

    upstream.on('finish', () => {
      expect(consumedData).toEqual(generatedData);
    });
  });
});