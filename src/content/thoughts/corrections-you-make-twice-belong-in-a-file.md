---
title: Corrections you make twice belong in a file
date: 2026-03-11
updated: 2026-08-28
summary: One line per correction, in a file the model reads at the start of every session. Stop keeping the rules in your head.
---

Every time the model makes a mistake you correct, that is a signal. Correct it once and you will correct it again next session — it does not remember across conversations. You do, which is the problem: the rule lives in your head, and your head is not in the loop when you are tired.

So the rule moves into a file. `CLAUDE.md`, at the root of the repo, read on every session. One line per correction, plain enough to hand to someone on their first day:

- Always use enum values, never string literals.
- Avoid unnecessary casts — if `as any` is needed, question why and refactor.
- Do not add comments unless the logic is genuinely tricky.
- Multi-tenant: always filter by `workspaceId`.
- Use non-blocking `setInterval`, not a `while` loop, for async polling.

Each of those was a real correction on one feature. None of them needed to be made twice after that.

The file compounds. A correction captured there gets cheaper as the project grows, instead of more expensive. Treat it like a test suite for behaviour you cannot assert in code: when it fails, you add a case.
