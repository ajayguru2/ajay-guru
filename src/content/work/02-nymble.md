---
title: Turning recipes into machine instructions
byline: 'Nymble · Software Engineer · Dec 2021 – 2023 <span class="todo">[TODO: end]</span>'
stack: [Java, Vue]
blurb: "Compiling composite recipes into macro, micro and liquid dispense steps a cooking robot can execute — and a test bench to prove it did."
---

Nymble builds a cooking robot. A recipe a human reads — add two tomatoes, sauté, then the spices — is not something a machine can run. Someone has to turn it into a sequence of dispenses and cook steps with quantities, timing and ordering the hardware can honour.

I owned the high- and low-level design of that layer: compiling composite recipes into macro, micro and liquid dispense instructions and cook instructions, and the instruction logs and test bench that checked what the machine actually did against what it was told.

What was hard: parallel dispenses that must not collide, the “no dispense” edge cases, and making a log legible enough to debug a physical machine from a JSON file. <span class="todo">[TODO: one line of outcome — machines in homes, recipes supported, anything you can say]</span>
