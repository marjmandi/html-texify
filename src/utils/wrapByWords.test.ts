import { wrapByWords } from './wrapByWords';

describe('wrapByWords', () => {
  test('splits text into lines of given word count', () => {
    const text = 'one two three four five six seven';
    expect(wrapByWords(text, 3)).toBe('one two three\nfour five six\nseven');
  });

  test('handles text shorter than word count', () => {
    const text = 'hello world';
    expect(wrapByWords(text, 5)).toBe('hello world');
  });

  test('handles exact multiples', () => {
    const text = 'a b c d';
    expect(wrapByWords(text, 2)).toBe('a b\nc d');
  });

  test('ignores extra whitespace', () => {
    const text = '   alpha   beta   gamma   ';
    expect(wrapByWords(text, 2)).toBe('alpha beta\ngamma');
  });

  test('handles single word', () => {
    expect(wrapByWords('word', 2)).toBe('word');
  });

  test('returns empty string for empty input', () => {
    expect(wrapByWords('', 3)).toBe('');
  });
});
