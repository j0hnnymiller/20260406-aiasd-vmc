---
name: create-custom-agents-instructions
description: Create a promptfile that generates an instruction file for authoring and reviewing custom agents.
arguments:
  instruction_filename:
    type: string
    description: Kebab-case instruction filename without the .instructions.md suffix
    default: custom-agents
  instruction_scope:
    type: string
    description: Optional scope note describing the kinds of agents or teams the generated instruction file should support
  include_examples:
    type: boolean
    description: Whether the generated instruction file should include concrete agent frontmatter and body examples
    default: true
tags: ["agents", "instructions", "promptfile", "meta-prompt"]
ai_generated: true
model: "openai/gpt-5.4@2026-04"
operator: "johnmillerATcodemag-com"
chat_id: "create-custom-agents-instructions-promptfile-20260408"
prompt: |
  create a prompt file for the prompt: create an instruction file to guide the creation of custom agents
started: "2026-04-08T10:24:00-07:00"
ended: "2026-04-08T10:30:00-07:00"
task_durations:
  - task: "requirements review"
    duration: "00:02:00"
  - task: "promptfile drafting"
    duration: "00:03:00"
  - task: "provenance and README updates"
    duration: "00:01:00"
total_duration: "00:06:00"
ai_log: "ai-logs/2026/04/08/create-custom-agents-instructions-promptfile-20260408/conversation.md"
source: "GitHub Copilot chat"
prompt_metadata:
  id: create-custom-agents-instructions
  title: Generate Custom Agent Instructions
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/__instructions/{{instruction_filename}}.instructions.md
  category: documentation
  output_format: markdown
owner: "Development Team"
version: "1.0.0"
---

# Generate Custom Agent Instructions

## Context

Create an instruction file that guides contributors and AI assistants in creating effective GitHub Copilot custom agents for this repository.

The generated instruction file should target the repository instruction folder used in this workspace: `.github/__instructions/{{instruction_filename}}.instructions.md`.

Use the repository's existing instruction conventions and align the content with GitHub custom-agent concepts such as agent role clarity, minimal tool access, strong descriptions for discovery, and explicit boundaries.

Respect `{{instruction_scope}}` when tailoring examples, constraints, or recommended agent patterns.

**CRITICAL**: All AI-generated artifacts MUST comply with `.github/__instructions/ai-assisted-output.instructions.md`. The generated instruction file MUST include full AI provenance metadata.

## Deliverable

Generate `.github/__instructions/{{instruction_filename}}.instructions.md` with:

### Required AI Provenance Metadata (YAML Front Matter)

```yaml
ai_generated: true
model: "<model-name-and-version>"
operator: "<operator-username>"
chat_id: "<chat-identifier>"
prompt: |
  <exact-prompt-text>
started: "<ISO8601-timestamp>"
ended: "<ISO8601-timestamp>"
task_durations:
  - task: "<task-name>"
    duration: "<hh:mm:ss>"
total_duration: "<hh:mm:ss>"
ai_log: "ai-logs/<yyyy>/<mm>/<dd>/<chat-id>/conversation.md"
source: "<source-identifier>"
applyTo: "**/*.agent.md"
---
```

### Content Requirements

- Explain when to create a custom agent instead of using a promptfile, instruction file, or skill.
- Define repository-level placement and naming rules for `.agent.md` files under `.github/agents/`.
- Specify required and optional YAML frontmatter fields for custom agents, including `description`, `tools`, `argument-hint`, `model`, `agents`, and invocation controls when relevant.
- Emphasize that agent descriptions must be keyword-rich and use a clear `Use when...` pattern for discovery.
- Require minimal tool selection and explain how to choose between `read`, `search`, `edit`, `execute`, `agent`, `web`, and `todo`.
- Cover body structure expectations such as mission, constraints, approach, and output format.
- Include guidance for defining boundaries, avoiding Swiss-army agents, and preventing vague or conflicting roles.
- Include validation steps for frontmatter syntax, filename hygiene, discovery wording, and tool restrictions.
- Include a short checklist reviewers can use to assess whether a new agent is well-scoped and safe.
- Include concrete examples when `{{include_examples}}` is true.
- Keep the instruction file concise, practical, and optimized for AI consumption.

### Additional Requirements

- Reference the repository's existing AI provenance policy instead of inventing a separate metadata standard.
- Prefer imperative guidance such as `Create`, `Use`, `Avoid`, and `Validate`.
- Call out common mistakes like filenames with spaces, over-broad tool access, and descriptions that are too vague for delegation.
- Ensure the generated file is immediately usable by both contributors and AI assistants.
