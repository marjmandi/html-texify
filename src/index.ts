import preserveFormat from "./utils/preserveFormat";

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
  if (!html) return "";

  if (preserveFormatting) {
    // Keep readable formatting
    html = preserveFormat({ html, ignoreTags });
  }

  if (ignoreTags.length === 0) {
    // Strip all tags
    return html.replace(/<[^>]+>/g, "").trim();
  }

  // Regex to match all tags except the ignored ones
  const tagsPattern = ignoreTags.join("|");
  const regex = new RegExp(`<\\/?(?!${tagsPattern}\\b)[^>]+?>`, "gi");

  return html.replace(regex, "").trim();
}
