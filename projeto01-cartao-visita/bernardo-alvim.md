# Revisão — Projeto 01 Cartão de Visita

**Aluno:** Bernardo Alvim
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Bernardo, seu projeto tem uma das bases de HTML mais bem-feitas que apareceram nesta leva — o esqueleto semântico está realmente correto, e isso é a parte mais difícil de acertar. O que falta pra aprovar é, em boa parte, ligar interações de JavaScript que a diretriz pede e que ainda não estão na página. Nada aqui é refazer do zero: é completar. Abaixo vai tudo separado por prioridade, com código pronto pra colar.

---

## O que já está bom

- **HTML semântico de verdade.** Você usou `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `address` e `footer` — cada um no lugar certo (`index.html:14-171`). A maioria dos projetos tropeça exatamente aqui; o seu não. `h1` único, `h2` por seção, `h3` nas subseções, sem pular nível.
- **Paleta em variáveis CSS, com tema escuro montado do jeito certo.** O `:root` define as cores (`style.css:1-13`) e o `body.dark` só troca os *valores* das variáveis (`style.css:15-25`). É exatamente assim que se faz — o resto do CSS nem precisa saber que o tema mudou.
- **Layout moderno e responsivo.** Grid no `.hero`, `.split`, `.gallery` e `.cards`; Flexbox nos grupos de botões. Dois breakpoints (`style.css:335` e `389`) que colapsam tudo pra uma coluna no celular.
- **Elemento criativo autoral.** O "radar de foco" (`index.html:136-148` + `script.js:43-49`) é interativo e é uma ideia sua — troca o texto conforme o chip selecionado. Conta como criatividade **e** como interação JS extra.
- **Clipboard API com fallback.** O `try/catch` em `script.js:32-41` é um cuidado que nem todo mundo teve: se a API falhar, o e-mail ainda aparece pro usuário.
- **Acessibilidade nos detalhes certos.** `alt` descritivo em todas as imagens, `rel="noopener noreferrer"` nos links externos, `aria-expanded` no botão de menu, `aria-label` no toggle de tema.

---

## Bloqueadores

São os itens que, pela tabela da seção 7 da diretriz, derrubam a entrega. Cada linha vermelha já basta pra reentrega — e aqui há quatro.

### 1. Falta o vídeo embedded (`index.html`)

A diretriz (seção 3.2 e tabela seção 7, linha "Mídia") exige **pelo menos 1 vídeo embedded** além das 3 fotos. O menu até tem o link `#video` (`index.html:23`), mas não existe nenhuma `<section id="video">` — e o commit `b6d1c6f "fix: remove video"` confirma que ele foi retirado. O CSS, inclusive, já tem o estilo `.video-frame` pronto e sem uso (`style.css:273-284`).

Adicione uma seção de vídeo dentro do `<main>` (pode ser antes de `#projetos`):

```html
<section class="section" id="video">
    <div class="section-heading">
        <p class="eyebrow">Vídeo</p>
        <h2>Um pouco mais sobre o que eu faço.</h2>
    </div>
    <div class="video-frame">
        <iframe
            src="https://www.youtube.com/embed/SEU_ID_AQUI"
            title="Vídeo de apresentação de Bernardo Alvim"
            loading="lazy"
            allowfullscreen></iframe>
    </div>
</section>
```

Pode ser qualquer vídeo que faça sentido com a página (um projeto seu, algo do seu interesse). O `iframe` do YouTube já vem com controles e sem autoplay com áudio, então atende a diretriz. **Importante:** o `<iframe>` herda o estilo de `.video-frame iframe` que você já escreveu — é só colar.

### 2. Sistema tipográfico não está em variáveis (`style.css`)

A tabela seção 7, linha "Sistema tipográfico", pede **pelo menos 4 tamanhos de fonte definidos como variáveis** e reaproveitados. Hoje os tamanhos estão chumbados direto em cada elemento: `clamp(2.8rem, 8vw, 5.8rem)` no `h1` (`style.css:137`), `1.16rem` no `.hero-text` (`style.css:155`), `0.95rem` na nav (`style.css:94`), `0.78rem` no eyebrow (`style.css:120`).

O *porquê* da regra: quando os tamanhos viram variáveis, ajustar a escala tipográfica do site inteiro é mexer em um lugar só. Adicione ao `:root` (`style.css:1`):

```css
:root {
    /* ...suas variáveis de cor... */
    --fs-xs: 0.78rem;
    --fs-sm: 0.95rem;
    --fs-base: 1rem;
    --fs-md: 1.16rem;
    --fs-lg: clamp(1.7rem, 4vw, 2.7rem);
    --fs-xl: clamp(2.8rem, 8vw, 5.8rem);
}
```

E troque os valores soltos pelas variáveis:

```css
h1 { font-size: var(--fs-xl); }
h2 { font-size: var(--fs-lg); }
.hero-text { font-size: var(--fs-md); }
.nav-links a { font-size: var(--fs-sm); }
.eyebrow { font-size: var(--fs-xs); }
```

### 3. Tema escuro não persiste e não respeita o sistema (`script.js:28-30`)

A linha "Tema claro/escuro" da tabela exige que a escolha **persista em `localStorage`** e que, na primeira visita, **respeite o `prefers-color-scheme`** do sistema. Hoje o `script.js` só faz `classList.toggle("dark")` — recarregou a página, perdeu o tema.

Substitua o bloco do tema (`script.js:28-30`) por:

```js
// Tema: aplica salvo > preferência do sistema na 1ª visita
const temaSalvo = localStorage.getItem("tema");
const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (temaSalvo === "dark" || (temaSalvo === null && prefereDark)) {
    document.body.classList.add("dark");
}

themeButton.addEventListener("click", () => {
    const ehDark = document.body.classList.toggle("dark");
    localStorage.setItem("tema", ehDark ? "dark" : "light");
});
```

