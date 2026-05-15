/* ===== TEMA ===== */

const themeButton = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {

  document.body.classList.add("dark");

  themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const isDark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );

  themeButton.textContent =
    isDark ? "☀️" : "🌙";
});

/* ===== COPIAR EMAIL ===== */

const copyEmailButton =
  document.querySelector("#copy-email");

copyEmailButton.addEventListener("click", async () => {

  await navigator.clipboard.writeText(
    "gmariaclaraaa@gmail.com"
  );

  copyEmailButton.textContent = "Copiado!";

  setTimeout(() => {

    copyEmailButton.textContent =
      "Copiar e-mail";

  }, 2000);
});

/* ===== ANIMAÇÕES ===== */

const sections =
  document.querySelectorAll(".section-hidden");

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add(
          "section-visible"
        );

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.2
  }
);

sections.forEach((section) => {

  observer.observe(section);
});

/* ===== TYPEWRITER ===== */

const typewriter =
  document.querySelector("#typewriter");

const phrase =
  "Criando soluções atraves da tecnologia, e transformando ideias em experiencias digitais";

let index = 0;

function typeEffect() {

  if (index < phrase.length) {

    typewriter.textContent +=
      phrase.charAt(index);

    index++;

    setTimeout(typeEffect, 60);
  }
}

typeEffect();

/* ===== TERMINAL ===== */

const terminalInput =
  document.querySelector("#terminal-input");

const terminalOutput =
  document.querySelector("#terminal-output");

terminalInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      const command =
        terminalInput.value
        .toLowerCase()
        .trim();

      if (command === "whoami") {

        terminalOutput.textContent =
          "Maria Clara — estudante de tecnologia e engenharia de computação";

      } else if (command === "skills") {

        terminalOutput.textContent =
          "HTML, CSS, JavaScript, C, GitHub";

      } else if (command === "contact") {

        terminalOutput.textContent =
          "Email: gmariaclaraaa@gmail.com";

      } else {

        terminalOutput.textContent =
          "Comando não encontrado.";
      }

      terminalInput.value = "";
    }
  }
);