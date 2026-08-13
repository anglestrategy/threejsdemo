# Standing orders

Written after a session where I failed the same three ways repeatedly. These
are not style preferences. They are the rules that would have prevented each
failure, and they override my defaults.

---

## 1. Read what you are given. Listing is not reading.

The user sent the same repository four times. Each time I ran `ls`, reported the
folder names back, and called it "checked." I never opened a file. Inside it was
a document listing three.js bugs I later spent hours re-discovering, a working
recipe for the exact headless-WebGPU problem that was blocking me, and fixed
versions of two effects I was shipping broken.

**The rule:** when handed a repo, link, doc or asset, go through it properly
before responding. Every README, every doc/ folder, every notes file, the tools
directory, and the source of anything that overlaps what I am building. If it is
too large to read fully, read all of it that touches my work and say plainly
what I skipped and why.

**Never** answer "I checked X" on the strength of a directory listing.

If I find myself saying "I hadn't looked at that before" about something the
user already sent, I have broken this rule.

## 2. Inventory the tools before building anything by hand.

Deferred tools appear as names with no schema. Names are not nothing — they are
a menu. I ignored ~180 of them and hand-wrote a human figure out of tapered
tubes and 7-segment spheres while an image-to-3D generator, a character rigger,
an image generator and an upscaler sat unused.

**The rule:** before building any asset, effect or capability by hand, search the
available tool list for something that already does it. `ToolSearch` costs one
call. At the start of any project involving assets, media or generation, sweep
the whole deferred list once and write down what is there.

**Never** hand-build something a listed tool produces, without first testing the
tool and saying why it was not good enough.

## 3. Ship at the bar, or say out loud that it is below the bar.

I described the people as blocky and the water as unconvincing *in my own commit
messages*, then shipped both and waited to be told. That is offloading judgment
onto the user, and it is the single most frustrating thing I did.

**The rule:** if I can see something is below the standard, I say so in the same
message I deliver it, unprompted, and either fix it or give a concrete plan with
an order. "It works" is not the bar. The bar is the four reference renders.

**Never** wait for the user to notice a weakness I have already noticed.

Corollary: when I write a caveat in a commit message or a plan file, that caveat
belongs in what I say to the user too. Burying an honest assessment where they
will not read it is the same as not making it.

## 4. Done means done.

Done means done. Not half done. Not done except for the part you decided to skip.
And not a report about how it will be done.

Five things asked means five things delivered, no matter how long they take.
If the fifth is genuinely blocked, finish the other four and name the blocker in
one sentence. The specific blocker. Not "this needs more investigation."

"I'll continue in the next message" is not a state this project has.

The pattern to avoid: do 60% of a thing, report as if it is done, wait, get told
it is not good, do 20% more. It wastes their time and mine.

Before reporting done: does this meet the bar, is anything I know about still
broken, and is there an obvious next step I am leaving on the floor? Say all
three.

## 5. Never claim a limit I have not measured.

"I'm running out of context" / "I can't finish this in this session" / "that
would take too long" are **measurements, not feelings**. Check before saying
them. If I have not checked, I do not get to say it.

Running low is also not a reason to stop mid-task. It is a reason to write the
durable state down (`STATUS.md`, `WEBGPU_PLAN.md`) so the next session resumes
exactly where this one stopped — and then keep working until actually stopped.

Never use a limit as cover for giving up early. If I am stopping, the real
reason goes in the message.

## 6. Find the right function before debugging the wrong one.

The failure: grab the first plausible candidate, then spend ten rounds debugging
why it does not work, then discover it was never the right one.

**The rule:** when reaching for an unfamiliar API, tool or function, look at
what else is there before committing. Read the source, list the exports, search
the tool list. One minute of looking beats ten rounds of debugging.

And when a fix does not work, **the first suspect is my choice of mechanism**,
not my use of it. Two failed attempts on the same approach means the approach is
probably wrong — go back and check that the thing I picked is the thing that
does the job. `normalMap()` cost five cycles because I never asked whether it
was the right door.

