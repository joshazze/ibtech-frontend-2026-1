const toggle = document.getElementById("toggle");

toggle.onclick = () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark")
      ? "dark"
      : "light"
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}


const btn = document.getElementById("copy-email");

const email =
  document.getElementById("email").innerText;

const feedback =
  document.getElementById("feedback");

btn.onclick = () => {

  navigator.clipboard.writeText(email);

  feedback.innerText = "Copiado!";

  setTimeout(() => {
    feedback.innerText = "";
  }, 2000);
};


const sections =
  document.querySelectorAll(".hidden");

const observer =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  });

sections.forEach(sec => observer.observe(sec));


const text =
  "Estudante dedicada com foco em tecnologia e desenvolvimento contínuo.";

let i = 0;

document.getElementById("typewriter").innerHTML = "";

function typeWriter() {

  if (i < text.length) {

    document.getElementById("typewriter").innerHTML +=
      text.charAt(i);

    i++;

    setTimeout(typeWriter, 40);
  }
}

typeWriter();