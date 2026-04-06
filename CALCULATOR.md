# Simple Calculator

A calculator application available in both console and web versions, performing fundamental arithmetic operations with formula input support.

## Versions

### 💻 Console Version

Interactive command-line calculator using Node.js readline interface

### 🌐 Web Version

Modern web interface with button grid, history tracking, and responsive design

## Features

- ✅ Addition (+)
- ✅ Subtraction (-)
- ✅ Multiplication (\*)
- ✅ Division (/)
- ✅ Percentage (%) - calculates X% of Y
- ✅ Formula input (e.g., "10 + 5")
- ✅ Support for negative numbers
- ✅ Support for decimal numbers
- ✅ Error handling for invalid inputs and division by zero
- ✅ Interactive interfaces (CLI and web)
- ✅ Web version: Button grid for easy input
- ✅ Web version: Calculation history with click-to-reuse
- ✅ Web version: Responsive design for mobile/desktop
- ✅ Comprehensive test suite with Jest
- ✅ Code coverage reporting

## Prerequisites

- Node.js 14.0.0 or higher

## Installation

1. Make sure you have Node.js installed:

   ```bash
   node --version
   ```

2. Install dependencies (for testing):

   ```bash
   npm install
   ```

## Usage

### Web Version (Recommended)

**Option 1: Using Built-in HTTP Server**

```bash
npm run serve
```

Then open your browser to: http://localhost:3000

**Option 2: Direct File Open**

```bash
# Simply open index.html in your browser
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

**Web Interface Features:**

- Type formulas directly or use the button grid
- Press Enter or click = to calculate
- Backspace button or Backspace key to delete last character
- Clear All button to reset the calculator
- View calculation history
- Click history items to reuse formulas
- Responsive design works on mobile and desktop

### Console Version

```bash
node calculator.js
```

Or use the npm script:

```bash
npm start
```

### Run Tests

```bash
npm test
```

### Example Session

```
=================================
    SIMPLE CALCULATOR
=================================
Available operations:
  + : Addition
  - : Subtraction
  * : Multiplication
  / : Division
  % : Percentage (e.g., 50 % 20 = 10)
=================================
Enter formulas like: 10 + 5
Type 'q' to quit
=================================

Enter formula (or q to quit): 10 + 5

Result: 10 + 5 = 15

Enter formula (or q to quit): 20 / 4

Result: 20 / 4 = 5

Enter formula (or q to quit): 100 * 2.5

Result: 100 * 2.5 = 250

Enter formula (or q to quit): 50 % 20

Result: 50 % 20 = 10

Enter formula (or q to quit): -15 - 10

Result: -15 - 10 = -25

Enter formula (or q to quit): q

Thank you for using the calculator. Goodbye!
```

## How It Works

1. The application prompts for a formula input (e.g., "10 + 5")
2. Parses the formula using regex to extract numbers and operator
3. Performs the calculation
4. Displays the result
5. Continues to prompt for new formulas until 'q' is entered

### Input Format

Enter formulas in the format: `number operator number`

**Valid Examples:**

- `10 + 5` (with spaces)
- `20/4` (without spaces)
- `100 * 2.5` (decimals)
- `50 % 20` (percentage: 20% of 50 = 10)
- `-15 - 10` (negative numbers)
- `3.14*2` (mixed)

Spaces are optional but recommended for readability.

### Formula Parsing

The calculator uses a regex pattern to parse formulas:

```javascript
/^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/%])\s*(-?\d+(?:\.\d+)?)\s*$/;
```

This pattern matches:

- Optional leading/trailing whitespace
- Negative numbers (optional `-` prefix)
- Integer or decimal numbers
- One of five operators: `+`, `-`, `*`, `/`, `%`

## Error Handling

- **Invalid formula format**: Prompts user to use correct format
- **Invalid numbers**: Prompts user to try again
- **Division by zero**: Returns error message
- **Invalid operator**: Returns error message
- **Graceful exit**: Type 'q' to quit

## Project Structure

```
.
├── calculator.js          # Console calculator application
├── calculator.test.js     # Jest test suite (31 tests)
├── index.html             # Web calculator UI
├── styles.css             # Web calculator styling
├── web-app.js             # Web calculator logic
├── jest.config.js         # Jest configuration
├── package.json           # Project dependencies and scripts
└── CALCULATOR.md          # This file
```

## Testing

The project includes comprehensive tests using Jest:

```bash
npm test
```

**Test Coverage:**

- `calculate()` function: All operations and edge cases (11 tests)
- `parseFormula()` function: Valid/invalid formulas, special cases (10 tests)
- `clearEntry()` function: Character removal, edge cases (10 tests)
- Total: 31 test cases

**Test Output Example:**

```
Test Suites: 1 passed, 1 total
Tests:       31 passed, 31 total
```

## API Reference

### Exported Functions

#### `calculate(num1, operator, num2)`

Performs a basic arithmetic operation.

**Parameters:**

- `num1` (number): First operand
- `operator` (string): One of `+`, `-`, `*`, `/`, `%`
- `num2` (number): Second operand

**Returns:**

- (number): Result of the calculation
- (string): Error message for division by zero or invalid operator

**Example:**

```javascript
const { calculate } = require("./calculator");
console.log(calculate(10, "+", 5)); // 15
console.log(calculate(50, "%", 20)); // 10 (20% of 50)
```

#### `parseFormula(formula)`

Parses a formula string into components.

**Parameters:**

- `formula` (string): Formula in format "num operator num"

**Returns:**

- (object): `{ num1, operator, num2 }` if valid
- (null): If formula is invalid

**Example:**

```javascript
const { parseFormula } = require("./calculator");
const result = parseFormula("10 + 5");
// { num1: 10, operator: '+', num2: 5 }
```

#### `clearEntry(currentValue)`

Removes the last character from the current input value.

**Parameters:**

- `currentValue` (string): Current formula or input string

**Returns:**

- (string): Input with last character removed
- (string): Empty string if input is already empty

**Example:**

```javascript
const { clearEntry } = require("./calculator");
console.log(clearEntry("123")); // "12"
console.log(clearEntry("10 + 5")); // "10 + "
console.log(clearEntry("A")); // ""
console.log(clearEntry("")); // ""
```

## Development Notes

- Uses Node.js built-in `readline` module for CLI interaction
- Formula parsing uses regex with detailed comments
- Module exports functions for testability while maintaining CLI functionality
- Uses `require.main === module` check to prevent CLI execution during testing

## License

MIT
