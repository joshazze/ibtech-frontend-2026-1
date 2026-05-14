# Revisão — Projeto 01 Cartão de Visita

**Aluno:** Pedro Soares Moreira
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Oi Pedro! Antes de tudo: dá pra perceber que você se divertiu fazendo o projeto. O **terminal interativo** com comandos `whoami`, `skills` e `contact` é uma sacada criativa e bem fora do óbvio — é o tipo de "interação JS extra" que a diretriz adora ver. A paleta marrom/bege também tem personalidade, foge daquele padrão azul-corporativo que metade dos cartões de visita acaba caindo. Você fez muita coisa certa em pouca linha de código.

A revisão é detalhada de propósito: o objetivo não é só te dizer "refaz X", e sim te explicar o **porquê** de cada critério, pra que na reentrega (e nos próximos projetos) você já saiba a regra de cabeça.

Vou separar em três níveis:

1. **Bloqueadores** — coisas que, pela tabela da diretriz (seção 7), derrubam a entrega. Tem que corrigir.
2. **Flags** — não derrubam sozinhas, mas se acumularem com os bloqueadores reprovam por consistência. Corrige antes da reentrega.
3. **Pontos menores** — polimento. Você decide se mexe.

No final tem um checklist de reentrega na ordem que faz mais sentido executar.

---

## O que já está bom

- **HTML semântico no esqueleto.** `<header>`, `<main>`, `<section id="...">`, `<footer>` no lugar certo, `<nav>` dentro do header (`index.html:14-27, 30-88, 91-93`). h1 único. Hierarquia de títulos sem pular nível. Esse é um dos critérios mais difíceis pra quem está começando e você acertou.
- **Variáveis CSS de cores no `:root` + dark mode via classe.** A estrutura está correta (`style.css:9-24`): o `.dark` redefine as mesmas variáveis e o resto do CSS lê tudo de `var(...)`. Esse é o jeito certo de fazer tema. (Falta `localStorage` e `prefers-color-scheme` — falo no bloqueador 1.5, mas o esqueleto está pronto.)
- **IntersectionObserver bem aplicado** (`script.js:56-68`). Sem scroll listener, sem timeout, sem gambiarra — exatamente como a diretriz pede.
- **Clipboard API com feedback de 2s** (`script.js:45-53`). Texto muda pra "Copiado!" e volta sozinho. Limpinho.
- **Terminal interativo (interação JS extra criativa).** Isso passa em criatividade com folga (`script.js:6-26` + `index.html:67-75`). É memorável.
- **Reset CSS no topo** (`style.css:2-6`).
- **Fontes Google bem escolhidas e combinadas** — Inter pro corpo, Playfair Display pros títulos (`index.html:8`). Boa escolha tipográfica.

---

## 1. Bloqueadores

### 1.1 Falta `rel="noopener noreferrer"` nos links externos

**Diretriz 4.1 e tabela seção 7 (linha "Acessibilidade"):**

> "Todo `target="_blank"` precisa de `rel="noopener noreferrer"`."

Você tem dois links abrindo em nova aba sem o `rel` (`index.html:84-85`):

```html
<a href="https://www.linkedin.com/in/pedro-soares-moreira" target="_blank">LinkedIn</a>
<a href="https://github.com/psmoreiraa" target="_blank">GitHub</a>
```

**Por que essa regra existe:** quando você usa `target="_blank"`, a página nova abre com uma referência (`window.opener`) pra sua página original. Isso é um buraco de segurança/performance:

- **Segurança:** uma página maliciosa pode usar `window.opener.location = "site-falso.com"` pra trocar a sua aba original por phishing enquanto o usuário lê a outra.
- **Performance:** as duas páginas compartilham a mesma thread do JavaScript, então uma página pesada na outra aba pode travar a sua.

`noopener` quebra essa referência, `noreferrer` por cima ainda esconde o `referer` HTTP. Hoje navegadores modernos já aplicam `noopener` implícito, mas a diretriz pede explícito porque é o padrão da indústria.

**Como corrigir:**

```html
<a href="https://www.linkedin.com/in/pedro-soares-moreira" target="_blank" rel="noopener noreferrer">LinkedIn</a>
<a href="https://github.com/psmoreiraa" target="_blank" rel="noopener noreferrer">GitHub</a>
```

