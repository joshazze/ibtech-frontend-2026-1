# Revisão — Projeto 01 (Cartão de Visita) · Felipe Medeiros Nunes

**Status: reentrega necessária**

Oi, Felipe! O projeto tem uma identidade visual bem forte — a faixa *marquee*
rolando, o padrão cônico animado no hero, a tipografia `Archivo Black` chamativa.
Dá pra ver que você se preocupou com estética, e isso conta. Os três
comportamentos de JS estão (quase todos) lá e o código está enxuto e comentado.
O que segura a aprovação é um conjunto de **requisitos da diretriz que ficaram
incompletos ou de fora** — estrutura de arquivos, mídia, sistema tipográfico,
responsividade e a persistência do tema. Cada um abaixo vem com o código pronto.
Nada aqui é difícil; é questão de fechar item por item.

---

## O que já está bom

- **Identidade visual marcante** — a faixa *marquee*, o `repeating-conic-gradient`
  girando no hero e o contraste de tipografias dão personalidade à página.
- **HTML com tags semânticas** — você usou `<nav>`, `<header>`, `<main>`,
  `<section>`, `<footer>` e um `<h1>` único. A base estrutural está certa.
- **Os 3 comportamentos de JS estão presentes** — tema, copiar e-mail e
  `IntersectionObserver` (este bem feito, com `unobserve` pra disparar só uma
  vez, `script.js:31`).
- **Copiar e-mail com a API certa** — você usou a **Clipboard API**
  (`navigator.clipboard.writeText`) com feedback de 2 segundos
  (`script.js:16-24`). Exatamente o que a diretriz pede.
- **Extra criativo** — o efeito *typewriter* no subtítulo é um bom comportamento
  extra além dos três obrigatórios.
- **`alt` descritivos e `rel="noopener noreferrer"`** — os textos alternativos
  descrevem as imagens e os links externos têm o `rel` de segurança. Bom.

---

## Bloqueadores (precisam ser resolvidos pra aprovar)

Em ordem sugerida de execução.

### 1. Falta o `README.md` e a pasta `assets/`

A diretriz define a **estrutura mínima** de arquivos: `index.html`, `style.css`,
`script.js`, `assets/` e `README.md`. Dois faltam:

- **`README.md`** — não existe no repositório. Crie um na raiz com: nome do
  projeto, quem é você, tecnologias usadas (HTML/CSS/JS) e como rodar localmente.
- **Pasta `assets/`** — hoje as imagens (`perfil.png`, `logo-ibtech.png`,
  `certificado barcelona.png`) estão soltas na raiz. Crie a pasta `assets/`,
  mova-as pra lá e atualize os `src` no HTML (ex: `src="assets/perfil.png"`).
  Aproveite e renomeie `certificado barcelona.png` pra **sem espaço** —
  `certificado-barcelona.png` —, porque espaço em nome de arquivo causa
  problema em servidores.

### 2. Falta o vídeo embedado

A diretriz pede **3+ fotos e 1 vídeo embedado**. O vídeo não existe na página.
Some a isso que, das três imagens atuais, uma é um logo (`logo-ibtech.png`) —
ou seja, "fotos" de verdade você tem só duas (perfil e certificado). Resolva os
dois pontos:

- Adicione **mais uma foto** real (sua, de um projeto, do seu dia a dia).
- Adicione um **vídeo embedado**, sem autoplay com áudio:

```html
<section class="media fade-in" id="video">
  <div class="cnt">
    <h2 class="abt-h">vídeo</h2>
    <iframe
      width="100%" height="400"
      src="https://www.youtube.com/embed/SEU_VIDEO_ID"
      title="Vídeo de apresentação"
      allowfullscreen></iframe>
  </div>
</section>
```

### 3. Sistema tipográfico — só 1 tamanho de fonte como variável

No `:root` (`style.css:2-8`) há apenas **uma** variável de tamanho de fonte:
`--fs-xl`. A diretriz pede **pelo menos 4 tamanhos** declarados como variáveis
e **efetivamente usados**. Hoje os tamanhos estão chumbados em dezenas de
lugares (`0.7rem`, `0.8rem`, `0.85rem`, `8rem`, `0.6rem`...).

Declare uma escala e aplique-a:

```css
:root {
  /* ... cores ... */
  --fs-sm:   0.8rem;   /* labels, captions */
  --fs-base: 1rem;     /* texto corrido */
  --fs-h2:   2rem;     /* títulos de seção */
  --fs-h1:   clamp(2.5rem, 8vw, 6rem);  /* o atual --fs-xl */
}
```

Depois troque os tamanhos fixos pelo `var(...)` correspondente — por exemplo,
`.abt-p` recebe `font-size: var(--fs-base)`, `.abt-h` recebe
`font-size: var(--fs-h2)`, e assim por diante. **Declarar e não usar não
conta** — então aplique de verdade os quatro.

### 4. O tema não é restaurado ao recarregar a página

