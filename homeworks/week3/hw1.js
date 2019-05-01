function stars(num) {
  const arr = [];
  let star = '*';
  for (let i = 1; i <= num; i += 1) {
    arr.push(star);
    star += '*';
  }
  return arr;
}
module.exports = stars;
