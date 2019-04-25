function join(str, concatStr) {
  let res = '';
  for (let i = 0; i < str.length - 1; i += 1) {
    res += str[i] + concatStr;
  }
  res += str[str.length - 1];
  return res;
}

function repeat(str, times) {
  let res = '';
  for (let i = 1; i <= times; i += 1) {
    res += str;
  }
  return res;
}
console.log(join([1, 2, 3], ''));
console.log(join([1, 2, 3], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log();
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
