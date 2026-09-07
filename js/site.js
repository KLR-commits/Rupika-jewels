document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const panel = document.querySelector(".mobile-panel");
  const menu = document.querySelector(".menu-btn");

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menu?.addEventListener("click", () => {
    panel?.classList.toggle("open");
    const open = panel?.classList.contains("open");
    menu.textContent = open ? "×" : "☰";
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", event => {
    const heart = event.target.closest(".heart");
    if (!heart) return;
    event.preventDefault();
    event.stopPropagation();
    heart.classList.toggle("active");
    heart.textContent = heart.classList.contains("active") ? "♥" : "♡";
  });
  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.closest(".heart")) {
      event.preventDefault();
      event.target.closest(".heart").click();
    }
  });
});