# Revisão — Projeto 01 Cartão de Visita

**Aluno:** Henrique Bomfim
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Henrique, vou começar pelo que importa: a página que você entregou é **bonita e bem construída** na parte que existe. O layout de currículo com a barra lateral fixa, a tipografia serifada nos títulos, os números de seção, os cards com borda lateral — isso tem cuidado e identidade. Quem montou esse HTML e esse CSS sabe o que está fazendo.

O problema não é qualidade, é **escopo**. O Projeto 01 pede um conjunto específico de itens — três interações em JavaScript, mídia (fotos e vídeo), responsividade, tema claro/escuro — e a sua entrega tem só duas das três camadas: HTML e CSS. Não há arquivo `script.js`, não há imagens, não há media queries. É como entregar uma casa com a estrutura e a pintura prontas, mas sem a parte elétrica.

Esta revisão é detalhada de propósito: o objetivo é te explicar o **porquê** de cada item que falta, pra você fechar tudo na reentrega. Como o projeto está num estágio de "metade pronta", vou organizar assim: primeiro o que já está bom, depois **o que falta adicionar** (os bloqueadores), depois flags e polimento.

---

## O que já está bom

- **HTML semântico de verdade.** Você usou `<aside>` pra barra lateral, `<main>` pro conteúdo, `<section>` pra cada bloco, `<nav>` pra navegação âncora, um `<h1>` único e `<h2>` por seção. A hierarquia não pula nível. Isso é exatamente o que a diretriz pede — e muita gente da turma erra aqui.
- **Layout moderno com Flexbox e Grid.** O `body` é um flex container, a sidebar é `position: sticky`, os blocos de formação e os grids de softwares/extracurriculares usam `grid-template-columns`. Nada de `float` pra montar layout. Critério "Layout moderno" cumprido.
- **Variáveis CSS no `:root`.** Você declarou a paleta (`--bg`, `--text`, `--muted`, `--accent`...) e a largura da sidebar como variáveis, e o CSS está organizado com comentários de seção. Boa base.
- **Conteúdo bem escrito.** O texto do objetivo, as experiências, as competências — tudo claro e bem redigido. A página tem substância.
- **Detalhes de acabamento.** A linha decorativa abaixo do nome (`::after`), os marcadores `—` e `▸` feitos com `::before`, o `scroll-behavior: smooth` — são toques que mostram capricho.

---

## O que falta adicionar (bloqueadores)

Pela tabela da seção 7 da diretriz, cada linha vermelha já exige reentrega. Aqui são vários itens, mas note uma coisa antes de desanimar: **quase todos são "adicionar", não "refazer".** O HTML e o CSS que você já tem ficam — você vai construir em cima deles.

### 1. Não existe JavaScript — faltam as três interações obrigatórias

Este é o maior. A diretriz pede um arquivo `script.js` com **três comportamentos obrigatórios**, e o seu projeto não tem o arquivo. Os três são:

**a) Tema claro/escuro** com toggle, `localStorage` e `prefers-color-scheme`. Você já tem as variáveis de cor no `:root` — falta um bloco de tema escuro e o JS que alterna. No CSS:

```css
body.tema-escuro {
  --bg:      #191718;
  --bg-card: #221f20;
  --border:  #34302f;
  --text:    #f0ede8;
  --muted:   #9a9490;
  --accent:  #f0ede8;
}
```

Um botão no HTML (dentro do `<aside>`, por exemplo):

```html
<button id="toggle-tema" type="button" aria-label="Alternar tema claro/escuro">🌙</button>
```

E no `script.js`:

```js
const botaoTema = document.getElementById('toggle-tema');
const temaSalvo = localStorage.getItem('tema');
const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (temaSalvo === 'escuro' || (temaSalvo === null && prefereEscuro)) {
  document.body.classList.add('tema-escuro');
  botaoTema.textContent = '☀️';
}

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('tema-escuro');
  const escuro = document.body.classList.contains('tema-escuro');
  botaoTema.textContent = escuro ? '☀️' : '🌙';
  localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
});
```

**b) Copiar e-mail** com a Clipboard API. Hoje o seu e-mail é um link `mailto:` (`index.html:24`). A diretriz pede um botão que **copie** o endereço pra área de transferência, com feedback visual de ~2s:

