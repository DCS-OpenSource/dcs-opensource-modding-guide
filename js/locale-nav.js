(function () {
  var localePrefix = "/tr/";
  var pageCache = new Map();
  var labels = {
    "Home": "Ana Sayfa",
    "Useful Links": "Faydalı Bağlantılar",
    "Basic Principles": "Temel İlkeler",
    "Stubs": "Stub'lar",
    "Device Stubs": "Device Stub'ları",
    "Mainpanel Stubs": "Mainpanel Stub'ları",
    "Modules": "Modüller",
    "Devices": "Cihazlar",
    "Indicators": "Göstergeler",
    "Drawing": "Çizim",
    "Controllers": "Kontrolcüler",
    "Plugins": "Eklentiler",
    "Useful Bits": "Faydalı Notlar",
    "Database": "Veritabanı",
    "Useful bits": "Faydalı Notlar",
    "Modelviewer": "Modelviewer",
    "Cockpit Sounds": "Kokpit Sesleri",
    "Overview": "Genel Bakış",
    "Mesh": "Mesh",
    "Materials": "Materyaller",
    "Animations": "Animasyonlar",
    "Lights": "Işıklar",
    "Known Errors": "Bilinen Hatalar",
    "Contributing": "Katkıda Bulunma"
  };

  function isTurkishPage() {
    return window.location.pathname === localePrefix ||
      window.location.pathname.indexOf(localePrefix) === 0;
  }

  function candidateFor(url) {
    if (url.origin !== window.location.origin) return null;
    if (url.pathname.indexOf(localePrefix) === 0) return null;
    if (url.pathname.indexOf("/assets/") === 0) return null;
    if (/\.[a-z0-9]+$/i.test(url.pathname) && !/\.html?$/i.test(url.pathname)) return null;

    var pathname = url.pathname === "/" ? localePrefix : localePrefix + url.pathname.replace(/^\/+/, "");
    return pathname + url.search + url.hash;
  }

  function pageExists(path) {
    if (!pageCache.has(path)) {
      pageCache.set(
        path,
        fetch(path, { method: "HEAD" })
          .then(function (response) { return response.ok; })
          .catch(function () { return false; })
      );
    }

    return pageCache.get(path);
  }

  function rewriteSidebarLinks() {
    if (!isTurkishPage()) return;

    document.querySelectorAll(".md-sidebar--primary a[href]").forEach(function (link) {
      var url = new URL(link.getAttribute("href"), window.location.href);
      var candidate = candidateFor(url);
      if (!candidate) return;

      pageExists(candidate).then(function (exists) {
        if (exists) link.setAttribute("href", candidate);
      });
    });
  }

  function translateSidebarLabels() {
    if (!isTurkishPage()) return;

    document.querySelectorAll(".md-sidebar--primary .md-ellipsis").forEach(function (label) {
      var original = label.textContent.trim();
      if (labels[original]) label.textContent = labels[original];
    });
  }

  function updateSidebar() {
    rewriteSidebarLinks();
    translateSidebarLabels();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest(".md-sidebar--primary a[href]");
    if (!link || !isTurkishPage()) return;

    var url = new URL(link.getAttribute("href"), window.location.href);
    var candidate = candidateFor(url);
    if (!candidate) return;

    event.preventDefault();
    pageExists(candidate).then(function (exists) {
      window.location.href = exists ? candidate : url.href;
    });
  });

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(updateSidebar);
  } else {
    document.addEventListener("DOMContentLoaded", updateSidebar);
  }
})();
