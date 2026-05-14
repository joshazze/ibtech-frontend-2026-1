# Revisão — Projeto 01 Cartão de Visita

**Aluna:** Luiza Paviotti Penido
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Oi Luiza! Antes de qualquer coisa, respira: esta revisão é **longa e detalhada de propósito**, porque o objetivo aqui não é te dar uma nota, é te ensinar. Vou te explicar item por item o que cada parte da diretriz pede, **por que** ela existe, e **como** você implementa cada coisa — com código pronto pra você ler, entender e adaptar.

A página que você entregou tem uma **ideia visual bonita** (o menu céu estrelado, o gradiente roxo/rosa, a fonte "Dancing Script", o brilho dourado) — dá pra ver que você pensou na estética. Mas a diretriz desse projeto tem um monte de requisitos técnicos obrigatórios que ainda não estão no seu código. A boa notícia: você só tem dois meses de programação e ainda assim já fez um HTML/CSS que renderiza bonito. A parte que falta é mais **adicionar coisa nova** do que "consertar coisa errada".

Vou separar tudo em três níveis:

1. **O que falta adicionar** — itens da diretriz que ainda não existem no seu projeto. Maior parte da reentrega vai ser isso.
2. **O que precisa arrumar** — código que está lá mas com algum problema técnico.
3. **Detalhes de polimento** — coisas pequenas, ortografia, etc.

No final tem um checklist de reentrega e uma sugestão de ordem pra atacar.

---

## O que já está bom

Pra começar pelo que você acertou:

- **Estrutura semântica básica certa.** Você usou `<header>`, `<nav>`, `<main>`, `<section>` e `<footer>` no lugar certo — isso é mais do que metade das entregas costuma fazer.
- **Conteúdo essencial todo presente:** nome completo, frase de apresentação, avatar, sobre com 4 parágrafos, lista de habilidades, links pro LinkedIn / GitHub / e-mail. Os 6 itens da diretriz 3.1 estão lá.
- **`<details>` na seção Marcos** é uma escolha semântica muito boa — você usou a tag certa pra um acordeão (revela/esconde conteúdo). Muita gente faria isso com `<div>` e `<button>` e JavaScript; você usou a solução nativa do HTML.
- **Skills como "tags" visuais** — esteticamente bem feito, com a animação de hover.
- **`mailto:` no e-mail** — funciona, abre o cliente de e-mail do usuário.
- **Tem ideia criativa** — o menu virar um céu estrelado com texto pulsando em dourado é autoral. A diretriz valoriza isso. (A execução tem problema que a gente vai resolver mais abaixo, mas a *ideia* passa em criatividade.)

Agora vamos ao que falta e ao que precisa de ajuste.

---

## 1. O que falta adicionar

Esses são itens **obrigatórios** da diretriz que ainda não existem no seu projeto. Vou listar em ordem do mais simples pro mais demorado.

### 1.1 Mais fotos (você tem 1, precisa de 3)

**Diretriz 3.2:**

> "Pelo menos 3 fotos — podem ser suas em contextos diferentes, de projetos seus, de lugares onde esteve, de coisas que você fez. Ponto é mostrar visualmente quem você é além do texto."

Você tem só o `avatar.jpeg`. Precisa de **mais duas fotos no mínimo**.

**Como fazer:** escolhe duas fotos que conversem com seu texto. Por exemplo:
- Uma foto da época da comissão de formatura (já que você fala dela em "Marcos")
- Uma foto numa apresentação, evento, viagem, ou de algum projeto que você fez
- Pode ser foto sua, foto de algo que você fez, foto de lugar que você esteve

Coloca essas fotos numa pasta `assets/` e adiciona elas em alguma seção do seu HTML. Sugestão: dentro de cada `<details>` da seção Marcos, coloca uma foto correspondente:

```html
<details>
    <summary>Comissão Formatura</summary>
    <h3>Formatura 2025</h3>
    <img src="assets/formatura.jpeg" alt="Luiza com a comissão de formatura do Santo Agostinho" loading="lazy">
    <p>Me formei no colégio Santo Agostinho...</p>
</details>
```

E no CSS, pra a imagem não ficar gigante:

```css
details img {
    max-width: 100%;
    width: 400px;
    height: auto;
    border-radius: 12px;
    margin: 15px 0;
    display: block;
}
```

**Importante — o `alt`:** a diretriz diz que `alt` tem que ser **descritivo**, não genérico. "Minha foto" ou "foto" não passa. O alt é o que aparece quando a imagem não carrega, e o que leitor de tela lê pra quem não enxerga. Tem que descrever **o que está na imagem**: "Luiza com a comissão de formatura do Santo Agostinho", "Luiza na apresentação do projeto sustentável", etc.