---

### 1.2 Sistema tipográfico sem variáveis

**Diretriz 4.2 e tabela seção 7 (linha "Sistema tipográfico"):**

> "Pelo menos 4 tamanhos definidos como variáveis e reaproveitados com consistência."

Você fez o `:root` direitinho pras cores (`style.css:9-15`), mas pra tamanho de fonte tem valores hardcoded espalhados: `2.2rem` (h1), `1.5rem` (h2), `1rem` (p), `14px` (footer). Quatro tamanhos diferentes, escritos na unha, em quatro lugares distintos.

**Por que essa regra existe:** quando os tamanhos viram variáveis, sua tipografia vira um *sistema*. Se você decidir amanhã que o texto base deve ser um pouquinho maior, muda *uma linha* e o site inteiro responde proporcionalmente. Sem variáveis, vira aquela bagunça onde "esse título está 2.2rem aqui mas 1.8rem ali" e ninguém entende mais a hierarquia.

**Como corrigir:**

No `:root`, adiciona uma escala. Sugestão (você escolhe os números):

```css
:root {
  /* cores */
  --bg: #f5f1eb;
  --card: #e8dfd6;
  --primary: #a47148;
  --secondary: #c8a27a;
  --text: #3e2f23;

  /* tipografia */
  --fs-xs:   0.875rem;  /* 14px - footer, captions */
  --fs-sm:   1rem;      /* 16px - corpo de texto */
  --fs-md:   1.5rem;    /* 24px - h2 */
  --fs-lg:   2.2rem;    /* ~35px - h1 */

  /* espaçamentos */
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 20px;
  --space-lg: 40px;
}
```

Depois no CSS, troca:

```css
header h1   { font-size: var(--fs-lg); }
h2          { font-size: var(--fs-md); }
p           { font-size: var(--fs-sm); }
footer      { font-size: var(--fs-xs); }
```

Aproveita pra trocar também os espaçamentos (`padding: 20px`, `margin-bottom: 40px`, `gap: 15px`) por `var(--space-md)`, `var(--space-lg)`, etc. — a diretriz pede espaçamentos como variáveis também.

---

### 1.3 Zero responsividade — sem `@media` no arquivo inteiro

**Diretriz 4.2 e tabela seção 7 (linha "Responsividade"):**

> "Pelo menos dois breakpoints diferentes. A página não pode quebrar em 360px nem em 1920px."

Procurei `@media` no seu `style.css` — não tem nenhum. A página é desenhada pra desktop e simplesmente quebra em telas pequenas: as imagens da galeria têm `width: 250px` fixo (`style.css:138`), o `<input>` do terminal só tem `width: 100%` mas o card inteiro não respira, o `<nav>` quebra mal em mobile, o botão de tema fica num lugar estranho.

Abre seu `index.html` no Chrome → F12 → ícone de celular (modo responsivo) → escolhe "iPhone SE" (375px). Repara que:

- O título principal sobra
- A nav quebra em duas linhas amontoadas
- As imagens da galeria empurram a tela pra fora

**Por que essa regra existe:** mais de 60% do tráfego web hoje é mobile. Um cartão de visita que só funciona em desktop é, na prática, um cartão de visita que metade das pessoas vê quebrado.

**Como corrigir:** adiciona pelo menos dois `@media` no final do `style.css`. Sugestão de pontos de corte:

```css
/* tablet */
@media screen and (max-width: 1024px) {
  body {
    padding: 16px;
  }

  header h1 {
    font-size: 1.8rem;
  }

  .galeria img,
  .galeria iframe {
    width: 220px;
    height: 160px;
  }
}

/* mobile */
@media screen and (max-width: 600px) {
  header h1 {
    font-size: 1.5rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  nav a {
    margin: 0;
    padding: 6px 0;
  }

  .galeria img,
  .galeria iframe {
    width: 100%;
    max-width: 320px;
    height: auto;
    aspect-ratio: 16 / 10;
  }

  section {
    padding: 16px;
  }
}
```

Testa em 360px, 768px, 1024px e 1920px no DevTools antes de reentregar.

