---
name: submit-logical-git-groups
description: Review the current git diff, split it into logical commit groups, and create one safe commit per group.
arguments:
  scope_hint:
    type: string
    description: Optional hint about which files or themes should be grouped together
  commit_style:
    type: enum
    values: ["conventional", "plain"]
    description: Commit message style to use for the proposed and created commits
tags: ["git", "commits", "workflow"]
ai_generated: true
model: "openai/gpt-5.4@2026-04"
operator: "johnmillerATcodemag-com"
chat_id: "create-submit-logical-git-groups-promptfile-20260407"
prompt: |
  run this prompt
started: "2026-04-07T12:36:56.0498210-07:00"
ended: "2026-04-07T12:40:56.0498210-07:00"
task_durations:
  - task: "prompt execution review"
    duration: "00:01:00"
  - task: "concrete promptfile creation"
    duration: "00:02:00"
  - task: "provenance and README updates"
    duration: "00:01:00"
total_duration: "00:04:00"
ai_log: "ai-logs/2026/04/07/create-submit-logical-git-groups-promptfile-20260407/conversation.md"
source: ".github/prompts/create-logical-git-submission-promptfile.prompt.md"
owner: "Development Team"
version: "1.0.0"
---

# Submit Logical Git Groups

Review the current git status and diff before making any changes.

Your workflow:

- Inspect the staged and unstaged changes.
- Use `{{scope_hint}}` if it helps separate unrelated themes.
- Propose logical commit groups with a short rationale and one commit message per group.
- Stop and show the full grouping plan before staging or committing anything.
- After approval, stage only the files or hunks for the first group.
- Create one commit for that group using `{{commit_style}}` message formatting.
- Repeat for the remaining approved groups.
- Do not push.
- Do not use destructive git commands.
- Do not modify or include unrelated user changes.

At the end, summarize the commits created and list any remaining uncommitted changes.
