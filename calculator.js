#!/usr/bin/env node

const readline = require("readline");
const {
  createFeatureFlagClient,
  loadDefaultFeatureFlagConfigSync,
} = require("./feature-flags");

let rl;

const defaultFeatureFlags = createFeatureFlagClient(
  loadDefaultFeatureFlagConfigSync(),
);

function getEnabledOperators(featureFlags = defaultFeatureFlags) {
  const operators = ["+", "-", "*", "/"];

  if (featureFlags.isEnabled("operators.percentage")) {
    operators.push("%");
  }

  return operators;
}

function isOperatorEnabled(operator, featureFlags = defaultFeatureFlags) {
  return getEnabledOperators(featureFlags).includes(operator);
}

function escapeRegexToken(value) {
  return value.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
}

function getReadlineInterface() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("close", () => {
      process.exit(0);
    });
  }

  return rl;
}

/**
 * Performs basic calculator operations
 * @param {number} num1 - First number
 * @param {string} operator - Operation (+, -, *, /)
 * @param {number} num2 - Second number
 * @param {object} featureFlags - Feature flag client
 * @returns {number|string} - Result or error message
 */
function calculate(num1, operator, num2, featureFlags = defaultFeatureFlags) {
  if (!isOperatorEnabled(operator, featureFlags)) {
    return "Error: Invalid operator";
  }

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        return "Error: Division by zero";
      }
      return num1 / num2;
    case "%":
      return (num1 * num2) / 100;
    default:
      return "Error: Invalid operator";
  }
}

/**
 * Parses a formula string into components
 * @param {string} formula - Formula string (e.g., "10 + 5")
 * @param {object} featureFlags - Feature flag client
 * @returns {object|null} - Object with num1, operator, num2 or null if invalid
 */
function parseFormula(formula, featureFlags = defaultFeatureFlags) {
  const operatorPattern = getEnabledOperators(featureFlags)
    .map(escapeRegexToken)
    .join("|");
  const regex = new RegExp(
    `^\\s*(-?\\d+(?:\\.\\d+)?)\\s*(${operatorPattern})\\s*(-?\\d+(?:\\.\\d+)?)\\s*$`,
  );
  const match = formula.match(regex);

  if (!match) {
    return null;
  }

  return {
    num1: parseFloat(match[1]),
    operator: match[2],
    num2: parseFloat(match[3]),
  };
}

/**
 * Clears the last character from the input string (like backspace)
 * @param {string} input - The current input string
 * @returns {string} - Input string with last character removed
 */
function clearEntry(input) {
  if (!input || input.length === 0) {
    return "";
  }
  return input.slice(0, -1);
}

/**
 * Displays the calculator menu
 */
function displayMenu() {
  const enabledOperators = getEnabledOperators();

  console.log("\n=================================");
  console.log("    SIMPLE CALCULATOR");
  console.log("=================================");
  console.log("Available operations:");
  if (enabledOperators.includes("+")) {
    console.log("  + : Addition");
  }
  if (enabledOperators.includes("-")) {
    console.log("  - : Subtraction");
  }
  if (enabledOperators.includes("*")) {
    console.log("  * : Multiplication");
  }
  if (enabledOperators.includes("/")) {
    console.log("  / : Division");
  }
  if (enabledOperators.includes("%")) {
    console.log("  % : Percentage (e.g., 50 % 20 = 10)");
  }
  console.log("=================================");
  console.log("Enter formulas like: 10 + 5");
  console.log("Type 'q' to quit");
  console.log("=================================\n");
}

/**
 * Prompts user for input and processes the calculation
 */
function promptCalculation() {
  getReadlineInterface().question("Enter formula (or q to quit): ", (input) => {
    if (input.toLowerCase() === "q") {
      console.log("\nThank you for using the calculator. Goodbye!");
      getReadlineInterface().close();
      return;
    }

    const parsed = parseFormula(input);

    if (!parsed) {
      console.log(
        "Error: Invalid formula. Please use format: number operator number",
      );
      console.log("Example: 10 + 5 or 20 / 4");
      promptCalculation();
      return;
    }

    const { num1, operator, num2 } = parsed;

    if (isNaN(num1) || isNaN(num2)) {
      console.log("Error: Invalid numbers in formula. Please try again.");
      promptCalculation();
      return;
    }

    const result = calculate(num1, operator, num2);
    console.log(`\nResult: ${num1} ${operator} ${num2} = ${result}\n`);

    promptCalculation();
  });
}

// Main execution
if (require.main === module) {
  console.clear();
  displayMenu();
  promptCalculation();
}

// Export functions for testing
module.exports = {
  calculate,
  parseFormula,
  clearEntry,
  defaultFeatureFlags,
  getEnabledOperators,
  isOperatorEnabled,
};
