(function () {
  var root = document.documentElement;
  var storageKey = "victor-theme";
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-theme-trigger]"));
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(".hero-copy, .hero-panel, .panel, .showcase-card, .card, .feature-card, .news-item, .timeline-item")
  );

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    triggers.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-theme") === theme);
    });
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  setTheme(savedTheme || root.getAttribute("data-theme") || "amber");

  triggers.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.getAttribute("data-theme"));
    });
  });

  if (!("IntersectionObserver" in window)) {
    return;
  }

  revealTargets.forEach(function (element) {
    element.classList.add("reveal");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach(function (element) {
    observer.observe(element);
  });
})();
