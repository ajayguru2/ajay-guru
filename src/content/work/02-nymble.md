---
title: Getting a robot to follow a recipe
byline: 'Nymble · Software Engineer · Dec 2021 – 2023'
blurb: "At Nymble, I turned recipes into instructions for a cooking robot. What to dispense, how much, when, and how to check whether it actually did that."
---

At Nymble, I worked on a cooking robot. My part was turning a recipe into instructions the machine could follow: what to dispense, how much and when, along with the cooking steps.

Some of those actions happened at the same time, so we had to coordinate the timing. Even skipping a dispense needed an instruction. You had to tell the robot to do nothing there.

<figure>
  <ol class="flow">
    <li><strong>Recipe</strong><span>Ingredients and cooking steps</span></li>
    <li><strong>Instructions</strong><span>Quantities, timing and order</span></li>
    <li><strong>Execution</strong><span>What the robot actually did</span></li>
    <li><strong>Comparison</strong><span>Did it follow the instructions?</span></li>
  </ol>
  <figcaption>Writing the instructions was one part. We also had to check what happened in the machine.</figcaption>
</figure>

I also designed the instruction logs and a test bench so we could compare what we’d asked the robot to do with what it actually did. When those didn’t match, the logs gave us somewhere to start looking.
