const mock = require('mock-fs');
const {tree} = require('../tree.js');

describe('tree tests', () => {
  afterAll(() => mock.restore());

  test('not found dir', () => {
    mock({});

    return expect(tree('dir')).rejects.toThrow();
  });

  test('empty dir', () => {
    mock({dir: {}});

    return expect(tree('dir')).resolves.toEqual({
      dirs: [],
      files: [],
    });
  });

  test('one-layer tree', () => {
    mock({
      dir: {
        'tesFile.test': '',
        'testFile1.test1': ''
      },
    });

    return expect(tree('dir')).resolves.toEqual({
      dirs: [],
      files: ['dir/tesFile.test', 'dir/testFile1.test1'],
    });
  });
});