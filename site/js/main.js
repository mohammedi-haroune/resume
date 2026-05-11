// ── PIPELINE CANVAS — nodes + flowing data packets ──
(function () {
  const canvas = document.getElementById("pipeline-canvas");
  const ctx = canvas.getContext("2d");
  let nodes = [],
    packets = [],
    W,
    H,
    tick = 0;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const N = isMobile ? 30 : 65;
  const MAX = isMobile ? 110 : 155;
  const SPAWN = isMobile ? 0.0008 : 0.0016;
  const SPEED = isMobile ? 0.12 : 0.26;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkNode() {
    const t = Math.random(),
      hub = Math.random() < 0.13;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: hub ? Math.random() * 2.5 + 2.5 : Math.random() * 1.8 + 0.8,
      hub,
      phase: Math.random() * Math.PI * 2,
      type: t < 0.09 ? "o" : t < 0.16 ? "c" : "n",
    };
  }

  function mkPkt(a, b) {
    return {
      a,
      b,
      t: 0,
      sp: 0.0055 + Math.random() * 0.005,
      col: Math.random() < 0.55 ? "o" : "c",
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: N }, mkNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    tick++;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x,
          dy = n.y - m.y,
          d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX) {
          const a = (1 - d / MAX) * 0.2;
          const isO = n.type === "o" || m.type === "o",
            isC = n.type === "c" || m.type === "c";
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = isO
            ? `rgba(249,115,22,${a})`
            : isC
              ? `rgba(34,211,238,${a * 0.8})`
              : `rgba(85,102,130,${a * 0.55})`;
          ctx.lineWidth = (1 - d / MAX) * 1.1;
          ctx.stroke();
          if (
            !reducedMotion &&
            Math.random() < SPAWN * (n.hub || m.hub ? 3.5 : 1)
          )
            packets.push(Math.random() < 0.5 ? mkPkt(n, m) : mkPkt(m, n));
        }
      }
      const pulse = n.hub
        ? 0.72 + Math.sin(tick * 0.028 + n.phase) * 0.28
        : 1;
      const r = n.r * pulse;
      const al = n.type === "o" ? 0.72 : n.type === "c" ? 0.62 : 0.42;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle =
        n.type === "o"
          ? `rgba(249,115,22,${al})`
          : n.type === "c"
            ? `rgba(34,211,238,${al})`
            : `rgba(85,102,130,${al})`;
      ctx.fill();
      if (n.hub) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 3.5, 0, Math.PI * 2);
        ctx.strokeStyle =
          n.type === "o"
            ? `rgba(249,115,22,.13)`
            : n.type === "c"
              ? `rgba(34,211,238,.11)`
              : `rgba(85,102,130,.09)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
    packets = packets.filter((p) => {
      p.t += p.sp;
      if (p.t >= 1) return false;
      const e =
        p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
      const px = p.a.x + (p.b.x - p.a.x) * e,
        py = p.a.y + (p.b.y - p.a.y) * e;
      ctx.beginPath();
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fillStyle =
        p.col === "o" ? "rgba(249,115,22,.94)" : "rgba(34,211,238,.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle =
        p.col === "o" ? "rgba(249,115,22,.16)" : "rgba(34,211,238,.14)";
      ctx.fill();
      return true;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => resize(), { passive: true });
  init();
  draw();
})();

// ── NAV ──
(function () {
  const nav = document.getElementById("nav");
  const secs = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
      let cur = "";
      secs.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
      });
      links.forEach((a) =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === "#" + cur,
        ),
      );
    },
    { passive: true },
  );
})();

// ── HAMBURGER ──
(function () {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("nav-links");
  const ov = document.getElementById("nav-overlay");
  const close = () => {
    btn.classList.remove("open");
    menu.classList.remove("open");
    ov.classList.remove("open");
    document.body.style.overflow = "";
  };
  const open = () => {
    btn.classList.add("open");
    menu.classList.add("open");
    ov.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  btn.addEventListener("click", () =>
    btn.classList.contains("open") ? close() : open(),
  );
  ov.addEventListener("click", close);
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", close));
})();

// ── FADE IN ──
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));
})();
