---
title: Polling a CRM into outreach sequences
byline: 'Regie.ai · Software Engineer <span class="todo">[TODO: title]</span> · 2024 – now <span class="todo">[TODO: start]</span>'
stack: [TypeScript, Node, AWS EventBridge, Salesforce SOQL, Postgres]
blurb: "A scheduled poller that reads Salesforce with the customer’s own SOQL, so new and changed contacts land in outreach sequences without anyone exporting a list. A query that cannot sync is refused at creation."
---

Regie’s customers keep their truth in Salesforce. They wanted new and changed contacts to land in outreach sequences without anyone exporting a list. The catch: every customer defines “the right contacts” differently, and the only language they all speak is SOQL, Salesforce’s query language.

I built inbound polling. An EventBridge schedule wakes a thin consumer every two minutes; it runs the customer’s own SOQL with a date filter injected, validates what comes back against their CRM mapping, and enrols the new prospects. A query is validated when it is written — structurally, and by executing it with `LIMIT 1` — so a bad query fails at creation, not at 3 a.m. on its first sync.

The hard part was extending the existing source types instead of inventing a new one, and keeping filter semantics backwards-compatible (defaulting to `LastModifiedDate`). Workspace scoping in a multi-tenant system had to stay airtight.

The work shipped in five pull requests and has not caused a production incident. Most of it was written with an AI pair, following a loop I [wrote up](/thoughts/review-the-plan-not-the-diff/).
