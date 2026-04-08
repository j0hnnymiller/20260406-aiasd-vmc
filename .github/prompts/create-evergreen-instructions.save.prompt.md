---
name: "Create Evergreen Development Instructions"
description: "Create or refresh a workspace instruction file for evergreen software development practices"
argument-hint: "Optional: language stack, framework, team constraints, or repo-specific standards to include"
agent: "agent"
---

Create or update a workspace instruction file at `.github/instructions/evergreen-software-development.instructions.md`.

Goal: produce a durable instruction file that guides long-lived, maintainable software development across changing dependencies, tooling, platforms, and team members.

Requirements for the generated `.instructions.md` file:

1. Add valid YAML frontmatter.
2. Include a strong `description` field that makes the instruction discoverable for software maintenance, modernization, technical debt reduction, dependency upgrades, refactoring, code health, and long-term support work.
3. Use an `applyTo` pattern that fits the repository. Use `"**"` only if the guidance is truly cross-cutting.
4. Keep the guidance concise, actionable, and opinionated.
5. Emphasize evergreen engineering practices such as:
   - backwards-compatible change strategy when practical
   - small, reversible changes
   - dependency hygiene and upgrade safety
   - tests that protect behavior instead of implementation details
   - observability, diagnostics, and operability
   - documentation and decision capture
   - deprecation planning and migration guidance
   - performance, security, and accessibility as ongoing quality work
   - maintainable naming, interfaces, and module boundaries
   - avoiding framework- or version-specific assumptions unless required by the repo
6. Tailor the wording to the repository's actual language, structure, and conventions after inspecting the workspace.
7. Do not add process fluff, generic manifesto language, or duplicate existing repo instructions.

Execution notes:

- Inspect the repository before writing the file.
- Reuse existing conventions if instruction files already exist.
- Prefer minimal, high-signal guidance that will still be useful a year from now.
- If the repository is too small to infer language-specific conventions, keep the instruction file technology-agnostic.
- After creating the file, summarize the main guidance and note any assumptions.
