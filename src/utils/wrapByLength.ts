/**
 * Wraps text into lines with a maximum number of characters.
 * Breaks at word boundaries when possible.
 *
 * @param {string} text - The input text to wrap.
 * @param {number} length - Maximum allowed characters per line.
 * @returns {string} The wrapped text, with lines separated by newline characters.
 *
 * @example
 * wrapByLength("This is a very long sentence", 10);
 * // => "This is a\nvery long\nsentence"
 */
export function wrapByLength(text: string, length: number): string {
  if (length <= 0) {
    throw new Error('wrap length must be greater than 0');
  }

  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    if ((line + ' ' + word).trim().length > length) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line += ' ' + word;
    }
  }

  if (line) lines.push(line.trim());

  return lines.join('\n');
}
