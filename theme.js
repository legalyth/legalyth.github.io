(() => {
  const root = document.documentElement;
  const KEY = "theme"; // 'light' | 'dark'

  // init: localStorage -> sinon thème système
  function getPreferredTheme() {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const dark = theme === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      btn.title = dark ? "Passer en thème clair" : "Passer en thème sombre";
      btn.setAttribute("aria-label", btn.title);
    }
  }

  // appliquer au chargement
  applyTheme(getPreferredTheme());

  // écouter le système si pas de choix enregistré
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", () => {
    if (!localStorage.getItem(KEY)) applyTheme(getPreferredTheme());
  });

  // toggle
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || getPreferredTheme();
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyTheme(next);
    });
  });
})();
