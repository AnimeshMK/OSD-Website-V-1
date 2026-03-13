/* OffSecDiary — about.js */

/* ---- Team card flip (click + keyboard) ---- */
document.querySelectorAll(".team-card").forEach(card => {
  // Click
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  // Keyboard — Enter / Space
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("flipped");
    }
  });
});