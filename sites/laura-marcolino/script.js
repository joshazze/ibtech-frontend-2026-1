const ceuEstrelado = document.querySelector('.ceu-estrelado');

function criarEstrelas() {
    if (!ceuEstrelado) {
        return;
    }

    ceuEstrelado.innerHTML = "";

    const alturaPagina = document.documentElement.scrollHeight;

    ceuEstrelado.style.height = alturaPagina + "px";

    for (let i = 0; i < 90; i++) {
        const estrela = document.createElement('span');

        estrela.classList.add('estrela');

        estrela.style.left = Math.random() * 100 + '%';
        estrela.style.top = Math.random() * alturaPagina + 'px';

        estrela.style.animationDelay = Math.random() * 5 + 's';
        estrela.style.animationDuration = 3 + Math.random() * 4 + 's';

        ceuEstrelado.appendChild(estrela);
    }
}

criarEstrelas();

window.addEventListener('resize', criarEstrelas);


/* COPIAR E-MAIL */

const botaoCopiarEmail = document.querySelector('#copiar-email');
const mensagemCopiado = document.querySelector('#mensagem-copiado');

if (botaoCopiarEmail && mensagemCopiado) {
    botaoCopiarEmail.addEventListener('click', function () {
        navigator.clipboard.writeText('lauramarcolinog@gmail.com');

        mensagemCopiado.textContent = 'Email copiado!';

        setTimeout(function () {
            mensagemCopiado.textContent = '';
        }, 2000);
    });
}


/* TEMA CLARO / ESCURO */

const botaoTema = document.querySelector('#botao-tema');

function atualizarTextoBotaoTema() {
    if (!botaoTema) {
        return;
    }

    if (document.body.classList.contains('tema-escuro')) {
        botaoTema.textContent = 'Tema claro';
    } else {
        botaoTema.textContent = 'Tema escuro';
    }
}

function aplicarTemaInicial() {
    const temaSalvo = localStorage.getItem('tema');
    const sistemaPrefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaSalvo === 'escuro') {
        document.body.classList.add('tema-escuro');
    } else if (temaSalvo === 'claro') {
        document.body.classList.remove('tema-escuro');
    } else if (sistemaPrefereEscuro) {
        document.body.classList.add('tema-escuro');
    }

    atualizarTextoBotaoTema();
}

if (botaoTema) {
    aplicarTemaInicial();

    botaoTema.addEventListener('click', function () {
        document.body.classList.toggle('tema-escuro');

        if (document.body.classList.contains('tema-escuro')) {
            localStorage.setItem('tema', 'escuro');
        } else {
            localStorage.setItem('tema', 'claro');
        }

        atualizarTextoBotaoTema();
    });
}


/* ANIMAÇÃO AO ROLAR A PÁGINA */
const secoesAnimadas = document.querySelectorAll('.animar-section');

if ('IntersectionObserver' in window) {
    secoesAnimadas.forEach(function (secao) {
        secao.classList.add('animacao-pronta');
    });

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('aparecer');
            }
        });
    }, {
        threshold: 0.1
    });

    secoesAnimadas.forEach(function (secao) {
        observador.observe(secao);
    });
} else {
    secoesAnimadas.forEach(function (secao) {
        secao.classList.add('aparecer');
    });
}


/* MENU MOBILE */

const botaoMenu = document.querySelector('#botao-menu');
const menuMobile = document.querySelector('#menu-mobile');
const linksMenuMobile = document.querySelectorAll('#menu-mobile a');

if (botaoMenu && menuMobile) {
    botaoMenu.addEventListener('click', function () {
        menuMobile.classList.toggle('ativo');

        if (menuMobile.classList.contains('ativo')) {
            botaoMenu.textContent = '×';
            botaoMenu.setAttribute('aria-label', 'Fechar menu');
        } else {
            botaoMenu.textContent = '☰';
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        }
    });

    linksMenuMobile.forEach(function (link) {
        link.addEventListener('click', function () {
            menuMobile.classList.remove('ativo');
            botaoMenu.textContent = '☰';
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            menuMobile.classList.remove('ativo');
            botaoMenu.textContent = '☰';
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        }
    });

    document.addEventListener('click', function (event) {
        if (!menuMobile.classList.contains('ativo')) {
            return;
        }

        const clicouNoMenu = menuMobile.contains(event.target);
        const clicouNoBotao = botaoMenu.contains(event.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            menuMobile.classList.remove('ativo');
            botaoMenu.textContent = '☰';
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        }
    });
}
/* pra fazer que o emial copiado */
/*numero de estrelas e i e porcentagem de aparece e animacao e duracao das estrals espalha as estrelas pelo site inteiro: home, sobre, projetos, vídeo e footer.*/
/* botao tema escuro*/
/* animacoes de descer/rolagem*/
/* menu mobile de java script */
/*se o menu está aberto E o clique não foi nem dentro do menu nem no botão de abrir, fecha.-- revisao para ibtech */