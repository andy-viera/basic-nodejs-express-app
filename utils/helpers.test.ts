import { sum, multiply, capitalize } from "./helpers";

describe("Helpers Utility Functions", () => {
  test("sum should add two numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
  });

  test("multiply should multiply two numbers correctly", () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(-3, 3)).toBe(-9);
  });

  test("capitalize should return an empty string when given an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("capitalize should capitalize the first letter of a string", () => {
    expect(capitalize("john")).toBe("John");
    expect(capitalize("DOE")).toBe("DOE");
  });
});
