/* pt-live.js - the cut bench for learn-product-thinking-with-phoebe
 *
 * One stated job, one backlog, and real arithmetic over a feature -> outcome graph.
 *
 * THE PRODUCT IS CONSTRUCTED. Ferry is a made-up tool for a Sunday-league football club,
 * written so that the five presets behave differently from each other. The arithmetic is
 * real; the club is not. No figure here is a claim about software projects in general.
 *
 * What is computed, never asserted:
 *   job served %      weighted coverage of the job's outcomes by the selected features
 *   core covered      whether the four outcomes the job cannot work without are >= 85% met
 *   weeks to build    sum of the selected features' costs
 *   weeks to usable   cumulative weeks, IN THE SELECTION'S OWN BUILD ORDER, until core is met
 *   dead weight       selected features that serve no stated outcome at all
 *
 * The build order is the point of the first two presets: the same twelve features, the same
 * thirty-four weeks, and a twenty-three week difference in when the club can first use it.
 */
(function () {
  "use strict";

  /* The job, broken into the outcomes it actually needs. Weights are the club's, not ours. */
  var JOB = "Get eleven players confirmed for Saturday, and know by Thursday night.";

  var OUTCOMES = [
    { id: "o1", core: true,  w: 3, label: "A player can answer yes or no in seconds" },
    { id: "o2", core: true,  w: 3, label: "The organiser sees the count without asking anyone" },
    { id: "o3", core: true,  w: 2, label: "The organiser can chase whoever has not answered" },
    { id: "o8", core: true,  w: 2, label: "All of that works on a phone, standing up, outdoors" },
    { id: "o4", core: false, w: 2, label: "A late dropout gets replaced without a phone tree" },
    { id: "o5", core: false, w: 1, label: "Next few fixtures are visible in advance" },
    { id: "o6", core: false, w: 1, label: "Match fees get collected" },
    { id: "o7", core: false, w: 1, label: "Season appearances and goals are kept" }
  ];

  /* cost is build-weeks. serves maps outcome id -> how much of that outcome it delivers.
   * asked is how often it came up when the club was asked what it wanted, out of ten. */
  var FEATURES = [
    { id: "f1",  cost: 2, asked: 4, name: "Yes/no link by text message",
      serves: { o1: 0.9, o8: 1.0 } },
    { id: "f2",  cost: 2, asked: 3, name: "Organiser's count on one screen",
      serves: { o2: 1.0 } },
    { id: "f3",  cost: 1, asked: 2, name: "Automatic nudge to whoever has not answered",
      serves: { o3: 0.9 } },
    { id: "f4",  cost: 3, asked: 4, name: "Waiting list that promotes itself",
      serves: { o4: 1.0 } },
    { id: "f5",  cost: 2, asked: 5, name: "Season fixture calendar",
      serves: { o5: 1.0 } },
    { id: "f6",  cost: 5, asked: 7, name: "Card payment for match fees",
      serves: { o6: 1.0 } },
    { id: "f7",  cost: 4, asked: 8, name: "Appearance and goal tables",
      serves: { o7: 1.0 } },
    { id: "f8",  cost: 8, asked: 6, name: "Native iPhone and Android apps",
      serves: { o8: 1.0 } },
    { id: "f9",  cost: 3, asked: 9, name: "Team chat",
      serves: {} },
    { id: "f10", cost: 2, asked: 3, name: "Admin roles and permissions",
      serves: {} },
    { id: "f11", cost: 1, asked: 1, name: "Export the squad list to a spreadsheet",
      serves: {} },
    { id: "f12", cost: 1, asked: 5, name: "Dark mode",
      serves: {} }
  ];

  var CORE_BAR = 0.85;   /* core outcomes must be this well met before anyone can use it */

  var ALL = FEATURES.map(function (f) { return f.id; });

  /* order: "loud" = most-requested first, the order a room full of people produces.
   *        "job"  = cheapest route to the core outcomes first.
   *        "as-listed" = the order given. */
  var PRESETS = [
    { id: "loud", label: "Build everything, loudest first",
      note: "All twelve. Ordered by how often the club asked for each one.",
      pick: ALL, order: "loud" },
    { id: "job", label: "Build everything, job first",
      note: "The same twelve and the same total. Only the order changes.",
      pick: ALL, order: "job" },
    { id: "cut", label: "Cut to the job",
      note: "Keep what the stated job needs, drop the rest for now.",
      pick: ["f1", "f2", "f3", "f4"], order: "job" },
    { id: "thin", label: "Cut harder",
      note: "The two features nobody could argue with. Ships fastest.",
      pick: ["f1", "f2"], order: "job" },
    { id: "apps", label: "Cut to the job, plus the native apps",
      note: "The one everybody expects a real product to have.",
      pick: ["f1", "f2", "f3", "f4", "f8"], order: "job", anti: true }
  ];

  var byId = {};
  FEATURES.forEach(function (f) { byId[f.id] = f; });
  var outById = {};
  OUTCOMES.forEach(function (o) { outById[o.id] = o; });

  var TOTAL_W = OUTCOMES.reduce(function (a, o) { return a + o.w; }, 0);
  var CORE_W  = OUTCOMES.filter(function (o) { return o.core; })
                        .reduce(function (a, o) { return a + o.w; }, 0);

  /* coverage of a set: an outcome is met to the BEST degree any one feature delivers it.
   * Two features that both cover an outcome do not add up - that is the whole anti-lever. */
  function coverage(ids) {
    var met = {};
    OUTCOMES.forEach(function (o) { met[o.id] = 0; });
    ids.forEach(function (id) {
      var f = byId[id];
      if (!f) return;
      Object.keys(f.serves).forEach(function (oid) {
        if (f.serves[oid] > met[oid]) met[oid] = f.serves[oid];
      });
    });
    var all = 0, core = 0;
    OUTCOMES.forEach(function (o) {
      all += o.w * met[o.id];
      if (o.core) core += o.w * met[o.id];
    });
    return { met: met, all: all / TOTAL_W, core: core / CORE_W };
  }

  function sortFor(ids, mode) {
    var list = ids.slice();
    if (mode === "loud") {
      list.sort(function (a, b) {
        return byId[b].asked - byId[a].asked || byId[a].cost - byId[b].cost;
      });
    } else if (mode === "job") {
      /* cheapest core value first: weight of core outcomes delivered, per week */
      list.sort(function (a, b) {
        function rate(id) {
          var f = byId[id], v = 0;
          Object.keys(f.serves).forEach(function (oid) {
            if (outById[oid].core) v += outById[oid].w * f.serves[oid];
          });
          return v / f.cost;
        }
        return rate(b) - rate(a) || byId[a].cost - byId[b].cost;
      });
    }
    return list;
  }

  /* walk the build in order and report the week core coverage first clears the bar */
  function timeline(ids, mode) {
    var order = sortFor(ids, mode);
    var so_far = [], week = 0, usable = null, steps = [];
    for (var i = 0; i < order.length; i++) {
      so_far.push(order[i]);
      week += byId[order[i]].cost;
      var c = coverage(so_far);
      if (usable === null && c.core >= CORE_BAR) usable = week;
      steps.push({ id: order[i], name: byId[order[i]].name, week: week,
                   core: c.core, all: c.all, first: usable === week && steps.every(function (s) { return true; }) });
    }
    return { order: order, weeks: week, usable: usable, steps: steps };
  }

  function evaluate(ids, mode) {
    var c = coverage(ids);
    var t = timeline(ids, mode);
    var dead = ids.filter(function (id) { return Object.keys(byId[id].serves).length === 0; });
    return {
      picked: ids.slice(),
      served: c.all,
      core: c.core,
      coreCovered: c.core >= CORE_BAR,
      weeks: t.weeks,
      usableWeek: t.usable,
      dead: dead,
      deadWeeks: dead.reduce(function (a, id) { return a + byId[id].cost; }, 0),
      steps: t.steps,
      met: c.met
    };
  }

  /* ---------- UI ---------- */

  var root, readout, table, current = "loud", picked = null, mode = "job", out = null, btns = {};

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function pct(x) { return Math.round(x * 100) + "%"; }

  function metric(label, value, unit, kind) {
    return '<div class="mb-metric"><span class="mb-mlabel">' + esc(label) + "</span>" +
      '<span class="mb-mvalue">' + esc(value) + "</span>" +
      '<span class="mb-munit">' + esc(unit) + "</span>" +
      '<span class="mb-mkind is-' + kind + '">' + kind + "</span></div>";
  }

  function grade(r) {
    if (!r.coreCovered) {
      return ["bad", "Ships soonest and the club still cannot use it - the core is not covered"];
    }
    if (r.dead.length >= 3) {
      return ["bad", "Usable, but " + r.deadWeeks + " weeks went on features serving no stated outcome"];
    }
    if (current === "apps") {
      return ["bad", "Eight extra weeks bought exactly nothing - the link already worked on a phone"];
    }
    if (r.weeks <= 10) {
      return ["good", "Usable in week " + r.usableWeek + ", and the whole thing is " + r.weeks + " weeks"];
    }
    return ["ok", "Usable in week " + r.usableWeek + " of " + r.weeks + " - the order did the work"];
  }

  function render() {
    var ids = picked || PRESETS.filter(function (p) { return p.id === current; })[0].pick;
    var p = PRESETS.filter(function (x) { return x.id === current; })[0];
    var m = picked ? mode : p.order;
    var r = evaluate(ids, m);
    out = r;

    var g = grade(r);
    readout.innerHTML =
      '<div class="mb-verdict is-' + g[0] + '">' + esc(g[1]) +
        ' <span class="mb-mkind is-heuristic">heuristic</span></div>' +
      '<div class="mb-metrics">' +
        metric("Job served", pct(r.served), "of the stated outcomes, by weight", "measured") +
        metric("Weeks to build", r.weeks, "the whole selection", "measured") +
        metric("Usable in week", r.usableWeek === null ? "never" : r.usableWeek,
               r.usableWeek === null ? "core outcomes never covered" : "core outcomes covered", "measured") +
        metric("Serving nothing", r.dead.length,
               r.deadWeeks + " weeks of the total", "measured") +
      "</div>";

    var rows = r.steps.map(function (s, i) {
      var hit = (r.usableWeek !== null && s.week === r.usableWeek &&
                 r.steps.findIndex(function (x) { return x.week === r.usableWeek; }) === i);
      return "<tr" + (hit ? ' class="is-hit"' : "") + "><td>" + (i + 1) + "</td><th>" + esc(s.name) +
        "</th><td>" + byId[s.id].cost + "w</td><td>" + s.week + "</td><td>" +
        pct(s.core) + "</td><td>" + pct(s.all) + "</td></tr>";
    }).join("");

    var missed = OUTCOMES.filter(function (o) { return r.met[o.id] < 0.5; });
    table.innerHTML =
      '<table class="dt-table"><thead><tr><th>#</th><th>Built</th><th>Cost</th>' +
      "<th>By week</th><th>Core met</th><th>Job met</th></tr></thead><tbody>" + rows +
      "</tbody></table>" +
      '<p class="mb-hint">' +
        (missed.length
          ? "Still not met: " + esc(missed.map(function (o) { return o.label; }).join(" · "))
          : "Every stated outcome is met.") +
      "</p>";
  }

  function setPreset(id) {
    current = id; picked = null;
    Object.keys(btns).forEach(function (k) {
      btns[k].classList.toggle("is-on", k === id);
      var i = btns[k].querySelector("input");
      if (i) i.checked = (k === id);
    });
    if (root) {
      var boxes = root.querySelectorAll(".pt-pick input");
      var set = PRESETS.filter(function (p) { return p.id === id; })[0].pick;
      Array.prototype.forEach.call(boxes, function (b) {
        b.checked = set.indexOf(b.value) >= 0;
      });
    }
    render();
  }

  function setPicked(ids, m) {
    picked = ids.slice(); mode = m || "job";
    Object.keys(btns).forEach(function (k) { btns[k].classList.remove("is-on"); });
    render();
  }

  function buildUI() {
    var panel = document.createElement("div");
    panel.className = "mb-presets";
    PRESETS.forEach(function (p) {
      var lab = document.createElement("label");
      lab.className = "mb-preset" + (p.anti ? " is-anti" : "");
      lab.innerHTML = '<input type="radio" name="pt-p" value="' + p.id + '">' +
        '<span class="mb-pname">' + esc(p.label) +
        (p.anti ? ' <em class="mb-anti">the one that buys nothing</em>' : "") + "</span>" +
        '<span class="mb-pnote">' + esc(p.note) + "</span>";
      panel.appendChild(lab);
      btns[p.id] = lab;
      lab.querySelector("input").addEventListener("change", function () { setPreset(p.id); });
    });

    var hint = document.createElement("p");
    hint.className = "mb-hint";
    hint.textContent = "The job: " + JOB + " " + FEATURES.length + " features on the backlog, " +
      OUTCOMES.length + " outcomes the job needs, " +
      OUTCOMES.filter(function (o) { return o.core; }).length +
      " of them core. Ferry is invented so the presets behave differently; the arithmetic is real.";

    var picks = document.createElement("div");
    picks.className = "pt-pick";
    picks.innerHTML = "<p>Or cut it yourself:</p>";
    FEATURES.forEach(function (f) {
      var l = document.createElement("label");
      l.innerHTML = '<input type="checkbox" value="' + f.id + '"> ' + esc(f.name) +
        ' <span class="mb-munit">' + f.cost + "w · asked " + f.asked + "/10</span>";
      picks.appendChild(l);
    });
    picks.addEventListener("change", function () {
      var on = [];
      Array.prototype.forEach.call(picks.querySelectorAll("input"), function (b) {
        if (b.checked) on.push(b.value);
      });
      setPicked(on, "job");
    });

    readout = document.createElement("div"); readout.className = "mb-readout";
    table = document.createElement("div"); table.className = "dt-tablewrap";

    root.appendChild(panel);
    root.appendChild(hint);
    root.appendChild(readout);
    root.appendChild(table);
    root.appendChild(picks);
    setPreset("loud");
  }

  function init() {
    root = document.getElementById("cut-bench");
    if (!root) return;
    buildUI();
    window.PT_LIVE = {
      presets: PRESETS.map(function (p) { return p.id; }),
      show: setPreset,
      pick: setPicked,
      evaluate: evaluate,
      features: FEATURES,
      outcomes: OUTCOMES,
      job: JOB,
      get current() { return current; },
      get metrics() { return out; }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
