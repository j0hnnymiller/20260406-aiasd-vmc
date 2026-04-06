const { calculate, parseFormula, clearEntry } = require("./calculator");

describe("calculate", () => {
  test("adds two positive numbers", () => {
    expect(calculate(10, "+", 5)).toBe(15);
  });

  test("subtracts two numbers", () => {
    expect(calculate(10, "-", 5)).toBe(5);
  });

  test("multiplies two numbers", () => {
    expect(calculate(10, "*", 5)).toBe(50);
  });

  test("divides two numbers", () => {
    expect(calculate(10, "/", 5)).toBe(2);
  });

  test("handles division by zero", () => {
    expect(calculate(10, "/", 0)).toBe("Error: Division by zero");
  });

  test("handles negative numbers in addition", () => {
    expect(calculate(-5, "+", 10)).toBe(5);
  });

  test("handles negative numbers in subtraction", () => {
    expect(calculate(-5, "-", -3)).toBe(-2);
  });

  test("handles decimal numbers", () => {
    expect(calculate(10.5, "+", 2.5)).toBe(13);
  });

  test("calculates percentage", () => {
    expect(calculate(50, "%", 20)).toBe(10);
  });

  test("calculates percentage with decimals", () => {
    expect(calculate(100, "%", 15.5)).toBe(15.5);
  });

  test("returns error for invalid operator", () => {
    expect(calculate(10, "^", 5)).toBe("Error: Invalid operator");
  });
});

describe("parseFormula", () => {
  test("parses simple addition formula", () => {
    expect(parseFormula("10 + 5")).toEqual({
      num1: 10,
      operator: "+",
      num2: 5,
    });
  });

  test("parses formula without spaces", () => {
    expect(parseFormula("10+5")).toEqual({
      num1: 10,
      operator: "+",
      num2: 5,
    });
  });

  test("parses negative numbers", () => {
    expect(parseFormula("-5 + 10")).toEqual({
      num1: -5,
      operator: "+",
      num2: 10,
    });
  });

  test("parses decimal numbers", () => {
    expect(parseFormula("3.14 * 2")).toEqual({
      num1: 3.14,
      operator: "*",
      num2: 2,
    });
  });

  test("parses all operators", () => {
    expect(parseFormula("20 / 4")).toEqual({
      num1: 20,
      operator: "/",
      num2: 4,
    });
  });

  test("parses percentage operator", () => {
    expect(parseFormula("50 % 20")).toEqual({
      num1: 50,
      operator: "%",
      num2: 20,
    });
  });

  test("parses percentage without spaces", () => {
    expect(parseFormula("100%25")).toEqual({
      num1: 100,
      operator: "%",
      num2: 25,
    });
  });

  test("returns null for invalid formula", () => {
    expect(parseFormula("invalid")).toBeNull();
  });

  test("returns null for incomplete formula", () => {
    expect(parseFormula("10 +")).toBeNull();
  });

  test("returns null for formula with invalid operator", () => {
    expect(parseFormula("10 ^ 5")).toBeNull();
  });
});

describe("clearEntry", () => {
  test("removes last character from string", () => {
    expect(clearEntry("10 + 5")).toBe("10 + ");
  });

  test("removes last character from number", () => {
    expect(clearEntry("123")).toBe("12");
  });

  test("removes last character from operator", () => {
    expect(clearEntry("10 +")).toBe("10 ");
  });

  test("handles single character string", () => {
    expect(clearEntry("5")).toBe("");
  });

  test("handles empty string", () => {
    expect(clearEntry("")).toBe("");
  });

  test("removes trailing space", () => {
    expect(clearEntry("10 + ")).toBe("10 +");
  });

  test("works with formula without spaces", () => {
    expect(clearEntry("10+5")).toBe("10+");
  });

  test("removes decimal point", () => {
    expect(clearEntry("3.14")).toBe("3.1");
  });

  test("removes negative sign when last character", () => {
    expect(clearEntry("-")).toBe("");
  });

  test("handles multi-digit removal", () => {
    expect(clearEntry("1000")).toBe("100");
  });
});