Aproveita pra corrigir o alt do avatar (`index.html:21`):

```html
<img src="assets/avatar.jpeg" alt="Foto de Luiza Paviotti Penido" loading="lazy">
```

O `loading="lazy"` faz a imagem só carregar quando o usuário rolar até ela — ajuda a página a abrir mais rápido. Use em todas as imagens que **não** estão na primeira tela.

### 1.2 Vídeo embedded

**Diretriz 3.2:**

> "Pelo menos 1 vídeo embedded. Pode ser do YouTube, um clip seu hospedado, time-lapse de algum projeto, edição que você curtiu fazer. Faça sentido com a página."

Você tem um link "Galeria" no menu (`#midia`) mas a section `id="midia"` não existe no HTML — é um link quebrado. Esse é exatamente o lugar onde o vídeo entra.

**Como fazer:**

1. Escolhe um vídeo do YouTube que combine com a página. Pode ser de você falando, pode ser de algum lugar/evento, pode ser um time-lapse, pode ser um vídeo curto que você gostou e que faz sentido com a apresentação. Se não tiver vídeo seu, pode ser um vídeo que represente sua área de interesse (uma palestra TED sobre ciência de dados, por exemplo, se você quiser).

2. No YouTube, clica em "Compartilhar" → "Incorporar" → copia o código (ou só anota o ID do vídeo, que é a parte depois do `v=` na URL).

3. Adiciona no HTML, depois da seção "habilidades", uma nova section:

```html
<section id="midia">
    <h2>Galeria</h2>
    <div class="video-wrapper">
        <iframe
            src="https://www.youtube.com/embed/COLE_O_ID_DO_VIDEO_AQUI"
            title="Descrição curta do que o vídeo mostra"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
        </iframe>
    </div>
</section>
```

4. No CSS, pra ficar responsivo (não distorcer em telas diferentes):

```css
.video-wrapper {
    position: relative;
    width: 80%;
    max-width: 720px;
    margin: 30px auto;
    aspect-ratio: 16 / 9;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.video-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
```

**O que NÃO fazer:** não ative autoplay com áudio. A diretriz diz isso explícito ("a internet inteira odeia isso"). O iframe do YouTube já vem desligado por padrão, então se você só copiar o código sem mexer, está OK.

### 1.3 Botão de copiar e-mail

**Diretriz 4.4:**

> "Botão de copiar e-mail. Clipboard API. Feedback visual ('copiado!') por uns 2 segundos e volta ao normal."

Hoje seu e-mail é um link `mailto:` (`index.html:94`), que abre o cliente de e-mail. A diretriz pede um **botão que copia o endereço pra área de transferência** e mostra um feedback "copiado!". Isso é uma coisinha simples mas exige JavaScript.

**HTML** — substitui o atual card de e-mail por:

```html
<div class="card-contato">
    <h3>Email</h3>
    <button id="copiar-email" type="button" class="botao-copiar">
        luizapaviotti@icloud.com
    </button>
    <p id="mensagem-copiado" aria-live="polite"></p>
</div>
```

**CSS** — pra o botão parecer com os outros links em vez de botão padrão do navegador:

```css
.botao-copiar {
    background: none;
    border: none;
    color: #ffd700;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
}

.botao-copiar:hover {
    text-decoration: underline;
}

#mensagem-copiado {
    color: #ffd700;
    font-size: 0.9rem;
    margin-top: 8px;
    min-height: 20px;
}
```

**JavaScript** — esse é o ponto crucial. Você precisa criar um arquivo `script.js` na raiz do projeto. Volto a falar dele com mais calma na seção 1.6.

### 1.4 Tema claro/escuro

**Diretriz 4.4:**

> "Toggle de tema claro/escuro. Botão visível. Troca as variáveis CSS do `:root`. Salva a escolha no localStorage e respeita na próxima visita. Primeira visita, detecta o sistema com `prefers-color-scheme`."

Esse é o item que mais vai te dar trabalho, porque pra ele funcionar bem você precisa:

1. Reescrever o CSS pra usar variáveis (item 2.1 abaixo).
2. Adicionar um botão de toggle no HTML.
3. Escrever o JavaScript do toggle.

A ideia geral: você tem **dois conjuntos de cores** definidos no CSS — um pra tema claro, outro pra escuro. Um botão alterna entre eles. A escolha do usuário fica guardada no `localStorage` pra na próxima visita já abrir no tema que ele escolheu.

**HTML** — adiciona no `<header>`, antes de tudo:

```html
<button id="botao-tema" type="button" class="botao-tema" aria-label="Alternar tema">
    Tema claro
</button>
```

