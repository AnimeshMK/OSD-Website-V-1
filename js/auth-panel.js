document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("authOpenBtn");

  function initAuthPanel() {
    const overlay = document.getElementById("authOverlay");
    if (!overlay) return;

    const closeBtn = overlay.querySelector("#authClose");
    const tabs = overlay.querySelectorAll(".auth-tab");
    const forms = overlay.querySelectorAll(".auth-form");

    // Open
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        overlay.classList.add("active");
      });
    }

    // Close
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
    });

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        forms.forEach(f => f.classList.remove("active"));

        tab.classList.add("active");
        const target = tab.dataset.tab;
        document.getElementById(target + "Form").classList.add("active");
      });
    });
  }

  // wait for modal HTML injection
  const observer = new MutationObserver(() => {
    if (document.getElementById("authOverlay")) {
      initAuthPanel();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
