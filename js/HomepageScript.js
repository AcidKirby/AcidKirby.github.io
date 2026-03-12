const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => revealObserver.observe(el));

const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.querySelector(".modal-backdrop");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalImage = document.getElementById("modalImage");
const modalDemo = document.getElementById("modalDemo");
const modalCode = document.getElementById("modalCode");

function openModal(card) {
  modalTitle.textContent = card.dataset.title || "";
  modalDescription.textContent = card.dataset.description || "";
  modalTech.textContent = card.dataset.tech || "";
  modalImage.src = card.dataset.image || "";
  modalImage.alt = card.dataset.title || "Project preview";
  modalDemo.href = card.dataset.demo || "#";
  modalCode.href = card.dataset.code || "#";

  if (card.dataset.code && card.dataset.code !== "#") {
  modalCode.href = card.dataset.code;
  modalCode.textContent = "View Code";
  modalCode.style.pointerEvents = "auto";
  modalCode.style.opacity = "1";
} else {
  modalCode.href = "#";
  modalCode.textContent = "Code Not Available";
  modalCode.style.pointerEvents = "none";
  modalCode.style.opacity = "0.6";
}

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

projectCards.forEach(card => {
  card.addEventListener("click", () => openModal(card));
  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(card);
    }
  });
  card.setAttribute("tabindex", "0");
});



modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

