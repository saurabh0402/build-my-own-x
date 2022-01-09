import assert from 'assert';
import _ from '../../src/index.js';

describe('Test concat', () => {
  it('concatenates non-array values to the array', () => {
    assert.deepEqual(_.concat([1,2,3],4,5), [1,2,3,4,5]);
    assert.deepEqual(_.concat([1,2,3], { name: 'someone' }), [1,2,3, { name: 'someone' }]);
  });

  it('flattens any array value to 1 level and adds the value to ans', () => {
    assert.deepEqual(_.concat([1,2,3], [4,5]), [1,2,3,4,5]);
    assert.deepEqual(_.concat([1,2,3], [4,[5, 6]]), [1,2,3,4,[5, 6]]);
    assert.deepEqual(_.concat([1,2,3], [{ name: 'someone' }]), [1,2,3, { name: 'someone' }]);
  });

  it('handles mixed values correctly', () => {
    assert.deepEqual(_.concat([1,2,3], [4,5,6], 7,8,9), [1,2,3,4,5,6,7,8,9]);
  });

  it('does not change the original arrays', () => {
    const arr1 = [1,2,3];
    const arr2 = [4,5,6];

    assert.deepEqual(_.concat([1,2,3], [4,5,6], 7,8,9), [1,2,3,4,5,6,7,8,9]);
    assert.deepEqual(arr1, [1,2,3]);
    assert.deepEqual(arr2, [4,5,6]);
  });
});