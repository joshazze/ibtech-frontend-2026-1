# Revisão — Projeto 01 (Cartão de Visita) · Vitor Batista

**Status: reentrega necessária**

Oi, Vitor! Primeiro: que projeto bonito. O conceito de **livro interativo** —
com virada de página em 3D, lombada, pilha de páginas na borda e a capa em
pixel art — é criativo, está muito bem executado e mostra domínio real de CSS
(`transform`, `perspective`, `backface-visibility`) e de JavaScript (a lógica
de `z-index` e o controle de animação no `script.js` são bem pensados). Isso
é talento, e não é pra você jogar fora.

A questão é outra: o Projeto 01 é avaliado contra uma **lista de requisitos
específicos** (a tabela da seção 7 da diretriz), e a sua entrega — por ter ido
atrás de um conceito autoral — acabou deixando vários desses requisitos de
fora. Não é que o seu projeto seja "pior"; é que ele responde a um briefing
diferente do que foi pedido. A boa notícia: **o formato livro comporta todos
os requisitos** — cada página do livro pode abrigar um deles. O desafio da
reentrega é encaixar a diretriz *dentro* do seu conceito, sem matar a ideia.
Vamos por partes.

---

## O que já está bom

- **Conceito autoral forte** — a metáfora do livro organiza o conteúdo com
  ritmo e intenção. Fugir do scroll vertical genérico foi uma escolha corajosa
  e bem defendida no README.
- **CSS 3D de verdade** — `perspective`, `transform-style: preserve-3d`,
  `rotateY`, `backface-visibility`, `cubic-bezier` na transição. A profundidade
  do livro (lombada, `::before`/`::after`) é toda em CSS, sem imagens. Isso é
  nível avançado.
- **JavaScript bem estruturado** — o controle de `z-index` por página, a trava
  `animating` pra impedir cliques durante a transição, o `wheelCooldown`. É
  código pensado, não copiado às pressas.
- **Navegação rica** — botões, dots indicadores sincronizados e swipe por
  trackpad **e** por toque. Mais do que o esperado.
- **Variáveis CSS e fontes** — o `:root` tem paleta, fontes e dimensões do
  livro bem organizadas; os links externos têm `rel="noopener noreferrer"`.
- **README excelente** — descreve o conceito, as decisões de projeto e como
  rodar. Um dos melhores READMEs da turma.

---

## Bloqueadores (requisitos da diretriz que precisam entrar)

A ideia aqui **não é descaracterizar o livro** — é distribuir os requisitos
pelas páginas dele.

### 1. HTML sem tags semânticas e sem `<h1>`

A página inteira é construída com `<div>` e `<span>`. A diretriz pede HTML
**semântico**: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` e um
`<h1>` único. Tags semânticas não mudam a aparência — elas dizem ao navegador
e aos leitores de tela o que cada bloco *significa*. Hoje, pra quem usa leitor
de tela, sua página é uma sopa de divs sem títulos.

O mapeamento pro seu livro é quase direto:

```html
<main class="scene">
  <article class="book" id="book">

    <!-- a capa vira o cabeçalho, com o h1 -->
    <header class="page" id="p1">
      <div class="face front cover-face">
        <span class="cover-edition">Cartão de Visita</span>
        <h1 class="cover-name"><span>Vitor</span> <em>Batista</em></h1>
        ...
      </div>
    </header>

    <!-- cada página interna vira uma section -->
    <section class="page" id="p2"> ... </section>
    <section class="page" id="p3"> ... </section>
    ...
  </article>

  <!-- os controles viram nav -->
  <nav class="controls" aria-label="Navegação do livro"> ... </nav>