**CSS** — primeiro define os dois temas (mais detalhes no item 2.1):

```css
:root {
    /* tema escuro (padrão) */
    --cor-fundo-inicio: #0e013f;
    --cor-fundo-meio: #5f0386;
    --cor-fundo-fim: #a10482;
    --cor-texto: #ffffff;
    --cor-destaque: #ffd700;
    --cor-card: rgba(255, 255, 255, 0.08);
    --cor-borda: rgba(255, 255, 255, 0.2);
}

body.tema-claro {
    --cor-fundo-inicio: #fce4ec;
    --cor-fundo-meio: #e1bee7;
    --cor-fundo-fim: #d1c4e9;
    --cor-texto: #2a0a3e;
    --cor-destaque: #8e24aa;
    --cor-card: rgba(255, 255, 255, 0.5);
    --cor-borda: rgba(0, 0, 0, 0.1);
}
```

E estiliza o botão:

```css
.botao-tema {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--cor-destaque);
    color: var(--cor-fundo-inicio);
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
}
```

(O JavaScript vem no item 1.6.)

**Por que essa regra existe:** porque tema claro/escuro hoje é um padrão da web. Quem usa o computador no escuro odeia abrir uma página branca brilhante; quem está no sol não consegue ler texto branco sobre fundo escuro. Oferecer escolha é acessibilidade básica. E `prefers-color-scheme` é o sistema operacional dizendo "esse usuário prefere escuro/claro" — respeitar isso na primeira visita é UX cuidadosa.

### 1.5 Animação de entrada das seções

**Diretriz 4.4:**

> "Animação de entrada das seções conforme rolam pra viewport. Usa IntersectionObserver — não fica escutando scroll direto."

A ideia: quando a pessoa rola a página e uma seção entra na tela, ela aparece com um fade-in suave (em vez de já estar visível desde sempre).

**HTML** — adiciona a classe `animar-section` em cada `<section>`:

```html
<section id="sobre" class="animar-section">
    <!-- conteúdo -->
</section>

<section id="habilidades" class="animar-section">
    <!-- conteúdo -->
</section>

<!-- e assim por diante -->
```

**CSS:**

```css
.animar-section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.animar-section.aparecer {
    opacity: 1;
    transform: translateY(0);
}
```

(O JS que ativa isso vem no próximo item.)

**Por que `IntersectionObserver` e não scroll listener:** porque listener de scroll dispara *centenas de vezes por segundo* enquanto você rola — fica pesado. O `IntersectionObserver` é uma API otimizada do navegador que avisa **só quando** algo entra ou sai da tela.

### 1.6 Criar o arquivo `script.js`

Você não tem nenhum arquivo JavaScript no projeto. Precisa criar um chamado `script.js` na raiz, e conectar ele no HTML adicionando no `<head>`:

```html
<script src="script.js" defer></script>
```

(O `defer` faz o script só rodar depois do HTML carregar — boa prática.)

**O conteúdo do `script.js`** — junta tudo que mencionei acima (copiar e-mail, tema, animação) + um JS extra (item 1.7):

```javascript
// ===== TEMA CLARO/ESCURO =====
const botaoTema = document.querySelector('#botao-tema');

function atualizarTextoBotao() {
    if (document.body.classList.contains('tema-claro')) {
        botaoTema.textContent = 'Tema escuro';
    } else {
        botaoTema.textContent = 'Tema claro';
    }
}

function aplicarTemaInicial() {
    const temaSalvo = localStorage.getItem('tema');
    const sistemaPrefereClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (temaSalvo === 'claro') {
        document.body.classList.add('tema-claro');
    } else if (temaSalvo === 'escuro') {
        document.body.classList.remove('tema-claro');
    } else if (sistemaPrefereClaro) {
        document.body.classList.add('tema-claro');
    }

    atualizarTextoBotao();
}

aplicarTemaInicial();

botaoTema.addEventListener('click', function () {
    document.body.classList.toggle('tema-claro');

    if (document.body.classList.contains('tema-claro')) {
        localStorage.setItem('tema', 'claro');
    } else {
        localStorage.setItem('tema', 'escuro');
    }

    atualizarTextoBotao();
});

// ===== COPIAR E-MAIL =====
const botaoCopiar = document.querySelector('#copiar-email');
const mensagem = document.querySelector('#mensagem-copiado');

botaoCopiar.addEventListener('click', function () {
    navigator.clipboard.writeText('luizapaviotti@icloud.com');

    mensagem.textContent = 'E-mail copiado!';

    setTimeout(function () {
        mensagem.textContent = '';
    }, 2000);
});

// ===== ANIMAÇÃO DE ENTRADA =====
const secoes = document.querySelectorAll('.animar-section');

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('aparecer');
        }
    });
}, {
    threshold: 0.2
});

secoes.forEach(function (secao) {
    observador.observe(secao);
});
```

