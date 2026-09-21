<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# Learn Product Thinking with Phoebe

Six 45-minute sessions on deciding what to build and whether it should exist. No code, nothing
to design, no architecture, in any session. The subject is everything that happens before the
first screen: what the thing is for, who asked, what you cut, and how to say no so it lands.

**Live site:** https://phoebefu6.github.io/learn-product-thinking-with-phoebe/

| # | Session | Signature thing |
|---|---|---|
| 1 | The job, not the feature | A request names a solution; the four-line problem statement finds the job under it |
| 2 | What people ask for is not what they need | A request is evidence about a problem, not a specification |
| 3 | The cut bench | One job, twelve features, five ways to cut, every number computed |
| 4 | Order is a product decision | The same list in a different order is a different product for 28 weeks |
| 5 | Saying no so it lands | Yes to the problem, no to the solution, reason attached |
| 6 | Your product on one page | What is deliberately out, and why that is the section worth writing |

The bench in session 3 (`assets/pt-live.js`) takes one stated job, twelve backlog features and
eight outcomes the job needs, four of them core. Every number is computed in the browser from a
feature-to-outcome graph: real weighted coverage, a real walk through the build order, and a
real threshold for when the thing first becomes usable.

What it finds. Cutting to the job takes the build from **34 weeks to 8** while still meeting
every core outcome. Cutting harder ships **fastest of anything on the board, in 4 weeks**, and
is **never usable**, because core coverage lands at 77% against a bar of 85%. The same twelve
features built in a different order are first usable in **week 5 rather than week 33**, which is
**28 weeks bought by ordering alone**, with no change to scope, cost or final result. And the one
feature everybody assumes a real product has, native phone apps, costs **8 weeks and moves the
job-served figure by exactly 0**, because the outcome it serves was already met by a two-week
text-message link.

The backlog is invented and labelled as such on every page that quotes it. It is written so the
five cuts behave differently from each other. The arithmetic is real; the football club is not,
and no figure here is a claim about software projects in general.

Session 2 takes apart the most-quoted number in the field, the claim that 45% of software
features are never used. The primary source was located and read: a 2002 conference keynote
deck that survives only in a web archive, whose slide gives the full split and **no sample size,
no year and no methodology at all**, and whose two later published accounts of what was measured
contradict each other. The session states the figures, states what is missing, and never calls
it a study.

Every fact, its verification tier, the misattributions corrected, and the claims deliberately
left unstated are in `materials/official-course-map.md`.

Static HTML, CSS and JS. No build step. by Phoebe Fu.
