function printFactor(num) {
  for (let i = 1; i <= num; i += 1) {
    if (num % i === 0) {
      console.log(i);
    }
  }
}
printFactor(10);
