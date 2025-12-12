// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Smooth scroll buttons
document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll-target");
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Modal logic
const modalOverlays = document.querySelectorAll(".modal-overlay");

function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add("active");
  }
}

function closeModal(overlay) {
  overlay.classList.remove("active");
}

// Open modal buttons
document.querySelectorAll("[data-open-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open-modal");
    openModal(id);
  });
});

// Close modal on close button
document.querySelectorAll("[data-close-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const overlay = btn.closest(".modal-overlay");
    if (overlay) closeModal(overlay);
  });
});

// Close modal when clicking outside the modal content
modalOverlays.forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal(overlay);
    }
  });
});

// Escape key to close modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalOverlays.forEach((overlay) => overlay.classList.remove("active"));
  }
});

// Student popup logic
const studentCards = document.querySelectorAll(".student-card");
const studentModal = document.getElementById("student-modal");

if (studentModal && studentCards.length > 0) {
  const nameEl = document.getElementById("student-modal-name");
  const roleEl = document.getElementById("student-modal-role");
  const batchEl = document.getElementById("student-modal-batch");

  studentCards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.getAttribute("data-name") || "Student";
      const role = card.getAttribute("data-role") || "CHNM Trainee";
      const batch = card.getAttribute("data-batch") || "Batch";

      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.textContent = role;
      if (batchEl) batchEl.textContent = batch;

      studentModal.classList.add("active");
    });
  });
}
