// 前後比對

function isPalindromes(s) {
  const num = s.length;
  for (let i = 0; i < num; i += 1) {
    if (s.charAt(i) !== s.charAt(num - (i + 1))) {
      return false;
    }
  }
  return true;
}

module.exports = isPalindromes;

/* 反轉
function isPalindromes(s) {
    let str = s.split('').reverse().join('');
    let str_ES6 = [...s].reverse().join('');    //rest operator
    if (s === (str||str_ES6)) {
        return true;
    }
    return false;
}
*/
