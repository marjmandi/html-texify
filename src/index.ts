import { preserveFormat } from './utils/preserveFormat';
import { wrapByLength } from './utils/wrapByLength';
import { wrapByWords } from './utils/wrapByWords';

export interface TextifyOptions {
  html: string;
  preserveFormatting?: boolean; // optional, default true
  ignoreTags?: string[]; // optional tags to keep intact
  wrapLength?: number; // max chars per line
  wrapWords?: number; // max words per line
}

/**
 * Converts HTML to plain text with optional formatting and wrapping.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.html - The input HTML string to convert.
 * @param {boolean} [options.preserveFormatting=true] - Whether to preserve readable formatting.
 * @param {string[]} [options.ignoreTags=[]] - List of HTML tags to keep intact.
 * @param {number} [options.wrapLength] - Maximum characters per line (ignored if wrapWords is set).
 * @param {number} [options.wrapWords] - Maximum words per line. Takes priority over wrapLength.
 * @returns {string} The plain text result with optional wrapping.
 *
 * @example
 * textify({ html: "<p>Hello <b>world</b></p>", preserveFormatting: false });
 * // => "Hello world"
 *
 * @example
 * textify({ html: "<p>one two three four five</p>", wrapWords: 2 });
 * // => "one two\nthree four\nfive"
 *
 * @example
 * textify({ html: "<p>one two three four five</p>", wrapLength: 10 });
 * // => "one two\nthree four\nfive"
 */
export function textify({
  html,
  preserveFormatting = true,
  ignoreTags = [],
  wrapLength,
  wrapWords,
}: TextifyOptions): string {
  if (!html) return '';

  // Strip or preserve HTML formatting
  if (preserveFormatting) {
    html = preserveFormat({ html, ignoreTags });
  } else {
    if (ignoreTags.length === 0) {
      html = html.replace(/<[^>]+>/g, '').trim();
    } else {
      const IG = new Set(ignoreTags.map((t) => t.toLowerCase()));
      html = html
        .replace(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi, (match, tag) =>
          IG.has(tag.toLowerCase()) ? match : ''
        )
        .trim();
    }
  }

  // Wrap output text (word-based wrapping takes priority)
  if (wrapWords && wrapWords > 0) {
    html = wrapByWords(html, wrapWords);
  } else if (wrapLength && wrapLength > 0) {
    html = wrapByLength(html, wrapLength);
  }

  return html;
}
