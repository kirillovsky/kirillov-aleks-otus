const {WritableMock, ReadableMock} = require('stream-mock');
const {MapFirstChunkStream} = require('../transform');

describe('MapFirstChunkStream test', () => {
  test('add n to first chunk', () => {
    const n = 100500;
    const upstreamData = [1, 2, 3, 4, 5];
    const upstream = new ReadableMock(upstreamData, {objectMode: true});
    const mapFirstChunkStream = new MapFirstChunkStream({
      objectMode: true,
      mapFunction: value => value + n,
    });
    const writer = new WritableMock({objectMode: true});

    upstream.pipe(mapFirstChunkStream).pipe(writer);

    writer.on('finish', () => {
      expect(writer.data).toEqual([1 + n, ...upstreamData.slice(1)]);
    });
  });
});