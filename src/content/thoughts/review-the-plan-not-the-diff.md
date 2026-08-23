---
title: Review the plan, not the diff
date: 2026-03-11
updated: 2026-08-23
summary: Most of the value of an AI pair is decided before a line of code exists. Where I spend my attention, and the loop I run.
---

<!-- Seed note, ported from my ai-workflow gist. Rewrite or delete. -->

Most of the value of working with an AI pair is decided before a line of code exists. The diff is where mistakes show up; the plan is where they are made. So that is where I spend my attention.

The loop I run for every sub-feature — a feature is usually three to five of these:

<figure>

```d2 title="Six steps in a loop: context, plan, review the plan, code, review and test, commit — and back to context for the next sub-feature."
...@_theme.d2
*.style: {bold: false; stroke-width: 1; font-size: 14}
direction: down

context: "1   Context\nunderstand the module"
plan: "2   Plan\nfile, shape, reason"
review: "3   Review the plan\npush back, iterate"
code: "4   Code\nreview live, correct"
test: "5   Review & test\nagents, then a human"
commit: "6   Commit\nopen the PR"

context -> plan -> review -> code -> test -> commit
commit -> context: next sub-feature {style.stroke-dash: 4}
```

<figcaption>One cycle per sub-feature. A feature is three to five cycles.</figcaption>
</figure>

**Context first.** Point the model at the module and have it map boundaries, data flow and existing patterns before anything else. On the inbound-polling work this is how we learned an existing `SfSource` already had the fields we needed — which saved a whole new source type and the refactor that would have followed.

**Make the plan explicit.** Not “update the sync service”. Which file, which method, which shape, and why. “Add `querySoqlByWorkspace<T>(workspaceId, soql)` that wraps the existing `querySoql` with workspace context” produces exactly that. A vague plan produces vague code.

```ts
// regie-list/utils.ts — one source of truth for "is this a SOQL source"
export function isSoqlSource(config: ListSourceConfig): boolean {
  return !!config.soql;
}

// crm.service.ts — the plan named the method, its shape, and why
async querySoqlByWorkspace<T>(workspaceId: string, soql: string): Promise<T[]>
```

**Push back on the plan.** Read it the way you would read a design doc from a colleague. “If this validation passes, will the list actually sync?” — asked once, it turned up a missing check for required fields. Iterate until it holds, then paste the finished plan back as the instruction, so what was reviewed is what gets built.[^1]

**Stay in the loop while it codes.** Style drift is the common failure: string literals where the codebase uses enums, `as unknown as X`, comments on obvious code. Catch it live. And when you correct the same thing twice, stop — it belongs in `CLAUDE.md`, not in your memory.

| Mistake caught | Rule added |
| --- | --- |
| String literals for enum-like values | Always use enum values, never string literals |
| `as unknown as X` double casts | Question every cast; refactor instead |
| Missing `workspaceId` filter | Multi-tenant: always scope by workspace |
| `while` loop for async polling | Non-blocking `setInterval`, not a loop |

**Review twice, then commit.** Agents on the pre-commit hook, a human on the pull request. Thirty-plus files, five PRs, no incidents — not because the model is careful, but because the plan was.

[^1]: “Implement it” is not an instruction. The reviewed plan is.
