# Session Summary: Evergreen Instruction Promptfile

**Session ID**: 0752845f-0929-4af0-b2e9-9a9c651005f2
**Date**: 2026-04-07
**Operator**: johnmillerATcodemag-com
**Model**: openai/gpt-5.4@unknown
**Duration**: 00:10:00

## Objective

Create a new promptfile that generates an instruction file for evergreen software development, while avoiding any `__instructions` directory as source material.

## Work Completed

### Primary Deliverables

1. **Evergreen promptfile** (`.github/prompts/create-evergreen-software-development-instructions.prompt.md`)
   - Added a new reusable promptfile in the standard repository prompt location.
   - Included full AI provenance metadata in front matter.
   - Directed the generated output toward `.github/instructions/evergreen-software-development.instructions.md`.
   - Explicitly prohibited use of `__instructions` folders as source material.

2. **Conversation provenance log** (`ai-logs/2026/04/07/0752845f-0929-4af0-b2e9-9a9c651005f2/conversation.md`)
   - Captured prompt, output summary, artifacts, and duration.

3. **Session summary** (`ai-logs/2026/04/07/0752845f-0929-4af0-b2e9-9a9c651005f2/summary.md`)
   - Recorded objectives, decisions, and produced artifacts for resumability.

### Secondary Work

- Updated README discoverability for the new promptfile.
- Preserved the existing saved draft promptfile instead of overwriting user work.

## Key Decisions

### Create A New Sibling Promptfile

**Decision**: Add a new clean promptfile instead of modifying `.github/prompts/create-evergreen-instructions.save.prompt.md`.
**Rationale**:

- The existing file appears to be a draft or saved scratch artifact.
- Avoids overwriting user-created or in-progress work.
- Produces a properly named reusable promptfile without disturbing the draft.

### Keep The Prompt Technology-Aware But Durable

**Decision**: Require repo inspection and tailoring, but instruct the generated file to remain technology-agnostic when the repo is too small to justify specificity.
**Rationale**: This keeps the prompt useful across both mature and minimal repositories while staying aligned with the user's evergreen requirement.

## Artifacts Produced

| Artifact                                                                       | Type          | Purpose                                               |
| ------------------------------------------------------------------------------ | ------------- | ----------------------------------------------------- |
| `.github/prompts/create-evergreen-software-development-instructions.prompt.md` | promptfile    | Generates evergreen software development instructions |
| `ai-logs/2026/04/07/0752845f-0929-4af0-b2e9-9a9c651005f2/conversation.md`      | log           | Captures provenance for this chat                     |
| `ai-logs/2026/04/07/0752845f-0929-4af0-b2e9-9a9c651005f2/summary.md`           | summary       | Provides resumable summary context                    |
| `README.md`                                                                    | documentation | Makes the new prompt discoverable                     |

## Lessons Learned

1. **Preserve drafts**: Existing `.save.prompt.md` files should be treated as user work unless asked to replace them.
2. **Prompt durability matters**: Evergreen guidance is stronger when it explicitly avoids current-tool bias and enforces repo inspection before generation.
3. **Policy compliance is broader than file creation**: New Markdown prompt artifacts in this repo also require matching ai-log records and README discoverability.

## Next Steps

### Immediate

- Invoke the new promptfile to generate `.github/instructions/evergreen-software-development.instructions.md` when ready.
- Decide later whether the saved draft promptfile should be deleted, retained, or merged.

### Future Enhancements

- Add arguments for preferred scope or stack once there is a consistent promptfile pattern in the repo.
- Add a companion promptfile for reviewing or refreshing evergreen instruction files over time.

## Compliance Status

✅ Promptfile includes embedded AI provenance metadata
✅ Conversation log created in the required `ai-logs` structure
✅ Summary file created alongside conversation log
✅ README updated for artifact discoverability
⚠️ Existing `.github/instructions/instruction-prompt-files.instructions.md` contains unresolved merge markers and was not modified in this task

## Chat Metadata

```yaml
chat_id: 0752845f-0929-4af0-b2e9-9a9c651005f2
started: 2026-04-07T00:00:00Z
ended: 2026-04-07T00:10:00Z
total_duration: 00:10:00
operator: johnmillerATcodemag-com
model: openai/gpt-5.4@unknown
artifacts_count: 4
files_modified: 4
```

---

**Summary Version**: 1.0.0
**Created**: 2026-04-07T00:10:00Z
**Format**: Markdown
