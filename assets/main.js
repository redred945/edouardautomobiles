/* =========================================================
   Édouard Automobiles — comportements front
   Dégradable : sans JS, le site reste lisible et navigable.
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- silhouette de secours pour les vignettes sans photo ---------- */
  var CAR_SVG =
    '<svg viewBox="0 0 300 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M8,84 L8,72 Q40,69 64,52 Q90,32 146,30 Q192,29 220,50 L272,62 Q288,65 288,80 L288,84 Z" fill="#0d0b08"/>' +
    '<circle cx="70" cy="86" r="15" fill="#0d0b08"/><circle cx="236" cy="86" r="15" fill="#0d0b08"/>' +
    "</svg>";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- rendu du stock ---------- */
  function renderStock() {
    var grid = document.getElementById("stock-grid");
    if (!grid) return;
    var list = Array.isArray(window.STOCK) ? window.STOCK : [];

    if (!list.length) {
      grid.innerHTML =
        '<p class="stock-empty">Stock en cours de mise à jour — écrivez-nous pour connaître les véhicules disponibles.</p>';
      return;
    }

    grid.innerHTML = list
      .map(function (v) {
        var specs = (v.specs || []).map(esc).join(" · ");
        var visual = v.photo
          ? '<img src="' + esc(v.photo) + '" alt="' + esc(v.titre) + '" loading="lazy" />'
          : CAR_SVG + '<span class="ind">Visuel indicatif</span>';
        var stamp = v.vendu ? '<span class="stamp">Vendu</span>' : "";
        var km = v.km ? '<span class="km">' + esc(v.km) + "</span>" : "<span></span>";

        var inner =
          '<div class="shot">' +
          '<div class="glow"></div>' +
          '<span class="marque">' + esc(v.marque) + "</span>" +
          visual + stamp +
          "</div>" +
          '<div class="body">' +
          '<div class="model">' + esc(v.titre) + "</div>" +
          '<div class="cspec">' + specs + "</div>" +
          '<div class="line">' + km + '<span class="price">' + esc(v.prix) + "</span></div>" +
          "</div>";

        var cls = "card" + (v.vendu ? " sold" : "");
        if (v.lien && !v.vendu) {
          return '<a class="' + cls + '" href="' + esc(v.lien) + '" target="_blank" rel="noopener">' + inner + "</a>";
        }
        return '<article class="' + cls + '">' + inner + "</article>";
      })
      .join("");
  }

  /* ---------- menu mobile ---------- */
  function initNav() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    if (!burger || !nav) return;

    function close() {
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) close();
    });
  }

  /* ---------- header au scroll ---------- */
  function initHeader() {
    var hd = document.getElementById("hd");
    if (!hd) return;
    var onScroll = function () {
      hd.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- reveals progressifs ---------- */
  function initReveals() {
    var items = [].slice.call(document.querySelectorAll(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- formulaire de contact → mailto ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = (form.nom.value || "").trim();
      var coord = (form.coord.value || "").trim();
      var msg = (form.message.value || "").trim();
      if (!nom || !coord || !msg) {
        form.reportValidity && form.reportValidity();
        return;
      }
      var body =
        "Nom : " + nom + "\n" +
        "Téléphone / e-mail : " + coord + "\n\n" +
        msg + "\n";
      window.location.href =
        "mailto:edouard.automobiles@gmail.com" +
        "?subject=" + encodeURIComponent("Demande de rendez-vous — " + nom) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- pied de page ---------- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  renderStock();
  initNav();
  initHeader();
  initReveals();
  initForm();
  initYear();
})();
