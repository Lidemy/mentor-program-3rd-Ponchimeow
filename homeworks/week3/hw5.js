function add(a, b) {
  const aCal = a.split('').reverse();
  const bCal = b.split('').reverse();
  const longer = Math.max(aCal.length, bCal.length);
  let carry = false;
  let result = '';
  for (let i = 0; i < longer; i += 1) {
    let sum;
    if (aCal[i] && bCal[i]) {
      sum = +aCal[i] + +bCal[i];
    } else if (!aCal[i] && bCal[i]) {
      sum = +bCal[i];
    } else if (aCal[i] && !bCal[i]) {
      sum = +aCal[i];
    }
    if (carry) {
      sum += 1;
      carry = false;
    }
    if (sum >= 10) {
      result += (sum - 10);
      carry = true;
    } else {
      result += sum;
    }
  }
  result = result.split('').reverse().join('');
  if (carry) {
    result = `1${result}`;
  }
  return result;
}

module.exports = add;
