/* =========================================================
   Édouard Automobiles — « Galerie cinématique »
   Mouvement marqué, dégradable, respecte prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TEL = "07 50 44 27 81";
  var MAIL = "edouard.automobiles@gmail.com";

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
    setTimeout(go, 1150);
    ["click", "keydown", "wheel", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, go, { once: true, passive: true });
    });
  }

  /* ---------- header ---------- */
  function initHeader() {
    var hd = document.getElementById("hd");
    if (!hd) return;
    // les pages intérieures gardent un header opaque : on se fie à un attribut,
    // pas au nom de fichier (Vercel sert des URL sans « .html »)
    if (document.body.hasAttribute("data-static-header")) { hd.classList.add("scrolled"); return; }
    function onScroll() { hd.classList.toggle("scrolled", window.scrollY > 40); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- menu mobile ---------- */
  function initNav() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    var backdrop = document.getElementById("nav-backdrop");
    if (!burger || !nav) return;
    var lastFocus = null;

    function isOpen() { return burger.getAttribute("aria-expanded") === "true"; }

    function open() {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Fermer le menu");
      nav.classList.add("open");
      document.body.classList.add("nav-open");
      if (backdrop) { backdrop.hidden = false; requestAnimationFrame(function () { backdrop.classList.add("show"); }); }
      lastFocus = document.activeElement;
      var first = nav.querySelector("a");
      if (first) first.focus();
    }

    function close(refocus) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu");
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      if (backdrop) {
        backdrop.classList.remove("show");
        setTimeout(function () { if (!isOpen()) backdrop.hidden = true; }, 350);
      }
      if (refocus && lastFocus) { try { lastFocus.focus(); } catch (e) {} }
    }

    burger.addEventListener("click", function () { isOpen() ? close(true) : open(); });
    if (backdrop) backdrop.addEventListener("click", function () { close(true); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") close(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 820 && isOpen()) close(false); });

    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { close(true); return; }
      if (e.key !== "Tab") return;
      // on garde le focus dans le panneau tant qu'il est ouvert
      var items = [].slice.call(nav.querySelectorAll("a")).concat([burger]);
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
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
    function showAll() { items.forEach(function (el) { el.classList.add("in"); }); }
    if (reduce || !("IntersectionObserver" in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.14 });
    items.forEach(function (el) { io.observe(el); });
    // filet de sécurité : rien ne doit rester invisible si l'observer ne se déclenche pas
    setTimeout(showAll, 4000);
  }

  /* ---------- nav : section active ---------- */
  function initSpy() {
    var links = [].slice.call(document.querySelectorAll(".nav a[data-spy]"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("data-spy"));
      if (sec) map[a.getAttribute("data-spy")] = { link: a, sec: sec };
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id;
        if (!map[id]) return;
        map[id].link.classList.toggle("is-active", en.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    Object.keys(map).forEach(function (k) { io.observe(map[k].sec); });
  }

  /* ---------- compteurs ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
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
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- galerie stock ---------- */
  function renderStock() {
    var wrap = document.getElementById("stock-gallery");
    if (!wrap) return;
    var list = Array.isArray(window.STOCK) ? window.STOCK : [];
    if (!list.length) {
      wrap.innerHTML = '<p class="stock-empty">Stock en cours de mise à jour — appelez-nous au ' + TEL + ' pour connaître les véhicules disponibles.</p>';
      return;
    }
    wrap.innerHTML = list.map(function (v) {
      var specs = (v.specs || []).map(esc).join(" · ");
      var tag = v.vendu ? "· Vendu ·" : esc(v.marque);
      var alt = v.vendu ? esc(v.titre) + " — vendue" : esc(v.titre);
      var img = v.photo
        ? '<img src="' + esc(v.photo) + '" alt="' + alt + '" loading="lazy" decoding="async" />'
        : "";
      var inner =
        '<div class="frame">' +
          '<span class="tag">' + tag + "</span>" + img +
        "</div>" +
        '<div class="caption">' +
          '<h3 class="name">' + esc(v.titre) + "</h3>" +
          '<p class="cspec">' + specs + "</p>" +
          '<p class="row">' +
            (v.km ? '<span class="km">' + esc(v.km) + "</span>" : "") +
            '<span class="price">' + esc(v.prix) + "</span>" +
          "</p>" +
        "</div>";
      var cls = "piece" + (v.vendu ? " is-sold" : "");
      if (v.lien && !v.vendu) {
        return '<a class="' + cls + '" href="' + esc(v.lien) + '" target="_blank" rel="noopener">' + inner + "</a>";
      }
      return '<article class="' + cls + '">' + inner + "</article>";
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
    var status = document.getElementById("cform-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = (form.nom.value || "").trim();
      var coord = (form.coord.value || "").trim();
      var msg = (form.message.value || "").trim();
      if (!nom || !coord || !msg) { if (form.reportValidity) form.reportValidity(); return; }

      var body = "Nom : " + nom + "\nTéléphone / e-mail : " + coord + "\n\n" + msg + "\n";
      var href = "mailto:" + MAIL +
        "?subject=" + encodeURIComponent("Demande de rendez-vous — " + nom) +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.hidden = false;
        status.innerHTML =
          "Votre messagerie va s'ouvrir avec le message pré-rempli — il reste à l'envoyer.<br />" +
          "Si rien ne se passe, écrivez à <a href=\"mailto:" + MAIL + "\">" + MAIL + "</a> " +
          "ou appelez le <a href=\"tel:+33750442781\">" + TEL + "</a>.";
      }
      window.location.href = href;
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- démarrage : une panne n'en entraîne pas d'autres ---------- */
  [initIntro, initHeader, initNav, initParallax, renderStock, initSlider,
   initReveals, initSpy, initCounters, initForm, initYear].forEach(function (fn) {
    try { fn(); } catch (err) { if (window.console) console.error("[EA]", fn.name, err); }
  });
})();
