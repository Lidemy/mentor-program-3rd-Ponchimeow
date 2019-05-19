// function alphaSwap(str) {
//   let result = str;
//   for (let i = 0; i < result.length; i += 1) {
//     if (result.charAt(i).match(/[A-Z]/)) {
//       result = result.substring(0, i) + result.charAt(i).toLowerCase() + result.substring(i + 1);
//     } else if (result.charAt(i).match(/[^A-Z]/)) {
//       result = result.substring(0, i) + result.charAt(i).toUpperCase() + result.substring(i + 1);
//     }
//   }
//   return result;
// }
function alphaSwap(str) {
  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      result += str[i].toLowerCase();
    } else if (str[i] >= 'a' && str[i] < 'z') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }
  return result;
}
module.exports = alphaSwap;
