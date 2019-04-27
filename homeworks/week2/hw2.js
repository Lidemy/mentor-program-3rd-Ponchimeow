const uppercase = 'Uppercase';
const lowercase = 'lowwercase';
const mark = '?questionMark';

function capitalize(str) {
  let res = str;
  console.log();
  if (str.charAt(0).match(/[a-z]/)) {
    res = str.charAt(0).toUpperCase() + str.substring(1);
  }
  return res;
}

console.log(capitalize(uppercase));
console.log(capitalize(lowercase));
console.log(capitalize(mark));