```html
<button id="copiar-email" type="button" data-email="henriquebomfim10@gmail.com">
  henriquebomfim10@gmail.com
</button>
<span id="email-feedback" role="status"></span>
```

```js
const botaoEmail = document.getElementById('copiar-email');
const feedback = document.getElementById('email-feedback');

botaoEmail.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(botaoEmail.dataset.email);
    feedback.textContent = 'E-mail copiado!';
  } catch {
    feedback.textContent = 'Não foi possível copiar.';
  }
  setTimeout(() => { feedback.textContent = ''; }, 2000);
});
```

**c) Animação de entrada com `IntersectionObserver`.** As seções aparecem com um fade conforme entram na tela. No CSS:

```css
.revelar {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.revelar.visivel {
  opacity: 1;
  transform: translateY(0);
}
```

Adicione a classe `revelar` nas suas `<section>` e no `script.js`:

```js
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.revelar').forEach((el) => observador.observe(el));
```

E **uma interação JS extra**, à sua escolha (menu, modal, contador, filtro, efeito de digitação...). Como você tem uma navegação âncora na sidebar, um bom extra seria **destacar o link da seção ativa** conforme a pessoa rola — dá pra fazer com outro `IntersectionObserver`.

Não esqueça de ligar o arquivo no HTML, antes do `</body>`:

```html
<script src="script.js" defer></script>
```

### 2. Faltam as imagens e o vídeo

A linha "Mídia" da tabela pede **pelo menos 3 fotos e 1 vídeo embedded**. A sua página não tem nenhuma imagem nem vídeo — é toda texto. Crie a pasta `assets/` (item 4 abaixo), coloque pelo menos 3 fotos suas (um retrato + duas de contexto: você estudando, num evento, etc.) com `alt` descritivo, e embede um vídeo:

```html
<img src="assets/retrato.jpg" alt="Retrato de Henrique Bomfim" width="320" height="320">

<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/SEU_ID_AQUI"
    title="Vídeo de apresentação"
    loading="lazy"
    allowfullscreen></iframe>
</div>
```

O vídeo pode ser do YouTube, com controles e **sem autoplay com áudio**.

### 3. Não há responsividade — zero media queries

A linha "Responsividade" pede **pelo menos 2 breakpoints**, e a página tem que funcionar de 360px a 1920px. O seu CSS não tem nenhum `@media`. O problema é concreto: a sua sidebar tem largura fixa de `17.5rem` (`--sidebar-w`) e o `body` é um flex em linha — num celular de 360px, isso aperta o conteúdo principal num espaço minúsculo ao lado da barra.

No mobile, a sidebar precisa deixar de ser uma coluna lateral e virar um topo (ou recolher). Exemplo de breakpoint:

```css
@media (max-width: 860px) {
  body { flex-direction: column; }
  aside {
    width: 100%;
    height: auto;
    min-height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  main { padding: 2.5rem 1.5rem 4rem; }
}

@media (max-width: 520px) {
  .soft-grid,
  .extra-grid { grid-template-columns: 1fr; }
  .section-title { font-size: 1.8rem; }
}
```

Dois breakpoints, e cada um resolve um problema real da faixa de tela dele.

### 4. Falta o sistema tipográfico em variáveis (e a pasta `assets/`)

A linha "Sistema tipográfico" pede **pelo menos 4 tamanhos de fonte definidos como variáveis e reaproveitados**. Hoje os seus `font-size` estão escritos um a um, soltos em cada regra: `0.625rem`, `0.75rem`, `1.75rem`, `2.375rem`, `1.25rem`, `0.9375rem`... Junte numa escala no `:root`, junto das cores que você já tem:

```css
:root {
  /* ...suas cores... */
  --fs-xs:   0.6875rem;  /* rótulos, números de seção */
  --fs-sm:   0.78125rem; /* contato, bullets */
  --fs-base: 0.9375rem;  /* texto corrido */
  --fs-md:   1.25rem;    /* nomes de curso/cargo */
  --fs-lg:   1.75rem;    /* nome na sidebar */
  --fs-xl:   2.375rem;   /* títulos de seção */
}
```

E troque os valores soltos por `var(--fs-xl)`, `var(--fs-base)`, etc. nos elementos. Assim, mudar a escala da página inteira vira editar uma linha.