Lê cada bloco com calma. Não cola sem entender — a diretriz seção 9 diz claramente:

> "Você não saber explicar um trecho do seu próprio código quando perguntado. Se você não consegue explicar, você não fez."

Por bloco, o que cada um faz:
- **Tema:** pega o botão; quando clicado, adiciona/remove a classe `tema-claro` no `body`. As variáveis CSS mudam, o site inteiro reage. Salva a escolha no `localStorage`. Na primeira visita, checa se o sistema operacional prefere claro.
- **Copiar e-mail:** quando o botão é clicado, usa `navigator.clipboard.writeText()` pra copiar o texto. Mostra "E-mail copiado!" por 2 segundos.
- **Animação:** o `IntersectionObserver` "observa" cada section. Quando uma entra na tela (com pelo menos 20% visível), adiciona a classe `aparecer`, que o CSS usa pra animar.

### 1.7 Uma interação extra (escolha sua)

**Diretriz 4.4 — escolha uma:**

> "Menu mobile (hambúrguer) / Filtro de habilidades por categoria / Modal que abre com Esc / Efeito typewriter na frase de apresentação / Contador animado pros números"

Já que você gosta da fonte "Dancing Script" e da estética escrita, **efeito typewriter** combina muito com sua página. A ideia: a frase de apresentação aparece letra por letra, como se alguém estivesse digitando.

**HTML** — coloca a frase num span dedicado:

```html
<h4 id="frase-typewriter"></h4>
```

(Sem texto dentro — o JS vai colocando.)

**CSS** — adiciona um cursor piscando no final:

```css
#frase-typewriter::after {
    content: "|";
    animation: piscar-cursor 0.7s steps(1) infinite;
}

@keyframes piscar-cursor {
    50% { opacity: 0; }
}
```

**JavaScript** — adiciona no fim do `script.js`:

```javascript
// ===== EFEITO TYPEWRITER =====
const frase = document.querySelector('#frase-typewriter');
const texto = 'Construindo meu futuro com tecnologia';
let i = 0;

function digitar() {
    if (i < texto.length) {
        frase.textContent += texto.charAt(i);
        i++;
        setTimeout(digitar, 80);
    }
}

digitar();
```

A função `digitar()` adiciona uma letra a cada 80 milissegundos e chama a si mesma de novo até acabar a frase. Essa técnica de "função se chama de novo" se chama **recursão** — não precisa estudar isso a fundo agora, só entender o que está acontecendo.

### 1.8 Meta tags faltando

**Diretriz 4.1:**

> "Meta tags no `<head>`: charset, viewport, description, title com seu nome. Open Graph básico... og:title, og:description, og:image. Favicon configurado."

Você tem `charset`, `viewport` e `title`. Falta:

```html
<meta name="description" content="Cartão de visita pessoal de Luiza Paviotti Penido, estudante de Ciência de Dados e IA no IBMEC.">

<meta property="og:title" content="Luiza Paviotti Penido">
<meta property="og:description" content="Cartão de visita digital — estudante de Ciência de Dados e IA.">
<meta property="og:image" content="assets/avatar.jpeg">

<link rel="icon" href="assets/avatar.jpeg">
```

**Por que isso importa:** quando alguém compartilha o link da sua página no WhatsApp, Slack ou LinkedIn, é o Open Graph que define a prévia bonita (com imagem e descrição) que aparece. Sem Open Graph, vira só um link feio.

O favicon é aquele ícone pequeno que aparece na aba do navegador.

---

## 2. O que precisa arrumar no código existente

Esses são problemas no que você já tem — não falta adicionar, falta corrigir.

### 2.1 Variáveis CSS no `:root`

**Diretriz 4.2:**

> "Variáveis CSS (`:root`) pra paleta, tipografia e espaçamentos. Cor hardcoded espalhada pelo arquivo não passa."

Seu CSS hoje tem cores hardcoded em todo lugar: `#0e013f`, `#5f0386`, `#a10482`, `#cc0483`, `#ffd700`, `white`, `rgba(255,255,255,0.08)`, e por aí vai. Cada vez que você quer mudar uma cor, precisa achar todas as ocorrências dela espalhadas pelo arquivo.

**Como corrigir:** no topo do `style.css`, declara as variáveis. Já mostrei a estrutura no item 1.4 (tema claro/escuro), mas vou completar incluindo as variáveis de **tamanho de fonte** e **espaçamento** (diretriz 4.2 também pede 4 tamanhos de fonte como variáveis):

