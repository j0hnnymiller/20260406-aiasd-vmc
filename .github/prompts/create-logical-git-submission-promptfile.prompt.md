---
name: create-logical-git-submission-promptfile
description: Create a promptfile that reviews repository changes, groups them into logical commits, and submits each group safely.
arguments:
  generated_prompt_name:
    type: string
    description: Kebab-case name for the promptfile to generate in .github/prompts/
  submission_mode:
    type: enum
    values: ["commit-only", "commit-and-push"]
    description: Whether the generated promptfile should stop after committing or optionally push after explicit confirmation
  scope_hint:
    type: string
    description: Optional hint describing which kinds of changes the generated promptfile should target
tags: ["git", "promptfile", "commits", "workflow"]
ai_generated: true
model: "openai/gpt-5.4@2026-04"
operator: "johnmillerATcodemag-com"
chat_id: "create-logical-git-submission-promptfile-20260407"
prompt: |
  create a prompt file that creates a prompt file that submits changes to the git repository in logical groups
started: "2026-04-07T12:33:09.8095781-07:00"
ended: "2026-04-07T12:36:09.8095781-07:00"
task_durations:
  - task: "requirements review"
    duration: "00:01:00"
  - task: "promptfile drafting"
    duration: "00:02:00"
  - task: "provenance and README updates"
    duration: "00:01:00"
total_duration: "00:04:00"
ai_log: "ai-logs/2026/04/07/create-logical-git-submission-promptfile-20260407/conversation.md"
source: "GitHub Copilot chat"
owner: "Development Team"
version: "1.0.0"
---

# Create Grouped Git Submission Promptfile

Create a new promptfile at `.github/prompts/{{generated_prompt_name}}.prompt.md`.

The generated promptfile must:

- Include valid YAML front matter with `name`, `description`, useful `arguments`, and the repository's required AI provenance fields.
- Inspect the current git status and diffs before proposing any commits.
- Group changes into logical commit sets such as feature, fix, refactor, docs, or tests based on the actual diff.
- Show the proposed groups and commit messages before making any git changes.
- Stage only the files or hunks needed for one logical group at a time.
- Create one commit per group with clear, conventional commit messages.
- Respect `{{scope_hint}}` when deciding how to group the changes.
- Stop after creating commits when `{{submission_mode}}` is `commit-only`.
- Require explicit confirmation before any push, even when `{{submission_mode}}` is `commit-and-push`.
- Never use destructive git commands and never touch unrelated user changes.

Keep the generated promptfile concise, task-oriented, and ready for use from the Copilot prompt picker.
