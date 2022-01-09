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