```css
:root {
    /* cores - tema escuro padrão */
    --cor-fundo-inicio: #0e013f;
    --cor-fundo-meio: #5f0386;
    --cor-fundo-fim: #a10482;
    --cor-texto: #ffffff;
    --cor-destaque: #ffd700;
    --cor-card: rgba(255, 255, 255, 0.08);
    --cor-borda: rgba(255, 255, 255, 0.2);

    /* tipografia */
    --fs-sm:   0.875rem;  /* 14px */
    --fs-base: 1rem;      /* 16px */
    --fs-md:   1.5rem;    /* 24px */
    --fs-lg:   2rem;      /* 32px */
    --fs-xl:   3rem;      /* 48px */

    /* espaçamentos */
    --espaco-sm: 10px;
    --espaco-md: 20px;
    --espaco-lg: 40px;
    --espaco-xl: 80px;
}

body.tema-claro {
    --cor-fundo-inicio: #fce4ec;
    --cor-fundo-meio: #e1bee7;
    --cor-fundo-fim: #d1c4e9;
    --cor-texto: #2a0a3e;
    --cor-destaque: #8e24aa;
    --cor-card: rgba(255, 255, 255, 0.5);
    --cor-borda: rgba(0, 0, 0, 0.1);
}
```

Depois, no resto do arquivo, **substitui** cada cor/tamanho hardcoded pela variável. Exemplos:

| Antes | Depois |
|---|---|
| `color: #333;` | `color: var(--cor-texto);` |
| `color: white;` | `color: var(--cor-texto);` |
| `background: linear-gradient(to bottom, #0e013f 0%, ...);` | `background: linear-gradient(to bottom, var(--cor-fundo-inicio) 0%, var(--cor-fundo-meio) 40%, var(--cor-fundo-fim) 100%);` |
| `color: #ffd700;` | `color: var(--cor-destaque);` |
| `background: rgba(255,255,255,0.08);` | `background: var(--cor-card);` |
| `font-size: 3rem;` | `font-size: var(--fs-xl);` |
| `font-size: 2rem;` | `font-size: var(--fs-lg);` |
| `font-size: 1.5rem;` | `font-size: var(--fs-md);` |
| `padding: 40px 20px;` | `padding: var(--espaco-lg) var(--espaco-md);` |

**Por que isso importa:** quando tudo usa variável, o tema claro/escuro funciona "sozinho" — você muda só o `:root` e a página inteira reage. Sem variáveis, o tema vira uma confusão de regras sobrescrevendo outras.

### 2.2 Hierarquia de títulos quebrada

**Diretriz 4.1:**

> "Hierarquia de títulos: um `<h1>` por página, `<h2>` pras seções principais, `<h3>` pras subseções. Não pula nível."

No seu `<header>` (`index.html:17-19`):

```html
<h5>Cartão de visita - IBTECH 2026.1</h5>
<h1>Luiza Paviotti Penido</h1>
<h4>Construindo meu futuro com tecnologia</h4>
```

Aqui tem **três problemas**:

1. **`<h5>` antes do `<h1>`** — pula níveis pra cima. Não pode.
2. **`<h4>` depois do `<h1>`** — pula `<h2>` e `<h3>`. Não pode.
3. Esses elementos não são *títulos* semânticos — são uma "etiqueta" e uma "frase de apresentação". Não deveriam ser `<h>`.

**Como corrigir:**

```html
<p class="etiqueta">Cartão de visita - IBTECH 2026.1</p>
<h1>Luiza Paviotti Penido</h1>
<p class="frase-apresentacao" id="frase-typewriter"></p>
<p>Estudante de Ciência de Dados e IA</p>
```

E no CSS, estiliza essas classes:

```css
.etiqueta {
    font-size: var(--fs-sm);
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.8;
}

.frase-apresentacao {
    font-size: var(--fs-md);
    margin: var(--espaco-sm) 0;
}
```

Mesma coisa na seção sobre (`index.html:38`) — você usa `<h4>` pra fazer um texto destacado. Vira `<p class="destaque">`. CSS:

```css
.destaque {
    font-size: var(--fs-md);
    font-style: italic;
    margin-bottom: var(--espaco-md);
}
```

**Regra prática:** `<h1>` a `<h6>` é pra **título de seção**, não pra texto que você quer só estilizar. Se é "texto grande", usa `<p>` ou `<span>` e estiliza com CSS.

### 2.3 Menu com `position: absolute` — refazer com Flexbox

**Diretriz 4.2:**

