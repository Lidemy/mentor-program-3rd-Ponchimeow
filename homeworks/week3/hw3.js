function isPrime(n) {
  const arr = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      arr.push(i);
    }
  }
  if (arr.length === 2) {
    return true;
  }
  return false;
}
module.exports = isPrime;
