import { STATUS } from './enums';

describe('Enums', () => {
  const status = STATUS;

  it('should convert number to match status', () => {
    // arrange
    const expected = [
      { value: 0, expected: status.upcoming },
      { value: 1, expected: status.ongoing },
      { value: 2, expected: status.ended },
      { value: 3, expected: undefined },
    ];
    // act
    expected.map(x => {
      // assert
      expect(x.expected).toEqual(status.convert(x.value));
    });
  });
});
