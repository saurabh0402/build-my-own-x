import assert from 'assert';
import _ from '../../src/index.js';

describe('Test Chunk', () => {
  it('should create chunks of passed size', () => {
    assert.deepEqual(_.chunk([1,2,3,4], 2), [[1,2], [3,4]]);
    assert.deepEqual(_.chunk([1,2,3,4], 3), [[1,2,3], [4]]);
    assert.deepEqual(_.chunk([1,2,3,4], 4), [[1,2,3,4]]);
    assert.deepEqual(_.chunk([1,2,3,4], 5), [[1,2,3,4]]);
  });

  it('should create chunks of size 1 when size is not passed', () => {
    assert.deepEqual(_.chunk([1,2,3,4]), [[1],[2],[3],[4]]);
  });

  it('should not modify the original array', () => {
    const arr = [1,2,3,4];
    assert.deepEqual(_.chunk(arr), [[1],[2],[3],[4]]);
    assert.deepEqual(arr, [1,2,3,4]);
  });
});