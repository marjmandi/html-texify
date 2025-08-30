export default function preserveFormat(html: string): string {
  if (!html) return "";

  // Normalize spaces between tags
  html = html.replace(/>\s+</g, "><");

  // Convert <br> to newline
  html = html.replace(/<br\s*\/?>/gi, "\n");

  // Headings and paragraphs -> double newline
  html = html.replace(/<\/(h[1-6]|p)>/gi, "\n\n");

  // Bold / Italic
  html = html.replace(
    /<(b|strong)>(.*?)<\/\1>/gi,
    (_m, _t, content: string) => `**${content}**`
  );
  html = html.replace(
    /<(i|em)>(.*?)<\/\1>/gi,
    (_m, _t, content: string) => `*${content}*`
  );

  // Links
  html = html.replace(
    /<a\s+href="(.*?)".*?>(.*?)<\/a>/gi,
    (_m, href: string, text: string) => `${text} (${href})`
  );

  // Ordered lists
  html = html.replace(/<ol>(.*?)<\/ol>/gis, (_m, content: string) => {
    let counter = 0;
    return content.replace(/<li>(.*?)<\/li>/gi, (_li, liContent: string) => {
      counter++;
      return `${counter}. ${liContent}\n`;
    });
  });

  // Unordered lists
  html = html.replace(/<ul>(.*?)<\/ul>/gis, (_m, content: string) =>
    content.replace(
      /<li>(.*?)<\/li>/gi,
      (_li, liContent: string) => `- ${liContent}\n`
    )
  );

  // Blockquotes
  html = html.replace(
    /<blockquote>(.*?)<\/blockquote>/gis,
    (_m, content: string) =>
      content
        .replace(/<br\s*\/?>/gi, "\n")
        .trim()
        .split("\n")
        .map((line) => `> ${line.trim()}`)
        .join("\n")
  );

  // Tables
  html = html.replace(/<table>(.*?)<\/table>/gis, (_m, tableContent: string) =>
    tableContent
      .replace(
        /<tr>(.*?)<\/tr>/gi,
        (_tr, rowContent: string) =>
          rowContent
            .replace(/<t[dh]>(.*?)<\/t[dh]>/gi, "$1\t")
            .trim()
            .replace(/\t$/, "") + "\n"
      )
      .trim()
  );

  // Remove all remaining tags
  html = html.replace(/<[^>]+>/g, "");

  // Decode common HTML entities
  html = html
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

  // Collapse multiple newlines to max two
  html = html.replace(/\n{3,}/g, "\n\n").trim();

  return html;
}
