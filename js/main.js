/**
 * Portfolio interactions — kept lightweight:
 * mouse glow, canvas particles, scroll reveals, magnetic CTAs,
 * copy-email tooltip, contact form, nav progress.
 */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Year ----- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----- Mouse glow ----- */
  const glow = document.querySelector(".cursor-glow");
  if (glow && !reduced && window.matchMedia("(pointer: fine)").matches) {
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let tx = x;
    let ty = y;

    window.addEventListener(
      "pointermove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );

    const tickGlow = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(tickGlow);
    };
    tickGlow();
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ----- Particles ----- */
  const canvas = document.getElementById("particle-canvas");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d", { alpha: true });
    const particles = [];
    const count = Math.min(70, Math.floor((innerWidth * innerHeight) / 28000));

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.35 + 0.08,
        amber: Math.random() > 0.72,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = p.amber
          ? `rgba(240,180,90,${p.a})`
          : `rgba(61,255,166,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ----- Scroll progress ----- */
  const bar = document.querySelector(".nav-progress span");
  const onScroll = () => {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Reveal on scroll ----- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduced) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ----- Magnetic buttons ----- */
  if (!reduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.22}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ----- Copy email ----- */
  const copyBtn = document.getElementById("copy-email");
  const tooltip = document.getElementById("copy-tooltip");
  const EMAIL = "dylan@example.com";

  const showTip = (text) => {
    if (!tooltip) return;
    tooltip.textContent = text;
    tooltip.classList.add("show");
    window.setTimeout(() => tooltip.classList.remove("show"), 1800);
  };

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showTip("Copied");
    } catch {
      showTip("dylan@example.com");
    }
  });

  /* ----- Contact form (client-only success) ----- */
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    if (status) {
      status.textContent = `Signal received, ${name || "friend"}. I’ll reply soon.`;
      status.classList.remove("opacity-0");
    }
    form.reset();
  });

  /* ----- Mobile nav ----- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  toggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("hidden") === false;
    menu?.classList.toggle("flex", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        menu.classList.add("hidden");
        menu.classList.remove("flex");
        toggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
})();
