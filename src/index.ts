import preserveFormat from "./utils/preserveFormat";

export interface TextifyOptions {
  html: string;
  preserveFormatting?: boolean; // optional, default true
}

export function textify({
  html,
  preserveFormatting = true,
}: TextifyOptions): string {
  // Ignore rest of the function if it's already empty
  if (!html) return "";

  if (preserveFormatting) {
    // Keep readable formatting
    return preserveFormat(html);
  }
  // Strip all HTML tags completely
  return html.replace(/<[^>]+>/g, "").trim();
}