### 4. Falta a animação de entrada com IntersectionObserver (`script.js`)

A tabela tem uma linha só pra isso: as seções devem **animar conforme entram na viewport, usando `IntersectionObserver`** (e não um listener de scroll). Hoje não há nenhuma animação de entrada no `script.js`.

No CSS, adicione o estado inicial e o estado animado:

```css
.section,
.hero {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.section.visivel,
.hero.visivel {
    opacity: 1;
    transform: translateY(0);
}
```

No `script.js`, adicione:

```js
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target); // dispara uma vez só
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section, .hero").forEach((el) => observador.observe(el));
```

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas precisam ser resolvidos antes da reentrega.

1. **Imagem do hero com caminho quebrado** (`index.html:44`). O `src="/Imagens/Pfp-BAlvim.png"` começa com `/`, o que aponta pra raiz do disco/servidor — a foto de perfil do topo não carrega. Note que na galeria (`index.html:89`) você escreveu certo: `Imagens/Pfp-BAlvim.png`, sem a barra. Remova a barra inicial da linha 44:
   ```html
   <img src="Imagens/Pfp-BAlvim.png" alt="Foto de perfil de Bernardo Alvim">
   ```

2. **O feedback de "copiar e-mail" não volta ao normal** (`script.js:32-41`). A tabela pede feedback "por ~2s, volta ao estado normal". Hoje o texto "Email copiado..." fica pra sempre. Ajuste:
   ```js
   copyButton.addEventListener("click", async () => {
       const email = "bernardoaalvim@gmail.com";
       try {
           await navigator.clipboard.writeText(email);
           copyStatus.textContent = "Email copiado para a área de transferência.";
       } catch {
           copyStatus.textContent = `Email: ${email}`;
       }
       setTimeout(() => { copyStatus.textContent = ""; }, 2000);
   });
   ```

3. **Open Graph ausente** (`index.html` `<head>`). O checklist da seção 8 pede `og:title`, `og:description`, `og:image` — são as tags que deixam o link bonito quando você compartilha no WhatsApp/LinkedIn. Adicione no `<head>`:
   ```html
   <meta property="og:title" content="Bernardo Alvim — Cartão de Visita">
   <meta property="og:description" content="Estudante de Engenharia de Software no Ibmec.">
   <meta property="og:image" content="Imagens/Pfp-BAlvim.png">
   ```

4. **Favicon ausente.** Adicione um ícone em `Imagens/` e referencie no `<head>`:
   ```html
   <link rel="icon" href="Imagens/favicon.png">
   ```

5. **Link `#video` aponta pra uma seção que não existe** (`index.html:23`). Resolve-se sozinho quando você adicionar a seção de vídeo do bloqueador 1.

---

## Pontos menores

Não pesam na nota e não exigem reentrega — só polimento pra próximos projetos.

- **Acentuação inconsistente.** A página mistura texto com acento (a seção "Sobre", `index.html:58-68`) e sem acento ("Vídeo" vira "Video" no menu `index.html:23`, "soluções" vira "solucoes" `index.html:34`, e as mensagens do `script.js:9-14` estão todas sem acento). Padronize tudo com acentuação correta — o `charset="UTF-8"` já está lá, então acento funciona.
- **README enxuto demais.** Ele tem o essencial, mas a seção 6 da diretriz pede explicitamente **seu nome e turma** e uma seção de **Tecnologias**. Vale acrescentar.
- **`loading="lazy"` nas imagens da galeria** (`index.html:89-99`). As fotos da galeria estão abaixo da dobra; `loading="lazy"` evita baixá-las antes da hora.
- **Menu mobile fecha ao clicar num link, mas não com `Esc` nem ao clicar fora.** Funciona bem como está; fechar no `Esc` é um polimento de acessibilidade.

---

## Checklist de reentrega

Sugestão de ordem de execução:

1. [ ] Corrigir o caminho da imagem do hero (`index.html:44`) — barra inicial
2. [ ] Adicionar a seção de vídeo embedded (bloqueador 1)
3. [ ] Criar as variáveis de tamanho de fonte e aplicá-las (bloqueador 2)
4. [ ] Tema escuro: `localStorage` + `prefers-color-scheme` (bloqueador 3)
5. [ ] Animação de entrada com `IntersectionObserver` (bloqueador 4)
6. [ ] Feedback de copiar e-mail voltando ao normal em ~2s (flag 2)
7. [ ] Open Graph + favicon no `<head>` (flags 3 e 4)
8. [ ] Padronizar acentuação e completar o README
9. [ ] Testar em 360px e em 1920px no DevTools antes de reenviar

---

## Considerações finais

Bernardo, leia isto com calma: a parte que costuma ser a mais trabalhosa de acertar — a estrutura semântica do HTML e a arquitetura de variáveis CSS — você **já acertou**. O que ficou de fora é quase tudo JavaScript: três interações da diretriz que ainda não estão ligadas na página. Isso é bom, porque é trabalho aditivo e localizado, não refatoração.

Faça item por item, na ordem do checklist, e teste cada um no navegador antes de passar pro próximo. Abra o DevTools (F12), use o modo responsivo pra conferir 360px e 1920px, e olhe o Console — se algo de JS quebrar, o erro aparece lá.

Uma dica que vale pro resto do curso: o código de IA, tutorial ou Stack Overflow é bem-vindo, mas leia e entenda cada bloco antes de colar — a diretriz (seção 9) diz que a Diretoria Técnica pode te pedir pra explicar qualquer trecho. Os snippets acima estão comentados justamente pra isso.

Você está perto. Manda a reentrega.

---
*Revisão por Josh — 2026-05-15*
