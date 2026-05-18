# Revisão — Projeto 01 (Cartão de Visita) · Atos Barros

**Status: reentrega necessária** — falta pouco

Oi, Atos! Esse é um dos projetos mais bem-acabados da turma. O layout tem
personalidade (os números de seção, a marca d'água gigante, o *flip card* 3D),
o CSS é extenso e bem organizado, e a acessibilidade foi levada a sério —
`:focus-visible`, `aria-label`, `aria-pressed` e navegação por teclado no
flip card. Quase tudo da diretriz está cumprido. O que segura a aprovação é
**um requisito obrigatório que ficou de fora**: o botão de "copiar e-mail"
com a Clipboard API. Abaixo o detalhe, mais alguns ajustes menores.

---

## O que já está bom

- **HTML semântico e bem hierarquizado** — `<header>`, `<nav>`, `<main>`,
  `<section>`, `<article>`, `<footer>`, `<h1>` único e títulos em ordem. Cada
  seção tem `id` e a navegação funciona com âncoras.
- **Acessibilidade acima do esperado** — `:focus-visible` global
  (`style.css:80`), `alt` descritivos de verdade, `aria-hidden` nos SVGs
  decorativos, `aria-label`/`aria-pressed` no flip card e navegação por
  `Enter`/`Espaço` no teclado (`script.js:119-124`). Excelente.
- **Variáveis CSS completas** — `:root` com paleta, fontes, **7 tamanhos**
  de fonte (`--fs-xs` a `--fs-hero`) e espaçamentos, todos efetivamente usados.
  O sistema tipográfico está exemplar.
- **Responsividade sólida** — três breakpoints (`min-width: 1440px`,
  `max-width: 850px`, `max-width: 520px`), bem além do mínimo pedido.
- **Tema claro/escuro completo** — toggle, `localStorage` e
  `prefers-color-scheme` na primeira visita (`script.js:22-39`). Certinho.
- **Flip card como extra criativo** — clique e teclado, `aria-pressed`
  sincronizado, links internos que não disparam o flip (`script.js:126-128`).
  É um extra bem pensado e bem implementado.
- **README claro** — descreve o projeto, as tecnologias e a estrutura de
  arquivos. Bom.

---

## Bloqueador (precisa arrumar pra aprovar)

### 1. Falta o botão "copiar e-mail" com a Clipboard API

A diretriz lista, entre os **comportamentos obrigatórios de JavaScript**, um
botão que copia o e-mail pra área de transferência com **feedback visual de
~2 segundos**. Hoje o e-mail só aparece como link `mailto:` — no flip card
(`index.html:81`) e na seção de contato (`index.html:227`). O `mailto:` é útil,
mas não substitui o requisito: ele abre o cliente de e-mail, não copia o
endereço.

Adicione um botão de copiar na seção de contato. No HTML:

```html
<!-- dentro de #contato, junto dos contact-links -->
<div class="copy-email">
  <button id="btn-copy-email" type="button" data-email="atosbarros23@icloud.com">
    Copiar e-mail
  </button>
  <span id="copy-feedback" role="status" hidden>E-mail copiado!</span>
</div>
```

No `script.js`:

```js
const btnCopyEmail = document.getElementById("btn-copy-email");
const copyFeedback = document.getElementById("copy-feedback");

btnCopyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(btnCopyEmail.dataset.email);
    copyFeedback.hidden = false;
    setTimeout(() => { copyFeedback.hidden = true; }, 2000);
  } catch (err) {
    console.error("Falha ao copiar:", err);
  }
});
```

O `data-email` no botão evita repetir o endereço no JS, e o `role="status"`
faz o leitor de tela anunciar o "copiado". Estilize o `.copy-email` no mesmo
padrão visual dos seus botões — você já tem `.button` pronto pra reaproveitar.

---

## Flags (recomendado arrumar)

### 2. Regra CSS quebrada no breakpoint de 520px

No final do `style.css` (linhas 749-752) há esta regra:

```css
  .button,
{
    width: 100%;
}
```

Tem uma **vírgula sobrando** depois de `.button` e um seletor vazio. Isso torna
a regra inteira inválida — o navegador a descarta, e os botões **não recebem**
o `width: 100%` em telas pequenas. Corrija pra:

```css
  .button {
    width: 100%;
  }
```

(Se a intenção era incluir outro elemento, escreva o nome dele no lugar do
seletor vazio, ex: `.button, .contact-links a { width: 100%; }`.)

### 3. CSS morto deixado no arquivo

Há regras que não correspondem a nada no HTML — provavelmente sobras de uma
versão anterior:

- `.todo-note` (`style.css:463-471`) — nenhum elemento usa essa classe.
- `.media-card h3` e `.media-card p` (`style.css:496-509`) — os
  `.media-card` do HTML só têm `<img>`, não têm título nem parágrafo.

Não quebra nada, mas vale remover pra manter o arquivo enxuto — CSS morto
confunde quem lê (inclusive você no futuro).

---

## Pontos menores (polimento)

- **Nome do repositório fora do padrão** — o repo se chama `card`. A diretriz
  sugere o padrão `ibtech-projeto01-<seu-nome>`. Não afeta o funcionamento,
  mas vale renomear pra facilitar a organização da turma.
- **Linha em branco no fim do `index.html`** (`:243`) — detalhe mínimo de
  formatação, pode limpar.
- **`.contact-links a:hover` colado no `/* Footer */`** (`style.css:638`) —
  faltou uma quebra de linha entre a regra e o comentário. Cosmético.

---

## Checklist de reentrega

1. [ ] Adicionar o botão "copiar e-mail" com a Clipboard API e feedback de
       ~2s — **bloqueador, item 1**
2. [ ] Corrigir a regra CSS quebrada do breakpoint de 520px (item 2)
3. [ ] Remover o CSS morto (`.todo-note`, `.media-card h3/p`) (item 3)
4. [ ] (Opcional) Renomear o repositório pro padrão da turma

---

## Considerações finais

Atos, o trabalho está realmente forte — semântica, acessibilidade, variáveis,
responsividade e o flip card mostram que você foi muito além do mínimo. O que
falta pra aprovar é pontual: **adicionar o "copiar e-mail"** (item 1). De
quebra, corrija a regra CSS quebrada (item 2) — é um bug pequeno mas real, que
faz seus botões não ocuparem a largura toda no celular.

Dica: depois de adicionar o botão de copiar, teste de verdade — clique, vá num
campo de texto qualquer e cole (`Cmd+V`) pra confirmar que o e-mail foi pra
área de transferência, e cronometre se o "copiado" some por volta dos 2s.

Se usar IA pra ajudar, peça que ela explique cada linha até você conseguir
reescrever sozinho — é isso que aparece nas perguntas de verificação. Falta
pouquíssimo pra fechar. 🚀

---
*Revisão da Diretoria Técnica — IbTech Trilha Frontend 2026.1 · 2026-05-18*
