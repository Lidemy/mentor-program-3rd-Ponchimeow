const alphaSwap = require('./hw2');

describe('hw2', () => {
  it('should return correct answer when str = nick', () => {
    expect(alphaSwap('nick')).toBe('NICK');
  });
  it('should return correct answer when str = TeSt', () => {
    expect(alphaSwap('TeSt')).toBe('tEsT');
  });
  it('should return correct answer when str = BEN', () => {
    expect(alphaSwap('BEN')).toBe('ben');
  });
  it('should return correct answer when str =  a,1D ` ~', () => {
    expect(alphaSwap(' a,1D ` ~')).toBe(' A,1d ` ~');
  });
});