---

### 1.4 Pasta `assets/` ausente — imagens vindas de URL temporária do LinkedIn

**Diretriz seção 5 (estrutura mínima) e tabela seção 7 (linha "Mídia + organização"):**

> "Estrutura mínima: `index.html`, `style.css`, `script.js`, `assets/`, `README.md`."

Suas três fotos vêm de URLs do LinkedIn (`index.html:56-60`):

```
https://media.licdn.com/dms/image/v2/.../?e=1780531200&v=beta&t=...
```

Esses URLs **expiram** (esse `e=1780531200` é um timestamp Unix de expiração — abril de 2026). Daqui a um mês as imagens da sua página somem.

**Por que essa regra existe:** o cartão de visita tem que sobreviver sozinho. Imagem hospedada no LinkedIn, Instagram, Drive público, etc., depende da plataforma manter aquele link vivo — e nenhuma delas garante isso. Foto na pasta `assets/` é foto que dura.

**Como corrigir:**

1. Cria uma pasta `assets/` na raiz do projeto.
2. Baixa as 3 fotos do LinkedIn (botão direito → salvar imagem). Renomeia pra algo legível: `formatura-2025.jpg`, `japao-2024.jpg`, `simes-2025.jpg`.
3. Coloca em `assets/`.
4. Troca os `<img src="...">`:

```html
<div class="galeria">
  <img src="assets/formatura-2025.jpg" alt="Formatura do curso técnico em Administração na Escola do Sebrae, 2025" loading="lazy">
  <img src="assets/japao-2024.jpg" alt="Pedro durante o período morando no Japão, 2024" loading="lazy">
  <img src="assets/simes-2025.jpg" alt="Pedro na Missão Nova York representando o Brasil no Global Innovation Challenge, 2025" loading="lazy">
  <iframe src="https://www.youtube.com/embed/f7SS57LFPco" title="Apresentação em vídeo" allowfullscreen loading="lazy"></iframe>
</div>
```

**Bônus que arrumo junto aqui:** seus `alt` atuais ("Formatura 2025", "Japão 2024", "Simes 2025") são curtos demais. A diretriz pede `alt` **descritivo** — alguém usando leitor de tela tem que entender *o que está acontecendo* na foto, não só o ano. E o `<iframe>` precisa de `title` (acessibilidade) — sem ele, leitor de tela só anuncia "frame".

---

### 1.5 Dark mode sem persistência e sem `prefers-color-scheme`

**Diretriz 4.4 e tabela seção 7 (linha "Tema claro/escuro"):**

> "Toggle visível, troca via variáveis CSS, persistência em `localStorage`, respeitar `prefers-color-scheme` na 1ª visita."

Você fez metade — a parte visual (`style.css:18-24`) e o toggle (`script.js:29-40`). Mas:

- **Não salva em `localStorage`.** Se o usuário escolhe o modo escuro e recarrega a página, volta pro claro. Frustrante.
- **Não respeita `prefers-color-scheme`.** Se o sistema do usuário está em modo escuro, sua página abre no claro mesmo assim.

**Por que essa regra existe:** tema escolhido é preferência forte do usuário. Quem usa modo escuro de noite *odeia* tomar um flash branco toda vez que abre o site. E quem já tem o sistema todo em dark espera que sua página entenda isso de cara.

**Como corrigir:**

Substitui o bloco do tema no `script.js` por algo assim:

```js
// ===== TEMA CLARO/ESCURO =====
const toggle = document.getElementById("theme-toggle");
const STORAGE_KEY = "tema-pedro";

function aplicarTema(tema) {
  if (tema === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
    toggle.setAttribute("aria-label", "Mudar para tema claro");
  } else {
    document.body.classList.remove("dark");
    toggle.textContent = "🌙";
    toggle.setAttribute("aria-label", "Mudar para tema escuro");
  }
}

// 1. tenta o que está salvo
const salvo = localStorage.getItem(STORAGE_KEY);

// 2. se nada salvo, usa a preferência do sistema
const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

aplicarTema(salvo ?? (prefereDark ? "dark" : "light"));

// 3. toggle salva escolha
toggle.addEventListener("click", () => {
  const atual = document.body.classList.contains("dark") ? "dark" : "light";
  const novo = atual === "dark" ? "light" : "dark";
  aplicarTema(novo);
  localStorage.setItem(STORAGE_KEY, novo);
});
```

