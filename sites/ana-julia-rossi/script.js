// script.js

// COPIAR E-MAIL

const email = document.getElementById("email");

const feedback = document.getElementById("email-feedback");

email.addEventListener("click", async (evento) => {

    evento.preventDefault();

    try{

        await navigator.clipboard.writeText(email.dataset.email);

        feedback.textContent = "E-mail copiado! ✓";

    }

    catch{

        feedback.textContent = "Não foi possível copiar.";

    }

    setTimeout(() => {

        feedback.textContent = "";

    }, 2000);

});

// MODO ESCURO

const botaoTema = document.getElementById("tema-btn");

const temaSalvo = localStorage.getItem("tema");

const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(
    temaSalvo === "escuro" ||
    (temaSalvo === null && sistemaEscuro)
){
    document.body.classList.add("dark");
}

atualizarIcone();

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema", "escuro");

    }

    else{

        localStorage.setItem("tema", "claro");

    }

    atualizarIcone();

});

function atualizarIcone(){

    if(document.body.classList.contains("dark")){

        botaoTema.innerHTML = "☀️";

    }

    else{

        botaoTema.innerHTML = "🌙";

    }
}

// ANIMAÇÃO AO ENTRAR NA TELA

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if(entrada.isIntersecting){

            entrada.target.classList.add("aparece");

            observador.unobserve(entrada.target);

        }

    });

}, { threshold: 0.15 });

document.querySelectorAll(".animar").forEach((elemento) => {

    observador.observe(elemento);

});

const topoBtn = document.getElementById("topo-btn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topoBtn.classList.add("mostrar");

    }

    else{

        topoBtn.classList.remove("mostrar");

    }

});

topoBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});