</main>
```

Os `<span class="page-label">` ("Sobre", "Formação"...) podem virar `<h2>` —
assim cada página tem um título de verdade na hierarquia.

### 2. Falta toda a mídia — 3+ fotos e 1 vídeo

A diretriz pede **3 ou mais fotos e 1 vídeo embedado**. O projeto não tem
nenhuma imagem nem vídeo (tudo é CSS). O conceito do livro abre espaço perfeito
pra isso: **crie uma página "Mídia"** (você já tem 8 páginas — uma a nona, ou
reaproveite uma) com 3 fotos suas e um vídeo:

```html
<section class="page" id="p-midia">
  <div class="face front">
    <div class="page-inner">
      <h2 class="page-label">Mídia</h2>
      <img src="assets/foto-1.jpg" alt="Vitor trabalhando como lifeguard nos EUA">
      <img src="assets/foto-2.jpg" alt="Vitor no canteiro de obras da FS Protensão">
      <img src="assets/foto-3.jpg" alt="Vitor em Belo Horizonte">
      <iframe
        src="https://www.youtube.com/embed/SEU_VIDEO_ID"
        title="Vídeo de apresentação"
        allowfullscreen></iframe>
    </div>
  </div>
</section>
```

Crie também a pasta **`assets/`** (a diretriz a inclui na estrutura mínima) e
guarde as imagens lá. Sem autoplay com áudio no vídeo.

### 3. Sistema tipográfico — nenhum tamanho de fonte como variável

Seu `:root` tem variáveis de **família** de fonte (`--font-pixel`,
`--font-display`, `--font-body`) — ótimo —, mas **nenhuma de tamanho**. A
diretriz pede **4+ tamanhos de fonte declarados como variáveis e usados**.
Hoje os tamanhos estão chumbados em dezenas de lugares (`0.35rem`, `1.55rem`,
`0.92rem`, `1.6rem`, `0.65rem`...).

Declare uma escala e aplique-a:

```css
:root {
  /* ... */
  --fs-xs:   0.65rem;  /* labels, número de página */
  --fs-sm:   0.78rem;  /* textos auxiliares */
  --fs-base: 0.92rem;  /* corpo de texto */
  --fs-lg:   1.6rem;   /* títulos / contato */
}
```

Depois troque os valores fixos pelo `var(...)` — ex: `.body-text` recebe
`font-size: var(--fs-base)`, `.page-label` recebe `var(--fs-xs)`, etc.

### 4. Falta o tema claro/escuro

A diretriz pede um **toggle de tema claro/escuro**, com a escolha salva em
`localStorage` e respeitando `prefers-color-scheme` na primeira visita. O
projeto não tem isso. O interior das páginas já é claro (`--page-bg`) e a cena
é escura — você pode criar uma versão "noturna" do livro. Adicione um botão
nos controles:

```html
<button id="theme-toggle" class="nav-btn" aria-label="Alternar tema">◐</button>
```

```js
const html = document.documentElement;
function aplicarTema(tema) {
  html.setAttribute("data-theme", tema);
  localStorage.setItem("tema", tema);
}
const salvo = localStorage.getItem("tema");
if (salvo) aplicarTema(salvo);
else if (window.matchMedia("(prefers-color-scheme: light)").matches) aplicarTema("light");

document.getElementById("theme-toggle").addEventListener("click", () => {
  aplicarTema(html.getAttribute("data-theme") === "light" ? "dark" : "light");
});
```

E no CSS, declare as variáveis alternativas em `[data-theme="..."]` (o mesmo
padrão que você já usa pras outras variáveis).

### 5. Falta o "copiar e-mail" com a Clipboard API

A diretriz pede um botão que **copie o e-mail** pra área de transferência, com
feedback visual de ~2s. Hoje a página de Contato (`index.html:23`) usa só um
link `mailto:`. Transforme o item de e-mail num botão de copiar:

```html
<button type="button" class="contact-item" id="btn-email"
        data-email="vitorbatistadc@gmail.com">
  E-mail <span id="email-feedback">copiar ↗</span>
</button>
```

```js
const btnEmail = document.getElementById("btn-email");
const fb = document.getElementById("email-feedback");
btnEmail.addEventListener("click", async () => {
  await navigator.clipboard.writeText(btnEmail.dataset.email);
  fb.textContent = "copiado! ✓";
  setTimeout(() => { fb.textContent = "copiar ↗"; }, 2000);
});
```

### 6. Falta a animação de entrada com `IntersectionObserver`

A diretriz pede uma **animação de entrada** feita com `IntersectionObserver`.
Esse requisito normalmente serve pra páginas que rolam — e o seu livro não
rola, então ele não se encaixa de forma óbvia. Uma adaptação possível: observar
o conteúdo das páginas pra que ele apareça com um *fade/slide* — por exemplo, no
carregamento (primeira página) e quando uma página é virada.

```css
.page-inner > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.page-inner > *.revelado {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const revelador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("revelado");
      revelador.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".page-inner > *").forEach((el) => revelador.observe(el));
