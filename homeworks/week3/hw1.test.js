const stars = require('./hw1');

describe('hw1', () => {
  test('should return correct answer when n = 1', () => {
    expect(stars(1)).toEqual(['*']);
  });
  test('should return correct answer when n = 3', () => {
    expect(stars(3)).toEqual(['*', '**', '***']);
  });
  test('should return correct answer when n = 6', () => {
    expect(stars(6)).toEqual(['*', '**', '***', '****', '*****', '******']);
  });
});
