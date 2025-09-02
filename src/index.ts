import preserveFormat from './utils/preserveFormat';

export interface TextifyOptions {
  html: string;
  preserveFormatting?: boolean; // optional, default true
  ignoreTags?: string[]; // optional tags to keep intact
}

export function textify({
  html,
  preserveFormatting = true,
  ignoreTags = [],
}: TextifyOptions): string {
  // Ignore rest of the function if it's already empty
  if (!html) return '';

  if (preserveFormatting) {
    // Keep readable formatting
    html = preserveFormat({ html, ignoreTags });
  } else {
    if (ignoreTags.length === 0) {
      // Strip all tags
      html = html.replace(/<[^>]+>/g, '').trim();
    } else {
      // Regex to match all tags except the ignored ones
      const IG = new Set(ignoreTags.map((t) => t.toLowerCase()));
      html = html
        .replace(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi, (match, tag) =>
          IG.has(tag.toLowerCase()) ? match : ''
        )
        .trim();
    }
  }
  return html;
}