A lógica em ordem:

1. Tenta ler do `localStorage` o que o usuário escolheu antes.
2. Se não tem nada salvo (1ª visita), olha o `prefers-color-scheme` do sistema.
3. Aplica o tema decidido.
4. Toda vez que o usuário clica, salva a nova escolha.

---

### 1.6 Faltam meta tags (description, Open Graph) e favicon

**Diretriz 4.5 e tabela seção 7 (linha "SEO/Meta"):**

> "Meta description, Open Graph (og:title, og:description, og:image), favicon."

Seu `<head>` (`index.html:3-9`) tem só o básico: charset, viewport, title, links de CSS e fontes. Falta:

- `<meta name="description">` — texto que aparece embaixo do título no Google
- `<meta property="og:...">` — o que aparece quando alguém cola seu link no WhatsApp, LinkedIn, Discord etc.
- `<link rel="icon">` — o iconezinho da aba

**Por que essa regra existe:** quando alguém compartilha seu link no LinkedIn, hoje aparece "Pedro Soares Moreira" e nada mais. Com Open Graph configurado, aparece um card bonito com sua foto, um título e uma descrição — o tipo de detalhe que distingue um portfólio amador de um profissional.

**Como corrigir:**

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Pedro Soares Moreira — Engenharia da Computação</title>
  <meta name="description" content="Cartão de visita digital de Pedro Soares Moreira, estudante de Engenharia da Computação no Ibmec.">

  <!-- Open Graph (LinkedIn, WhatsApp, Discord) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Pedro Soares Moreira — Engenharia da Computação">
  <meta property="og:description" content="Cartão de visita digital — sobre, habilidades e contato.">
  <meta property="og:image" content="assets/og-image.jpg">
  <meta property="og:url" content="https://psmoreiraa.github.io/ibtech/">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/favicon.png">

  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600&display=swap" rel="stylesheet">
</head>
```

A `og:image` precisa existir no `assets/` — pode ser uma foto sua, ou um print bonito da própria página em 1200x630px (proporção padrão de OG).

---

## 2. Flags

Esses não derrubam isoladamente, mas a tabela de avaliação cita cada um deles. Se você corrige só os bloqueadores acima e deixa esses, vira reprovação por acúmulo.

### 2.1 `:focus-visible` sem estilização — foco invisível em navegação por teclado

**Tabela seção 7 — critério "Acessibilidade":**

> "Foco visível em links e botões (`:focus-visible` com outline claro)."

Você não definiu `:focus-visible` em lugar nenhum no CSS. Quando o usuário navega só com Tab (teclado, sem mouse), ele precisa enxergar em qual elemento o foco está agora — senão fica perdido. O navegador tem um outline padrão, mas em vários temas e botões ele fica invisível ou bem fraco.

**Como corrigir:**

```css
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-radius: 4px;
}
```

Teste fechando o mouse e usando Tab pra percorrer a página — você tem que ver o foco saltando claramente de elemento em elemento.

### 2.2 Botão de tema e input sem `aria-label` / `<label>`

**Tabela seção 7 — critério "Acessibilidade":**

Dois pontos:

**Botão de tema** (`index.html:19`): tem só o emoji 🌙 como conteúdo. Pra leitor de tela, um emoji sozinho não conta como rótulo. Adiciona:

```html
<button id="theme-toggle" aria-label="Mudar para tema escuro">🌙</button>
```

(E no JS atualiza o aria-label quando alterna — já está incluído na correção do bloqueador 1.5.)

**Input do terminal** (`index.html:72`): tem `placeholder="ex: whoami"` mas nenhum `<label>`. Placeholder **não substitui label** — ele some quando o usuário começa a digitar e nem sempre é lido por leitor de tela.

```html
<label for="input" class="sr-only">Comando do terminal</label>
<input type="text" id="input" placeholder="ex: whoami">
```

E no CSS, classe utilitária pra esconder visualmente mas manter pra leitor de tela:

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 2.3 `<br><br>` pra espaçar dentro do contato

**Diretriz 4.1:**

> "Nada de estilo inline (`style="..."`) nem `<br>` pra espaçar. Espaçamento é CSS."

`index.html:82`:

```html
<button id="copy-btn">Copiar email</button><br><br>
<a href="..." target="_blank">LinkedIn</a><br>
<a href="..." target="_blank">GitHub</a>
```

**Por que essa regra existe:** `<br>` tem significado semântico de quebra de linha forçada (endereço postal, letra de música — coisas onde a quebra faz parte do conteúdo). Espaçar visualmente "Copiar email" do bloco de links não é semântica, é layout. Layout é CSS.

**Como corrigir:**

```html
<section id="contato">
  <h2>Contato</h2>

  <p id="email">Email: pedrosmoreira34@gmail.com</p>
  <button id="copy-btn">Copiar email</button>

  <div class="redes">
    <a href="https://www.linkedin.com/in/pedro-soares-moreira" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="https://github.com/psmoreiraa" target="_blank" rel="noopener noreferrer">GitHub</a>
  </div>
