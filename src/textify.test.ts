import { textify } from "./index";

describe("textify", () => {
  test("returns empty string if html is empty", () => {
    expect(textify({ html: "" })).toBe("");
    expect(textify({ html: null as unknown as string })).toBe("");
  });

  test("strips all tags except ignored ones", () => {
    const html =
      "<p>Paragraph <b><mark>bold</mark></b><foo /> <i>italic</i><foo/></p>";
    const result = textify({
      html,
      preserveFormatting: true,
      ignoreTags: ["mark", "foo"],
    });
    // <b> remains, <i> and <p> are stripped
    expect(result).toBe("Paragraph **bold** *italic*");
  });

  test("handles multiple ignored tags", () => {
    const html = "<p>Paragraph <b>bold</b> <i>italic</i> <u>underlined</u></p>";
    const result = textify({
      html,
      preserveFormatting: false,
      ignoreTags: ["b", "u"],
    });
    expect(result).toBe("Paragraph <b>bold</b> italic <u>underlined</u>");
  });

  test("trims whitespace after stripping tags", () => {
    const html = "   <p>Test</p>   ";
    const result = textify({ html, preserveFormatting: false });
    expect(result).toBe("Test");
  });

  test("ignoreTags has no effect when preserveFormatting is true", () => {
    const html = "<p>Paragraph <b>bold</b> <i>italic</i></p>";
    const result = textify({
      html,
      preserveFormatting: true,
      ignoreTags: ["b", "i"],
    });
    expect(result).toContain("**bold**");
    expect(result).toContain("*italic*");
  });
});
