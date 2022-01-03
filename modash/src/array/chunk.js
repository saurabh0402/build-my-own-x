/**
 * Creates a new array with the original array being split into chunks of `size`.
 * The final element can has a smaller size depending on if the `array` can be splitted evenly.
 * @param {Array} array 
 * @param {number} size 
 * @returns Array
 */
function chunk(array, size=1) {
  size = Number(size) || 1;

  let ans = [];
  let index = 0;

  while (index < array.length) {
    ans = [
      ...ans,
      array.slice(index, index + size),
    ];

    index += size;
  }

  return ans;
}

export default chunk;