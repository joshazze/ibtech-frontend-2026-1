const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const flipCard = document.querySelector(".flip-card");
const revealElements = document.querySelectorAll(".reveal");
const root = document.documentElement;

function setTheme(theme) {
  const isLightTheme = theme === "light";

  root.classList.toggle("light-theme", isLightTheme);
  document.body.classList.toggle("light-theme", isLightTheme);
  themeToggle.textContent = isLightTheme ? "☾" : "☀";
  themeToggle.setAttribute(
    "aria-label",
    isLightTheme ? "Ativar tema escuro" : "Ativar tema claro"
  );
}

function loadInitialTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}

function closeMobileMenu() {
  navLinksContainer.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

loadInitialTheme();

// Abre e fecha o menu em telas menores.
menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navLinksContainer.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Fecha o menu mobile ao escolher uma seção.
navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Fecha o menu mobile ao clicar fora ou apertar Esc.
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinksContainer.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

// Marca automaticamente o link da seção visível na tela.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentId}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));

// Mostra elementos com fade e slide quando entram na tela.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Vira o cartão do hero com clique ou teclado.
function toggleFlipCard() {
  flipCard.classList.toggle("is-flipped");
  const isFlipped = flipCard.classList.contains("is-flipped");
  flipCard.setAttribute("aria-pressed", isFlipped);
}

flipCard.addEventListener("click", toggleFlipCard);

flipCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleFlipCard();
  }
});

flipCard.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => event.stopPropagation());
});


// Alterna entre tema escuro e tema claro.
themeToggle.addEventListener("click", () => {
  const nextTheme = root.classList.contains("light-theme") ? "dark" : "light";

  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});
