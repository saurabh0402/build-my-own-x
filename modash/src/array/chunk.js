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