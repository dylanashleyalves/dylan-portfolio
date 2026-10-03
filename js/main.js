/**
 * Portfolio interactions — kept lightweight:
 * photo gallery, mouse glow, canvas particles, scroll reveals,
 * magnetic CTAs, copy-email tooltip, contact form, nav progress.
 */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     PHOTO GALLERY — add your photos here!
     1. Put the image in images/poly/ or images/fitness/
     2. Add a line like the examples below (remove the // )
     The "Life" section stays hidden until at least one photo
     is listed, so the live site never shows an empty gallery.
     ========================================================= */
  const GALLERY = {
    darts: [
      {
        src: "images/darts/u22-jb-festival-top8.jpg",
        caption: "Top 8 · U-22 JB Festival, with doubles partner Kok Zhi Hao and my coach",
        wide: true,
        position: "50% 40%",
      },
      { src: "images/darts/cricket-win.jpg", caption: "Cricket win · 3.25 stats with a White Horse" },
      { src: "images/darts/701-result.jpg", caption: "701 finished in 25 darts" },
    ],
    football: [
      // { src: "images/football/match-day.jpg", caption: "Match day" },
    ],
    fitness: [
      { src: "images/fitness/start.jpg", caption: "Where it started", position: "50% 30%" },
      { src: "images/fitness/progress.jpg", caption: "Progress · still going", position: "50% 30%" },
    ],
    poly: [
      // { src: "images/poly/orientation.jpg", caption: "Orientation week, 2023" },
    ],
  };

  // Optional per-photo settings:
  //   wide: true          → photo spans two columns (good for group shots)
  //   position: "50% 30%" → which part of the photo to keep when it's cropped (x% y%)

  const renderGallery = () => {
    const section = document.getElementById("life");
    if (!section) return;
    let total = 0;
    for (const [key, items] of Object.entries(GALLERY)) {
      const group = section.querySelector(`[data-gallery="${key}"]`);
      const grid = group?.querySelector(".gallery-grid");
      if (!grid) continue;
      items.forEach(({ src, caption = "", wide = false, position }) => {
        const fig = document.createElement("figure");
        fig.className = wide ? "gallery-item wide" : "gallery-item";
        const img = document.createElement("img");
        if (position) img.style.objectPosition = position;
        img.src = src;
        img.alt = caption || "Photo of Dylan";
        img.loading = "lazy";
        img.decoding = "async";
        fig.append(img);
        if (caption) {
          const cap = document.createElement("figcaption");
          cap.textContent = caption;
          fig.append(cap);
        }
        grid.append(fig);
      });
      group.hidden = items.length === 0;
      total += items.length;
    }
    section.hidden = total === 0;
    const navLink = document.getElementById("nav-life");
    if (navLink) navLink.hidden = total === 0;
  };
  renderGallery();

  /* ----- Project screenshot slideshows ----- */
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector(".shots-track");
    const slides = Array.from(track?.children || []);
    const dotsWrap = root.querySelector(".shot-dots");
    if (!slides.length) return;
    let index = 0;

    const go = (n) => {
      index = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === index)));
      slides.forEach((s, k) => {
        s.setAttribute("aria-hidden", String(k !== index));
        s.querySelector("button")?.setAttribute("tabindex", k === index ? "0" : "-1");
      });
    };

    const dots = slides.map((slide, n) => {
      const b = document.createElement("button");
      b.type = "button";
      const title = slide.querySelector("figcaption")?.textContent || `screenshot ${n + 1}`;
      b.setAttribute("aria-label", `Show ${title}`);
      b.addEventListener("click", () => go(n));
      dotsWrap?.append(b);
      return b;
    });

    root.querySelector(".prev")?.addEventListener("click", () => go(index - 1));
    root.querySelector(".next")?.addEventListener("click", () => go(index + 1));

    // Swipe on touch screens
    let startX = null;
    root.addEventListener("pointerdown", (e) => {
      root.dataset.swiped = "";
      if (e.pointerType !== "mouse") startX = e.clientX;
    });
    root.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) {
        root.dataset.swiped = "1";
        go(index + (dx < 0 ? 1 : -1));
      }
    });
    root.addEventListener("pointercancel", () => { startX = null; });

    if (slides.length < 2) {
      root.querySelectorAll(".shot-nav, .shot-dots").forEach((el) => (el.hidden = true));
    }
    go(0);
  });

  /* ----- Lightbox: click a screenshot to see it full size ----- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    const lbImg = lightbox.querySelector("img");
    const lbCap = lightbox.querySelector("figcaption");
    document.querySelectorAll(".shot-open").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.closest("[data-carousel]")?.dataset.swiped === "1") return;
        const img = btn.querySelector("img");
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = btn.closest("figure")?.querySelector("figcaption")?.textContent || "";
        lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) lightbox.close();
    });
  }

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
  const EMAIL = "Dylanashleyalves@gmail.com";

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
      showTip(EMAIL);
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