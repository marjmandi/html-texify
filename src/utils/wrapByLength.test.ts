import { wrapByLength } from './wrapByLength';

describe('wrapByLength', () => {
  test('wraps text at given character length without breaking words', () => {
    const text = 'This is a very long sentence';
    expect(wrapByLength(text, 10)).toBe('This is a\nvery long\nsentence');
  });

  test('returns text unchanged if shorter than length', () => {
    expect(wrapByLength('short text', 20)).toBe('short text');
  });

  test('handles exact line length', () => {
    expect(wrapByLength('12345 67890', 11)).toBe('12345 67890');
  });

  test('splits multiple lines correctly', () => {
    const text = 'one two three four five six seven eight nine';
    expect(wrapByLength(text, 13)).toBe(
      'one two three\nfour five six\nseven eight\nnine'
    );
  });

  test('ignores extra whitespace', () => {
    const text = '   alpha    beta   gamma   ';
    expect(wrapByLength(text, 8)).toBe('alpha\nbeta\ngamma');
  });

  test('handles single long word exceeding limit', () => {
    const text = 'supercalifragilisticexpialidocious';
    // since function does not force-break words, it stays as is
    expect(wrapByLength(text, 10)).toBe(text);
  });

  test('throws error if length is zero or negative', () => {
    expect(() => wrapByLength('abc', 0)).toThrow(
      'wrap length must be greater than 0'
    );
    expect(() => wrapByLength('abc', -5)).toThrow();
  });

  test('returns empty string when input is empty', () => {
    expect(wrapByLength('', 10)).toBe('');
  });
});
