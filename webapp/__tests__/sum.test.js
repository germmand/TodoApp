const sum = (a, b) => a + b;

describe('dummy test function', () => {
  it('adds 1 + 2 equal to 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
