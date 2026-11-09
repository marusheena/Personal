// Custom JS

const CASE_SCROLL_KEY = "portfolio-home-scroll";

const storeHomeScroll = () => {
  sessionStorage.setItem(CASE_SCROLL_KEY, String(window.scrollY));
};

const restoreHomeScroll = () => {
  const savedScroll = sessionStorage.getItem(CASE_SCROLL_KEY);
  if (!savedScroll) return;

  sessionStorage.removeItem(CASE_SCROLL_KEY);
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: Number(savedScroll), left: 0, behavior: "auto" });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = Boolean(document.querySelector(".success-cases-grid"));

  if (isHomePage) {
    restoreHomeScroll();

    document.querySelectorAll(".success-cases-card").forEach((link) => {
      link.addEventListener("click", () => {
        storeHomeScroll();
      });
    });
  }
});

const heroImage = document.querySelector(".hero .image_container img");

if (heroImage) {
  const reveal = () => heroImage.classList.add("is-loaded");
  const revealDecoded = () => {
    const decoded = heroImage.decode ? heroImage.decode() : Promise.resolve();
    decoded.catch(() => {}).then(reveal);
  };

  if (heroImage.complete) {
    if (heroImage.naturalWidth) {
      revealDecoded();
    } else {
      reveal();
    }
  } else {
    heroImage.addEventListener("load", revealDecoded, { once: true });
    heroImage.addEventListener("error", reveal, { once: true });
  }
}
