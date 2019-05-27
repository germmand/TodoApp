import capitalizeFirstLetter from '../../../src/common/functions/capitalizeFirstLetter';

describe('common - capitalize first letter', () => {
  it('capitalizes first letter', () => {
    const providedString = 'testing';
    const expectedString = 'Testing';
    const returnedString = capitalizeFirstLetter(providedString);
    expect(returnedString).toEqual(expectedString);
  });
});
