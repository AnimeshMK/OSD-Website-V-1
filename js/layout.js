document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");

  if (!sidebar || !toggle) return;

  /* ===============================
     SIDEBAR TOGGLE
  =============================== */
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    sidebar.classList.toggle("collapsed");
    body.classList.toggle("sidebar-open");
  });

  /* ===============================
     CLOSE ON OUTSIDE CLICK
  =============================== */
  document.addEventListener("click", (e) => {
    if (
      body.classList.contains("sidebar-open") &&
      !sidebar.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      sidebar.classList.add("collapsed");
      body.classList.remove("sidebar-open");
    }
  });

  /* ===============================
     ESC KEY CLOSE
  =============================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebar.classList.add("collapsed");
      body.classList.remove("sidebar-open");
    }
  });

  /* ===============================
     ACTIVE NAV LINK
  =============================== */
  const links = document.querySelectorAll(".sidebar-nav a");
  const current = location.pathname.split("/").pop() || "home.html";

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* ===============================
     REVEAL ANIMATIONS
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach(el => observer.observe(el));
  }
});

/* ================= AUTH MODAL ================= */
const authOverlay = document.getElementById("authOverlay");
const authOpenBtn = document.getElementById("authOpenBtn");
const authClose = document.getElementById("authClose");

if (authOpenBtn && authOverlay) {
  authOpenBtn.addEventListener("click", () => {
    authOverlay.classList.add("active");
  });
}

if (authClose) {
  authClose.addEventListener("click", () => {
    authOverlay.classList.remove("active");
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && authOverlay?.classList.contains("active")) {
    authOverlay.classList.remove("active");
  }
});

authOverlay?.addEventListener("click", e => {
  if (e.target === authOverlay) {
    authOverlay.classList.remove("active");
  }
});

/* Tab switch */
document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "Form").classList.add("active");
  });
});