> "Layout com Flexbox e/ou Grid. `position: absolute` só quando faz sentido (ex: badge sobre avatar), nunca pra montar o esqueleto."

Seu menu (`style.css:53-75`) hoje é assim:

```css
.menu-ceu { position: relative; height: 200px; }
.item { position: absolute; }
.sobre {top: -330px; left: 10%; }
.habilidades {top: -300px; left: 80%; }
.midia {top: -90px; right: 90%; }
.marcos {top: -100px; left: 25%; }
.contato { top: -80px; left: 70%; }
```

Cada item do menu está com posição absoluta com valores chumbados em px e %. Isso é exatamente o que a diretriz **proíbe**, porque:

1. Em telas diferentes, os itens se sobrepõem ou saem da tela.
2. Em mobile (que tem largura ~360px), o `left: 80%` joga o item pra fora da tela.
3. Não há nenhuma garantia que os itens fiquem alinhados — você "adivinha" valor em px.

**Como corrigir:** o menu virar um Flexbox. A estética do "céu estrelado" você consegue manter — o que muda é a estrutura.

```css
.menu-ceu {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--espaco-md);
    padding: var(--espaco-lg) var(--espaco-md);
    position: relative;
}

/* o fundo de céu estrelado fica num pseudo-elemento atrás dos itens */
.menu-ceu::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
}

.item {
    position: relative;
    z-index: 1;
    color: var(--cor-texto);
    text-decoration: none;
    font-size: var(--fs-md);
    font-family: "Dancing Script", cursive;
    padding: var(--espaco-sm) var(--espaco-md);
    text-shadow:
        0 0 5px var(--cor-texto),
        0 0 10px var(--cor-texto),
        0 0 20px var(--cor-destaque);
    animation: piscar 5s infinite;
    transition: transform 0.4s;
}

/* APAGUE essas linhas abaixo, não são mais necessárias: */
/* .sobre, .habilidades, .midia, .marcos, .contato — todas com top/left/right */
```

**Apague também as classes `.sobre`, `.habilidades`, `.midia`, `.marcos`, `.contato` no CSS** — elas existem só pra posicionar cada item, e agora o Flexbox cuida disso automaticamente.

**Truques:**
- `flex-wrap: wrap` faz os itens quebrarem em mais linhas quando a tela for estreita (mobile).
- `gap` substitui margens entre itens — limpo.
- O efeito de céu estrelado fica num `::before` (pseudo-elemento) atrás dos links — visualmente fica parecido com o que você tinha, mas estruturado.

### 2.4 Responsividade — adicionar media queries

**Diretriz 4.2:**

> "Responsivo com media queries. No mínimo dois breakpoints (mobile e desktop). A página não pode quebrar em 360px nem em 1920px."

Seu CSS hoje tem **zero** media queries — então em celular (360px de largura), o conteúdo provavelmente está bagunçado: card de contato com `width: 250px` lado a lado não cabe, header com `font-size: 3rem` no nome estoura na tela, o footer fixo com `left: 13%` sai do lugar.

**Como corrigir:** adiciona no fim do CSS:

```css
/* tablet — até 1024px */
@media screen and (max-width: 1024px) {
    #sobre, details {
        width: 90%;
    }

    .card-contato {
        width: 220px;
    }
}

/* mobile — até 768px */
@media screen and (max-width: 768px) {
    header h1 {
        font-size: var(--fs-lg);
    }

    .menu-ceu {
        flex-direction: column;
        align-items: center;
    }

    #sobre, details {
        width: 95%;
        padding: var(--espaco-md);
    }

    .card-contato {
        display: block;
        width: 90%;
        margin: var(--espaco-md) auto;
    }

    footer {
        position: static;
        left: auto;
        transform: none;
        text-align: center;
        padding: var(--espaco-md);
    }

    .video-wrapper {
        width: 95%;
    }
}

/* mobile pequeno — até 380px */
@media screen and (max-width: 380px) {
    header h1 {
        font-size: var(--fs-md);
    }

    .item {
        font-size: var(--fs-base);
    }
}
```

**Pra testar:** abre o site no Chrome, aperta F12, clica no ícone de celular (canto superior esquerdo das DevTools), e simula 360px, 768px, 1024px e 1920px. Em cada tamanho a página tem que ficar bonita, sem texto saindo da tela e sem scroll horizontal.

### 2.5 Links externos sem `rel="noopener noreferrer"`

**Diretriz 4.1:**

> "Links externos com `target="_blank"` e `rel="noopener noreferrer"`."

Seus links de LinkedIn (`index.html:102`) e GitHub (`index.html:113`) têm `target="_blank"` mas não têm `rel`. Adiciona:

