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
            files: []
        });
    });

    test('one-layered tree', () => {
        mock({
            dir: {
                'tesFile.test': '',
                'testFile1.test1': '',
            }
        });

        return expect(tree('dir')).resolves.toEqual({
            dirs: [],
            files: ['dir/tesFile.test', 'dir/testFile1.test1']
        });
    });

    test('multi-layered tree', () => {
        mock({
            dir: {
                'tesFile.test': '',
                'testFile1.test1': '',
                dir1: {},
                nextDir: {
                    'testFile2.test2': '',
                    'testFile3.test3': '',
                    dir2: {
                        'testFile4.test4': '',
                        dir3: {}
                    }
                }
            }
        });

        return expect(tree('dir')).resolves.toEqual({
            dirs: ['dir/dir1', 'dir/nextDir', 'dir/nextDir/dir2', 'dir/nextDir/dir2/dir3'],
            files: [
                'dir/tesFile.test', 'dir/testFile1.test1',
                'dir/nextDir/testFile2.test2', 'dir/nextDir/testFile3.test3',
                'dir/nextDir/dir2/testFile4.test4'
            ],
        });
    });
});