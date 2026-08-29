---
title: Designing the software behind a cooking robot
byline: 'Nymble · Software Engineer · Dec 2021 – 2023'
blurb: "I designed the machine interaction layer that turned recipes into coordinated instructions the robot could execute and engineers could test and debug."
---

At Nymble, I designed the software between a recipe and the cooking robot. I was responsible for the high- and low-level design of the machine interaction logic: turning composite recipes into macro, micro and liquid dispenses alongside cooking instructions with quantities, timing and ordering the hardware could honour.

The responsibility extended through execution and verification. Parallel dispenses could not collide, “no dispense” states had to be explicit, and failures needed to be reconstructable. I designed the instruction logs and a test bench that compared what the machine did with what it had been told.

Working this close to hardware meant correctness could not stop at an internally consistent output. The design had to reflect physical constraints and make the machine’s behaviour understandable when software and reality did not agree.
