const {DataProviderStream} = require('../readable');
const {WritableMock} = require('stream-mock');

describe('DataProviderStream test', () => {
  test('generate numbers', () => {
    const numbers = [1, 2, 3, 4, 5];
    const dataProviderStream = new DataProviderStream({
      dataProvider: arrayElementsProvider(numbers),
      objectMode: true,
    });
    const writer = new WritableMock({objectMode: true});

    dataProviderStream.pipe(writer);

    writer.on('finish', () => {
      expect(writer.data).toEqual(numbers);
    });
  });
});

function arrayElementsProvider(array) {
  const arrayIterator = array[Symbol.iterator]();
  return function() {
    const next = arrayIterator.next();
    return (!next.done) ? next.value : null;
  };
}