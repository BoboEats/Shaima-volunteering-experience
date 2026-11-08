/* ==========================================================================
   You do NOT need to edit this file.
   It (1) builds the timeline from experiences.js,
       (2) lights up the circle closest to the mouse,
       (3) fades rows in/out as they enter/leave the screen.
   ========================================================================== */

(function () {
  const FADE_ZONE = 0.22;   // how much of the screen height (top & bottom) is used for fading. 0.22 = 22%

  const container = document.getElementById("timeline");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Build the timeline ---------- */
  const list = experiences.slice();
  if (typeof AUTO_SORT === "undefined" || AUTO_SORT) {
    const yearOf = (e) => parseInt(String(e.year).match(/\d{4}/)?.[0] ?? "0", 10);
    list.sort((a, b) => yearOf(b) - yearOf(a));   // newest first (stable for equal years)
  }

  const rows = list.map((item, i) => {
    const row = document.createElement("article");
    row.className = "row " + (i % 2 === 0 ? "year-left" : "year-right");

    const year = document.createElement("div");
    year.className = "year";
    year.textContent = item.year;

    const node = document.createElement("div");
    node.className = "node";
    const dot = document.createElement("span");
    dot.className = "dot";
    node.appendChild(dot);

    const exp = document.createElement("div");
    exp.className = "exp";
    const h2 = document.createElement("h2");
    h2.textContent = item.title;
    const p = document.createElement("p");
    p.textContent = item.body;
    exp.append(h2, p);

    row.append(year, node, exp);
    container.appendChild(row);
    return { row, dot };
  });

  /* ---------- 2 & 3. Hover glow + scroll fade ---------- */
  let pointer = null;          // last mouse position (null = use the middle of the screen)
  let ticking = false;
  let litDot = null;

  window.addEventListener("pointermove", (e) => {
    pointer = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    requestUpdate();
  });
  document.addEventListener("mouseleave", () => { pointer = null; requestUpdate(); });
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    const target = pointer || { x: window.innerWidth / 2, y: vh / 2 };

    let closest = null, best = Infinity;

    for (const r of rows) {
      /* closest circle to the pointer */
      const d = r.dot.getBoundingClientRect();
      const dist = Math.hypot(d.left + d.width / 2 - target.x, d.top + d.height / 2 - target.y);
      if (dist < best) { best = dist; closest = r.dot; }

      /* gradual fade in / out */
      if (!reduceMotion) {
        const box = r.row.getBoundingClientRect();
        const centre = box.top + box.height / 2;
        const edge = Math.min(centre, vh - centre) / (vh * FADE_ZONE);   // 0 at screen edge -> 1 inside the zone
        const t = Math.max(0, Math.min(1, edge));
        const eased = t * t * (3 - 2 * t);                                // smooth curve
        const shift = (1 - eased) * (centre > vh / 2 ? 28 : -28);
        r.row.style.opacity = eased.toFixed(3);
        r.row.style.transform = `translateY(${shift.toFixed(1)}px)`;
      }
    }

    if (closest !== litDot) {
      if (litDot) litDot.classList.remove("lit");
      if (closest) closest.classList.add("lit");
      litDot = closest;
    }
  }

  update();
})();
