const botao = document.getElementById('toggle-tema');

if (localStorage.getItem('tema') === 'claro') {
    document.body.classList.add('tema-claro');
    botao.textContent = '🌑';
}

botao.addEventListener('click', function() {
    document.body.classList.toggle('tema-claro');

    if (document.body.classList.contains('tema-claro')) {
        localStorage.setItem('tema', 'claro');
        botao.textContent = '🌑';
    } else {
        localStorage.setItem('tema', 'escuro');
        botao.textContent = '🌙';
    }
});
const botaoCopiar = document.getElementById('copiar-email');

botaoCopiar.addEventListener('click', function() {
    navigator.clipboard.writeText('gabrielscarpat@icloud.com');
    
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const textoFinal = 'Copiado! ✅';
    let iteracoes = 0;
    
    const intervalo = setInterval(function() {
        botaoCopiar.textContent = textoFinal
            .split('')
            .map(function(letra, index) {
                if (index < iteracoes) return letra;
                return letras[Math.floor(Math.random() * letras.length)];
            })
            .join('');
        
        iteracoes++;
        
        if (iteracoes > textoFinal.length) {
            clearInterval(intervalo);
        }
    }, 60);

    setTimeout(function() {
        botaoCopiar.textContent = 'Copiar email';
    }, 2000);
});

const secoes = document.querySelectorAll('.secao-escondida');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('secao-visivel');
        }
    });
});

secoes.forEach(function(secao) {
    observer.observe(secao);
});

const subtitulo = document.getElementById('subtitulo');
const texto = 'Integrante do IBTECH';
let i = 0;

subtitulo.textContent = '|';

const typewriter = setInterval(function() {
    subtitulo.textContent = texto.slice(0, i) + '|';
    i++;
    
    if (i > texto.length) {
        clearInterval(typewriter);
        
        setInterval(function() {
            if (subtitulo.textContent.endsWith('|')) {
                subtitulo.textContent = texto;
            } else {
                subtitulo.textContent = texto + '|';
            }
        }, 500);
    }
}, 100);

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('aberto');
});

const secoesNav = document.querySelectorAll('section');

const observerNav = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            if (entry.target.id === 'sobre' || entry.target.id === 'contato') {
                nav.style.backgroundColor = 'var(--cor-fundo)';
            } else {
                nav.style.backgroundColor = 'var(--cor-fundo-secundario)';
            }
        }
    });
}, { threshold: 0.5 });

secoesNav.forEach(function(secao) {
    observerNav.observe(secao);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        nav.classList.remove('aberto');
    }
});

document.addEventListener('click', function(event) {
    if (
        nav.classList.contains('aberto') &&
        !nav.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        nav.classList.remove('aberto');
    }
});