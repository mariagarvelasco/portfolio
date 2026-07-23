/* =========================================================
   maría — portfolio · interactions
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(max-width: 720px)").matches;
  const LOGO_WHITE = "img/logo-white.png";
  const LOGO_PINK  = "img/logo-pink.png";

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const projects = window.PROJECTS || [];

  /* ---- ladybug — Home button. Roams the cover freely, then eases
     into a small fixed logo top-left once you scroll past it.
     Pages without a cover (.home) just dock it there immediately. ---- */
  const bug = document.getElementById("ladybug");
  if (bug) {
    const homeWrap = document.querySelector(".home");
    const pinkBlock = document.querySelector(".home .about");
    const header = document.getElementById("siteHeader");
    const DOCK_ANGLE = -28;   // resting tilt once docked — a little to the side, not facing straight up
    const ROAM_SCALE = 1.6;  // a touch bigger while it's out roaming the cover
    const dockTarget = () => {
      // top-left corner, but vertically centred on the nav row (which now sits
      // on the right) — consistent across every page regardless of header padding
      const cs = header ? getComputedStyle(header) : null;
      const nav = header ? header.querySelector(".nav") : null;
      const navRect = nav ? nav.getBoundingClientRect() : null;
      const x = (cs ? parseFloat(cs.paddingLeft) : 24) + 14;
      const y = navRect ? navRect.top + navRect.height / 2 : (cs ? parseFloat(cs.paddingTop) : 20) + 15;
      return { x, y };
    };
    const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));   // bound to ±π
    const angleDiff = (target, current) => wrapAngle(target - current);

    if (!homeWrap || prefersReduced) {
      // no cover to roam (or user prefers less motion): sit docked
      const d = dockTarget();
      let hovered = false;

      if (prefersReduced) {
        bug.style.transform = `translate(${d.x}px, ${d.y}px) translate(-50%, -50%) rotate(${DOCK_ANGLE}deg)`;
        requestAnimationFrame(() => { bug.style.opacity = "1"; });
      } else {
        // same slow idle sway as the home page's docked state — direction
        // drifts gently over time, position never moves
        let angle = DOCK_ANGLE;
        let dockAngleTarget = DOCK_ANGLE;
        let dockAngleTimer = 60 + Math.random() * 90;
        const render = () => {
          bug.style.transform = `translate(${d.x}px, ${d.y}px) translate(-50%, -50%) rotate(${angle.toFixed(1)}deg) scale(${hovered ? 1.35 : 1})`;
        };
        render();
        requestAnimationFrame(() => {
          bug.style.opacity = "1";
          bug.classList.add("lb-static");
        });
        bug.addEventListener("mouseenter", () => { hovered = true; render(); });
        bug.addEventListener("mouseleave", () => { hovered = false; render(); });
        window.addEventListener("resize", () => { const nd = dockTarget(); d.x = nd.x; d.y = nd.y; render(); });

        (function idleSway() {
          dockAngleTimer -= 1;
          if (dockAngleTimer <= 0) {
            dockAngleTarget = DOCK_ANGLE + (Math.random() * 2 - 1) * 18;
            dockAngleTimer = 90 + Math.random() * 150;
          }
          const diffDeg = (((dockAngleTarget - angle + 540) % 360) - 180);
          angle += diffDeg * 0.045;
          render();
          requestAnimationFrame(idleSway);
        })();
      }
    } else {
      let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
      let lastMove = -1e9;   // timestamp of the last real mouse move
      window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; lastMove = performance.now(); }, { passive: true });

      // always start dead-centre of the visible screen, then let it wander off from there
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      let angle = 0;
      let scale = ROAM_SCALE;
      let heading = Math.random() * Math.PI * 2;
      let targetHeading = heading;
      let headingTimer = 30 + Math.random() * 60;
      let speed = 0.45;
      let targetSpeed = 0.45;
      let speedTimer = 30 + Math.random() * 60;
      let dockAngleTarget = DOCK_ANGLE;
      let dockAngleTimer = 60 + Math.random() * 90;
      let docked = false;
      let hoveredDocked = false;   // mouse resting over it once it's the fixed top-left logo

      bug.addEventListener("mouseenter", () => { hoveredDocked = true; });
      bug.addEventListener("mouseleave", () => { hoveredDocked = false; });

      // while it's out roaming, a click makes it hop — big then back to size, no navigation.
      // once docked top-left it's a plain Home link again (default click behaviour applies).
      bug.addEventListener("click", (e) => {
        if (!docked) {
          e.preventDefault();
          scale = ROAM_SCALE * 2.3;
        }
      });

      function frame() {
        // dock the moment the pink "Hi" block reaches the top — not at the end of the cover
        docked = pinkBlock ? pinkBlock.getBoundingClientRect().top <= 2 : window.scrollY > homeWrap.offsetHeight - 80;
        const baseScale = docked ? (hoveredDocked ? 1.35 : 1) : ROAM_SCALE;
        scale += (baseScale - scale) * 0.08;

        if (docked) {
          const d = dockTarget();
          x += (d.x - x) * 0.14;
          y += (d.y - y) * 0.14;
          // stays put, but keeps slowly turning in place — a calm idle sway, not a walk
          dockAngleTimer -= 1;
          if (dockAngleTimer <= 0) {
            dockAngleTarget = DOCK_ANGLE + (Math.random() * 2 - 1) * 18;
            dockAngleTimer = 90 + Math.random() * 150;
          }
          const diffDeg = (((dockAngleTarget - angle + 540) % 360) - 180);   // angle is in degrees here, not radians
          angle += diffDeg * 0.045;
          // keep the wander state ready to resume smoothly if the user scrolls back up
          heading = angle * Math.PI / 180;
          targetHeading = heading;
        } else {
          // always on the move on the cover — never freezes, just wanders and flees
          headingTimer -= 1;
          if (headingTimer <= 0) {
            targetHeading = heading + (Math.random() * 2 - 1) * Math.PI * 0.85;
            headingTimer = 46 + Math.random() * 110;
          }
          // and let its pace drift too — short scurries, but always keeps a lively baseline
          speedTimer -= 1;
          if (speedTimer <= 0) {
            targetSpeed = 0.5 + Math.random() * 0.7;
            speedTimer = 35 + Math.random() * 90;
          }

          // only react to the cursor while it's actually being moved; when it sits still
          // the ladybug ignores it and just keeps wandering (no circling a stale point)
          const mouseActive = performance.now() - lastMove < 350;
          if (mouseActive) {
            const dx0 = mouseX - x, dy0 = mouseY - y;
            const dist = Math.hypot(dx0, dy0) || 1;
            const mouseAngle = Math.atan2(dy0, dx0);
            if (dist < 130) {
              // too close: scurry away, faster
              targetHeading = mouseAngle + Math.PI;
              targetSpeed = Math.max(targetSpeed, 0.95);
              headingTimer = 30 + Math.random() * 40;
            } else if (dist < 460) {
              // curious from a distance — nudges its course toward the cursor
              targetHeading = heading + angleDiff(mouseAngle, heading) * 0.35;
            }
          }

          heading += angleDiff(targetHeading, heading) * 0.045;
          speed += (targetSpeed - speed) * 0.05;

          x += Math.cos(heading) * speed;
          y += Math.sin(heading) * speed;

          const r = homeWrap.getBoundingClientRect();
          const pad = 36;
          const left = r.left + pad, right = r.left + r.width - pad;
          const top = r.top + pad, bottom = r.top + r.height - pad;
          if (x < left)   { x = left;   heading = Math.PI - heading; targetHeading = heading; headingTimer = 60; }
          if (x > right)  { x = right;  heading = Math.PI - heading; targetHeading = heading; headingTimer = 60; }
          if (y < top)    { y = top;    heading = -heading;          targetHeading = heading; headingTimer = 60; }
          if (y > bottom) { y = bottom; heading = -heading;          targetHeading = heading; headingTimer = 60; }
          heading = wrapAngle(heading);

          angle = heading * 180 / Math.PI;
        }

        bug.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) rotate(${angle.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        bug.style.opacity = "1";
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  }

  /* ---- About page: flower doodle behind the portrait — a slow, subtle
     float (barely-there rotation + vertical drift, no side-to-side swing),
     plus the portrait itself breathing very gently in place. ---- */
  const abBug = document.getElementById("abBug");
  const abPhoto = document.querySelector(".ab-photo");
  if (abBug) {
    if (prefersReduced) {
      abBug.style.transform = "translate(-50%, -50%)";
    } else {
      let t = Math.random() * 1000;
      (function abBugFrame() {
        t += 1;
        const rot = Math.sin(t * 0.0016) * 2.5;
        const dx = Math.sin(t * 0.0011 + 1.3) * 1.5;
        const dy = Math.sin(t * 0.0022 + 0.6) * 3.5;
        abBug.style.transform =
          `translate(calc(-50% + ${dx.toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px)) rotate(${rot.toFixed(1)}deg)`;
        if (abPhoto) {
          const pRot = -4 + Math.sin(t * 0.0016 + 2) * 0.6;
          const pDy = Math.sin(t * 0.0018 + 0.9) * 2.5;
          abPhoto.style.transform = `translateY(${pDy.toFixed(1)}px) rotate(${pRot.toFixed(1)}deg)`;
        }
        requestAnimationFrame(abBugFrame);
      })();
    }
  }

  /* ---- work canvas — ONE continuous board, exactly like the reference:
     every photo and every text block keeps the precise position/size it
     has there (l/t/w/r are all % of the FULL page), so projects sit just
     as close together as they do on that board — no per-project spacing. ---- */
  const collage = document.getElementById("collage");
  if (collage && window.WORK) {
    const work = window.WORK;
    const canvas = el("div", "work-canvas");
    canvas.style.setProperty("--ar", work.ar || 0.32);

    const gray = el("div", "work-gray-bg");
    gray.style.top = work.grayFrom + "%";
    canvas.appendChild(gray);

    /* the María García wordmark, sitting behind everything else on the board */
    (work.logos || []).forEach((lg) => {
      const mark = el("span", "work-logo-bg");
      mark.style.left = lg.l + "%";
      mark.style.top = lg.t + "%";
      mark.style.width = lg.w + "%";
      mark.style.height = lg.h + "%";
      if (lg.rot) mark.style.transform = `rotate(${lg.rot}deg)`;
      const img = el("img");
      img.src = lg.src; img.alt = ""; img.loading = "lazy"; img.draggable = false;
      mark.appendChild(img);
      canvas.appendChild(mark);
    });

    (work.items || []).forEach((p) => {
      (p.anchors || []).forEach((a) => {
        const anchor = el("span", "work-anchor");
        anchor.id = a;
        anchor.style.left = p.titleL + "%";
        anchor.style.top = p.titleT + "%";
        canvas.appendChild(anchor);
      });

      (p.images || []).forEach((im) => {
        const piece = el("figure", "work-piece" + (im.noShadow ? " work-piece--flat" : ""));
        piece.style.left = im.l + "%";
        piece.style.top = im.t + "%";
        piece.style.width = im.w + "%";
        piece.style.setProperty("--r", (im.r || 0) + "deg");
        if (im.z) piece.style.zIndex = im.z;
        const img = el("img");
        img.src = im.src; img.alt = p.title || ""; img.loading = "lazy"; img.draggable = false;
        piece.appendChild(img);
        canvas.appendChild(piece);
      });

      // number, title and description now sit as three independently placed
      // pieces (per project — some to the side, some above/below, matching
      // each project's own reference composition), instead of one stacked block
      const numEl = el("span", "work-num", esc(p.n || ""));
      numEl.dataset.n = p.n || "";
      numEl.style.left = p.numL + "%";
      numEl.style.top = p.numT + "%";
      canvas.appendChild(numEl);

      const titleEl = el("h3", "work-title" + (p.titleV ? " work-title--v" : ""), esc(p.title || ""));
      titleEl.dataset.n = p.n || "";
      titleEl.style.left = p.titleL + "%";
      titleEl.style.top = p.titleT + "%";
      canvas.appendChild(titleEl);

      const descEl = el("div", "work-desc",
        `<button class="work-desc-toggle" type="button" aria-label="Read description" aria-expanded="false">Read more <span aria-hidden="true">⌄</span></button>` +
        `<p>${esc(p.desc || "")}</p>`);
      descEl.dataset.n = p.n || "";
      descEl.style.left = p.descL + "%";
      descEl.style.top = p.descT + "%";
      descEl.style.width = p.descW + "%";
      if (p.descR) descEl.style.setProperty("--descR", p.descR + "deg");
      const descToggle = descEl.querySelector(".work-desc-toggle");
      descToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = descEl.classList.toggle("open");
        descToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      canvas.appendChild(descEl);
    });

    /* small round photo-crops scattered between projects, purely decorative */
    (work.circles || []).forEach((c) => {
      const dot = el("span", "work-circle");
      dot.style.left = c.l + "%";
      dot.style.top = c.t + "%";
      const img = el("img");
      img.src = c.src; img.alt = ""; img.loading = "lazy"; img.draggable = false;
      dot.appendChild(img);
      canvas.appendChild(dot);
    });

    collage.appendChild(canvas);

    /* ---- press and hold any project photo to pick it up and move it around the
       board — a light, tactile drag with a subtle tilt and lift, like nudging a
       real print across a table. A plain tap (no real movement) still opens the
       lightbox below, exactly as before. ---- */
    let topZ = 10;
    canvas.addEventListener("pointerdown", (e) => {
      const piece = e.target.closest(".work-piece");
      if (!piece || e.button === 2) return;
      const startX = e.clientX, startY = e.clientY;
      const cs = getComputedStyle(piece);
      const baseDx = parseFloat(cs.getPropertyValue("--dx")) || 0;
      const baseDy = parseFloat(cs.getPropertyValue("--dy")) || 0;
      let moved = false;
      let targetX = startX, targetY = startY; // latest raw pointer position
      let curTilt = 0, rafId = null;
      piece.setPointerCapture(e.pointerId);
      piece.classList.add("dragging");
      piece.style.zIndex = ++topZ;

      function frame() {
        const nx = targetX - startX, ny = targetY - startY;
        piece.style.setProperty("--dx", baseDx + nx + "px");
        piece.style.setProperty("--dy", baseDy + ny + "px");
        // ease the tilt toward how far off-axis the recent motion is, instead
        // of snapping straight to it — a raw per-event delta is noisy and
        // reads as a shiver; easing it makes the swing feel weighty and organic
        const targetTilt = Math.max(-8, Math.min(8, (targetX - lastTiltX) * 1.4));
        lastTiltX = targetX;
        curTilt += (targetTilt - curTilt) * 0.18;
        piece.style.setProperty("--tilt", curTilt.toFixed(2) + "deg");
        rafId = requestAnimationFrame(frame);
      }
      let lastTiltX = startX;
      rafId = requestAnimationFrame(frame);

      function onMove(ev) {
        targetX = ev.clientX; targetY = ev.clientY;
        if (!moved && Math.hypot(targetX - startX, targetY - startY) > 5) moved = true;
      }
      function onUp() {
        piece.releasePointerCapture(e.pointerId);
        piece.classList.remove("dragging");
        cancelAnimationFrame(rafId);
        piece.style.setProperty("--tilt", "0deg");
        piece.removeEventListener("pointermove", onMove);
        piece.removeEventListener("pointerup", onUp);
        piece.removeEventListener("pointercancel", onUp);
        if (moved) {
          piece.dataset.dragged = "1";
          setTimeout(() => { piece.dataset.dragged = ""; }, 0);
        }
      }
      piece.addEventListener("pointermove", onMove);
      piece.addEventListener("pointerup", onUp);
      piece.addEventListener("pointercancel", onUp);
    });

    /* ---- click any project photo to see it bigger, click again (or Esc) to close ---- */
    const lightbox = el("div", "lightbox", '<img alt="" />');
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector("img");
    canvas.addEventListener("click", (e) => {
      const piece = e.target.closest(".work-piece");
      const img = piece && piece.querySelector("img");
      if (!img) return;
      if (piece.dataset.dragged === "1") return;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
    lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  /* ---- watermark logos (blurred pink, textured) ---- */
  const marks = document.getElementById("workWatermarks");
  if (marks) {
    // vary size, horizontal position, rotation & parallax speed down the page
    const specs = [
      { top: 3,  width: 95,  left: -18, rot: -4, speed: 0.05 },
      { top: 24, width: 130, left: 20,  rot: 3,  speed: 0.09 },
      { top: 46, width: 80,  left: -8,  rot: -6, speed: 0.06 },
      { top: 66, width: 120, left: 30,  rot: 5,  speed: 0.11 },
      { top: 85, width: 100, left: -22, rot: -3, speed: 0.07 },
    ];
    specs.forEach((s) => {
      const w = el("div", "wm");
      w.style.top = s.top + "%";
      w.style.left = s.left + "%";
      w.style.width = "min(" + s.width + "vw, " + Math.round(s.width * 13) + "px)";
      w.style.setProperty("--rot", s.rot + "deg");
      w.dataset.speed = s.speed.toString();
      const img = el("img"); img.src = LOGO_PINK; img.alt = ""; img.loading = "lazy";
      w.appendChild(img);
      marks.appendChild(w);
    });
  }

  /* ---- Selected work — moodboard collage, one real photo per project,
     laid out on the table-top background exactly like the reference board.
     Position/size/rotation are all in % of the stage, so the whole
     composition scales as one block regardless of viewport width. ---- */
  const qlStage = document.getElementById("qlookStage");
  let qlSpread = [];   // filled below, read by the scroll-linked update() loop further down
  if (qlStage) {
    const COLLAGE = [
      { src: "img/fotos-home/foto-vinilo.png",      l: 10,   t: -1,   w: 33,   r: -6,          n: "(01)", nl: 44,   nt: 18   }, // 0 Die Mensch·Maschine
      { src: "img/fotos-home/foto-vino-web.png",    l: 30.5, t: 43.5, w: 9,    r: 2,   z: 7,   n: "(02)", nl: 35,   nt: 80   }, // 1 El Trapiche — top layer
      { src: "img/fotos-home/foto-babou.jpg",       l: 35.25,t: 44.5, w: 17,   r: -8,  z: 6,   n: "(05)", nl: 43.8, nt: 72   }, // 2 Babou de Cully — above social media, below vino
      { src: "img/fotos-home/foto-socialmedia.jpg", l: 51.5, t: 44.25,w: 20,   r: 2,           n: "(07)", nl: 74,   nt: 63   }, // 3 There's No End
      { src: "img/fotos-home/foto-libro.png",       l: 5,    t: 18,   w: 12,   r: -6,  z: 5,   n: "(06)", nl: 2,    nt: 25   }, // 4 The Pritzker Prize — far left, on top of base layer
      { src: "img/fotos-home/foto-tapiz.jpg",       l: 64,   t: 73,   w: 18,   r: 0,           n: "(09)", nl: 70,   nt: 92   }, // 5 Woven
      { src: "img/fotos-home/foto-muestra-web.png", l: 27,   t: 27.25,w: 24,   r: -3,   z: 8,  n: "(04)", nl: 52.9, nt: 32.5 }, // 6 Clarendon — top layer
      { src: "img/fotos-home/foto-cuadro-web.png",  l: 56,   t: 68,   w: 14.5, r: -3,          n: "",     nl: 50.8, nt: 74.2 }, // 7 Chromatic
      { src: "img/fotos-home/foto.fotonovela.png",  l: 13.5, t: 34,   w: 23,   r: 0,           n: "(03)", nl: 25,   nt: 63   }, // 8 Fotonovela
      { src: "img/fotos-home/foto-filmoteca.png",   l: 70.5, t: 34,   w: 21.5, r: -3,          n: "(08)", nl: 92,   nt: 49   }, // 9 Filmoteca de Catalunya
    ];
    // centroid of the whole composition — each piece's initial "spread" direction
    // points straight outward from here, so the expanded layout still reads as
    // one balanced arrangement instead of a random scatter
    const qlCenterL = COLLAGE.reduce((s, c) => s + (c.l + c.w / 2), 0) / COLLAGE.length;
    const qlCenterT = COLLAGE.reduce((s, c) => s + c.t, 0) / COLLAGE.length;

    projects.forEach((p, i) => {
      const c = COLLAGE[i];
      if (!c) return;
      const a = el("a", "ql-item");
      a.href = "projects.html#proj-" + i;
      a.style.left = c.l + "%";
      a.style.top = c.t + "%";
      a.style.width = c.w + "%";
      a.style.setProperty("--r", c.r + "deg");
      if (c.z) a.style.zIndex = c.z;
      a.innerHTML = `<img src="${esc(c.src)}" alt="${esc(p.title || "")}" loading="lazy" />`;
      qlStage.appendChild(a);

      const dx0 = (c.l + c.w / 2) - qlCenterL, dy0 = c.t - qlCenterT;
      const mag = Math.hypot(dx0, dy0) || 1;
      qlSpread.push({ el: a, ux: dx0 / mag, uy: dy0 / mag });

      // index number — sits in the clear margin just outside its own photo
      // (never over any photo), matches that project's number on the Work
      // page, and never moves/scales on hover
      const s = el("span", "ql-index", c.n);
      s.style.left = c.nl + "%";
      s.style.top = c.nt + "%";
      qlStage.appendChild(s);
    });
  }

  /* ---- HERO mouse trail — velocity-aware "flow" of the logo ---- */
  const trail = document.getElementById("heroTrail");
  const hero = document.querySelector(".hero");
  if (trail && hero && !prefersReduced && !isTouch) {
    let lastX = 0, lastY = 0, lastT = 0, alive = 0, primed = false;
    const MIN_DIST = 110, MIN_MS = 80, MAX_ALIVE = 10, BASE_W = 460;

    hero.addEventListener("mousemove", (e) => {
      const now = performance.now();
      const vx = e.clientX - lastX, vy = e.clientY - lastY;
      const dist = Math.hypot(vx, vy);
      if (!primed) { primed = true; lastX = e.clientX; lastY = e.clientY; lastT = now; return; }
      if (dist < MIN_DIST || now - lastT < MIN_MS || alive >= MAX_ALIVE) return;
      lastX = e.clientX; lastY = e.clientY; lastT = now;
      spawn(e.clientX, e.clientY, vx, vy);
    });

    function spawn(x, y, vx, vy) {
      const g = el("div", "trail-ghost");
      const img = el("img"); img.src = LOGO_WHITE; img.alt = ""; g.appendChild(img);
      const rect = hero.getBoundingClientRect();
      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx) * 180 / Math.PI;
      // faster movement -> bigger; align rotation to the flow direction
      const scale = 0.95 + Math.min(speed / 90, 1) * 0.85;
      const rot = angle * 0.14 + (Math.random() * 12 - 6);
      const w = BASE_W * scale, h = w * (677 / 1600);
      g.style.width = w + "px";
      g.style.left = (x - rect.left - w / 2) + "px";
      g.style.top = (y - rect.top - h / 2) + "px";
      g.style.setProperty("--r", rot + "deg");
      g.style.transform = `rotate(${rot}deg) scale(0.55)`;
      trail.appendChild(g); alive++;

      // very slow, soft ease-in
      requestAnimationFrame(() => {
        g.style.transition = "opacity .8s ease-out, transform 2s cubic-bezier(.16,1,.3,1)";
        g.style.opacity = (0.32 + Math.random() * 0.24).toFixed(2);
        g.style.transform = `rotate(${rot}deg) scale(1)`;
      });
      // barely drift, very slow fade — a soft lingering cloud
      const dx = vx * 0.9, dy = vy * 0.9;
      setTimeout(() => {
        g.style.transition = "opacity 3s cubic-bezier(.33,0,.2,1), transform 3s cubic-bezier(.33,0,.2,1)";
        g.style.opacity = "0";
        g.style.transform = `translate(${dx.toFixed(0)}px, ${dy.toFixed(0)}px) rotate(${(rot + (vx >= 0 ? 4 : -4)).toFixed(1)}deg) scale(1.1)`;
      }, 420);
      setTimeout(() => { g.remove(); alive--; }, 3600);
    }
  }

  /* ---- HOME logo — slight mouse parallax (like the mave logo before) ---- */
  const homeBand = document.querySelector(".home-logo");
  const homeLogoImg = document.querySelector(".home-logo img");
  if (homeBand && homeLogoImg && !prefersReduced) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    homeBand.addEventListener("mousemove", (e) => {
      const r = homeBand.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    }, { passive: true });
    homeBand.addEventListener("mouseleave", () => { tx = 0; ty = 0; });

    function homeLoop(t) {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const fx = Math.sin(t / 2400) * 6, fy = Math.cos(t / 2900) * 5;   // gentle idle float
      const baseY = window.innerHeight * 0.07;                          // keep the ~7vh lower offset
      homeLogoImg.style.transform =
        `translate(${(cx * 26 + fx).toFixed(1)}px, ${(baseY + cy * 26 + fy).toFixed(1)}px)`;
      requestAnimationFrame(homeLoop);
    }
    requestAnimationFrame(homeLoop);
  }

  /* ---- reveal ---- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  // work-board photos reveal on first scroll with the same soft rise the
  // About-page blocks use (the CSS applies it to the inner image so the
  // piece's own hover/drag transform is untouched)
  document.querySelectorAll(".work-piece, .work-circle").forEach((n) => io.observe(n));

  /* ---- header state — on the home page this matches the exact moment the
     ladybug docks top-left (same "pink block reaches the top" check it uses),
     so the blurred header appears in sync with it, not on a separate scroll guess. ---- */
  const header = document.getElementById("siteHeader");
  const headerPinkBlock = document.querySelector(".home .about");
  function onHeader() {
    const scrolledNow = headerPinkBlock
      ? headerPinkBlock.getBoundingClientRect().top <= 2
      : window.scrollY > 40;
    header.classList.toggle("scrolled", scrolledNow);
  }
  onHeader();
  // three stacked, progressively-masked blur layers — heaviest blur right at
  // the top edge, fading to a lighter touch further down (never a flat slab)
  if (header && !header.querySelector(".header-blur")) {
    const blurWrap = el("div", "header-blur");
    blurWrap.setAttribute("aria-hidden", "true");
    blurWrap.appendChild(el("span"));
    blurWrap.appendChild(el("span"));
    blurWrap.appendChild(el("span"));
    header.insertBefore(blurWrap, header.firstChild);
  }

  /* ---- scroll: strip pan (RIGHT) + parallax ---- */
  const stripSection = document.getElementById("strip");
  const parallaxEls = [...document.querySelectorAll("[data-speed]")];
  let ticking = false;
  function onScroll() { onHeader(); if (prefersReduced) return; if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function update() {
    ticking = false;
    const vh = window.innerHeight;
    if (stripSection && track && !isTouch) {
      const rect = stripSection.getBoundingClientRect();
      const total = stripSection.offsetHeight - vh;
      const prog = Math.max(0, Math.min(1, (-rect.top) / total));
      const gut = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gut")) || 40;
      const distance = track.scrollWidth - window.innerWidth + gut * 2;
      if (distance > 0) track.style.transform = `translate3d(${(-distance * prog).toFixed(1)}px,0,0)`; // reveals left → right
    }
    for (const node of parallaxEls) {
      const r = node.getBoundingClientRect();
      const offset = (r.top + r.height / 2) - vh / 2;
      const speed = parseFloat(node.dataset.speed) || 0;
      node.style.setProperty("--py", `${(-offset * speed).toFixed(1)}px`);
    }

    /* ---- home project photos: spread apart near the top of the page, drawing
       together into today's exact composition as the section settles into the
       centre of the screen — tied 1:1 to scroll, no easing lag. One-way: once
       the section has reached/passed centre, it stays joined — scrolling
       further down (or back up to just before centre) doesn't re-spread it. ---- */
    if (qlStage && qlSpread.length && !prefersReduced) {
      const stageRect = qlStage.getBoundingClientRect();
      const stageCenterY = stageRect.top + stageRect.height / 2;
      const signedDist = stageCenterY - vh / 2; // positive = still approaching from below
      const maxDist = vh * 0.75;
      const progress = Math.max(0, Math.min(1, 1 - signedDist / maxDist));
      const spread = stageRect.width * 0.055 * (1 - progress);
      for (const it of qlSpread) {
        it.el.style.setProperty("--sx", (it.ux * spread).toFixed(1) + "px");
        it.el.style.setProperty("--sy", (it.uy * spread).toFixed(1) + "px");
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- cookie consent — analytics stays anonymous/cookieless (Google Consent
     Mode default) until the visitor accepts; the choice is remembered so the
     banner only shows once. ---- */
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    const CONSENT_KEY = "cookie-consent";
    const updateConsent = (granted) => {
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
      }
    };
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      updateConsent(saved === "granted");
    } else {
      cookieBanner.classList.add("show");
      const respond = (granted) => {
        localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
        updateConsent(granted);
        cookieBanner.classList.remove("show");
      };
      document.getElementById("cookieAccept").addEventListener("click", () => respond(true));
      document.getElementById("cookieReject").addEventListener("click", () => respond(false));
    }
  }
})();
