const bubbleWrap = document.querySelector(".bubble-wrap");
const items = document.querySelectorAll(".nav-item");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");

let isClickScrolling = false;
let scrollTimeout;

function moveBubble(element) {
  if (!element || !bubbleWrap || !header) return;

  const itemRect = element.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();

  const left = itemRect.left - headerRect.left;
  const width = itemRect.width;

  bubbleWrap.style.width = width + "px";
  bubbleWrap.style.transform = `translateX(${left}px)`;

  bubbleWrap.classList.remove("liquid");
  void bubbleWrap.offsetWidth;
  bubbleWrap.classList.add("liquid");
}

function setActiveItem(item) {
  if (!item) return;

  document.querySelector(".nav-item.active")?.classList.remove("active");
  item.classList.add("active");
  moveBubble(item);
}

function setActiveSection() {
  if (isClickScrolling) return;

  const viewportCenter = window.innerHeight / 2.5;
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - sectionCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  if (!closestSection) return;

  const id = closestSection.id;
  const activeLink = document.querySelector(`.navigation[href="#${id}"]`);
  const activeItem = activeLink?.closest(".nav-item");

  if (!activeItem || activeItem.classList.contains("active")) return;

  setActiveItem(activeItem);
}

items.forEach(item => {
  item.addEventListener("click", (e) => {
    const link = item.querySelector(".navigation");
    const targetId = link?.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    e.preventDefault();

    isClickScrolling = true;
    setActiveItem(item);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isClickScrolling = false;
      setActiveSection();
    }, 700);
  });
});

window.addEventListener("load", () => {
  const activeItem = document.querySelector(".nav-item.active") || items[0];
  if (activeItem) setActiveItem(activeItem);
  setActiveSection();
});

window.addEventListener("resize", () => {
  const activeItem = document.querySelector(".nav-item.active") || items[0];
  if (activeItem) moveBubble(activeItem);
  setActiveSection();
});

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);

  if (isClickScrolling) {
    scrollTimeout = setTimeout(() => {
      isClickScrolling = false;
      setActiveSection();
    }, 120);
    return;
  }

  setActiveSection();
}, { passive: true });