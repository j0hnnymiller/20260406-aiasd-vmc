---
ai_generated: true
model: "openai/gpt-5.4@2026-04"
operator: "johnmillerATcodemag-com"
chat_id: "create-evergreen-software-development-instructions-20260406"
prompt: |
  create an instruction file for evergreen software development
started: "2026-04-06T14:49:20.2826572-07:00"
ended: "2026-04-06T14:55:20.2826572-07:00"
task_durations:
  - task: "context review"
    duration: "00:02:00"
  - task: "instruction drafting"
    duration: "00:03:00"
  - task: "provenance and README updates"
    duration: "00:01:00"
total_duration: "00:06:00"
ai_log: "ai-logs/2026/04/06/create-evergreen-software-development-instructions-20260406/conversation.md"
source: "GitHub Copilot chat"
name: evergreen-software-development
description: Evergreen engineering guidance for building maintainable, upgrade-friendly software artifacts
applyTo: "**/*"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["evergreen", "engineering", "maintainability", "quality", "architecture"]
owner: "Development Team"
reviewedDate: "2026-04-06"
nextReview: "2026-07-06"
---

# Evergreen Software Development

## Overview

Use these instructions when creating or changing software intended to remain maintainable, portable, and easy to evolve over time. Favor standards, loose coupling, explicit contracts, and operational clarity over short-lived convenience.

## Audience

- AI assistants generating code, tests, docs, or configuration
- Developers reviewing or extending repository artifacts
- Maintainers responsible for long-term operability and upgrades

## Scope

- Applies to code, documentation, configuration, tests, and automation
- Focuses on durability, upgrade safety, observability, and maintainability
- Does not replace domain-specific security, Azure, or framework instructions

## Table of Contents

- [Design Goals](#design-goals)
- [Core Rules](#core-rules)
- [Change Strategy](#change-strategy)
- [Quality Gates](#quality-gates)
- [Security and Operations](#security-and-operations)
- [Documentation Requirements](#documentation-requirements)
- [Validation Checklist](#validation-checklist)

## Design Goals

- Prefer stable public standards over proprietary or fragile patterns
- Optimize for readability, upgradeability, and testability
- Keep coupling low between modules, tools, vendors, and environments
- Make failures diagnosable through clear errors, logs, and documented behavior
- Preserve backward compatibility unless a deliberate breaking change is approved

## Core Rules

### Rule 1: Prefer Stable Contracts

- Define interfaces, schemas, and inputs explicitly
- Validate external input at boundaries
- Avoid hidden behavior driven by ambient state
- Version breaking contract changes and document migration steps

### Rule 2: Minimize Coupling

- Depend on abstractions or narrow adapters, not scattered vendor-specific calls
- Keep business logic separate from transport, UI, storage, and framework glue
- Centralize integration code so replacements or upgrades affect fewer files

### Rule 3: Choose Boring Defaults

- Prefer widely adopted libraries, language features, and formats
- Avoid novelty unless it solves a verified problem the simpler option cannot
- Do not introduce dependencies for trivial tasks already covered by the platform

### Rule 4: Design for Safe Change

- Keep functions and modules small enough to test in isolation
- Preserve existing behavior unless the task requires a change
- Add migrations, feature flags, or adapters when replacing established behavior
- Remove dead code only when its callers and operational impact are understood

### Rule 5: Make State Explicit

- Keep configuration in named files or environment variables, not magic constants
- Document defaults and failure behavior
- Avoid global mutable state unless the lifecycle is tightly controlled

### Rule 6: Treat Tests as Longevity Tools

- Add or update tests for user-visible behavior, boundary conditions, and regressions
- Prefer deterministic tests with minimal reliance on timing or external services
- Cover upgrade-sensitive logic such as parsing, serialization, persistence, and public APIs

## Change Strategy

### Small Changes First

- Prefer incremental edits over broad rewrites
- Fix root causes before adding defensive patches around symptoms
- Preserve file structure and public APIs unless there is a clear reason to change them

### Compatibility First

- Call out breaking changes before implementation when they are unavoidable
- Provide migration notes for renamed files, changed outputs, or modified interfaces
- Keep data formats forward- and backward-readable when practical

### Operational Safety

- Fail fast on invalid input
- Fail clearly with actionable messages
- Avoid destructive behavior by default

## Quality Gates

- Code MUST be understandable without tribal knowledge
- Names MUST reflect intent, not temporary implementation details
- New abstractions MUST remove real duplication or isolate variability
- Formatting, linting, and tests MUST pass when relevant tooling exists
- Documentation MUST be updated when behavior, interfaces, or usage changes

## Security and Operations

- Never hardcode credentials, secrets, or environment-specific sensitive values
- Prefer least-privilege defaults for services, files, and runtime capabilities
- Log security-relevant or failure-relevant events without leaking secrets
- Choose observability hooks that survive refactors: structured logging, stable event names, clear error paths

## Documentation Requirements

- Document why a non-obvious design choice exists
- Record constraints, assumptions, and compatibility expectations
- Link related artifacts instead of duplicating large blocks of content
- Keep documentation concise, current, and close to the code it explains

## Validation Checklist

- [ ] The change uses stable, well-supported language or library features
- [ ] Contracts and inputs are explicit and validated at boundaries
- [ ] Business logic is isolated from framework or vendor glue
- [ ] Configuration and state are explicit, documented, and environment-safe
- [ ] Tests cover the changed behavior and key regressions
- [ ] Logs and errors make failures diagnosable
- [ ] Documentation reflects new behavior or constraints
- [ ] The change avoids unnecessary coupling or one-off abstractions

## Summary

Build software so future changes are cheaper, safer, and easier to understand. Prefer stable contracts, small reversible edits, explicit state, clear diagnostics, and tests that protect the behavior users depend on.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-04-06
**Maintainer**: Development Team
**Related Instructions**:

- [.github/instructions/ai-assisted-output.instructions.md](.github/instructions/ai-assisted-output.instructions.md)
- [.github/instructions/instruction-files.instructions.md](.github/instructions/instruction-files.instructions.md)
