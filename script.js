
const slides = document.querySelectorAll(".slide");
const navLinks = document.querySelectorAll(".nav-link");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");

function showSlide(id) {
  const selected = document.getElementById(id);
  const validSlide = selected && selected.classList.contains("slide");
  const slideId = validSlide ? id : "home";

  slides.forEach((slide) => {
    slide.classList.toggle("active", slide.id === slideId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + slideId);
  });

  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
  window.scrollTo(0, 0);
}

function navigateTo(id) {
  history.pushState(null, "", "#" + id);
  showSlide(id);
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => navigateTo(button.dataset.go));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(link.getAttribute("href").slice(1));
  });
});

document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    if (document.getElementById(id)?.classList.contains("slide")) {
      event.preventDefault();
      navigateTo(id);
    }
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

window.addEventListener("popstate", () => {
  showSlide(location.hash.slice(1) || "home");
});

document.getElementById("year").textContent = new Date().getFullYear();
showSlide(location.hash.slice(1) || "home");