```html
<a href="https://www.linkedin.com/in/luiza-paviotti-penido-99766a408"
   target="_blank"
   rel="noopener noreferrer">
    linkedin.com/in/luizapp
</a>

<a href="https://github.com/Luiza-Paviotti-Penido"
   target="_blank"
   rel="noopener noreferrer">
    Meu GitHub
</a>
```

**Por que isso importa:** quando você abre uma página em nova aba (`target="_blank"`), essa página recebe acesso à página de origem (através de `window.opener`). Um site malicioso poderia, em tese, manipular a sua aba original. O `rel="noopener noreferrer"` corta esse acesso. É segurança padrão.

### 2.6 Estado de foco visível

**Diretriz 4.2:**

> "Estado de foco visível em todo elemento interativo. `outline: none` sem substituir por algo é falha de acessibilidade."

Hoje seu CSS não define nenhum `:focus`. Quando alguém navega pelo seu site usando **Tab** (em vez de mouse — gente cega faz isso, gente com deficiência motora faz isso), não dá pra ver onde o foco está.

**Como corrigir:** adiciona no fim do CSS:

```css
a:focus-visible,
button:focus-visible {
    outline: 3px solid var(--cor-destaque);
    outline-offset: 4px;
    border-radius: 4px;
}
```

`:focus-visible` é uma variação inteligente de `:focus` que só aparece quando o usuário está navegando pelo teclado (não quando clica com mouse) — fica menos intrusivo.

### 2.7 Bugs pequenos no CSS

Alguns errinhos técnicos que precisam ser corrigidos:

- **`transition: 0.4`** (`style.css:69`) — falta a unidade. CSS inválido, o navegador ignora. Corrige pra `transition: 0.4s` ou `transition: all 0.4s ease`.

- **`.hablidades-container`** (`style.css:165`) — typo. O HTML usa `.habilidades-container`. Essa regra do CSS está morta (nunca aplica). Corrige o nome ou apaga a regra inteira.

- **`color: white !important`** no `.item` (`style.css:59`) — `!important` é uma "arma nuclear" do CSS, força a cor mesmo contra qualquer outra regra. Você não precisa disso aqui — basta usar `color: var(--cor-texto);` e tá resolvido. `!important` deve ser **último recurso**, não primeiro.

- **`<Ul>`** com U maiúsculo (`index.html:80`). HTML aceita, mas convenção é tudo minúsculo. Corrige pra `<ul>`.

### 2.8 Link `#midia` morto

`index.html:28` aponta pra `#midia` mas não existe `<section id="midia">`. Quando você adicionar o vídeo (item 1.2), essa section vai existir e o link funciona automaticamente.

### 2.9 Footer fixo causa problema

`style.css:128-139` — o footer está `position: fixed` com `bottom: 15px; left: 13%;`. Isso significa que ele fica grudado na tela enquanto você rola, **em cima do conteúdo**. Em mobile fica especialmente ruim — sobrepõe o último card.

**Como corrigir:** tira o `position: fixed`. O footer vira um footer normal no final da página:

```css
footer {
    text-align: center;
    color: var(--cor-texto);
    font-size: var(--fs-base);
    padding: var(--espaco-md);
    margin-top: var(--espaco-xl);
    text-shadow:
        0 0 5px var(--cor-texto),
        0 0 10px var(--cor-destaque);
}
```

---

## 3. Detalhes de polimento

Não pesa na nota, mas vale corrigir antes de reentregar:

- **Erros de ortografia visíveis na página** (revise antes de reentregar):
  - `index.html:20` — "Ciencia" → **"Ciência"** (com acento)
  - `index.html:39` — "Meaple Bear" → **"Maple Bear"**, "relfete" → **"reflete"**
  - `index.html:41` — "softwar" → **"software"**
  - `index.html:64` — "trbalho" → **"trabalho"**
  - `index.html:72` — "Descubrindo" → **"Descobrindo"**, "de interessa" → **"me interessa"**
  - `index.html:78` — "priimeiro simestre" → **"primeiro semestre"**
  - `README.md:1` — "Pendio" → **"Penido"**
  - `README.md:4` — "objeito" → **"objetivo"**, "tragetória" → **"trajetória"**, "acedêmicas" → **"acadêmicas"**
  - `README.md:5` — "atraves" → **"através"**, "degradêforam" → **"degradê foram"**, "interessse" → **"interesse"**
  - `README.md:20` — "Desing" → **"Design"**

Cartão de visita é a primeira impressão profissional — ortografia conta. Tira 5 minutos no fim pra dar uma lida com calma.

