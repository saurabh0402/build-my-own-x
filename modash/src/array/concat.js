/**
 * Creates a new array with all the value from second argument onwards concatenated to the first argument.
 * If there's a "More than 1"-D array, it is flattened to 1 level and all values are concatenated.
 * @param {*} array 
 * @param  {...any} values 
 * @returns array 
 */
function concat(array, ...values) {
  let ans = [ ...array ];

  values.forEach(value => {
    if (Array.isArray(value)) {
      ans = [
        ...ans,
        ...value,
      ];
    } else {
      ans = [
        ...ans,
        value,
      ];
    }
  });

  return ans;
}

export default concat;