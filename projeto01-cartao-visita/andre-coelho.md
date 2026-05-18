# Revisão — Projeto 01 (Cartão de Visita) · André Coelho

**Status: reentrega necessária**

Oi, André! Obrigado pela entrega. Antes de tudo: o que você já montou tem uma
base visual limpa e agradável — o tema escuro, os cards arredondados e a grade
de três fotos estão bem resolvidos. O problema não é o que está aqui, é o que
ainda falta: o projeto entregou a parte de **HTML e CSS**, mas a parte de
**JavaScript** (que vale boa parte da nota) ainda não foi feita, e alguns
requisitos de CSS e estrutura também ficaram de fora. Nada disso é difícil de
recuperar — este feedback é um mapa item por item pra você fechar a reentrega
com tranquilidade. Bora?

---

## O que já está bom

- **HTML legível e organizado** — você usou `<header>`, `<main>` e `<section>`,
  tem um `<h1>` único e a indentação está limpa. É uma boa fundação.
- **Identidade visual coerente** — paleta escura consistente, cards com
  `border-radius` e borda sutil; o resultado parece intencional, não aleatório.
- **Grade de fotos** — a `imagens-grid` com `display: grid` e o efeito de
  `scale` no `:hover` mostram que você já entende Grid e transições.
- **Conteúdo bem escrito** — os textos de "Sobre Mim", "Foco Atual" e
  "Achievements" estão claros e dizem quem você é. Conteúdo é metade do cartão.

---

## O que falta adicionar (bloqueadores)

Estes são os itens que, faltando, levam à reentrega. Estão em ordem sugerida
de execução — do mais estrutural ao mais pontual.

### 1. Não existe `script.js` — os 3 comportamentos obrigatórios de JS faltam

O projeto não tem nenhum arquivo JavaScript. A diretriz pede **três
comportamentos obrigatórios** em JS, e mais **um extra**. Sem eles, o projeto
não fecha. Crie um arquivo `script.js` na raiz e ligue-o no final do `<body>`:

```html
<!-- antes de </body>, em index.html -->
<script src="script.js" defer></script>
```

Os três obrigatórios estão detalhados nos itens 2, 3 e 4 abaixo.

### 2. Tema claro/escuro com toggle, `localStorage` e `prefers-color-scheme`

Hoje a página é fixa no escuro. A diretriz pede um botão que alterna entre
claro e escuro, que **lembra a escolha** do usuário (via `localStorage`) e que,
**na primeira visita**, respeita a preferência do sistema operacional
(`prefers-color-scheme`).

O primeiro passo é mover as cores pra **variáveis CSS** (ver item 6) — sem isso
o tema não funciona. Com as variáveis prontas, o JS fica assim:

```html
<!-- adicione um botão, ex: no topo da página -->
<button id="theme-toggle" aria-label="Alternar tema">🌓</button>
```

```js
// script.js
const html = document.documentElement;

function aplicarTema(tema) {
  html.setAttribute("data-theme", tema);
  localStorage.setItem("tema", tema);
}

// na carga: usa o salvo; se não houver, segue o sistema
const salvo = localStorage.getItem("tema");
if (salvo) {
  aplicarTema(salvo);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  aplicarTema("light");
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const atual = html.getAttribute("data-theme");
  aplicarTema(atual === "light" ? "dark" : "light");
});
```

### 3. Botão "copiar e-mail" com a Clipboard API

Hoje o e-mail aparece como texto puro (`index.html:81`). A diretriz pede um
botão que copie o e-mail pra área de transferência e dê um **feedback visual
por ~2 segundos**. Troque a linha do e-mail por:

```html
<p>
  Email:
  <button id="btn-email" data-email="moldre@outlook.com">moldre@outlook.com</button>
  <span id="email-feedback" hidden>Copiado!</span>
</p>
```

