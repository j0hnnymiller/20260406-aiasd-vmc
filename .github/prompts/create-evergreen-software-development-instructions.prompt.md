---
name: create-evergreen-software-development-instructions
description: Create an instruction file for evergreen software development practices that stays useful across tool, framework, and platform changes.
arguments:
  repository_context:
    type: string
    description: Optional repo-specific context, stack details, or constraints to incorporate.
tags: ["instructions", "evergreen", "maintenance", "software-development"]
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "0752845f-0929-4af0-b2e9-9a9c651005f2"
prompt: |
  create a new prompt file that creates an instruction file for evergreen software development.
started: "2026-04-07T00:00:00Z"
ended: "2026-04-07T00:10:00Z"
task_durations:
  - task: "promptfile authoring"
    duration: "00:06:00"
  - task: "provenance and repository updates"
    duration: "00:04:00"
total_duration: "00:10:00"
ai_log: "ai-logs/2026/04/07/0752845f-0929-4af0-b2e9-9a9c651005f2/conversation.md"
source: "johnmillerATcodemag-com"
owner: "Development Team"
version: "1.0.0"
reviewedBy: "GitHub Copilot"
created: "2026-04-07"
updated: "2026-04-07"
---

# Create Evergreen Software Development Instructions

Create a new instruction file at `.github/instructions/evergreen-software-development.instructions.md`.

If `{{repository_context}}` is provided, use it to tailor the result. Otherwise inspect the repository and infer only what is well-supported by the codebase.

Constraints:

1. Do not use files from any `__instructions` folder as source material.
2. Inspect the workspace before writing the instruction file.
3. Reuse the repository's visible conventions where they are sound, but do not duplicate existing instruction content.
4. If the repository is too small to infer language-specific conventions, keep the instruction file technology-agnostic.

The generated `.instructions.md` file must:

1. Include valid YAML front matter with complete AI provenance metadata.
2. Include a clear `description` field optimized for discovery during maintenance, modernization, refactoring, upgrade, and long-term support work.
3. Use an `applyTo` pattern that matches the actual repository scope. Use `"**"` only when the guidance is truly cross-cutting.
4. Stay concise, practical, and durable rather than aspirational or generic.
5. Focus on evergreen engineering guidance such as:
   - small, reversible changes
   - compatibility-preserving evolution when practical
   - dependency hygiene and upgrade safety
   - tests that protect behavior and contracts
   - observability, diagnostics, and operability
   - documentation and decision capture
   - deprecation planning and migration paths
   - performance, security, and accessibility as continuous work
   - stable naming, boundaries, and interfaces
   - avoiding unnecessary coupling to current framework versions or tooling fashions
6. Tailor the wording to the actual repository shape, language, and conventions after inspection.
7. Avoid manifesto language, process theater, and repetition of existing repository instructions.

Recommended output structure:

1. Overview
2. When to apply
3. Core rules
4. Change strategy
5. Dependency and upgrade guidance
6. Testing and diagnostics
7. Documentation and deprecation
8. Validation checklist

After generating the instruction file, summarize the main guidance and call out any assumptions made because the repository did not provide enough context.
