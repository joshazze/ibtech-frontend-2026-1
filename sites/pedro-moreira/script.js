document.addEventListener("DOMContentLoaded", () => {

  // ===== TERMINAL =====
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {

      const command = input.value.toLowerCase().trim();
      let response = "";

      if (command === "whoami") {
        response = "Pedro Moreira - Engenharia da Computação";
      } else if (command === "skills") {
        response = "HTML, CSS, C/C++, Excel, Canva";
      } else if (command === "contact") {
        response = "Email: pedrosmoreira34@gmail.com";
      } else {
        response = "Comando não reconhecido";
      }

      output.innerHTML += `<p>> ${command}</p><p>${response}</p>`;
      input.value = "";
    }
  });

  // ===== TEMA CLARO/ESCURO =====
  const toggle = document.getElementById("theme-toggle");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // muda emoji
    if (document.body.classList.contains("dark")) {
      toggle.textContent = "☀️";
    } else {
      toggle.textContent = "🌙";
    }
  });

  // ===== COPIAR EMAIL =====
  const copyBtn = document.getElementById("copy-btn");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pedrosmoreira34@gmail.com");

    copyBtn.textContent = "Copiado!";
    
    setTimeout(() => {
      copyBtn.textContent = "Copiar email";
    }, 2000);
  });

  // ===== ANIMAÇÃO COM INTERSECTION OBSERVER =====
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});