```js
const btnEmail = document.getElementById("btn-email");
const feedback = document.getElementById("email-feedback");

btnEmail.addEventListener("click", async () => {
  await navigator.clipboard.writeText(btnEmail.dataset.email);
  feedback.hidden = false;
  setTimeout(() => { feedback.hidden = true; }, 2000);
});
```

### 4. Animação de entrada com `IntersectionObserver`

A diretriz pede que os cards apareçam com uma animação suave conforme entram
na tela — e que isso seja feito com `IntersectionObserver` (não com um
`scroll` listener). O CSS define o estado inicial e o final; o JS só liga.

```css
/* style.css */
.card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.card.visivel {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".card").forEach((card) => observador.observe(card));
```

### 5. Falta o vídeo embedado

A diretriz pede **3+ fotos e 1 vídeo embedado**. As fotos você tem (perfil +
três no grid), mas não há vídeo. Adicione um `<iframe>` do YouTube numa seção,
**sem autoplay com áudio**:

```html
<section class="card">
  <h2>Vídeo</h2>
  <iframe
    width="100%" height="315"
    src="https://www.youtube.com/embed/SEU_VIDEO_ID"
    title="Vídeo de apresentação"
    allowfullscreen></iframe>
</section>
```

### 6. CSS sem variáveis no `:root`

Hoje as cores estão **escritas direto** em cada regra (`#111111`, `#1f1f1f`,
`#333`, `white`...). A diretriz pede um bloco `:root` com a paleta, a
tipografia e os espaçamentos como variáveis. Isso não é só organização — é o
que torna o tema claro/escuro possível (item 2). Comece assim:

```css
:root {
  /* paleta */
  --bg: #111111;
  --surface: #1f1f1f;
  --border: #333333;
  --text: #e4e4e4;
  --text-forte: #ffffff;
  --text-suave: #a1a1aa;

  /* tipografia */
  --fs-sm: 0.9rem;
  --fs-base: 1rem;
  --fs-h2: 1.3rem;
  --fs-h1: 2.4rem;

  /* espaçamentos */
  --space-sm: 10px;
  --space-md: 25px;
  --space-lg: 60px;
}

[data-theme="light"] {
  --bg: #f5f5f7;
  --surface: #ffffff;
  --border: #d2d2d7;
  --text: #1d1d1f;
  --text-forte: #000000;
  --text-suave: #6e6e73;
}
```

Depois troque os valores fixos pelo `var(...)` correspondente — por exemplo,
`background-color: #111111` vira `background-color: var(--bg)`.

### 7. Sistema tipográfico — 4+ tamanhos como variáveis

Ligado ao item 6: hoje os tamanhos de fonte estão fixos (`h1` com `2.4rem`,
`h2` com `1.3rem`). Declare **pelo menos 4 tamanhos** como variáveis (já estão
no bloco acima: `--fs-sm`, `--fs-base`, `--fs-h2`, `--fs-h1`) e **use todos**.
Declarar e não usar conta como não feito — então aplique:

```css
body { font-size: var(--fs-base); }
h1   { font-size: var(--fs-h1); }
h2   { font-size: var(--fs-h2); }
.descricao { font-size: var(--fs-sm); }
```

### 8. Responsividade — nenhum breakpoint

O CSS não tem nenhuma `@media query`. A diretriz pede **pelo menos 2
breakpoints** e que a página funcione de 360px a 1920px. No momento a grade de
três fotos fica espremida no celular. Exemplo de dois breakpoints:

```css
@media (max-width: 768px) {
  .imagens-grid { grid-template-columns: 1fr; }
  h1 { font-size: 1.8rem; }
}

@media (max-width: 480px) {
  .container { width: 94%; }
  .card { padding: 18px; }
}
```

### 9. Sem `assets/` e links externos sem `rel="noopener noreferrer"`

Dois pontos de estrutura/acessibilidade:

- **Pasta `assets/`** — as imagens estão soltas na raiz. A diretriz pede uma
  pasta `assets/`. Crie-a, mova as quatro imagens pra lá e atualize os `src`
  (ex: `src="assets/cefet.jpg"`).