A diretriz (seção 5) também pede a estrutura `index.html`, `style.css`, `script.js`, `assets/` e `README.md` na raiz. Crie a pasta `assets/` e guarde as imagens lá.

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas resolva antes de reenviar.

1. **Faltam `<header>` e `<footer>`.** Você usou `<aside>`, `<main>`, `<section>` e `<nav>` muito bem — mas a diretriz lista também `<header>` e `<footer>`. Vale envolver o topo num `<header>` e fechar a página com um `<footer>` (um rodapé simples com seu nome e o ano já cumpre).

2. **Sem foco visível.** O seu CSS tem `:hover`, mas nenhum `:focus`/`:focus-visible`. Quem navega por teclado (Tab) não enxerga onde está. Adicione:

   ```css
   a:focus-visible,
   button:focus-visible {
     outline: 2px solid var(--accent);
     outline-offset: 3px;
   }
   ```

3. **Nome do repositório.** A diretriz pede o formato `ibtech-projeto01-seunome`. O seu está como `Portifolio-Pessoal`. Em **Settings → General → Repository name**, renomeie pra `ibtech-projeto01-henrique` (e atualize o link do GitHub Pages depois).

---

## Pontos menores

Polimento. Não pesam na nota.

- **README com só duas linhas.** A seção 6 da diretriz pede um README com seu nome, a turma, uma descrição curta do projeto, a stack usada e uma linha de "como rodar". O seu tem só o título e um link. Vale completar.
- **`<meta name="description">` e Open Graph ausentes.** O `<head>` tem `charset`, `viewport` e `title`, mas não a `description` nem as tags `og:*` que definem o preview ao compartilhar o link. A diretriz pede.
- **Os `@font-face` usam só `local()`.** As fontes DM Serif Display e DM Sans são carregadas só se já estiverem instaladas no computador de quem visita (`src: local(...)`). Em qualquer máquina sem essas fontes, a página cai no fallback. Se quiser garantir a tipografia, use o Google Fonts com `<link>` no `<head>`, como nas outras fontes web.

---

## Checklist de reentrega

Sugestão de ordem — comece pela estrutura, depois adicione as camadas:

1. [ ] Criar a pasta `assets/` e a estrutura de arquivos da diretriz
2. [ ] Criar o `script.js` com tema claro/escuro, copiar e-mail e `IntersectionObserver` (bloqueador 1)
3. [ ] Adicionar uma interação JS extra à escolha (bloqueador 1)
4. [ ] Adicionar pelo menos 3 fotos (com `alt` descritivo) e 1 vídeo embedded (bloqueador 2)
5. [ ] Criar a escala tipográfica no `:root` e aplicar as variáveis (bloqueador 4)
6. [ ] Adicionar pelo menos 2 breakpoints de responsividade (bloqueador 3)
7. [ ] Envolver o topo num `<header>` e adicionar um `<footer>` (flag 1)
8. [ ] Adicionar `:focus-visible` com outline (flag 2)
9. [ ] Renomear o repositório pra `ibtech-projeto01-henrique` (flag 3)
10. [ ] Completar o README e as meta tags do `<head>`
11. [ ] Testar em 360px, 768px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Henrique, não leia a lista de bloqueadores como "o projeto está ruim" — leia como "o projeto está pela metade". A metade que você fez é a que mais derruba gente: estrutura semântica correta, layout com Grid e Flexbox, variáveis CSS, identidade visual. Você tem a base. O que falta é a camada de **comportamento** (o JavaScript) e a de **mídia** (fotos e vídeo) — e a responsividade, que conecta tudo às telas reais.

Uma sugestão de método: faça **um item do checklist por vez**, salve, abra a página no navegador e confira antes de passar pro próximo. Comece pelo `script.js` — os exemplos de código acima estão prontos pra você estudar e adaptar. E um recado da diretriz (seção 9): pode usar IA pra ajudar, mas leia e entenda cada trecho, porque a Diretoria Técnica pode te pedir pra explicar qualquer parte do código.

Você construiu uma base sólida. Agora é completar as camadas que faltam, sem pressa, item por item. Manda a reentrega.

---
*Revisão por Josh — 2026-05-19*
