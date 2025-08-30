import preserveFormat from "./utils/preserveFormat";

export interface TextifyOptions {
  html: string;
  preserveFormatting?: boolean; // optional, default true
}

export function textify({
  html,
  preserveFormatting = true,
}: TextifyOptions): string {
  // Ignore rest of the function if it's alraedy empty
  if (!html) return "";

  if (!preserveFormatting) {
    return html.replace(/<[^>]+>/g, "").trim();
  }
  return preserveFormat(html);
}
