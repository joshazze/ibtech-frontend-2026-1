const root = document.documentElement;
const botaoTema = document.querySelector("#botao-tema");
const botaoCopiar = document.querySelector("#botao-copiar");
const fraseApresentacao = document.querySelector("#frase-apresentacao");
const secoesAnimadas = document.querySelectorAll(".reveal");

document.body.classList.add("js-enabled");

function temaInicial() {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo) {
    return temaSalvo;
  }

  const prefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefereClaro ? "light" : "dark";
}

function aplicarTema(tema) {
  root.dataset.theme = tema;
  localStorage.setItem("tema", tema);

  if (botaoTema) {
    botaoTema.textContent = tema === "light" ? "Tema escuro" : "Tema claro";
  }
}

function alternarTema() {
  const temaAtual = root.dataset.theme;
  const novoTema = temaAtual === "light" ? "dark" : "light";
  aplicarTema(novoTema);
}

async function copiarEmail() {
  const email = botaoCopiar.dataset.email;
  const textoOriginal = "Copiar e-mail";

  try {
    await navigator.clipboard.writeText(email);
    botaoCopiar.textContent = "E-mail copiado!";
    botaoCopiar.classList.add("copiado");

    setTimeout(() => {
      botaoCopiar.textContent = textoOriginal;
      botaoCopiar.classList.remove("copiado");
    }, 2000);
  } catch {
    botaoCopiar.textContent = "Não foi possível copiar";

    setTimeout(() => {
      botaoCopiar.textContent = textoOriginal;
    }, 2000);
  }
}

function animarSecoes() {
  if (!("IntersectionObserver" in window)) {
    secoesAnimadas.forEach((secao) => {
      secao.classList.add("visivel");
    });
    return;
  }

  const observer = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.2
  });

  secoesAnimadas.forEach((secao) => {
    observer.observe(secao);
  });
}

function typewriter() {
  if (!fraseApresentacao) {
    return;
  }

  const texto = fraseApresentacao.dataset.texto;
  let indice = 0;

  fraseApresentacao.textContent = "";

  const intervalo = setInterval(() => {
    fraseApresentacao.textContent += texto[indice];
    indice += 1;

    if (indice >= texto.length) {
      clearInterval(intervalo);
    }
  }, 45);
}

aplicarTema(temaInicial());
animarSecoes();
typewriter();

if (botaoTema) {
  botaoTema.addEventListener("click", alternarTema);
}

if (botaoCopiar) {
  botaoCopiar.addEventListener("click", copiarEmail);
}
