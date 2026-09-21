# learn-product-thinking-with-phoebe - source map

Internal build document. Not linked from any audience-facing page.

Bucket `sys`, difficulty 1, audience everyone, 6 sessions, no code in any session.

Built 2026-09-21.

---

## Why this course exists

The `sys` shelf (System & Product Design) had three courses and no on-ramp:

| Course | Level | What it owns |
|---|---|---|
| Product Design & UI/UX | d3 | One real screen, from problem statement to engineering handoff |
| System Design & Orchestration | d4, builder | How to CHOOSE an architecture, against four meters that fight |
| Data Product Heuristics | d4 | 215 published principles turned into one review instrument |

The shelf blurb promises "product thinking" and the shelf owned none of it below d3.
Product Design d3 starts **at** a problem statement. Nobody taught getting to one.

**Seams enforced, decided before the first page was written**

- **Not** end-to-end data tracing. `learn-data-pipelines-with-phoebe` (deng d1) already owns
  "follow one order from checkout to the Monday dashboard, then break it stage by stage".
  This course never traces data through a system.
- **Not** designing a screen. That is Product Design d3. This course ends where that begins,
  and session 6 says so out loud.
- **Not** choosing an architecture or weighing components. That is System Design d4.
- **Not** reviewing a shipped data product against published principles. That is Heuristics d4.
- **Not** personal productivity systems. That is the `prod` shelf.

---

## The bench (`assets/pt-live.js`)

One stated job, twelve backlog features, eight outcomes the job needs, four of them core.
Every number is computed from a feature-to-outcome graph. No figure is asserted.

**The job.** Get eleven players confirmed for Saturday, and know by Thursday night.

**What is computed**

| Metric | How |
|---|---|
| Job served % | weighted coverage of the eight outcomes by the selected features |
| Core covered | the four outcomes the job cannot work without, at or above 85% |
| Weeks to build | sum of the selection's costs |
| Weeks to usable | cumulative weeks **in the selection's own build order** until core clears the bar |
| Serving nothing | selected features covering no stated outcome at all |

The rule that makes the anti-lever work: an outcome is met to the **best** degree any one
feature delivers it. Two features covering the same outcome do not add up.

### Verified ladder, derived headlessly 2026-09-21 before any page quoted it

| Preset | Job served | Core | Weeks | Usable in week | Serving nothing |
|---|---|---|---|---|---|
| Build everything, loudest first | 96.7% | 95% | 34 | **33** | 4 features, 7 weeks |
| Build everything, job first | 96.7% | 95% | 34 | **5** | 4 features, 7 weeks |
| **Cut to the job** (target) | 76.7% | 95% | **8** | 5 | 0 |
| Cut harder | 51.3% | **77%** | 4 | **never** | 0 |
| **ANTI: plus the native apps** | **76.7%** | 95% | **16** | 5 | 0 |

**The three findings the sessions are built on, all measured:**

1. **Order alone is worth 28 weeks.** The first two rows are the same twelve features, the same
   34 weeks and the same 96.7% job coverage. Usable in week 33 against week 5.
2. **The anti-lever is exact.** Native iPhone and Android apps cost 8 weeks and move job served
   by **0.00 percentage points**, because the text-message link already met the same outcome.
   Weeks to usable is unchanged too.
3. **Cutting has a floor.** "Cut harder" ships in 4 weeks, the fastest of any row, and core
   coverage lands at 77% against a bar of 85%, so weeks-to-usable is **never**. The organiser
   still cannot chase anybody.

Supporting figure: dropping the four features that serve no stated outcome takes the full build
from 34 weeks to **27** with job served unchanged at 96.7%.

