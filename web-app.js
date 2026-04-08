/**
 * Performs basic calculator operations
 * @param {number} num1 - First number
 * @param {string} operator - Operation (+, -, *, /, %)
 * @param {number} num2 - Second number
 * @returns {number|string} - Result or error message
 */
function calculate(num1, operator, num2) {
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
 * @returns {object|null} - Object with num1, operator, num2 or null if invalid
 */
function parseFormula(formula) {
  const regex = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/%])\s*(-?\d+(?:\.\d+)?)\s*$/;
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

const { createFeatureFlagClient, loadDefaultFeatureFlagConfig } =
  window.featureFlags;

// DOM Elements
const formulaInput = document.getElementById("formula-input");
const resultDisplay = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const equalsBtn = document.getElementById("equals");
const historyList = document.getElementById("history-list");
const numButtons = document.querySelectorAll(".num-btn");
const opButtons = document.querySelectorAll(".op-btn");

// History array
let history = [];
let featureFlagClient = createFeatureFlagClient({
  version: "boot",
  flags: {},
});

function getEnabledOperators() {
  const operators = ["+", "-", "*", "/"];

  if (featureFlagClient.isEnabled("operators.percentage")) {
    operators.push("%");
  }

  return operators;
}

function applyFeatureFlags() {
  document.querySelectorAll("[data-feature-flag]").forEach((element) => {
    const flagName = element.dataset.featureFlag;
    element.hidden = !featureFlagClient.isEnabled(flagName);
  });
}

/**
 * Calculates and displays the result
 */
function calculateResult() {
  const formula = formulaInput.value.trim();

  if (!formula) {
    return;
  }

  const parsed = parseFormula(formula, featureFlagClient);

  if (!parsed) {
    displayResult("Error: Invalid formula", true);
    return;
  }

  const { num1, operator, num2 } = parsed;

  if (isNaN(num1) || isNaN(num2)) {
    displayResult("Error: Invalid numbers", true);
    return;
  }

  const result = calculate(num1, operator, num2);
  displayResult(result, typeof result === "string");

  // Add to history if successful
  if (typeof result === "number") {
    addToHistory(formula, result);
  }
}

/**
 * Displays the result
 * @param {number|string} result - Result to display
 * @param {boolean} isError - Whether the result is an error
 */
function displayResult(result, isError = false) {
  resultDisplay.textContent = result;
  if (isError) {
    resultDisplay.classList.add("error");
  } else {
    resultDisplay.classList.remove("error");
  }
}

/**
 * Adds a calculation to history
 * @param {string} formula - The formula
 * @param {number} result - The result
 */
function addToHistory(formula, result) {
  if (!featureFlagClient.isEnabled("web.history")) {
    return;
  }

  history.unshift({ formula, result });
  if (history.length > 10) {
    history.pop();
  }
  renderHistory();
}

/**
 * Renders the history list
 */
function renderHistory() {
  if (!featureFlagClient.isEnabled("web.history")) {
    historyList.innerHTML = "";
    return;
  }

  historyList.innerHTML = "";
  history.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    const formulaSpan = document.createElement("span");
    formulaSpan.className = "formula";
    formulaSpan.textContent = item.formula;
    const resultSpan = document.createElement("span");
    resultSpan.className = "result";
    resultSpan.textContent = `= ${item.result}`;
    historyItem.appendChild(formulaSpan);
    historyItem.appendChild(resultSpan);
    historyItem.addEventListener("click", () => {
      formulaInput.value = item.formula;
      formulaInput.focus();
    });
    historyList.appendChild(historyItem);
  });
}

/**
 * Clears the input and result
 */
function clearCalculator() {
  formulaInput.value = "";
  resultDisplay.textContent = "";
  resultDisplay.classList.remove("error");
  formulaInput.focus();
}

/**
 * Removes the last character from the input (backspace)
 */
function backspaceInput() {
  formulaInput.value = clearEntry(formulaInput.value);
  resultDisplay.textContent = "";
  resultDisplay.classList.remove("error");
  formulaInput.focus();
}

/**
 * Appends a value to the input
 * @param {string} value - Value to append
 */
function appendToInput(value) {
  if (value === "%" && !getEnabledOperators().includes("%")) {
    return;
  }

  formulaInput.value += value;
  formulaInput.focus();
}

function registerEventListeners() {
  formulaInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      calculateResult();
    }
  });

  formulaInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      setTimeout(() => {
        resultDisplay.textContent = "";
        resultDisplay.classList.remove("error");
      }, 0);
    }
  });

  equalsBtn.addEventListener("click", calculateResult);
  clearBtn.addEventListener("click", clearCalculator);
  backspaceBtn.addEventListener("click", backspaceInput);

  numButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      appendToInput(btn.dataset.value);
    });
  });

  opButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!getEnabledOperators().includes(btn.dataset.value)) {
        return;
      }

      const currentValue = formulaInput.value.trim();
      if (currentValue && !currentValue.endsWith(" ")) {
        appendToInput(" ");
      }
      appendToInput(btn.dataset.value);
      appendToInput(" ");
    });
  });
}

window.addEventListener("load", async () => {
  const featureFlagConfig = await loadDefaultFeatureFlagConfig();
  featureFlagClient = createFeatureFlagClient(featureFlagConfig);
  applyFeatureFlags();
  registerEventListeners();
  formulaInput.focus();
});