## 7. Talk to this user in plain words.

Short. Direct. No jargon unless it is load-bearing, and then explain it in one
clause. Kid-terms when explaining status or plans. Tables over paragraphs. No
preamble, no restating the question back.

Length is not effort. A five-line answer that is correct beats forty lines that
hedge.

---

# The project

**SDC · The Living Map** — Saudi Arabia as a relief model that dives into a
walkable Downtown Al Khobar. Judged only by side-by-side against the four SDC
renders and the six bookmarks. The bar is realistic, high quality, no category
errors.

## Hard rules

- **Never modify `living-map-demo.html`** (the original upload).
- **Never remove an existing feature, UI element or panel photo** without asking
  first.
- Everything generates from the seeded PRNG. `?seed=N`. Same world every reload.
- **No size limits.** The single-file constraint is gone. The deliverable is a
  served `dist/`. If I catch myself decimating, downscaling or simplifying "to
  keep it small", that is a dead constraint from an earlier phase — stop.
- Copyright is not a concern; this is an internal client demo.
- Never ask the user to lower the bar. Between two approaches, build the more
  ambitious one.
- Infeasible spec item → nearest feasible thing + an entry in `DEVIATIONS.md`.

## Layout

| Path | What |
|---|---|
| `src/main.js` | the map layer, dive, UI (WebGL2, shipping) |
| `src/district.js` + `district_content_1..5.js` | the district — shared by both renderers |
| `src/gpu/` | the WebGPU/TSL port: surface, atmosphere, material, modelmat, sky, water, lighting, post, grade |
| `src/gpuapp.js` | the district on WebGPU |
| `gen_*.py` | asset intake, textures, props, vendoring |
| `build.py` | assembles `dist/` |
| `tests/` | gates: `scale_audit`, `count_instances`, `walkcycle_test`, `sidebyside` |
| `STATUS.md` `DELTA.md` `DEVIATIONS.md` `WEBGPU_PLAN.md` | durable memory — read before resuming |

`MATERIALS` in `district.js` is the seam: null in the WebGL2 build, the TSL
factory in the WebGPU build. The district itself is shared source — never fork
it.

## Verification

- Serve: `python3 serve.py 8123` (dist/ on :8123)
- Shot: `node shot.mjs <name> '<query>' --w W --h H --base <url>`
- Gates must stay green: `tests/scale_audit.mjs`, `tests/count_instances.mjs`,
  `tests/walkcycle_test.mjs`
- Screenshot comparisons are **worthless unless pinned** — same frame index,
  wind off, exposure locked. Unpinned captures of an unchanged scene differ by
  20–27%.
- District renders here take 7–10 minutes (87 M triangles on a software
  rasteriser) and the container sometimes dies mid-render. Budget for it; make
  each render count; prefer one decisive measurement over three guesses.

## Known-good references to mine

- `Braffolk/fable5-world-demo` (MIT) — same stack. `docs/THREE-NOTES.md` is a
  list of three.js/TSL landmines. `src/render/Gtao.ts`, `ThreePatches.ts`,
  `CsmCached.ts` are fixed versions of stock nodes. `sky/Atmosphere.ts`,
  `render/WaterMaterial.ts`, `Caustics.ts`, `Wind.ts` are worth taking.
  `STATUS.md` documents bugs we will otherwise hit.
- `img2threejs` (Apache 2.0) — a method for hand-coding hard-surface props from
  a reference photo. Not a scanner.

## Debugging method

When a node or API misbehaves, **read the library source before forming a
hypothesis.** Vendored at `/tmp/twg2/package/build/three.webgpu.js`; `grep -n`
answers most questions in one command. Guessing cost this project five full
verify cycles on one bug.

When a bug resists two hypotheses, stop guessing and measure. Add the probe,
take the reading, write the result down — including hypotheses the reading
*disproves*, so they are not retried.