- **README sem print da página** — recomendado pela diretriz, e você já tem o `print-site.png`. É só linkar:

  ```markdown
  ## Visual

  ![Página inicial](print-site.png)
  ```

- **README diz que tem "responsivo básico"** mas não tem nenhuma media query. Quando você adicionar a responsividade (item 2.4), aí sim o README está correto.

- **README diz "HTML e CSS"** como tecnologias — adiciona JavaScript depois que você criar o `script.js`.

---

## Checklist de reentrega

Vai marcando conforme for resolvendo. **Faz na ordem sugerida** — alguns itens dependem de outros (ex: você precisa fazer as variáveis CSS antes do tema claro/escuro funcionar).

**Primeiro: arrumar o que já existe**

- [ ] Criar `:root` com variáveis de cor, tipografia e espaçamento (item 2.1)
- [ ] Substituir todas as cores e tamanhos hardcoded por variáveis (item 2.1)
- [ ] Corrigir hierarquia de títulos no header e no #sobre (item 2.2)
- [ ] Refazer o menu com Flexbox em vez de `position: absolute` (item 2.3)
- [ ] Adicionar 3 media queries (item 2.4)
- [ ] Adicionar `rel="noopener noreferrer"` nos links externos (item 2.5)
- [ ] Adicionar `:focus-visible` (item 2.6)
- [ ] Corrigir `transition: 0.4` → `0.4s`, `<Ul>` → `<ul>`, typo `.hablidades-container`, tirar `!important` (item 2.7)
- [ ] Tirar `position: fixed` do footer (item 2.9)

**Depois: adicionar o que falta**

- [ ] Adicionar 2 fotos a mais (3 no total), todas com `alt` descritivo e `loading="lazy"` (item 1.1)
- [ ] Adicionar 1 vídeo embedded numa seção `#midia` (item 1.2)
- [ ] Trocar `mailto:` por botão de copiar com Clipboard API + feedback (item 1.3)
- [ ] Adicionar botão de toggle de tema no HTML (item 1.4)
- [ ] Adicionar classes `animar-section` em todas as `<section>` + CSS de animação (item 1.5)
- [ ] **Criar arquivo `script.js`** com tema, copiar e-mail, IntersectionObserver, e + 1 extra (itens 1.6 e 1.7)
- [ ] Conectar o script.js no `<head>` com `<script src="script.js" defer></script>`
- [ ] Adicionar meta description, Open Graph e favicon (item 1.8)

**No final**

- [ ] Revisar ortografia de tudo (HTML + README) (item 3)
- [ ] Linkar o print no README (item 3)
- [ ] Atualizar README mencionando JavaScript nas tecnologias (item 3)
- [ ] Testar a página em 360px, 768px, 1024px, 1440px e 1920px nas DevTools
- [ ] Testar trocar de tema, copiar e-mail, rolar a página vendo animações, dar Tab pelos links pra ver foco
- [ ] Commit final no GitHub antes do prazo

---

## Considerações finais

Luiza, esse projeto vai dar trabalho na reentrega — não vou mentir pra você. Mas isso **não é porque você fez errado**. É porque a diretriz desse projeto tem muito requisito técnico, e como esse é seu primeiro projeto de programação, várias coisas você nem teve aula ainda (Clipboard API, IntersectionObserver, variáveis CSS, JavaScript em geral).

O caminho que eu sugiro é o seguinte:

1. **Lê esta revisão inteira primeiro, sem mexer no código.** Pra entender o panorama todo.
2. **Começa pelo item mais simples e vai escalando.** A ordem do checklist está pensada pra isso — você vai resolver os "arrumar" antes dos "adicionar", e dentro dos "adicionar" vai do mais simples (mais fotos) pro mais complexo (criar `script.js`).
3. **Não tenta fazer tudo num dia.** Faz 2-3 itens por sessão, testa, salva, descansa. Programação cansa.
4. **Quando travar, abre as DevTools** (F12 no Chrome) e olha o "Console". Erros vermelhos ali geralmente dizem exatamente o que está quebrado.
5. **Pode usar IA pra te ajudar, MAS** lê o código que ela gerar, compara com o que ela explica, e se algum trecho você não entender, pergunta de novo. A diretriz seção 9.3 é clara: na avaliação, vão te pedir pra explicar trechos do seu código. Cole sem entender, reprova em "Autoria".

O lado bom: depois que você fizer essa reentrega completa, você vai ter aprendido em duas semanas o que muita gente leva um semestre inteiro pra aprender. Variáveis CSS, Clipboard API, IntersectionObserver, localStorage, media queries — são fundamentos que você vai usar em **todo** projeto frontend daqui pra frente.

Bom trabalho e boa sorte!
