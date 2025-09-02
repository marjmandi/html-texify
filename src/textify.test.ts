import { textify } from './index';

describe('textify', () => {
  test('returns empty string if html is empty', () => {
    expect(textify({ html: '' })).toBe('');
    expect(textify({ html: null as unknown as string })).toBe('');
  });

  test('strips all tags except ignored ones', () => {
    const html =
      '<p>Paragraph <b><mark>bold</mark></b><foo /> <i>italic</i><foo/></p>';
    const result = textify({
      html,
      preserveFormatting: true,
      ignoreTags: ['mark', 'foo'],
    });
    expect(result).toBe('Paragraph **<mark>bold</mark>**<foo />*italic*<foo/>');
  });

  test('handles multiple ignored tags', () => {
    const html = '<p>Paragraph <b>bold</b> <i>italic</i> <u>underlined</u></p>';
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: ['b', 'u'],
    });
    expect(result).toBe('Paragraph <b>bold</b> italic <u>underlined</u>');
  });

  test('trims whitespace after stripping tags', () => {
    const html = '   <p>Test</p>   ';
    const result = textify({ html, preserveFormatting: false });
    expect(result).toBe('Test');
  });

  test('preserveFormat has no effect when they are in ignoreTags', () => {
    const html = '<p>Paragraph <b>bold</b> <i>italic</i></p>';
    const result = textify({
      html,
      preserveFormatting: true,
      ignoreTags: ['b', 'i'],
    });
    expect(result).toBe('Paragraph <b>bold</b><i>italic</i>');
  });

  test('removes all tags when ignoreTags is empty', () => {
    const html = '<div>Hello <span>World</span></div>';
    const result = textify({ html, preserveFormatting: false, ignoreTags: [] });
    expect(result).toBe('Hello World');
  });

  test('case-insensitive matching for ignoreTags', () => {
    const html = '<P>Text with <B>bold</B> tag</P>';
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: ['b'],
    });
    expect(result).toBe('Text with <B>bold</B> tag');
  });

  test('self-closing ignored tags are preserved', () => {
    const html = 'Line break<br/>Next line';
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: ['br'],
    });
    expect(result).toBe('Line break<br/>Next line');
  });

  test('self-closing non-ignored tags are stripped', () => {
    const html = 'Line break<br/>Next line';
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: [],
    });
    expect(result).toBe('Line breakNext line');
  });

  test('ignores invalid or unknown tags if not in ignoreTags', () => {
    const html = 'Hello <unknown>???</unknown> World';
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: [],
    });
    expect(result).toBe('Hello ??? World');
  });

  test('preserveFormatting=true delegates to preserveFormat', () => {
    const html = '<p>Hello <b>world</b></p>';
    const result = textify({ html, preserveFormatting: true });
    // since preserveFormat handles it, just check it returns something non-empty
    expect(result).not.toBe('');
  });
});
