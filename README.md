# AI Assisted Software Development Course - VMC

Course materials for the CODE AI Assisted Software Development private course for Vanderbilt University Medical Center (VMC).

**Course Date:** April 6, 2026

## 📋 Overview

This repository contains all course materials, including presentations, code examples, and resources for learning AI-assisted software development techniques and best practices.

## 📚 Course Contents

### Slides

- **aiasd-311-monday.pptx** - Main course presentation covering AI-assisted development fundamentals

### Code Examples

- **Simple Calculator** - Available in both console and web versions:
  - Formula parsing with regex
  - Basic arithmetic operations (+, -, \*, /, %)
  - Interactive UI (CLI and web-based)
  - Test-driven development with Jest
  - Modern web interface with history tracking
  - Error handling best practices
  - See [CALCULATOR.md](CALCULATOR.md) for full documentation

## 🎯 Learning Objectives

Participants will learn to:

- Leverage AI tools for enhanced software development productivity
- Apply best practices for AI-assisted coding
- Integrate AI capabilities into development workflows
- Understand the limitations and proper use cases for AI assistance
- Write effective prompts for code generation and analysis

## 🤖 AI-Assisted Artifacts

- [Evergreen Software Development Instructions](.github/instructions/evergreen-software-development.instructions.md) - Repository-wide maintainability and long-term engineering guidance. Provenance: [conversation log](ai-logs/2026/04/06/create-evergreen-software-development-instructions-20260406/conversation.md)
- [Create Evergreen Software Development Instructions Promptfile](.github/prompts/create-evergreen-software-development-instructions.prompt.md) - Generates an evergreen software development instruction file in `.github/instructions/` with provenance logging and README discoverability. Provenance: [conversation log](ai-logs/2026/04/07/create-evergreen-software-development-instructions-promptfile-20260407/conversation.md)
- [Create Logical Git Submission Promptfile](.github/prompts/create-logical-git-submission-promptfile.prompt.md) - Generates a promptfile for reviewing repository changes, splitting them into logical commit groups, and submitting those groups safely. Provenance: [conversation log](ai-logs/2026/04/07/create-logical-git-submission-promptfile-20260407/conversation.md)
- [Submit Logical Git Groups Promptfile](.github/prompts/submit-logical-git-groups.prompt.md) - Reviews the current diff, proposes logical commit groups, and creates one safe commit per approved group without pushing. Provenance: [conversation log](ai-logs/2026/04/07/create-submit-logical-git-groups-promptfile-20260407/conversation.md)

## 🛠️ Prerequisites

- Basic programming knowledge
- Familiarity with software development concepts
- Access to AI development tools (GitHub Copilot, etc.)
- Node.js 14.0.0 or higher (for running code examples)

## 📁 Repository Structure

```
.
├── LICENSE                      # CC0 1.0 Universal License
├── README.md                    # This file
├── calculator.js                # Console calculator application
├── calculator.test.js           # Jest unit tests
├── CALCULATOR.md                # Calculator documentation
├── index.html                   # Web calculator UI
├── styles.css                   # Web calculator styling
├── web-app.js                   # Web calculator logic
├── jest.config.js               # Jest test configuration
├── package.json                 # Node.js project configuration
├── coverage/                    # Test coverage reports
└── slides/                      # Course presentation materials
    └── aiasd-311-monday.pptx
```

## 🚀 Quick Start

### Running the Web Calculator

**Option 1: Simple HTTP Server**

```bash
npm run serve
```

Then open http://localhost:3000 in your browser

**Option 2: Direct File Open**
Simply open `index.html` in your web browser

### Running the Console Calculator

```bash
# Run the interactive CLI calculator
node calculator.js

# Or use npm
npm start
```

### Running Tests

```bash
# Install dependencies (Jest)
npm install

# Run tests with coverage
npm test
```

## 📝 License

This project is released under the [CC0 1.0 Universal](LICENSE) license - free to use, modify, and distribute without restrictions.

## 👥 About

This course is developed and delivered by CODE for Vanderbilt University Medical Center.

---

_For questions or feedback about this course, please contact the course instructor._