- **`rel="noopener noreferrer"`** — os links de LinkedIn e GitHub
  (`index.html:83` e `:89`) usam `target="_blank"` mas sem `rel`. Sem isso, a
  página aberta consegue manipular a sua aba — é uma falha de segurança.
  Corrija os dois:

  ```html
  <a href="https://github.com/andrecoelh" class="botao"
     target="_blank" rel="noopener noreferrer">GitHub</a>
  ```

### 10. JS extra (1 a mais além dos 3 obrigatórios)

Além dos itens 2, 3 e 4, a diretriz pede **mais um** comportamento em JS livre.
Opções simples: menu de navegação, efeito *typewriter* no subtítulo, um
contador, ou um filtro nas habilidades. Escolha um que combine com a página.

---

## Pontos menores (polimento)

- **`alt` pouco descritivo** — os textos alternativos das imagens são `"selfie"`,
  `"cefet"`, `"formatura"`, `"boulder"` (`index.html:17, 64-66`). O `alt` deve
  descrever a imagem pra quem usa leitor de tela. Ex: `alt="André Coelho
  sorrindo, foto de perfil"`, `alt="André em frente ao prédio do CEFET"`.
- **Sem `<nav>` e sem `<footer>`** — a diretriz cita esses dois entre as tags
  semânticas. A seção "Contatos" poderia virar (ou conviver com) um `<footer>`,
  e os links de seção, um `<nav>` — se você adicionar navegação.
- **Falta `<meta name="description">`** — ajuda no compartilhamento e SEO.
  Adicione no `<head>` uma descrição curta da página.
- **README enxuto** — o `README.md` tem só duas linhas. Vale descrever o
  projeto, as tecnologias e como rodar localmente.

---

## Checklist de reentrega

Sugestão de ordem — cada passo destrava o seguinte:

1. [ ] Criar `:root` com variáveis de cor, tipografia e espaçamento (item 6)
2. [ ] Trocar todos os valores fixos do CSS por `var(...)` (itens 6 e 7)
3. [ ] Criar a pasta `assets/`, mover as imagens e atualizar os `src` (item 9)
4. [ ] Adicionar `rel="noopener noreferrer"` nos links externos (item 9)
5. [ ] Adicionar 2 `@media queries` (item 8)
6. [ ] Adicionar o vídeo embedado (item 5)
7. [ ] Criar `script.js` e ligá-lo no `index.html` (item 1)
8. [ ] Implementar o tema claro/escuro (item 2)
9. [ ] Implementar o "copiar e-mail" (item 3)
10. [ ] Implementar a animação com `IntersectionObserver` (item 4)
11. [ ] Implementar 1 comportamento JS extra (item 10)
12. [ ] Melhorar os `alt`, adicionar `<meta description>` e o README (polimento)

---

## Considerações finais

André, não se assuste com o tamanho da lista — boa parte dela são os mesmos
três ou quatro conceitos aplicados em pontos diferentes. A base de HTML e CSS
que você entregou é sólida; o que falta é, principalmente, **a camada de
JavaScript** e a **migração das cores pra variáveis**. Faça nesta ordem: o
`:root` com variáveis primeiro (destrava o tema), depois crie o `script.js` e
adicione um comportamento de cada vez, testando no navegador a cada passo.

Use o **DevTools** (F12) pra testar a responsividade no modo dispositivo e pra
ver erros de JS no Console. Se usar IA pra ajudar, trate-a como **ferramenta,
não autora**: peça pra ela explicar cada trecho até você conseguir reescrever
sozinho — é isso que vai aparecer nas perguntas de verificação.

Faça item por item, sem pressa. A reentrega vai sair tranquila. 🚀

---
*Revisão da Diretoria Técnica — IbTech Trilha Frontend 2026.1 · 2026-05-18*
