/* OffSecDiary — enquiry.js */

const FORM_URL = "https://script.google.com/macros/s/AKfycbxeVx5AwvyL0JSRnfuoQgg0ciI1yf5kRp3pqa7ZgQs5phc4XCTOHm8nE5mSt8rt-98K/exec";

/* ---- Populate hidden metadata fields ---- */
document.addEventListener("DOMContentLoaded", () => {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  set("timestamp", new Date().toISOString());
  set("timezone",  Intl.DateTimeFormat().resolvedOptions().timeZone);
  set("page_url",  window.location.href);
  set("user_agent", navigator.userAgent);
  set("referrer",  document.referrer);
});

/* ---- Form submission ---- */
const form    = document.getElementById("enquiryForm");
const popup   = document.getElementById("successPopup");
const closeBtn = document.getElementById("closeSuccess");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector(".enq-submit");
    if (btn) {
      btn.disabled = true;
      const inner = btn.querySelector(".btn-inner");
      if (inner) inner.textContent = "TRANSMITTING...";
    }

    fetch(FORM_URL, {
      method: "POST",
      body: new FormData(this),
    })
      .then(() => {
        this.reset();
        popup && popup.classList.add("active");
        document.body.style.overflow = "hidden";
      })
      .catch(() => {
        alert("Error submitting enquiry. Please try again.");
      })
      .finally(() => {
        if (btn) {
          btn.disabled = false;
          const inner = btn.querySelector(".btn-inner");
          if (inner) {
            inner.innerHTML =
              '<span class="btn-icon-left">⬡</span> INITIATE TRANSMISSION <span class="btn-arrow">→</span>';
          }
        }
      });
  });
}

/* ---- Close success popup ---- */
function closePopup() {
  popup && popup.classList.remove("active");
  document.body.style.overflow = "";
}

closeBtn && closeBtn.addEventListener("click", closePopup);
popup && popup.addEventListener("click", e => {
  if (e.target === popup) closePopup();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePopup();
});

/* ---- FAQ accordion ---- */
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const isOpen   = btn.getAttribute("aria-expanded") === "true";
    const answer   = btn.nextElementSibling;
    const allBtns  = document.querySelectorAll(".faq-q");

    // Close all
    allBtns.forEach(b => {
      b.setAttribute("aria-expanded", "false");
      const a = b.nextElementSibling;
      if (a) a.classList.remove("open");
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      answer && answer.classList.add("open");
    }
  });
});