</section>
```

```css
#contato {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

#contato .redes {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
```

Resultado idêntico (ou melhor) e sem `<br>`.

### 2.4 Conflito no hover das `section` com a animação de entrada

**Bug visual silencioso.** Você tem (`style.css:79-103`):

```css
section {
  /* ... */
  opacity: 0;
  transform: translateY(20px);
  transition: 0.6s;
}

section.show {
  opacity: 1;
  transform: translateY(0);
}

section:hover {
  transform: translateY(-5px);
}
```

O problema: a regra `section:hover` sobrescreve o `transform: translateY(0)` da classe `.show`. Quando você passa o mouse num card, ele "pula" 5px pra cima — e quando você tira o mouse, ele volta — mas se isso acontece *durante* a animação de entrada, o card glitcha visualmente.

**Como corrigir:** restringe o hover só quando o card já está visível e usa uma propriedade composta pra não conflitar:

```css
section.show:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
```

Ou separa em uma classe própria pro card (`.card`) e aplica o hover só nela, deixando a `section` "neutra" pra animação.

### 2.5 Menu mobile inexistente

**Diretriz 4.4 — checklist seção 8:**

> "Interação JS extra (escolha 1+) — menu mobile hambúrguer / modal / typewriter / contador / filtro."

Você já tem o **terminal** (que cumpre esse critério com folga, é interação JS extra de verdade), então tecnicamente isso aqui não é um bloqueador isolado. Mas: como sua nav atual quebra em mobile (`index.html:21-26` — 4 links horizontais sem responsividade), seria bom transformar em hambúrguer dentro do breakpoint mobile do bloqueador 1.3.

Se quiser fazer, esqueleto:

```html
<button id="menu-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
<nav id="main-nav">
  <a href="#sobre">Sobre</a>
  <!-- ... -->
</nav>
```

```css
#menu-toggle { display: none; }

@media screen and (max-width: 600px) {
  #menu-toggle {
    display: inline-block;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 14px;
    cursor: pointer;
  }
  nav {
    display: none;
    flex-direction: column;
  }
  nav.aberto {
    display: flex;
  }
}
```

```js
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});

// fechar com Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("aberto")) {
    nav.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// fechar clicando fora