```

> Como esse requisito assume uma página que rola, vale você **alinhar com a
> Diretoria Técnica** a melhor forma de cumpri-lo dentro do conceito de livro —
> a adaptação acima é um caminho, mas pode haver outro que combine melhor.

### 7. Responsividade — apenas 1 breakpoint

O CSS tem uma única `@media query` — `@media (max-width: 480px)`
(`style.css:446`). A diretriz pede **pelo menos 2 breakpoints**, funcionando de
360px a 1920px. O livro tem tamanho fixo (`--book-w`/`--book-h`), então o
ajuste é justamente escalar essas dimensões em mais de uma faixa. Adicione um
breakpoint intermediário (e confira o de 360px):

```css
@media (max-width: 768px) {
  :root { --book-w: 340px; --book-h: 450px; }
}
@media (max-width: 360px) {
  :root { --book-w: 290px; --book-h: 390px; }
  .cover-name { font-size: 1rem; }
}
```

---

## Pontos menores (polimento)

- **`width:` inline nas barras de idioma** — `index.html:72, 79, 86` usam
  `style="width:90%"`. Como o valor é um dado (o nível do idioma), tudo bem ser
  inline; mas se quiser, dá pra mover pra uma classe ou `data-attribute`.
- **Botões `‹` e `›` sem rótulo acessível** — adicione `aria-label="Página
  anterior"` e `aria-label="Próxima página"` aos `.nav-btn` (`index.html:195,
  206`); pra leitor de tela, hoje são botões mudos.
- **Nome do repositório fora do padrão** — o repo se chama
  `meu-cartao-de-visita`; a diretriz sugere `ibtech-projeto01-<seu-nome>`.
- **`<script src="script.js">` sem `defer`** — está no fim do `<body>`, então
  funciona; mas `defer` é o hábito recomendado.

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Trocar `div`/`span` estruturais por tags semânticas + `<h1>` e `<h2>` (item 1)
2. [ ] Criar a pasta `assets/` e a página "Mídia" com 3 fotos + vídeo (item 2)
3. [ ] Criar a escala tipográfica no `:root` e aplicá-la (item 3)
4. [ ] Implementar o tema claro/escuro com `localStorage` + `prefers-color-scheme` (item 4)
5. [ ] Implementar o "copiar e-mail" com a Clipboard API (item 5)
6. [ ] Implementar a animação de entrada com `IntersectionObserver` (item 6)
7. [ ] Adicionar um 2º breakpoint de responsividade (item 7)
8. [ ] `aria-label` nos botões de navegação e demais polimentos

---

## Considerações finais

Vitor, leia isto com calma: a lista acima é grande, mas **não é uma crítica ao
seu projeto** — é a distância entre o que você construiu e a checklist
específica que o Projeto 01 cobra. Você não fez "pouco"; você fez *outra
coisa*, e fez muito bem. A reentrega não pede que você recomece — pede que
você **encaixe os requisitos da diretriz no livro que já existe**. Cada página
do seu livro é um lugar natural pra um requisito: uma vira a "Mídia", o Contato
ganha o botão de copiar, os controles ganham o toggle de tema. O esqueleto
permanece; você só preenche os espaços.

Comece pelo que é puramente mecânico e rápido — semântica (item 1), escala
tipográfica (item 3), `aria-label` — e deixe a mídia e os comportamentos de JS
pro fim. Teste cada passo no **DevTools** (F12), e use o modo dispositivo pra
checar a responsividade.

Sobre o item 6 (IntersectionObserver): como ele não casa naturalmente com um
livro que não rola, **converse com a Diretoria Técnica** sobre a melhor forma
de cumpri-lo — não deixe esse ponto te travar.

O conceito é ótimo e a execução técnica é forte. A reentrega é sobre alinhar o
seu talento com o que a tarefa pediu — e isso é totalmente alcançável. 🚀

---
*Revisão da Diretoria Técnica — IbTech Trilha Frontend 2026.1 · 2026-05-18*
