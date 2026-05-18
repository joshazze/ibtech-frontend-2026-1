# Revisão — Projeto 01 (Cartão de Visita) · Cauã Moraes

**Status: reentrega necessária** — falta pouco

Oi, Cauã! Que entrega caprichada. O projeto está entre os mais completos da
turma: estética coerente, JavaScript bem escrito e modular, acessibilidade
levada a sério e até um easter egg autoral (a C4 do Counter-Strike) que mostra
domínio real de DOM e timers. Quase tudo da diretriz está cumprido. O que
segura a aprovação é **um único bloqueador**: a responsividade tem apenas um
breakpoint, e a diretriz pede no mínimo dois. É uma correção de poucos minutos.
Abaixo o detalhe, mais alguns ajustes de polimento.

---

## O que já está bom

- **HTML semântico exemplar** — `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<footer>`, `<h1>` único e hierarquia de títulos correta. Você
  ainda corrigiu coisas no caminho (os comentários "Correção Semântica"
  trocando `div/span` por `ul/li` mostram cuidado).
- **Acessibilidade bem feita** — `alt` descritivos de verdade
  (`index.html:195-197`), `aria-label`, `aria-expanded` e `aria-controls` no
  menu, `rel="noopener noreferrer"` nos links externos. Isso é nível acima do
  esperado pro Projeto 01.
- **JavaScript limpo e organizado** — arquivo dividido em blocos numerados,
  tema, menu mobile (com fechar ao clicar fora e no `Esc`), `IntersectionObserver`
  e o easter egg. Código legível e sem libs.
- **Tema claro/escuro completo** — toggle, `localStorage` e
  `prefers-color-scheme` na primeira visita, tudo via variáveis CSS
  (`script.js:1-19`). Exatamente o que a diretriz pede.
- **Variáveis CSS bem estruturadas** — `:root` com paleta, tipografia e
  espaçamentos; os 4 tamanhos `--fs-*` são realmente usados. Bom trabalho.
- **C4 como extra criativo** — o easter egg é divertido e tecnicamente
  consistente (keypad no DOM, timer, LED piscando, código de desarme). Mostra
  iniciativa muito além do mínimo.

---

## Bloqueador (precisa arrumar pra aprovar)

### 1. Responsividade com apenas 1 breakpoint

O `style.css` tem só uma `@media query` — `@media (max-width: 768px)`
(`style.css:282`). A diretriz pede **pelo menos 2 breakpoints**, cobrindo de
360px a 1920px. O motivo é prático: um único corte em 768px não dá conta da
diferença entre um tablet e um celular pequeno de 360px — no celular pequeno o
título *hero*, a grade de mídia e o padding ainda podem ficar apertados.

Adicione um segundo breakpoint pra telas pequenas. Exemplo:

```css
@media (max-width: 480px) {
  :root {
    --fs-xl: 1.9rem;
    --spacing-lg: 2rem;
  }
  .container { padding: 0 var(--spacing-sm); }
  .card { padding: var(--spacing-sm); }
  .media-grid { gap: var(--spacing-md); }
  .nav-links { gap: var(--spacing-sm); }
}
```

Teste no DevTools (modo dispositivo) em 360px, 768px e 1280px pra confirmar
que nada quebra nas três faixas.

---

## Flags (recomendado arrumar)

### 2. "Copiar e-mail" usa `document.execCommand`, não a Clipboard API

O botão funciona e dá o feedback de 2 segundos — isso está certo. Mas a
implementação (`script.js:59-69`) usa `document.execCommand("copy")`, que é a
**API antiga e descontinuada**. A diretriz pede a **Clipboard API** moderna,
que é mais simples e é o padrão atual:

```js
btnCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailToCopy);
    copyFeedback.style.display = "inline-block";
    setTimeout(() => { copyFeedback.style.display = "none"; }, 2000);
  } catch (err) {
    console.error("Falha ao copiar:", err);
  }
});
```

Some o `<input>` temporário, o `select()` e o `execCommand` — três linhas
viram uma. Vale trocar.

### 3. `style` inline em parágrafos do "Sobre mim"

Os três `<p>` da seção "Sobre" usam `style="margin-bottom: 1rem;"` inline
(`index.html:99-101`). Você já tirou CSS inline em outros lugares (o comentário
em `index.html:70` prova isso) — vale ser consistente aqui também:

```css
#sobre .card p + p { margin-top: 1rem; }
```

E remova os três `style="..."` do HTML.

### 4. Alguns tamanhos de fonte ainda hardcoded

Você criou os 4 `--fs-*` e usa todos — ótimo. Mas restaram tamanhos fixos
espalhados: `.section-title` com `2rem` (`style.css:98`), `.card-title` com
`1.2rem` (`:118`), `.nav-links a` com `0.95rem` (`:86`). Não é bloqueador, mas
pra manter a coerência do sistema tipográfico vale promovê-los a variáveis
(ex: criar `--fs-md: 1.2rem` e `--fs-xxl: 2rem`).

---

## Pontos menores (polimento)

- **`title="Rush B..."` na foto de perfil** (`index.html:45`) — é um detalhe
  divertido, mas o `title` aparece como tooltip pra todo mundo; confirme se é
  intencional.
- **`og:image` aponta pra `assets/og-image.png`** (`index.html:10`) — confirme
  que o arquivo existe na pasta `assets/` com esse nome exato, senão o preview
  ao compartilhar o link fica quebrado. (O `favicon.png` em `:13` idem.)
- **`readme.md` em minúsculo** — a diretriz cita `README.md`. Funciona, mas o
  padrão é maiúsculo; vale renomear pra `README.md`.

---

## Checklist de reentrega

1. [ ] Adicionar um 2º breakpoint (`@media (max-width: 480px)`) e testar de
       360px a 1920px no DevTools — **bloqueador, item 1**
2. [ ] Trocar `execCommand` pela Clipboard API no "copiar e-mail" (item 2)
3. [ ] Mover os `style` inline do "Sobre" pro CSS (item 3)
4. [ ] (Opcional) Promover os tamanhos de fonte restantes a variáveis (item 4)
5. [ ] (Opcional) Conferir `og:image`/`favicon`, renomear `readme.md`

---

## Considerações finais

Cauã, esse projeto está muito bem feito — a parte difícil você já resolveu com
folga. O único item que **obriga** a reentrega é o segundo breakpoint (item 1);
os demais são polimento que deixam o trabalho redondo. Faça o item 1, dê uma
passada nos itens 2 e 3, e a reentrega aprova sem sustos.

Uma dica: ao testar a responsividade, abra o DevTools, ative o modo dispositivo
e arraste a largura lentamente de 1920px até 360px observando onde algo aperta
ou estoura — é assim que se descobre onde um breakpoint é realmente necessário.

Parabéns pelo cuidado com semântica e acessibilidade, e pela criatividade do
easter egg. Falta pouquíssimo. 🚀

---
*Revisão da Diretoria Técnica — IbTech Trilha Frontend 2026.1 · 2026-05-18*