document.addEventListener("click", (e) => {
  if (!nav.classList.contains("aberto")) return;
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
```

Opcional, mas eleva muito a entrega.

### 2.6 README minimalista demais

**Tabela seção 7 — critério "README":**

Seu README (`readme.md`) está limpo, mas curto. Faltam itens que a diretriz cita:

- Print/screenshot da página
- Lista das principais features (tema claro/escuro, terminal interativo, botão copiar email, animação de entrada)
- Como acessar online (você já tem o link, mas só no final)

Sugestão de estrutura:

```markdown
# Cartão de Visita — Pedro Soares Moreira

> Cartão de visita digital desenvolvido para a trilha Frontend 2026.1 do IbTech.

![Captura do site](assets/screenshot.png)

## Sobre

Página estática com HTML, CSS e JavaScript vanilla. Sem frameworks.

## Features

- Tema claro/escuro com persistência em `localStorage`
- Terminal interativo (comandos: `whoami`, `skills`, `contact`)
- Botão "copiar email" com Clipboard API
- Animação de entrada das seções via IntersectionObserver
- Responsivo (320px → 1920px)

## Tecnologias

- HTML5
- CSS3 (variáveis, Flexbox, Media Queries)
- JavaScript (ES6+)

## Como rodar

```bash
git clone https://github.com/psmoreiraa/ibtech.git
cd ibtech
# abrir index.html no navegador
```

## Acesso online

https://psmoreiraa.github.io/ibtech/

## Autor

Pedro Soares Moreira — [LinkedIn](https://www.linkedin.com/in/pedro-soares-moreira) · [GitHub](https://github.com/psmoreiraa)
```

### 2.7 Terminal sem comando `help` — usuário fica perdido

O terminal interativo é a parte mais criativa do site (eu já citei no "O que já está bom"), mas tem um problema de UX importante: quem abre a página não tem **nenhuma pista** de quais comandos existem. O código aceita só `whoami`, `skills` e `contact` — qualquer outra coisa cai no `else` e mostra "Comando não reconhecido" (`script.js:7-26`).

**Por que isso importa:** terminal sem affordance é terminal morto. O usuário digita "olá", recebe "Comando não reconhecido", e fecha a página. Você fez a feature mais legal do site e ela fica invisível pra 90% das pessoas que tentam usar.

`help` é o comando universal — toda CLI séria (bash, git, npm, docker) responde a `help` ou `--help` listando o que faz. É a primeira coisa que qualquer pessoa minimamente acostumada com terminal vai tentar. E pra quem nunca viu terminal, vale também colocar uma dica visual fixa do lado do prompt ou na mensagem de boas-vindas.

**Como corrigir:**

No `script.js`, adicione mais um `else if` no início da cadeia (`script.js:13-21`):

```javascript
if (command === "help") {
    response = `Comandos disponíveis:
  whoami   — quem sou eu
  skills   — minhas habilidades
  contact  — meu e-mail
  clear    — limpar o terminal
  help     — esta lista`;
} else if (command === "clear") {
    output.innerHTML = "";
    input.value = "";
    return;
} else if (command === "whoami") {
    // ... resto continua
```

Bônus do `clear` (que vem de graça): também é um comando-padrão que qualquer pessoa espera num terminal. O `return` corta a execução antes do `output.innerHTML +=` pra não imprimir nada depois de limpar.

**Reforço visual** — adicione uma mensagem de boas-vindas dentro do `<div id="output">` no HTML (logo no `index.html`, dentro do bloco do terminal):

```html
<div id="output">
    <p>Digite <strong>help</strong> e aperte Enter pra ver os comandos disponíveis.</p>
</div>
```

Assim a pessoa não precisa adivinhar — a primeira linha do terminal já entrega a chave da feature inteira.

---

## 3. Pontos menores

Polimento. Não pesam na nota, mas melhoram o resultado.

- **Cor hardcoded no footer** (`style.css:203` — `color: #94a3b8`). Quando você fizer o trabalho do bloqueador 1.2, troca por `var(--secondary)` ou cria uma `--footer-text`.
- **`loading="lazy"` ausente em imagens.** Já incluí na correção do bloqueador 1.4, mas reforçando: pra imagens "below the fold" (todas as suas três), `loading="lazy"` evita carregar antes do usuário rolar até lá.
- **Imagens e iframe com mesmo tamanho fixo.** Em `style.css:137-143`, `img, iframe { width: 250px; height: 180px; }` força tudo no mesmo retângulo — mas o iframe do YouTube fica espremido e perde controles na proporção. Considera dar tamanhos separados:
  ```css
  .galeria img { width: 250px; height: 180px; object-fit: cover; }
  .galeria iframe { width: 320px; height: 180px; }
  ```
- **Inconsistência no nome.** O `<title>` da página diz "Pedro Soares Moreira" (`index.html:6`) mas seu GitHub é `psmoreiraa` (sugerindo Sobreira ou outra grafia). Só confere se é o nome que você quer mesmo — não é erro técnico, é só algo pra você decidir.
- **README sem `node_modules` nem `.DS_Store` na pasta** (verifiquei e está limpo) — perfeito, só não esquece no futuro.
- **A frase de apresentação ("Engenharia da Computação") está bem curta.** A diretriz pede "frase de apresentação" — uma linha que diga *quem você é além do curso*. Algo tipo "Estudante de Engenharia da Computação, fascinado por hardware e software." Já está parecido no seu texto da seção Sobre, só puxa pro topo.
- **Falta um avatar/foto sua no topo.** Diretriz menciona "foto/avatar" no conteúdo obrigatório. Suas fotos na galeria são do dia-a-dia, mas não tem uma foto de perfil dedicada perto do nome. Adiciona uma `<img class="avatar" src="assets/avatar.jpg" alt="Foto de perfil de Pedro">` no header.

---

## Checklist de reentrega

Marca conforme for resolvendo (sugestão de ordem):

**Estrutura e segurança (rápido):**

- [ ] Adicionar `rel="noopener noreferrer"` nos dois `target="_blank"`
- [ ] Adicionar meta description, Open Graph (title, description, image, url) e favicon no `<head>`
- [ ] Criar pasta `assets/`, baixar as 3 fotos do LinkedIn e referenciar localmente
- [ ] Reescrever os `alt` das imagens de forma descritiva
- [ ] Adicionar `title` no iframe do YouTube
- [ ] Adicionar foto de perfil/avatar no header

**CSS (variáveis + responsividade):**

- [ ] Criar variáveis de tipografia (mínimo 4 tamanhos) no `:root`
- [ ] Criar variáveis de espaçamento no `:root`
- [ ] Substituir tamanhos de fonte e espaçamentos hardcoded por `var(...)`
- [ ] Adicionar 2 breakpoints (`@media`) — sugiro 1024px e 600px
- [ ] Testar em 360px, 768px, 1024px e 1920px no DevTools
- [ ] Estilizar `:focus-visible` em links, botões e input
- [ ] Trocar `section:hover` pra `section.show:hover` (evitar conflito de animação)

**JavaScript (tema):**

- [ ] Salvar tema escolhido em `localStorage`
- [ ] Aplicar `prefers-color-scheme` na primeira visita
- [ ] Adicionar `aria-label` no botão de tema (atualizar no toggle)

**HTML (acessibilidade e semântica):**

- [ ] Substituir `<br><br>` da seção contato por flexbox + gap
- [ ] Adicionar `<label class="sr-only">` no input do terminal

**Polimento:**

- [ ] Atualizar README com features, screenshot e instruções
- [ ] Adicionar comandos `help` e `clear` no terminal + mensagem de boas-vindas
- [ ] (Opcional, recomendado) Transformar a nav em menu hambúrguer no breakpoint mobile

---

## Considerações finais

Pedro, o que você entregou tem espinha sólida: HTML semântico no esqueleto, IntersectionObserver no JS, Clipboard API funcionando, e o **terminal interativo** é uma das ideias mais criativas que vi nessa trilha — guarda essa sensação de "fazer algo divertido" pros próximos projetos, porque é justamente o que diferencia portfólios bons de portfólios memoráveis.

Os bloqueadores aqui são essencialmente **escopo da diretriz** que ainda não foi coberto: responsividade não existe, variáveis de tipografia faltam, persistência de tema não foi feita, meta tags não foram configuradas. Nenhum deles é difícil — todos seguem padrões que já estão na sua cabeça (variáveis CSS você já usa pra cores, é só estender). É trabalho de fechar detalhes, não de redesenhar nada.

Algumas dicas práticas pra reentrega:

- **Testa em DevTools com calma.** F12 → modo responsivo → percorre 360px, 768px, 1024px, 1920px. Cada quebra você vê na hora.
- **IA é ferramenta, não autora.** Se usar GPT/Claude pra entender um conceito (tipo `prefers-color-scheme`), ótimo. Mas escreve o código você mesmo — só assim ele gruda na cabeça.
- **Faz item por item sem pressa.** Marca o checklist, testa cada correção isolada antes da próxima. Quando tudo estiver verde, aí sim reentrega.

Boa sorte, e mantém a vibe do terminal.