Why job served never reaches 100%: no feature delivers outcome o1 ("a player can answer yes or
no in seconds") better than 0.9. Deliberate, and left visible rather than rounded away.

### Honest limits, stated on the page

- **Ferry is invented.** A made-up tool for a Sunday-league football club, written so the five
  presets behave differently from each other. The arithmetic is real; the club is not.
- **The weights are the club's, not a finding.** Which outcomes are core, and how much each is
  worth, is a judgement the bench makes visible rather than a fact it discovered.
- **Build costs are stipulated.** Estimating them is a real skill this course does not teach.
- **No figure here is a claim about software projects in general.** The bench demonstrates a
  mechanism. How often it happens in practice is a separate question.

---

## Sessions

| # | Title | Signature thing |
|---|---|---|
| 1 | The job, not the feature | Getting to a problem statement, which is where Product Design d3 starts |
| 2 | What people ask for is not what they need | A request is evidence about a problem, not a specification |
| 3 | **The cut bench** | **One job, twelve features, five ways to cut; order alone is worth 28 weeks** |
| 4 | Order is a product decision | First usable against finally finished |
| 5 | Saying no so it lands | Declining a feature without making an enemy; the reason attached |
| 6 | Your product on one page | The note that makes the rest usable, final scorecard, where next |

---

## Design system

Palette: slate and ochre. Chosen for the `sys` shelf and checked before the first page.

| Token | Hex | Role |
|---|---|---|
| slate-900 | `#2B3947` | darkest band, body ink |
| slate-700 | `#3E5266` | primary band |
| slate-600 | `#5B7086` | secondary band |
| slate-200 | `#C6D2DE` | light fill |
| slate-050 | `#EEF2F6` | pale ground |
| muted | `#5E6975` | secondary text |
| ochre | `#966718` | accent band |
| ochre-ink | `#6E4A12` | accent text |

**WCAG AA verified before the first page was written: 17 pairs checked, 0 failures, lowest
4.55:1** (slate-600 text on the pale ground). The first ochre candidate `#A8741F` failed white
text at 4.05:1 and was darkened to `#966718` (4.94:1); the first muted candidate `#64707C`
landed at 4.4996:1 on the pale ground and was darkened to `#5E6975` (4.97:1).

Universal reds kept from the donor stylesheet unchanged: `#991B1B` `#FEF2F2` `#7F1D1D`
`#FCA5A5`. Page-level red in markup is `#991B1B`; `#7F1D1D` exists in donor CSS only and must
never appear in page markup.

Scaffolded from `learn-data-thinking-with-phoebe`. All 16 donor moss/clay hex values swapped and
verified absent; the `--indigo` / `--indigo-deep` / `--indigo-50` aliases the donor stylesheet
depends on were confirmed defined after the swap.

---

## Verified facts, by tier

Tier A = primary source read directly in this build. Tier B = reliable secondary quoting the
primary. Tier C = search result only, and nothing at Tier C is stated on a page.

### The "45% of features are never used" claim - session 2 spine

**Tier A for the figures.** The primary source was located and read: Jim Johnson, *ROI - It's
Your Job!*, keynote slide deck, XP2002, copyright The Standish Group International. It survives
only in a Wayback Machine capture of the conference host; it is hosted nowhere current.

The slide is titled "Features & Function Usage" and the pie reads:

| Never | Rarely | Sometimes | Often | Always |
|---|---|---|---|---|
| **45%** | **19%** | **16%** | **13%** | **7%** |

The other famous number, "64% rarely or never used", is **the same slide**: 45 + 19. It is not a
separate study.

**UNVERIFIED, and this is the finding:** the slide carries **no sample size, no year, and no
methodology**. The deck's general methodology slide (35,000 projects since 1994) describes the
separate CHAOS success/failure research, not this pie. The pie follows an equally uncited
"DuPont Study" slide with no attribution of its own.

Two later accounts of what was actually measured exist and **contradict each other**:
Mike Cohn says Standish told him in 2015 it came from four internal applications; a Standish
2010 report is said to cite an unpublished 1996 study of 100 custom applications. Neither could
be corroborated against a primary document. Both are Tier B at best and the course states the
disagreement rather than picking one.

**Page rule:** state the five figures as read from the slide, state that the slide gives no
sample and no year, and never call it a study.

### Pendo 2019 Feature Adoption Report - the honest counterweight

**Tier A.** Read in full. Suja Thomas, published 5 February 2019.

- Sample: **615 Pendo subscriptions**, customers of more than a year, aggregated usage over a
  **three-month period**, across banking, HR tech, education, logistics, healthcare, e-commerce.
- Findings: **Frequent 12%, Moderate 8%, Rare 56%, Never used 24%.** Rare plus never = **80%**.
- **12% of features generate 80% of average daily usage volume.**

**Do not conflate this with Standish.** Pendo's "never" bucket is 24%, not 45%; its combined
rarely-or-never figure of 80% is worse than Standish's 64%. Different definitions, different
decades. The two numbers are not confirmation of each other, and the page says so.

**Stated limit:** this is a vendor's own customer base, B2B SaaS companies that adopted Pendo.
Real telemetry, not a representative sample of software in general.

**No academic replication exists.** No peer-reviewed study and no comparable Mixpanel or
Amplitude publication was found. The absence is stated on the page.

### Jobs to be Done and the milkshake - session 1

**Tier A.** Read in full: Clayton M. Christensen, Scott D. Anthony, Gerald Berstell and Denise
Nitterhouse, "Finding the Right Job For Your Product", *MIT Sloan Management Review*, Spring
2007, vol. 48, pp. 2-11.

- Exact figure: **"he was surprised to find that 40% of all milkshakes were purchased in the
  early morning."**
- Exact wording on hiring: *"Customers just find themselves needing to get things done. When
  customers find that they need to get a job done, they 'hire' products or services to do the
  job."*

**Two corrections the course makes out loud:**

1. **The milkshake study is routinely misattributed** to "Marketing Malpractice: The Cause and
   the Cure" (HBR, December 2005, Christensen, Cook and Hall). It is not in that paper. That
   paper is cited by this one, at footnote 14, only for the branding dimension. The milkshake
   authors are Christensen, Anthony, Berstell and Nitterhouse, MIT Sloan 2007.
2. **The company was disguised.** Footnote 1 of the primary text: *"The descriptions of the
   product and company in this example have been disguised."* Any retelling that names a real
   chain has embellished past the source. The course names no chain.

**Ulwick's Outcome-Driven Innovation:** Tier B, and from Ulwick's own company site, so
self-interested. The defensible difference: Christensen's JTBD is a qualitative narrative
framework; Ulwick's ODI attaches quantified desired-outcome statements with importance and
satisfaction scoring. The claim that Ulwick introduced Christensen to the concept is
**UNVERIFIED** and is not stated.

### A/B test success rates - session 5, and a misquote to correct

**Tier A.** Read in full: Ron Kohavi and Stefan Thomke, "The Surprising Power of Online
Experiments", *Harvard Business Review*, September-October 2017.

Exact text: *"At Google and Bing, only about 10% to 20% of experiments generate positive
results. At Microsoft as a whole, one-third prove effective, one-third have neutral results,
and one-third have negative results."*

**The misquote:** the widely repeated "only about a third of ideas improve the metric" is the
**Microsoft-company-wide** figure, spanning Office, Windows, Xbox and Skype. Applied to Bing or
to search, it is wrong by a factor of about two: the real rate there is **10 to 20%**. The
course states both numbers and which organisation each belongs to.

Booking.com is frequently cited alongside these. **No Booking.com primary publication could be
read, so no Booking.com figure appears anywhere in this course.**

### Scope size against project outcome

**Tier A for the numbers**, from the same XP2002 deck, a table labelled CHAOS'2000:

| Project size | Successful | Challenged | Impaired |
|---|---|---|---|
| Under $500K | 38% | 44% | 19% |
| $501K-$3M | 27% | 52% | 21% |
| $3M-$6M | 16% | 55% | 29% |
| $6M-$10M | 4% | 57% | 39% |
| Over $10M | **0%** | 66% | 34% |

**Stated limit, every time it is quoted:** this is Standish's proprietary, non-public dataset.
No project list, no confidence intervals, no methodology specific to this cross-tab, and no
independent replication. It is vendor-reported data, and the page calls it that. Standish's
CHAOS methodology has been criticised in the academic literature for non-disclosure and for
shifting definitions of success between years; that criticism is Tier B and is mentioned as
existing rather than quoted.

### The build trap

**Tier A for the framing.** Melissa Perri, "The Build Trap", melissaperri.com, 5 August 2014:
organisations that stop analysing what they intend to build and why, and keep shipping features
on the strength of an initial idea without validation.

**Tier B for the tidy one-liner** ("measuring success by outputs rather than outcomes"). That
sentence is how secondary summaries condense her, it reflects her argument accurately, and it
was **not** confirmed word for word against her book. The course paraphrases rather than
quoting it.

### Minimum viable product

**Tier B.** Eric Ries's definition - *"that version of a new product which allows a team to
collect the maximum amount of validated learning about customers with the least effort"* - is
consistently identical across every source that cites his 2009 blog and the 2011 book, but the
raw blog HTML was not rendered in this build.

The common misreading, MVP as "version one but smaller and worse", is real and widely called
out. **No direct pushback quote from Ries or Steve Blank could be located**, so none is
attributed to either of them.

### The Kano model

**Tier B.** Kano, Seraku, Takahashi and Tsuji, "Attractive Quality and Must-Be Quality",
*Journal of the Japanese Society for Quality Control*, vol. 14 no. 2, April 1984, pp. 39-48,
published in Japanese. Categories as reported: must-be, one-dimensional, attractive,
indifferent, reverse. Neither the original Japanese paper nor a definitive English translation
could be read. The model is mentioned only in a self-study card, at Tier B, and no page builds
an argument on it.

## Claims deliberately NOT stated (UNVERIFIED)

- **Any sample size, year, or method for the 45% figure.** The primary slide gives none and the
  two later accounts disagree.
- **That the 45% figure is a study.** It is one unsourced pie chart in a conference deck.
- **That Pendo's 2019 telemetry confirms Standish.** Different buckets, different definitions.
- **Any Booking.com experiment success rate.** No primary source could be read.
- **That a third of Bing experiments succeed.** That is the Microsoft-wide number.
- **Any named fast-food chain in the milkshake case.** The source says it was disguised.
- **That Ulwick introduced Christensen to jobs-to-be-done.** Self-published and uncorroborated.
- **Any pushback quote from Eric Ries or Steve Blank on MVP misuse.** None was located.
- **Any general rate at which order-of-build costs real projects time.** The bench demonstrates
  the mechanism on invented data; no published figure was found and none is implied.
- **That Standish's scope-versus-success table generalises.** It is unreplicated vendor data.

---

## Build record

Built 2026-09-21. Six sessions, landing page, one computed bench. Sessions 1 and 3 hand written;
2, 4, 5 and 6 written by agents against this map and session 1 as template.

**Verification actually run before publish**

| Check | Result |
|---|---|
| WCAG AA on the palette, before any page existed | 17 pairs, 0 failures, lowest 4.55:1 |
| Bench ladder derived headlessly before any page quoted it | all five presets, matched to the digit |
| `gate.sh` (Playwright geometry + static checks) | 6 pages, 15 figures, 0 defects, PASSED |
| Quiz engine, all six pages | 3/3 clears on every page |
| Console and page errors, six pages plus landing | zero |
| SVG text outside its own viewBox | zero across all 15 figures |
| Overlapping filled rectangles | zero across all 15 figures |
| Bench driven live in the page through all five presets | matches the ladder above exactly |
| Scorecard rows on session 6 | 6, each quoting its own session correctly |
| Prev/next chain and landing links | complete and correct across all six |
| Outbound course links | all six resolve 200 |
| Internal `materials/` paths on audience pages | zero |
| Em and en dashes, all pages | zero |
| Off-palette hex values, all pages | zero |
| `#7F1D1D` in page markup | zero |

**Three defects found and fixed during verification**

1. **The donor's passport key and journey array were inherited silently.** `app.js` still carried
   `lwp-passport:data-thinking` and the six data-thinking filenames, so stamps would have
   collided with a different course in the same browser and the journey nav would have pointed
   at files that do not exist here. Repointed to `lwp-passport:product-thinking` and this
   course's filenames. This is the second build in a row where this trap fired; it is now worth
   checking before the gate rather than after.
2. **CSS `fill` beat the SVG `fill` attribute** on two legend labels in session 2, which would
   have shipped invisible. Caught by an agent using computed style rather than a source read.
3. **The sources heading drifted five ways across six sessions.** The brief banned the phrase
   "this session teaches", which is the estate's own standard heading on 151 live pages, so
   every agent invented its own replacement. All six normalised back to the estate standard.
   The ban was too broad: it should target "this course", not "this session".

**A note on the agents**

All four flagged the heading collision in the template rather than silently diverging, and two
caught and fixed geometry or contrast defects in their own figures before reporting. Session 4's
agent correctly refused to state a feature count for the week-five build, because the bench does
not produce one.
