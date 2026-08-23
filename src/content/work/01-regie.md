---
title: Polling a CRM into sales sequences
byline: 'Regie.ai · Software Engineer <span class="todo">[TODO: title]</span> · 2024 – now <span class="todo">[TODO: start]</span>'
stack: [TypeScript, Node, AWS EventBridge, Salesforce SOQL, Postgres]
blurb: "A scheduled poller that reads Salesforce with the customer’s own SOQL, refuses a query at creation if it cannot sync, and enrolls what it finds. Thirty-plus files, six modules, zero incidents."
---

Regie’s customers keep their truth in Salesforce. They wanted new and changed contacts to land in outreach sequences without anyone exporting a list. The catch: every customer defines “the right contacts” differently, and the only language they all speak is SOQL.

I built inbound polling. An EventBridge schedule wakes a thin consumer every two minutes; it runs the customer’s own SOQL with a date filter injected, maps and validates what comes back against their CRM mapping, and enrolls the new prospects. A query is validated when it is written — structurally, and by executing it with `LIMIT 1` — so a bad query fails at creation, not at 3 a.m. on its first sync.

What was hard: extending the existing source types instead of inventing a new one (an existing `SfSource` already had the fields), filter semantics that stayed backwards-compatible (default to `LastModifiedDate`), and keeping workspace scoping airtight in a multi-tenant system.

Thirty-plus files across six modules, five pull requests, zero production incidents. Most of it written with an AI pair, following a loop I [wrote up](/thoughts/review-the-plan-not-the-diff/).
