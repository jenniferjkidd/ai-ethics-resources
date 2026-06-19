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

document.querySelectorAll("[data-tabs]").forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll('[role="tab"]')];
  const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.setAttribute("aria-selected", "false"));
      panels.forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove("is-active");
      });

      const panel = tabs.querySelector(`#${button.getAttribute("aria-controls")}`);
      button.setAttribute("aria-selected", "true");
      if (panel) {
        panel.hidden = false;
        panel.classList.add("is-active");
      }
    });
  });
});

const toast = document.querySelector(".toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const template = document.querySelector(button.getAttribute("data-copy"));
    const text = template?.innerHTML?.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Prompt copied");
    } catch {
      showToast("Copy unavailable");
    }
  });
});

const textQueries = document.querySelector("#textQueries");
const imageQueries = document.querySelector("#imageQueries");
const usageResult = document.querySelector("#usageResult");

function updateUsageReflection() {
  if (!textQueries || !imageQueries || !usageResult) return;

  const text = Math.max(0, Number(textQueries.value || 0));
  const images = Math.max(0, Number(imageQueries.value || 0));
  const weeklyWh = text * 0.4 + images * 30;
  const yearlyKwh = (weeklyWh * 52) / 1000;

  usageResult.value = `Estimated conversation starter: about ${weeklyWh.toFixed(1)} Wh per week, or ${yearlyKwh.toFixed(2)} kWh per year. Discuss what this estimate leaves out.`;
}

[textQueries, imageQueries].forEach((input) => {
  input?.addEventListener("input", updateUsageReflection);
});

updateUsageReflection();