Aqui há um bug sutil. Seu JS **salva** o tema no `localStorage` ao clicar
(`script.js:11`), mas **nunca lê** esse valor quando a página carrega. Resultado:
o usuário escolhe o tema claro, recarrega a página, e ela volta pro escuro
(o `data-theme="dark"` fixo do `<body>`, `index.html:17`). A persistência, na
prática, não funciona.

Falta também o `prefers-color-scheme` na primeira visita. Adicione **no topo**
do `script.js`, antes do `addEventListener`:

```js
// Restaura o tema na carga da página
const temaSalvo = localStorage.getItem("theme");
if (temaSalvo) {
  document.body.setAttribute("data-theme", temaSalvo);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.body.setAttribute("data-theme", "light");
}
```

### 5. Responsividade — apenas 1 breakpoint

O CSS tem uma única `@media query` — `@media (max-width: 768px)`
(`style.css:79`). A diretriz pede **pelo menos 2 breakpoints**, funcionando de
360px a 1920px. Em telas bem pequenas (360px) o hero e os textos grandes ainda
ficam apertados. Adicione um segundo corte:

```css
@media (max-width: 480px) {
  .hero-name { font-size: clamp(2rem, 12vw, 3rem); }
  .cnt { padding: 0 1.2rem; }
  section { padding: 4rem 0; }
  footer { flex-direction: column; gap: 0.5rem; text-align: center; }
}
```

Teste no DevTools em 360px, 768px e 1280px.

---

## Flags (precisa arrumar)

### 6. `favicon.png` referenciado mas inexistente

O `<head>` aponta `<link rel="icon" href="favicon.png">` (`index.html:13`), mas
não existe nenhum `favicon.png` no repositório. O navegador tenta buscar e
falha (erro 404 no Console). Adicione o arquivo (de preferência dentro de
`assets/` e com o caminho atualizado) ou remova a linha.

### 7. E-mail do "copiar" é um endereço falso

O botão copia `felipe.medeiros@exemplo.com` (`script.js:17`) — um placeholder.
Num cartão de visita, o e-mail precisa ser o **seu de verdade**, senão o
recurso copia um endereço que não leva a lugar nenhum. Troque pelo seu e-mail
real.

### 8. Seção "jornada" sem `<h2>`

As seções "sobre", "conquistas" e "contatos" têm um título `<h2>`, mas a
"jornada" usa só uma `<div class="sec-pill">` (`index.html:74`). Pra manter a
hierarquia de títulos consistente (e ajudar leitores de tela), troque por um
`<h2>` de verdade — pode estilizá-lo com a mesma aparência da pílula:

```html
<h2 class="abt-h sec-pill">minha jornada</h2>
```

---

## Pontos menores (polimento)

- **Link do LinkedIn genérico** — `index.html:107` aponta pra
  `https://www.linkedin.com/feed/` (o feed geral), não pro seu perfil. Troque
  pela URL do seu perfil (ex: `linkedin.com/in/felipe-medeiros-...`).
- **`border-y` não é CSS válido** — `style.css:38` usa `border-y: 2px solid`,
  que não existe. Use `border-top` e `border-bottom`, ou `border-block`.
- **`window.onload = type`** — funciona, mas com `defer` no script o DOM já
  está pronto; pode chamar `type()` direto. Detalhe pequeno.

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Criar `README.md` e a pasta `assets/`, mover e renomear as imagens (item 1)
2. [ ] Adicionar mais 1 foto e o vídeo embedado (item 2)
3. [ ] Criar a escala tipográfica no `:root` e aplicá-la (item 3)
4. [ ] Restaurar o tema na carga + `prefers-color-scheme` (item 4)
5. [ ] Adicionar o 2º breakpoint (item 5)
6. [ ] Resolver o `favicon.png` (item 6)
7. [ ] Trocar o e-mail falso pelo real (item 7)
8. [ ] Dar um `<h2>` pra seção "jornada" (item 8)
9. [ ] Corrigir o link do LinkedIn e o `border-y` (polimento)

---

## Considerações finais

Felipe, o visual do seu cartão tem atitude — isso é um diferencial e você não
precisa mexer nele. O que falta é, na maioria, **cumprir requisitos da diretriz
que passaram batido**: a estrutura de arquivos, a mídia, a escala tipográfica e
a responsividade. O único item que é de fato um *bug* é o tema não voltar ao
recarregar (item 4) — e olha que perto você chegou: faltou só **ler** o
`localStorage` que você já estava salvando.

Faça item por item, na ordem do checklist, testando no navegador a cada passo.
Use o **DevTools** (F12): o Console mostra o 404 do favicon e qualquer erro de
JS, e o modo dispositivo testa a responsividade. Se usar IA, peça pra ela
explicar cada trecho até você conseguir reescrever sozinho — é o que vai cair
nas perguntas de verificação.

Sem pressa, item por item, a reentrega sai. 🚀

---
*Revisão da Diretoria Técnica — IbTech Trilha Frontend 2026.1 · 2026-05-18*
