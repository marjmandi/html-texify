import { htmlToText } from "./index";

describe("htmlToText", () => {
  test("removes HTML tags", () => {
    expect(htmlToText("<p>Hello</p>")).toBe("Hello");
  });

  test("trims whitespace", () => {
    expect(htmlToText("   <b>Hi</b>   ")).toBe("Hi");
  });

  test("returns empty string for empty input", () => {
    expect(htmlToText("")).toBe("");
  });

  test("works with nested tags", () => {
    expect(htmlToText("<div><p>Test</p></div>")).toBe("Test");
  });
});
