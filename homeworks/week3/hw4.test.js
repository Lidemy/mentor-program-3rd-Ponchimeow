const isPalindromes = require('./hw4');

describe('hw4', () => {
  it('should return correct answer when str = abcdcba', () => {
    expect(isPalindromes('abcdcba')).toBe(true);
  });
  it('should return correct answer when str =  1qwe``ewq1 ', () => {
    expect(isPalindromes(' 1qwe``ewq1 ')).toBe(true);
  });
  it('should return correct answer when str = abcdcba', () => {
    expect(isPalindromes(',-abcbA.,')).toBe(false);
  });
});
