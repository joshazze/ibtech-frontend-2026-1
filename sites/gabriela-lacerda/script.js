/* botão do tema */

const themeToggle = document.getElementById('theme-toggle');

/* troca o tema */

themeToggle.addEventListener('click', () => {

  // adiciona ou remove o tema claro
  document.body.classList.toggle('light-theme');

  // salva o tema escolhido
  const tema = document.body.classList.contains('light-theme') ? 'light' : 'dark';

  localStorage.setItem('theme', tema);
});

/* verifica o tema ao abrir a página */

window.addEventListener('DOMContentLoaded', () => {

  // pega o tema salvo
  const temaSalvo = localStorage.getItem('theme');

  if (temaSalvo) {

    // aplica o tema salvo
    if (temaSalvo === 'light') {
      document.body.classList.add('light-theme');
    }

  } else {

    // detecta o tema do computador
    const sistemaUsaClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (sistemaUsaClaro) {
      document.body.classList.add('light-theme');
    }
  }
});

/* botão de copiar email */

const btnEmail = document.getElementById('emailBtn');

// guarda o conteúdo original
const htmlOriginal = btnEmail.innerHTML;

btnEmail.addEventListener('click', () => {

  // copia o email
  navigator.clipboard.writeText('gabicalacerda@gmail.com');

  // mostra mensagem de copiado
  btnEmail.innerHTML = `
    <span class="clink-lbl">status</span>
    <span class="clink-val">copiado ✓</span>
  `;

  // volta ao normal depois de 2 segundos
  setTimeout(() => {
    btnEmail.innerHTML = htmlOriginal;
  }, 2000);
});

/* animação quando aparece na tela */

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      // adiciona a animação
      entry.target.classList.add('visible');

      // para de observar depois
      observer.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.12
});

// aplica em todos os elementos
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* efeito de luz acompanhando o mouse */

document.addEventListener('mousemove', (e) => {

  // salva a posição do mouse
  document.documentElement.style.setProperty('--x', e.clientX + 'px');

  document.documentElement.style.setProperty('--y', e.clientY + 'px');
});

/* efeito digitando */

const texto = 'Ciência de Dados & Inteligência Artificial';

const elementoTypewriter = document.getElementById('typewriter');

let indice = 0;

// função que escreve letra por letra
function typeWriter() {

  if (indice < texto.length) {

    // adiciona uma letra
    elementoTypewriter.textContent += texto.charAt(indice);

    indice++;

    // chama de novo depois de 40ms
    setTimeout(typeWriter, 40);
  }
}

// limpa o texto antes de começar
elementoTypewriter.textContent = '';

// inicia o efeito
typeWriter();