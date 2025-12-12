// Theme toggle with localStorage
const htmlEl = document.documentElement;
const modeToggle = document.getElementById("mode-toggle");

function setTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("iti-theme", theme);
  } catch (e) {}
}

(function initTheme() {
  try {
    const saved = localStorage.getItem("iti-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      setTheme("dark");
    }
  } catch (e) {
    setTheme("dark");
  }
})();

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
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

// Active nav link on scroll
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(document.querySelectorAll("section"));

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 120; // offset for header
  let currentId = "";
  for (const section of sections) {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentId = section.id;
      break;
    }
  }
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.startsWith("#") ? href.slice(1) : "";
    link.classList.toggle("active", id === currentId);
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
  if (overlay) overlay.classList.add("active");
}

function closeModal(overlay) {
  overlay.classList.remove("active");
}

document.querySelectorAll("[data-open-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open-modal");
    if (id) openModal(id);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const overlay = btn.closest(".modal-overlay");
    if (overlay) closeModal(overlay);
  });
});

modalOverlays.forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

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
  const summaryEl = document.getElementById("student-modal-summary");

  studentCards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.getAttribute("data-name") || "Student";
      const role = card.getAttribute("data-role") || "CHNM Trainee";
      const batch = card.getAttribute("data-batch") || "2025–2026";
      const summary = card.getAttribute("data-summary") ||
        "This trainee is part of the CHNM trade for batch 2025–2026 and is active in lab work.";

      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.textContent = role;
      if (batchEl) batchEl.textContent = batch;
      if (summaryEl) summaryEl.textContent = summary;

      studentModal.classList.add("active");
    });
  });
}

// Help form copy
const helpForm = document.getElementById("help-form");
const copyBtn = document.getElementById("copy-help");
const copyStatus = document.getElementById("copy-status");

if (helpForm && copyBtn && copyStatus) {
  copyBtn.addEventListener("click", async () => {
    const trade = helpForm.trade.value || "Not specified";
    const issueType = helpForm.issueType.value || "Not specified";
    const issueDetail = helpForm.issueDetail.value.trim() || "No description provided";

    const textToCopy =
      `ITI Trade: ${trade}\n` +
      `Problem type: ${issueType}\n` +
      `Issue detail: ${issueDetail}\n\n` +
      `Send this to: aesthetic@outlook.in`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copyStatus.textContent = "Details copied. Paste them into an email to aesthetic@outlook.in";
      copyStatus.style.color = "#22c55e";
    } catch (e) {
      copyStatus.textContent = "Unable to copy automatically. Please select and copy manually.";
      copyStatus.style.color = "#f97373";
    }

    setTimeout(() => {
      copyStatus.textContent = "";
    }, 4000);
  });
}

// AOS init (scroll animations)
AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: "ease-out-cubic"
});
