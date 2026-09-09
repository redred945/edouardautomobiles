/* =========================================================
   Édouard Automobiles — « Galerie cinématique »
   Mouvement marqué, dégradable, respecte prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- séquence d'intro ---------- */
  function initIntro() {
    var intro = document.getElementById("intro");
    var hero = document.getElementById("hero");
    var seen = false;
    try { seen = sessionStorage.getItem("ea_seen") === "1"; } catch (e) {}

    function finish() {
      if (intro) intro.classList.add("done");
      if (hero) hero.classList.add("lit");
      try { sessionStorage.setItem("ea_seen", "1"); } catch (e) {}
    }

    if (!intro || document.body.classList.contains("no-intro") || reduce || seen) {
      document.body.classList.add("no-intro");
      if (hero) hero.classList.add("lit");
      return;
    }

    var done = false;
    function go() { if (done) return; done = true; finish(); }
    setTimeout(go, 1950);
    ["click", "keydown", "wheel", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, go, { once: true, passive: true });
    });
  }

  /* ---------- header ---------- */
  function initHeader() {
    var hd = document.getElementById("hd");
    if (!hd) return;
    var isContact = /contact\.html/.test(location.pathname);
    function onScroll() {
      if (isContact) { hd.classList.add("scrolled"); return; }
      hd.classList.toggle("scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- menu mobile ---------- */
  function initNav() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    if (!burger || !nav) return;
    function close() { burger.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- parallaxe hero ---------- */
  function initParallax() {
    var media = document.getElementById("hero-media");
    var hero = document.getElementById("hero");
    var img = media && media.querySelector("img");
    if (!media || !hero || !img || reduce) return;
    var ticking = false;
    function update() {
      ticking = false;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var offset = Math.max(0, -rect.top);
      // l'image déborde de 20 % en bas : on translate au plus ~12 % de la hauteur
      var shift = Math.min(offset * 0.12, hero.offsetHeight * 0.12);
      img.style.transform = "translate3d(0,-" + shift.toFixed(1) + "px,0)";
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- reveals ---------- */
  function initReveals() {
    var items = [].slice.call(document.querySelectorAll(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.14 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- compteurs ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target) || el.hasAttribute("data-plain")) return;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduce) { el.textContent = target.toFixed(decimals).replace(".", ","); return; }
    var start = performance.now();
    var dur = 1300;
    function frame(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).replace(".", ",");
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals).replace(".", ",");
    }
    requestAnimationFrame(frame);
  }
  function initCounters() {
    var els = [].slice.call(document.querySelectorAll("[data-count]"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    // si l'intro joue, on lance les compteurs quand elle se retire
    var wait = (reduce || document.body.classList.contains("no-intro")) ? 0 : 2000;
    setTimeout(function () { els.forEach(function (el) { io.observe(el); }); }, wait);
  }

  /* ---------- galerie stock ---------- */
  function renderStock() {
    var wrap = document.getElementById("stock-gallery");
    if (!wrap) return;
    var list = Array.isArray(window.STOCK) ? window.STOCK : [];
    if (!list.length) {
      wrap.innerHTML = '<p class="stock-empty">Stock en cours de mise à jour — écrivez-nous pour connaître les véhicules disponibles.</p>';
      return;
    }
    wrap.innerHTML = list.map(function (v) {
      var specs = (v.specs || []).map(esc).join(" · ");
      var tag = v.vendu ? "· Vendu ·" : esc(v.marque);
      var img = v.photo
        ? '<img src="' + esc(v.photo) + '" alt="' + esc(v.titre) + '" loading="lazy" />'
        : "";
      var inner =
        '<div class="frame">' +
          '<span class="tag">' + tag + "</span>" + img +
        "</div>" +
        '<div class="caption">' +
          '<div class="name">' + esc(v.titre) + "</div>" +
          '<div class="cspec">' + specs + "</div>" +
          '<div class="row">' +
            '<span class="km">' + (v.km ? esc(v.km) : "") + "</span>" +
            '<span class="price">' + esc(v.prix) + "</span>" +
          "</div>" +
        "</div>";
      var cls = "piece" + (v.vendu ? " is-sold" : "");
      if (v.lien && !v.vendu) {
        return '<a class="' + cls + '" role="listitem" href="' + esc(v.lien) + '" target="_blank" rel="noopener">' + inner + "</a>";
      }
      return '<div class="' + cls + '" role="listitem">' + inner + "</div>";
    }).join("");
  }

  /* ---------- flèches gauche / droite du stock ---------- */
  function initSlider() {
    var g = document.getElementById("stock-gallery");
    var prev = document.getElementById("s-prev");
    var next = document.getElementById("s-next");
    if (!g || !prev || !next) return;

    function step() {
      var p = g.querySelector(".piece");
      if (!p) return g.clientWidth * 0.8;
      var gap = parseFloat(getComputedStyle(g).columnGap || getComputedStyle(g).gap || "24") || 24;
      return p.getBoundingClientRect().width + gap;
    }
    function go(dir) {
      var to = Math.max(0, Math.min(g.scrollLeft + dir * step(), g.scrollWidth - g.clientWidth));
      try { g.scrollTo({ left: to, behavior: reduce ? "auto" : "smooth" }); }
      catch (e) { g.scrollLeft = to; }
      setTimeout(refresh, 350);
    }
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });

    var ticking = false;
    function refresh() {
      ticking = false;
      var max = g.scrollWidth - g.clientWidth;
      prev.disabled = g.scrollLeft <= 2;
      next.disabled = g.scrollLeft >= max - 2 || max <= 2;
    }
    g.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(refresh); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", refresh);
    setTimeout(refresh, 0);
  }

  /* ---------- formulaire ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = (form.nom.value || "").trim();
      var coord = (form.coord.value || "").trim();
      var msg = (form.message.value || "").trim();
      if (!nom || !coord || !msg) { form.reportValidity && form.reportValidity(); return; }
      var body = "Nom : " + nom + "\nTéléphone / e-mail : " + coord + "\n\n" + msg + "\n";
      window.location.href =
        "mailto:edouard.automobiles@gmail.com" +
        "?subject=" + encodeURIComponent("Demande de rendez-vous — " + nom) +
        "&body=" + encodeURIComponent(body);
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  initIntro();
  initHeader();
  initNav();
  initParallax();
  renderStock();
  initSlider();
  initReveals();
  initCounters();
  initForm();
  initYear();
})();
