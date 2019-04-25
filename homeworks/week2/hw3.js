function reverse(str) {
  let res = '';
  for (let i = 0; i < str.length; i += 1) {
    res += str[str.length - 1 - i];
  }
  console.log(res);
}
reverse('zxcvasdf');
reverse('1,2,3,4,5');
reverse('1asdf2');
