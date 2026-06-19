const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector("#nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const filterCards = document.querySelectorAll("[data-filter-region] .resource-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    filterCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const shouldShow = filter === "all" || tags.split(" ").includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => {
    window.print();
  });
});
