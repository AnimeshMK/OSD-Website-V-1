/* OffSecDiary — events.js */

const cards    = document.querySelectorAll(".event-card");
const overlay  = document.getElementById("eventOverlay");
const closeBtn = document.getElementById("eventClose");
const empty    = document.getElementById("eventsEmpty");

const modalTitle    = document.getElementById("modalTitle");
const modalDate     = document.getElementById("modalDate");
const modalDeadline = document.getElementById("modalDeadline");
const modalDesc     = document.getElementById("modalDescription");
const modalImg      = document.getElementById("modalImage");
const modalRegister = document.getElementById("modalRegister");
const modalStatus   = document.getElementById("modalStatus");

/* ---- Filter ---- */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    let visible = 0;

    cards.forEach(card => {
      const match = filter === "all" || card.dataset.status === filter;
      card.classList.toggle("hidden", !match);
      if (match) visible++;
    });

    empty && (empty.style.display = visible === 0 ? "flex" : "none");
  });
});

/* ---- Modal open ---- */
cards.forEach(card => {
  card.addEventListener("click", () => {
    const status = card.dataset.status || "";

    modalImg.src           = card.dataset.image || "";
    modalImg.alt           = card.dataset.title || "";
    modalTitle.textContent = card.dataset.title || "";
    modalDate.textContent  = "DATE: " + (card.dataset.date || "—");
    modalDeadline.textContent = "REGISTRATION: " + (card.dataset.deadline || "—");
    modalDesc.textContent  = (card.dataset.description || "").trim();
    modalRegister.href     = card.dataset.register || "#";

    // Status badge
    if (modalStatus) {
      modalStatus.textContent = status.toUpperCase();
      modalStatus.className   = "modal-status-tag";
      if (status === "upcoming") {
        modalStatus.style.color       = "#22c55e";
        modalStatus.style.borderColor = "rgba(34,197,94,0.3)";
        modalStatus.style.background  = "rgba(34,197,94,0.05)";
      } else {
        modalStatus.style.color       = "";
        modalStatus.style.borderColor = "";
        modalStatus.style.background  = "";
      }
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

/* ---- Modal close ---- */
function closeModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

closeBtn && closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});