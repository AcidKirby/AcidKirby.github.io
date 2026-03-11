const bubbleWrap = document.querySelector(".bubble-wrap");
const items = document.querySelectorAll(".nav-item");
const header = document.querySelector(".header");

function moveBubble(element) {
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

items.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".nav-item.active")?.classList.remove("active");
    item.classList.add("active");
    moveBubble(item);
  });
});

window.addEventListener("load", () => {
  const activeItem = document.querySelector(".nav-item.active") || items[0];
  activeItem.classList.add("active");
  moveBubble(activeItem);
});

window.addEventListener("resize", () => {
  const activeItem = document.querySelector(".nav-item.active") || items[0];
  moveBubble(activeItem);
});