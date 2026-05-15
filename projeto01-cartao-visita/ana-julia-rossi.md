# Revisão v2 — Projeto 01 Cartão de Visita

**Aluna:** Ana Júlia Rossi
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária
**Reentrega de:** revisão v1 (ver histórico no fim do arquivo central)

Oi Ana Júlia! Antes de tudo: **dá pra ver progresso de verdade desde a primeira versão.** O HTML não está mais embaralhado como antes (lembra das tags fechando em lugar errado e do conteúdo depois do `</html>`? isso sumiu), você adicionou o modo escuro funcionando com persistência, e criou a seção de galeria. Isso é evolução real — guarde essa sensação.

Dito isso, esta v2 ainda está num estágio de **rascunho avançado**: vários requisitos da diretriz ainda não estão na página, e há um bug que veio da v1 e não foi corrigido (o `alert` no copiar e-mail). Vou ser detalhada de propósito — o objetivo é te explicar o **porquê** de cada critério pra você fechar de vez na próxima rodada.

---

## O que já está bom

- **Progresso desde a v1.** O HTML está estruturado, o modo escuro foi adicionado e persiste, a galeria entrou. Você não estagnou — andou.
- **Identidade visual coerente.** A paleta rosa/lilás (`#d97fa6`, `#f3d8ff`, `#f8f4ef`) com a fonte Poppins tem personalidade. O "feel" da página é seu.
- **Animação de flutuar na foto** (`style.css:188-193`). Um `@keyframes flutuar` próprio, aplicado com `animation`. Limpo.
- **A "bolha" decorativa** (`style.css:85-95`) é uso *correto* de `position: absolute` — pra um detalhe visual, não pra montar layout. É exatamente o que a diretriz pede.
- **Reset CSS no topo** (`style.css:1-5`). Boa prática que falta em muitos projetos.
- **Modo escuro com persistência.** O tema salva em `localStorage` e o ícone troca entre 🌙 e ☀️ (`script.js:9-55`).
- **Links externos seguros.** Instagram, GitHub e LinkedIn com `target="_blank"` e `rel="noopener noreferrer"` (`index.html:163-189`).

---

## Bloqueadores

Pela tabela da seção 7 da diretriz, cada linha vermelha já basta pra reentrega. Aqui há sete — vou começar pelos que **consertam o que já existe**, e depois os que pedem **adicionar o que falta**.

### 1. As imagens não aparecem — caminho errado (`index.html:67, 131, 136`)

Este é o mais urgente porque hoje a página está **sem nenhuma imagem**. O HTML procura as fotos em `assets/minhafoto.jpg`, `assets/ibmec.jpg.jpeg` e `assets/estudando.jpg.jpeg` — mas **não existe uma pasta `assets/`** no repositório. As imagens estão soltas na raiz.

Duas formas de resolver (escolha uma):

- **Opção A (recomendada):** crie a pasta `assets/` e mova as três imagens pra dentro dela. Aí os caminhos do HTML ficam corretos. É o que a diretriz (seção 5) pede como estrutura.
- **Opção B:** mantenha as imagens na raiz e tire o `assets/` dos caminhos no HTML.

Aproveite e renomeie `ibmec.jpg.jpeg` e `estudando.jpg.jpeg` — o `.jpg.jpeg` é uma extensão dupla, provavelmente erro de salvamento. Deixe só `ibmec.jpg` e `estudando.jpg` (e ajuste no HTML).

### 2. Falta o vídeo embedded

A linha "Mídia" da tabela exige **3 fotos e 1 vídeo embedded**. As fotos existem (depois que o caminho for corrigido); o vídeo não. Adicione uma seção de vídeo:

```html
<section class="video-section" id="video">
    <h2>Um vídeo sobre o que me interessa</h2>
    <div class="video-wrap">
        <iframe
            src="https://www.youtube.com/embed/SEU_ID_AQUI"
            title="Vídeo escolhido por Ana Júlia"
            loading="lazy"
            allowfullscreen></iframe>
    </div>
</section>
```

```css
.video-wrap { max-width: 800px; margin: 2rem auto; }
.video-wrap iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
    border-radius: 20px;
}
```

### 3. Copiar e-mail usa `alert()` e não copia de verdade (`script.js:1-7`)

Este bug veio da v1 e ainda está aqui. Hoje, clicar no e-mail só dispara `alert("E-mail copiado!")` — mas **nada é copiado**. A mensagem afirma uma ação que não aconteceu.

A diretriz é explícita em dois lugares: a tabela seção 7 reprova quem "usa `alert()`", e a seção 4.5 lista `alert()` como o que **não vale** como interação. O correto é a **Clipboard API** com feedback visual na própria página.

Primeiro, no HTML, dê um `id` ao link do e-mail e um lugar pro feedback:

```html
<a class="email" id="email" href="mailto:ajuliarossim@gmail.com"
   data-email="ajuliarossim@gmail.com">
   ajuliarossim@gmail.com
</a>
<span id="email-feedback" class="email-feedback" role="status"></span>
```

No `script.js`, troque o bloco do `alert` por:

```js
const email = document.getElementById("email");
const feedback = document.getElementById("email-feedback");

email.addEventListener("click", async (evento) => {
    evento.preventDefault(); // impede de abrir o cliente de e-mail
    try {
        await navigator.clipboard.writeText(email.dataset.email);
        feedback.textContent = "E-mail copiado! ✓";
    } catch {
        feedback.textContent = "Não foi possível copiar.";
    }
    setTimeout(() => { feedback.textContent = ""; }, 2000);
});
```

### 4. Falta a animação de entrada com IntersectionObserver

A tabela tem uma linha só pra isso: as seções devem animar conforme entram na tela, usando `IntersectionObserver` (não um listener de scroll).

```css
.sobre-section,
.skills-section,
.galeria,
.contato-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.aparece {
    opacity: 1;
    transform: translateY(0);
}
```

```js
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("aparece");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach((s) => observador.observe(s));
```

### 5. Sem variáveis CSS — cores hardcoded espalhadas (`style.css`)

A tabela ("Variáveis e organização CSS") reprova "cores hardcoded espalhadas pelo arquivo". Hoje `#d97fa6`, `#f3d8ff`, `#f8f4ef`, `#555`, `#222`, `#666`, `#d96bb3` aparecem repetidos por todo o CSS. Junte tudo num `:root` no topo:

```css
:root {
    --rosa: #d97fa6;
    --rosa-forte: #d96bb3;
    --lilas: #f3d8ff;
    --creme: #f8f4ef;
    --texto: #222;
    --texto-suave: #555;
}
```

E troque os valores soltos por `var(--rosa)`, `var(--lilas)` etc. O *porquê*: com as cores num lugar só, mudar a paleta do site inteiro é editar uma linha. **Bônus:** isso também resolve metade do bloqueador 7 (tema), porque o modo escuro vira só uma troca de valores das variáveis.

### 6. Sem sistema tipográfico em variáveis (`style.css`)

A tabela ("Sistema tipográfico") pede 4+ tamanhos de fonte definidos como variáveis. Hoje os tamanhos estão chumbados e misturando unidades — `7rem`, `2.5rem`, `1.1rem`, `0.9rem`, mas também `35px` (`style.css:221`) e `20px` (`style.css:204`). Padronize em `rem` e leve pro `:root`:

```css
:root {
    /* ...cores... */
    --fs-sm: 0.9rem;
    --fs-base: 1.1rem;
    --fs-lg: 1.3rem;
    --fs-xl: 2.5rem;
    --fs-hero: clamp(2.5rem, 9vw, 7rem);
}
```

Use `var(--fs-hero)` no `h1`, `var(--fs-xl)` nos `h2`, e assim por diante.

### 7. Sem responsividade — zero media queries (`style.css`)

A tabela ("Responsividade") reprova "zero media queries". O CSS não tem nenhuma. Hoje o `h1 { font-size: 7rem }` (`style.css:60`) estoura num celular de 360px. Adicione pelo menos um breakpoint:

```css
@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        text-align: center;
        padding: 6rem 5%;
    }
    h1 { font-size: var(--fs-hero); line-height: 1.1; }
    .bolha { display: none; }
    nav { gap: 1.2rem; padding: 1.5rem 1rem; }
    .foto-container img { width: 18rem; height: 18rem; }
}
```

(O `clamp()` que sugeri no bloqueador 6 já ajuda o `h1` a se ajustar sozinho.)

> Você também precisa de **pelo menos uma interação JS extra** além das três obrigatórias (menu mobile, modal, contador, filtro...). Quando arrumar o menu pra mobile, transformá-lo num menu hambúrguer com JS já resolve esse ponto de uma vez.

---

## O que precisa arrumar (flags)

1. **Faltam `<main>` e `<footer>`** (`index.html`). As seções estão soltas direto no `<body>`. Envolva as seções de conteúdo num `<main>` e transforme a seção de contato (ou crie um trecho final) num `<footer>`. A diretriz pede essas tags semânticas.

2. **`</body>` e `<script>` duplicados no fim do HTML** (`index.html:193-199`). O arquivo fecha o `<body>` duas vezes e carrega o `script.js` duas vezes. Deixe só uma vez, assim:
   ```html
       <script src="script.js"></script>
   </body>
   </html>
   ```

3. **Tema sem `prefers-color-scheme`.** O modo escuro persiste, mas não respeita a preferência do sistema na primeira visita. Adicione no `script.js`:
   ```js
   const temaSalvo = localStorage.getItem("tema");
   const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
   if (temaSalvo === "escuro" || (temaSalvo === null && sistemaEscuro)) {
       document.body.classList.add("dark");
   }
   ```

4. **`onclick` inline no HTML + função duplicada no JS.** O botão de tema usa `onclick="modoEscuro()"` (`index.html:29`) e o `script.js` tem `modoEscuro` definida duas vezes (uma dentro do `window.onload`, `script.js:25`, e outra solta no fim, `script.js:56`, que não salva nada). Tire o `onclick` do HTML e ligue o botão por `addEventListener` no JS, e apague a função duplicada de baixo.

5. **Faltam meta tags no `<head>`** (`index.html`): `description`, Open Graph (`og:title`, `og:description`, `og:image`) e `favicon`. A diretriz (seção 4.1 e checklist) pede todas.

6. **README com lixo e stack incompleta.** O README tem uma linha `file:///C:/Users/rossi/Downloads/cartaodevisita/index.html` — um caminho local que vazou pro texto; apague. E a stack diz só "HTML5 · CSS3", mas o projeto tem JavaScript — inclua.

---

## Pontos menores

- **A seção "Linguagens" tem só um item** ("C"). Vale listar mais habilidades ou áreas de interesse — a diretriz fala em "habilidades **ou** áreas de interesse", então cabe colocar o que você está estudando.
- **`minhafoto.jpg` tem ~1,7 MB.** É bem pesado pra uma foto. Vale reduzir o tamanho (um exportador de imagem ou um site de compressão resolve) pra página carregar mais rápido.
- **Imagens da galeria sem `width`/`height` nem `loading="lazy"`** (`index.html:130-138`). Definir dimensões evita a página "pular" enquanto carrega.

---

## Checklist de reentrega

Sugestão de ordem — começa pelo que conserta o que já existe:

1. [ ] Criar a pasta `assets/` e mover as imagens pra ela (bloqueador 1)
2. [ ] Remover `</body>`/`<script>` duplicados (flag 2)
3. [ ] Trocar o `alert` pela Clipboard API com feedback (bloqueador 3)
4. [ ] Criar o `:root` com variáveis de cor e fonte (bloqueadores 5 e 6)
5. [ ] Adicionar media query de responsividade (bloqueador 7)
6. [ ] Animação de entrada com IntersectionObserver (bloqueador 4)
7. [ ] Adicionar a seção de vídeo (bloqueador 2)
8. [ ] Uma interação JS extra — menu hambúrguer é uma boa pedida
9. [ ] Envolver o conteúdo em `<main>` e criar `<footer>` (flag 1)
10. [ ] `prefers-color-scheme` + tirar `onclick` inline (flags 3 e 4)
11. [ ] Meta tags `description`/OG/favicon (flag 5)
12. [ ] Limpar o README (flag 6)
13. [ ] Testar em 360px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Ana Júlia, leia isto com calma e sem desânimo. A lista é longa, mas repare numa coisa: a maioria dos bloqueadores é **adicionar** algo ou **organizar** o que já está lá — não é refazer. E você já provou, da v1 pra cá, que consegue evoluir o projeto.

Uma sugestão de método: faça **um item do checklist por vez**, salve, abra a página no navegador e confira antes de passar pro próximo. Não tente fazer tudo de uma vez — é assim que erros se acumulam. Abra o DevTools (F12), use o modo responsivo pra testar 360px, e olhe o Console: se um JavaScript quebrar, o erro aparece lá.

E um recado importante da diretriz (seção 9): pode usar IA pra te ajudar, mas leia e entenda cada trecho — os exemplos de código acima estão aí pra você estudar, não só colar. A Diretoria Técnica pode te pedir pra explicar qualquer parte.

Você está no caminho. Faça item por item, sem pressa. Manda a v3.

---
*Revisão v2 por Josh — 2026-05-15*


---

# Histórico — Revisão v1

> A revisão abaixo é da **versão 1** do projeto (repositório `ibtech-projeto01-anajuliarossi`), mantida como registro da primeira entrega.

## Revisão — Projeto 01 Cartão de Visita

**Aluna:** Ana Júlia Rossi
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Oi Ana Júlia! Antes de qualquer coisa: dá pra ver que a ideia visual da sua página é bonita — a paleta rosa/lilás suave casa bem, a tipografia da Poppins ficou elegante, e a estrutura mental do que você quer mostrar (hero com nome grande, sobre, habilidades, contato) está toda certa. A revisão é detalhada de propósito: o objetivo não é só te dizer "refaz X", e sim te explicar o **porquê** de cada critério, pra que na reentrega (e nos próximos projetos) você já saiba a regra de cabeça.

A entrega ainda está num estágio de **rascunho** — falta conteúdo, falta JS, e o HTML está com a estrutura embaralhada (tags fechando em lugar errado, conteúdo depois do `</html>`). Esse é o motivo principal da reentrega. **A boa notícia:** o "esqueleto bonito" que você já fez é o mais difícil. Arrumando o HTML e completando o que falta, a página inteira destrava.

Vou separar em três níveis:

1. **Bloqueadores** — coisas que, pela tabela de avaliação da diretriz, derrubam a entrega. Tem que corrigir.
2. **Flags** — não derrubam sozinhas, mas se acumularem com os bloqueadores reprovam por consistência. Corrige antes da reentrega.
3. **Pontos menores** — polimento. Você decide se mexe.

No final tem um checklist de reentrega.

---

## O que já está bom

Pra começar pelo lado positivo:

- **Identidade visual coerente.** A paleta rosa-claro / lilás-pastel (`#d97fa6`, `#f3d8ff`, `#f8f4ef`) é agradável e tem personalidade. O "feel" da página é seu.
- **Hero com fonte gigante.** `h1 { font-size: 7rem }` (`style.css:61`) é uma escolha tipográfica corajosa e funciona bem em desktop — dá presença.
- **Animação de flutuar na foto** (`style.css:189-193`). Um `@keyframes` próprio, aplicado com `animation: flutuar 5s ease-in-out infinite`. Limpo e bonito.
- **A "bolha" decorativa** (`style.css:86-96`) é uso correto de `position: absolute` pra detalhe visual (e não pra montar layout — que é o que a diretriz quer).
- **Reset CSS no topo** (`style.css:1-5`) com `* { margin: 0; padding: 0; box-sizing: border-box }`. Boa prática, faltam em muitos projetos.
- **Links externos com `target="_blank"` e `rel="noopener noreferrer"`** nos três botões de rede social (`index.html:154-184`). Segurança correta — muita gente esquece o `rel` e a tabela de avaliação cita isso explicitamente.
- **Smooth scroll por âncora** funcionando — os links `#sobre`, `#habilidades`, `#contato` do `<nav>` apontam pras seções com os `id` correspondentes.

---

## 1. Bloqueadores

### 1.1 O HTML está estruturalmente quebrado

**Diretriz 4.1 (HTML semântico):**

> "Usar tags semânticas e fechar tudo direito. O HTML tem que validar."

Esse é o primeiro item porque ele afeta *todo o resto* da página. Abrindo o `index.html` no navegador, você consegue ver que falta a foto (porque a pasta `assets/` não existe) e que os botões de rede social aparecem soltos lá embaixo. O motivo é estrutural: o seu HTML tem tags fechando em ordem errada e conteúdo depois do `</html>`. O navegador "consegue" renderizar mesmo assim, mas o resultado é imprevisível.

Vou listar os problemas concretos:

| Linha | Problema |
|---|---|
| 62 | `</div>` extra fechando algo que não existe |
| 113 | `</section>` fechando, mas... |
| 114 | ...tem um `>` solto na linha de baixo (provavelmente sobrou de um copia-cola) |
| 116 | Outro `</section>` redundante |
| 139 | Abre `<div class="botoes">` mas **nunca fecha** essa div dentro do body — ela continua "aberta" |
| 142 | `</body>` aparece a primeira vez, no meio da `<section class="contato-section">` ainda aberta |
| 144 | `</section>` fechando a section depois do body — ordem invertida |
| 146 | `<script src="script.js">` aparece *fora* do body porque o body já fechou |
| 148-149 | `</body></html>` fechando *de novo* |
| 152-184 | Toda a `<div class="botoes">` com Instagram/GitHub/LinkedIn está **depois** do `</html>` — fora do documento |
| 186-188 | Mais um `</body></html>` (terceira vez) |

**Por que essa regra existe:** HTML é uma árvore de elementos. Quando uma tag fecha no lugar errado, o navegador tenta "consertar" sozinho — e o conserto que ele inventa quase nunca é o que você queria. Você acaba debugando uma página que está rodando um HTML diferente do que você escreveu.

**Como corrigir:** reescreve o `<body>` inteiro com a estrutura limpa abaixo. Note três coisas:

1. Adicionei `<header>`, `<main>` e `<footer>` (semântica que a diretriz pede — sua versão atual só tem `<nav>` e `<section>`).
2. Cada tag abre e fecha **uma vez**, na ordem certa.
3. O `<script>` vai dentro do `<body>`, no final, logo antes do `</body>`.

```html
<body>
    <header>
        <nav>
            <a href="#sobre">Sobre</a>
            <a href="#habilidades">Habilidades</a>
            <a href="#contato">Contato</a>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="texto">
                <p class="mini">Ciência de Dados &amp; IA · IBMEC</p>
                <h1>Ana Júlia Rossi</h1>
                <p class="descricao">Criatividade e tecnologia.</p>
            </div>

            <div class="foto-container">
                <img
                    src="assets/minhafoto.jpg"
                    alt="Retrato de Ana Júlia Rossi sorrindo"
                    width="400"
                    height="400"
                >
            </div>

            <div class="bolha" aria-hidden="true"></div>
        </section>

        <section class="sobre-section" id="sobre">
            <h2>Sobre mim</h2>
            <p>Tenho 20 anos, sou capixaba e atualmente moro em BH — me mudei com o objetivo de realizar a faculdade.</p>
            <p>A tecnologia ainda é uma área nova para mim, mas justamente por isso tenho buscado aprender cada vez mais através da faculdade e do IBTech. No momento, estou fazendo um curso de inglês para aprimorar a língua.</p>
            <p>Além disso, gosto muito de fazer atividades criativas e manuais como scrapbook, e também gosto de ler — meus gêneros favoritos são romance e suspense.</p>
        </section>

        <section class="skills-section" id="habilidades">
            <h2>Linguagens e interesses</h2>
            <ul class="skills">
                <li>HTML &amp; CSS</li>
                <li>JavaScript (iniciante)</li>
                <li>Linguagem C</li>
                <li>Python (estudando)</li>
                <li>Inglês</li>
                <li>Scrapbook &amp; atividades manuais</li>
            </ul>
        </section>

        <section class="contato-section" id="contato">
            <h2>Contato</h2>
            <p>Entre em contato comigo pelo e-mail abaixo:</p>

            <button class="email" type="button" data-email="ajuliarossim@gmail.com">
                ajuliarossim@gmail.com
            </button>
            <span class="email-feedback" aria-live="polite"></span>

            <div class="botoes">
                <a href="https://www.instagram.com/anaju_rossi/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://github.com/rossimelgacoanajulia-hash" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/ana-j%C3%BAlia-rossi-b692ab3b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Ana Júlia Rossi · IbTech Frontend 2026.1</p>
    </footer>

    <script src="script.js"></script>
</body>
```

**Dica de produtividade:** depois de salvar o arquivo, cola o conteúdo no [validator.w3.org](https://validator.w3.org/#validate_by_input) — ele lista os erros de HTML linha por linha. Se o validador disser "no errors", o esqueleto está bom.

---

### 1.2 Falta o `<header>`, `<main>` e `<footer>` semânticos

**Diretriz 4.1 e tabela seção 7 (linha "HTML semântico"):**

> "Usar `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` no lugar de `<div>` genérica em tudo."

A versão atual só usa `<nav>` e `<section>`. Não tem `<header>` envolvendo a navegação, não tem `<main>` envolvendo o conteúdo principal, não tem `<footer>` no rodapé.

**Por que essa regra existe:** leitores de tela (e o Google) usam essas tags pra entender as **regiões** da página: "isso é o cabeçalho", "isso é o conteúdo principal", "isso é o rodapé". Quando tudo é `<section>` ou `<div>`, a página vira uma sopa de blocos sem hierarquia.

**Como corrigir:** já está incluído no bloco do item 1.1 — `<header>` ao redor do `<nav>`, `<main>` ao redor das `<section>`, `<footer>` no final.

---

### 1.3 A pasta `assets/` não existe e a foto não carrega

**Diretriz 5 (estrutura mínima) e tabela seção 7 (linha "Mídia"):**

> "Pelo menos 3 fotos (avatar + 2 contextuais)."

`index.html:54` aponta `src="assets/minhafoto.jpg"`, mas a pasta `assets/` não existe no repo. Quando você abre a página, a área da foto fica vazia (com o texto do `alt` aparecendo se o navegador resolver mostrar).

Além disso, a diretriz pede **pelo menos 3 fotos** — você só previu uma. Pode ser: avatar + uma foto de algo que você gosta (scrapbook, livro favorito, paisagem do ES) + uma foto da turma/faculdade/algo de tecnologia.

**Como corrigir:**

1. Cria a pasta `assets/` na raiz do projeto.
2. Coloca as fotos lá dentro com nomes em **kebab-case sem espaço** (ex: `avatar.jpg`, `scrapbook.jpg`, `livro-favorito.jpg`).
3. Adiciona uma seção nova (ou amplia a "Sobre") com pelo menos mais duas fotos. Exemplo:

```html
<section class="galeria-section">
    <h2>Um pouco da minha rotina</h2>
    <div class="galeria">
        <figure>
            <img src="assets/scrapbook.jpg" alt="Página de scrapbook que fiz com colagens em tons pastéis" loading="lazy">
            <figcaption>Um dos meus scrapbooks favoritos.</figcaption>
        </figure>
        <figure>
            <img src="assets/livro.jpg" alt="Livro de suspense aberto sobre mesa de madeira" loading="lazy">
            <figcaption>Leitura da semana.</figcaption>
        </figure>
    </div>
</section>
```

E o CSS pra deixar lado a lado:

```css
.galeria-section { padding: 0 8% 8rem; max-width: 900px; }
.galeria { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.galeria figure { margin: 0; }
.galeria img { width: 100%; height: 280px; object-fit: cover; border-radius: 1rem; }
.galeria figcaption { font-size: var(--fs-sm); color: var(--cor-texto-secundario); margin-top: .5rem; }
```

**Importante — atributo `alt`:** evita `alt="foto"` ou `alt="imagem"`. O `alt` tem que **descrever** o que tem na foto pra quem não consegue ver (ex: leitor de tela). Comparar: `alt="foto"` (inútil) vs `alt="Retrato de Ana Júlia Rossi sorrindo"` (útil).

---

### 1.4 Falta o vídeo embedded

**Diretriz 3.2 e tabela seção 7 (linha "Mídia"):**

> "Pelo menos 1 vídeo embedded. Pode ser do YouTube, um clip seu hospedado, time-lapse de um projeto."

Não tem nenhum `<video>` nem `<iframe>` do YouTube na página. Pela tabela de avaliação, isso é uma linha vermelha automática.

**Por que essa regra existe:** o cartão de visita é pra mostrar você *além do texto*. Vídeo é a forma mais rica de fazer isso — pode ser você se apresentando, um time-lapse de um scrapbook seu, um vídeo do canal de algum tema que você curte. Qualquer coisa que adicione dimensão.

**Como corrigir:** embeda um vídeo do YouTube com `<iframe>`. Sugestão de combinar com seu perfil:

```html
<section class="video-section">
    <h2>Em vídeo</h2>
    <div class="video-wrapper">
        <iframe
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Vídeo de apresentação"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
        </iframe>
    </div>
</section>
```

CSS pra responsividade (proporção 16:9 sem distorcer):

```css
.video-section { padding: 0 8% 8rem; max-width: 900px; }
.video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    overflow: hidden;
}
.video-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
```

A diretriz pede: **com controles, sem autoplay com áudio**. O iframe do YouTube já vem com controles por padrão; pra não ter autoplay, **não** adicione `autoplay=1` na URL.

---

### 1.5 Falta o sistema de variáveis CSS (cores + tipografia + espaçamentos)

**Diretriz 4.2 e tabela seção 7 (linhas "Variáveis e organização CSS" e "Sistema tipográfico"):**

> "`:root` com paleta, tipografia e espaçamentos. Pelo menos 4 tamanhos de fonte como variáveis. Sem cores hardcoded espalhadas pelo arquivo."

O seu `style.css` não tem `:root` nenhum. Cores estão hardcoded direto nos seletores (`#f8f4ef`, `#222`, `#d97fa6`, `#d96bb3`, `#f3d8ff`, `#555`, `#666`, `white`), e tamanhos de fonte também (`7rem`, `0.9rem`, `1.3rem`, `2.5rem`, `1.1rem`, `1rem`).

**Por que essa regra existe:** variáveis CSS transformam sua estilização num **sistema**. Hoje, se você quiser trocar o rosa por roxo, vai ter que caçar `#d97fa6` em 6 lugares, `#d96bb3` em mais 4 (que provavelmente era pra ser a mesma cor, mas você cometeu um typo), `#f3d8ff` em 2 lugares... Com variáveis, você muda **uma linha** no `:root` e a página inteira responde. Mesma coisa pra tamanhos de fonte e espaçamentos.

E tem outra função, mais importante ainda: variáveis são a base pra fazer o **tema claro/escuro** funcionar (próximo bloqueador). Sem `:root` definido, dá pra fazer tema escuro, mas você acaba reescrevendo cada regra duas vezes — uma com cor clara, outra com cor escura.

**Como corrigir:** cria um `:root` no topo do CSS:

```css
:root {
    /* cores — tema claro (padrão) */
    --cor-fundo: #f8f4ef;
    --cor-superficie: #ffffff;
    --cor-texto: #222222;
    --cor-texto-secundario: #555555;
    --cor-texto-suave: #666666;
    --cor-rosa: #d97fa6;
    --cor-rosa-forte: #d96bb3;
    --cor-lilas: #f3d8ff;
    --cor-borda: rgba(0, 0, 0, 0.1);

    /* tipografia */
    --fs-xs:   0.75rem;   /* 12px - rótulos pequenos */
    --fs-sm:   0.9rem;    /* labels do nav, mini */
    --fs-base: 1rem;      /* texto base */
    --fs-md:   1.1rem;    /* parágrafos */
    --fs-lg:   1.3rem;    /* descrição da hero */
    --fs-xl:   2.5rem;    /* h2 das seções */
    --fs-xxl:  7rem;      /* h1 da hero */

    /* espaçamentos */
    --sp-xs: 0.5rem;
    --sp-sm: 1rem;
    --sp-md: 1.5rem;
    --sp-lg: 2rem;
    --sp-xl: 4rem;
    --sp-xxl: 8rem;
}
```

Depois, percorre o resto do arquivo trocando os valores hardcoded pelas variáveis. Exemplo do que muda no `body`:

```css
body {
    background: var(--cor-fundo);
    font-family: 'Poppins', sans-serif;
    color: var(--cor-texto);
    overflow-x: hidden;
}
```

Faz isso pra todos os elementos. O critério da tabela é satisfeito quando **toda cor e todo tamanho de fonte do site referencia uma variável**.

---

### 1.6 Falta tema claro/escuro

**Diretriz 3.2 e tabela seção 7 (linha "Tema claro/escuro"):**

> "Toggle visível, variáveis CSS, persistência no `localStorage`, respeitar `prefers-color-scheme` na primeira visita."

A página atual só tem tema claro. Não tem botão de toggle nem suporte a tema escuro.

**Por que essa regra existe:** tema escuro virou padrão em quase todo site moderno — usuário espera ter a opção. Além disso, esse exercício força você a praticar três conceitos juntos: variáveis CSS, manipulação do DOM com JS, e persistência no `localStorage`.

**Como corrigir:**

**1. Botão de toggle no HTML**, dentro do `<header>`:

```html
<header>
    <nav>
        <a href="#sobre">Sobre</a>
        <a href="#habilidades">Habilidades</a>
        <a href="#contato">Contato</a>
        <button id="toggle-tema" type="button" aria-label="Alternar tema claro/escuro">🌙</button>
    </nav>
</header>
```

**2. No CSS**, adiciona um bloco com as variáveis sobrescritas pro tema escuro:

```css
body.tema-escuro {
    --cor-fundo: #1a1620;
    --cor-superficie: #261f2d;
    --cor-texto: #f5f0eb;
    --cor-texto-secundario: #cbb8c4;
    --cor-texto-suave: #9a8a93;
    --cor-rosa: #ffa3c6;
    --cor-rosa-forte: #ff8fb8;
    --cor-lilas: #4a2e5e;
    --cor-borda: rgba(255, 255, 255, 0.12);
}
```

**3. No JS**, lógica de toggle + persistência + preferência do sistema na primeira visita:

```javascript
const botaoTema = document.getElementById('toggle-tema');
const corpo = document.body;

// 1ª visita: lê preferência do sistema; depois lê do localStorage
const temaSalvo = localStorage.getItem('tema');
const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
const usarEscuro = temaSalvo ? temaSalvo === 'escuro' : prefereEscuro;

if (usarEscuro) {
    corpo.classList.add('tema-escuro');
    botaoTema.textContent = '☀️';
}

botaoTema.addEventListener('click', () => {
    corpo.classList.toggle('tema-escuro');
    const agoraEscuro = corpo.classList.contains('tema-escuro');
    botaoTema.textContent = agoraEscuro ? '☀️' : '🌙';
    localStorage.setItem('tema', agoraEscuro ? 'escuro' : 'claro');
});
```

A ordem das condicionais importa: **se já tem escolha salva, respeita; se não tem (primeira visita), pergunta pro sistema**. Esse é exatamente o comportamento que a diretriz pede.

---

### 1.7 Botão "copiar e-mail" usa `alert` em vez da Clipboard API

**Diretriz 4.4 e tabela seção 7 (linha "Copiar e-mail"):**

> "Botão de copiar e-mail que usa Clipboard API e dá feedback visual por aproximadamente 2 segundos. Não pode ser `alert`."

O `script.js` atual é:

```javascript
const email = document.querySelector(".email");
email.addEventListener("click", () => {
    alert("E-mail copiado!");
});
```

Isso **não copia nada**. Só mostra um alerta dizendo que copiou. O e-mail continua não estando no clipboard do usuário.

**Por que essa regra existe:** `alert` é uma caixa de diálogo do navegador que trava a página inteira até o usuário clicar OK. É ruim de UX e demonstra que a Clipboard API não foi usada. A diretriz quer ver você usando a API real (`navigator.clipboard.writeText`) e dando um feedback inline mais elegante.

**Como corrigir:**

```javascript
const botaoEmail = document.querySelector('.email');
const feedback = document.querySelector('.email-feedback');

botaoEmail.addEventListener('click', async () => {
    const email = botaoEmail.dataset.email;
    try {
        await navigator.clipboard.writeText(email);
        feedback.textContent = 'E-mail copiado!';
        feedback.classList.add('visivel');
    } catch (err) {
        feedback.textContent = 'Não foi possível copiar — selecione manualmente.';
        feedback.classList.add('visivel');
    }
    setTimeout(() => {
        feedback.classList.remove('visivel');
        feedback.textContent = '';
    }, 2000);
});
```

E no CSS:

```css
.email-feedback {
    display: inline-block;
    margin-left: 1rem;
    color: var(--cor-rosa-forte);
    opacity: 0;
    transition: opacity 0.3s;
}
.email-feedback.visivel { opacity: 1; }
```

Detalhes importantes:

- O e-mail vem do atributo `data-email` no botão (na estrutura HTML do item 1.1), em vez de ficar hardcoded no JS.
- `navigator.clipboard.writeText` é **assíncrono** (retorna uma Promise) — por isso o `async` e o `await`.
- O `try / catch` cobre o caso onde o navegador bloqueia a API (sites em `file://` ou sem permissão).
- O feedback some depois de 2 segundos com `setTimeout`.

---

### 1.8 Falta animação de entrada com IntersectionObserver

**Diretriz 4.4 e tabela seção 7 (linha "Animação de entrada"):**

> "Elementos da página aparecem ao entrar no viewport, usando `IntersectionObserver`. Não pode ser scroll listener (`window.addEventListener('scroll', ...)`)."

Atualmente o `script.js` só tem o `alert` do e-mail. Não tem nenhuma animação que reage ao scroll.

**Por que essa regra existe:** o `IntersectionObserver` é a API moderna pra detectar quando um elemento entra na tela. Comparado com `scroll listener`, é muito mais eficiente — o navegador avisa você quando o elemento entra, em vez de você ficar checando a cada pixel de rolagem. É um critério que aparece em entrevistas de frontend o tempo todo.

**Como corrigir:**

**1. CSS** — define o estado "escondido" e o estado "aparecer":

```css
.animar {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
.animar.visivel {
    opacity: 1;
    transform: translateY(0);
}
```

**2. HTML** — adiciona a classe `animar` nas seções que devem aparecer:

```html
<section class="sobre-section animar" id="sobre"> ... </section>
<section class="skills-section animar" id="habilidades"> ... </section>
<section class="galeria-section animar"> ... </section>
<section class="video-section animar"> ... </section>
<section class="contato-section animar" id="contato"> ... </section>
```

**3. JS**:

```javascript
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animar').forEach((elemento) => {
    observador.observe(elemento);
});
```

O `threshold: 0.15` significa "anima quando 15% do elemento estiver visível". O `unobserve` depois de animar é importante — sem ele, o observer continua disparando à toa.

---

### 1.9 Falta responsividade (zero `@media`)

**Diretriz 4.2 e tabela seção 7 (linha "Responsividade"):**

> "Pelo menos 2 breakpoints. A página tem que funcionar de 360px (celular pequeno) a 1920px (monitor grande)."

O `style.css` não tem nenhum `@media`. Abrindo o site no celular, o `h1` com `font-size: 7rem` vai vazar pra fora da tela, o `padding: 5rem 8%` da hero vai apertar tudo, e a foto de 25rem (400px) não cabe ao lado do texto.

**Por que essa regra existe:** mais de 50% do acesso na web é mobile. Uma página que só funciona em desktop é uma página quebrada pra metade dos visitantes.

**Como corrigir:** adiciona pelo menos dois breakpoints. Sugestão:

```css
/* tablet — até 1024px */
@media (max-width: 1024px) {
    h1 { font-size: 4.5rem; line-height: 4rem; }
    .hero { padding: 4rem 6%; gap: 2rem; }
    .foto-container img { width: 18rem; height: 18rem; }
    .bolha { width: 25rem; height: 25rem; right: -8rem; }
}

/* mobile — até 720px */
@media (max-width: 720px) {
    nav { padding: 1rem 1.5rem; gap: 1.5rem; flex-wrap: wrap; }
    .hero {
        flex-direction: column;
        text-align: center;
        padding: 6rem 1.5rem 3rem;
        min-height: auto;
    }
    h1 { font-size: 3rem; line-height: 3rem; }
    .descricao { font-size: 1.1rem; }
    .foto-container img { width: 14rem; height: 14rem; }
    .bolha { display: none; } /* mobile bolha geralmente atrapalha */
    .sobre-section,
    .skills-section,
    .contato-section { padding: 4rem 1.5rem; }
    .sobre-section h2,
    .skills-section h2,
    .contato-section h2 { font-size: 1.8rem; }
}
```

**Como testar:** abre o site no Chrome, pressiona F12, clica no ícone de celular no topo do DevTools. Aí dá pra simular tamanhos: testa em **360px, 720px, 1024px, 1440px** antes de reentregar.

---

### 1.10 Faltam meta tags + Open Graph + favicon

**Diretriz 4.1 e tabela seção 7 (linha "Meta tags + Open Graph"):**

> "Description, og:title, og:description, og:image, favicon."

O `<head>` atual só tem `charset`, `viewport`, `title` e o link da fonte. Falta:

- `<meta name="description">` — descrição que o Google mostra nos resultados de busca.
- Open Graph (`og:*`) — define como o link da página aparece quando alguém compartilha no WhatsApp/Instagram/LinkedIn (com preview de imagem e descrição).
- `<link rel="icon">` — o ícone que aparece na aba do navegador.

**Como corrigir:** adiciona no `<head>`:

```html
<meta name="description" content="Cartão de visita pessoal de Ana Júlia Rossi, estudante de Ciência de Dados &amp; IA no IBMEC.">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Ana Júlia Rossi — Cartão de Visita">
<meta property="og:description" content="Estudante de Ciência de Dados &amp; IA no IBMEC. Criatividade e tecnologia.">
<meta property="og:image" content="assets/og-preview.jpg">

<!-- Favicon -->
<link rel="icon" type="image/png" href="assets/favicon.png">
```

Pra `og:image`, qualquer imagem 1200x630px funciona — pode ser sua foto, ou um print da página. Pro favicon, qualquer PNG quadrado 32x32 ou 64x64 serve (existem geradores online se quiser algo mais polido).

---

## 2. Flags

### 2.1 Conteúdo da seção "Habilidades" está vazio

**Checklist seção 8 — conteúdo obrigatório:**

> "Lista de habilidades ou interesses."

A seção atual (`index.html:107-111`) tem **uma única tag**: `<span>C</span>`. Tecnicamente cumpre a estrutura, mas conteudo-wise não está pronto. Cada item que você listar vira uma tag visual e ajuda quem está vendo a página a entender seu perfil.

**Como corrigir:** já está no bloco do item 1.1, usando `<ul><li>` em vez de `<span>` (semanticamente mais correto pra lista). Estiliza no CSS removendo o bullet:

```css
.skills {
    list-style: none;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0;
}
.skills li {
    background: var(--cor-lilas);
    color: var(--cor-texto);
    padding: 1rem 2rem;
    border-radius: 999px;
    font-weight: 500;
    transition: 0.3s;
}
.skills li:hover { transform: translateY(-5px); }
```

### 2.2 O e-mail está em duas formas conflitantes

`index.html:131-137`:

```html
<a class="email" href="mailto:SEUEMAIL@gmail.com">
    ajuliarossim@gmail.com
</a>
```

O `href` tem `SEUEMAIL@gmail.com` (placeholder), mas o texto mostra `ajuliarossim@gmail.com`. Clicar no link abre o mailer com o e-mail errado (placeholder).

**Como corrigir:** ao trocar o `<a>` por `<button>` (item 1.7), esse problema some — o e-mail fica num só lugar (`data-email`). Se decidir manter como `<a mailto:>`, garante que o `href` e o texto batem.

### 2.3 Foco visível ausente

**Diretriz 4.3 e tabela seção 7 (linha "Acessibilidade"):**

> "Foco visível em todos elementos interativos (`:focus-visible` com outline)."

Não tem nenhum `:focus-visible` no CSS. Quem navega por teclado (Tab) não vê onde está focado.

**Como corrigir:**

```css
a:focus-visible,
button:focus-visible {
    outline: 2px solid var(--cor-rosa-forte);
    outline-offset: 4px;
    border-radius: 4px;
}
```

### 2.4 `<nav>` fixo cobre o conteúdo no topo

`style.css:14-24` — o `nav` é `position: fixed`, mas o body não tem `padding-top` correspondente. Em telas estreitas, o nav cobre o início da hero. Não chega a ser bloqueador, mas vale ajustar:

```css
body { padding-top: 5rem; } /* ou a altura do nav */
```

### 2.5 Hover de link no nav usa cor hardcoded

`style.css:34-36` — `nav a:hover { color: #d97fa6 }`. Quando você criar `--cor-rosa` (item 1.5), troca pra `var(--cor-rosa)`.

### 2.6 Hierarquia de títulos OK, mas vale checar

Atualmente você tem `<h1>` único (Ana Júlia Rossi) e três `<h2>` (Sobre / Linguagens / Contato). Isso está certo. Só fica de olho: se adicionar a galeria e o vídeo (sugestões dos itens 1.3 e 1.4), os títulos dessas seções também devem ser `<h2>` — não pular pra `<h3>` sem motivo.

---

## 3. Pontos menores

Polimento. Não pesam isoladamente.

- **README quebrado.** O bloco de código `python3 -m http.server 8000` (`README.md:36-37`) abre com ` ``` ` mas nunca fecha. E o link `file:///C:/Users/rossi/Downloads/...` (linha 9) é um caminho local do seu Windows — não funciona pra ninguém que não seja você. Apaga essa linha.

- **Excesso de linhas em branco no HTML.** Cada bloco do `index.html` tem 2-3 linhas em branco entre elementos. Não está errado, mas dificulta a leitura — uma linha em branco entre blocos lógicos é suficiente.

- **`overflow-x: hidden` no body** (`style.css:10`) — você colocou pra esconder a `.bolha` que vaza pra direita. Funciona, mas tem o efeito colateral de quebrar `position: sticky` se você quiser usar no futuro. Não é problema agora.

- **`alt` da foto** (`index.html:55`) está como "Foto de Ana Júlia Rossi" — melhor seria descrever a foto em si: "Retrato de Ana Júlia Rossi sorrindo, em frente a uma parede clara". Lembrando: a diretriz proíbe explicitamente `alt="foto"` ou `alt="imagem"`.

- **Footer ausente.** A diretriz pede `<footer>` semântico — vai junto com o item 1.1.

- **Cor da nav meio invisível.** O `backdrop-filter: blur(10px)` (`style.css:23`) só funciona quando tem alguma cor de fundo semi-transparente. Sem isso, o blur não tem o que "embaçar". Adiciona um `background: rgba(255, 255, 255, 0.7)` (ou variável) pra ele realmente embaçar o que está atrás.

---

## Checklist de reentrega

Marca conforme for resolvendo. Sugestão: faz na ordem — o item 1.1 destrava todos os outros.

- [ ] Reescrever o `<body>` inteiro com a estrutura limpa do item 1.1 (sem tags fora de ordem)
- [ ] Adicionar `<header>`, `<main>` e `<footer>` semânticos
- [ ] Criar a pasta `assets/` com pelo menos 3 fotos (avatar + 2 contextuais), com `alt` descritivo
- [ ] Embedar 1 vídeo do YouTube (sem autoplay com áudio)
- [ ] Criar `:root` com variáveis de cor, tipografia (4+ tamanhos) e espaçamento
- [ ] Substituir TODAS as cores e tamanhos hardcoded por `var(--...)`
- [ ] Implementar tema claro/escuro (toggle + variáveis + `localStorage` + `prefers-color-scheme`)
- [ ] Substituir o `alert` por Clipboard API real com feedback de ~2s
- [ ] Implementar `IntersectionObserver` pra animação de entrada das seções
- [ ] Adicionar pelo menos 2 breakpoints (`@media`) — testar em 360px, 720px, 1024px, 1440px
- [ ] Adicionar meta description, Open Graph (og:title, og:description, og:image) e favicon
- [ ] Completar a lista de habilidades (mais do que só "C")
- [ ] Adicionar `:focus-visible` com outline visível em links e botões
- [ ] Corrigir o `href` do `mailto:` ou trocar por `<button>` com `data-email`
- [ ] Limpar o README (fechar o bloco de código, tirar o link `file:///C:/`)
- [ ] Rodar o HTML no [validator.w3.org](https://validator.w3.org/#validate_by_input) — só reentregar quando der "no errors"

---

## Considerações finais

Ana Júlia, a página que você imaginou tem identidade — paleta, tipografia, a ideia da bolha decorativa e da foto flutuando. **Essa parte é a mais difícil**: muita gente entrega projeto sem ter ideia de estilo nenhuma, e o seu já nasce com uma estética definida.

O que falta agora é dar corpo a essa ideia: fazer o HTML não quebrar, escrever o JavaScript de verdade, adicionar as fotos, criar o tema escuro. Cada um desses itens é, sozinho, um exercício pequeno — o tema escuro são 15 linhas de CSS e 10 de JS, a Clipboard API são 8 linhas, o IntersectionObserver são mais 10. Quando você atacar um por vez, o checklist anda rápido.

**Dica de ordem de ataque:**

1. **Primeiro, conserta o HTML.** Cola o bloco do item 1.1 no `index.html` e roda no validator. Isso destrava o resto — você consegue ver a página renderizando do jeito que você queria.
2. **Cria as variáveis CSS.** Com `:root` no lugar, o tema escuro depois fica muito mais simples.
3. **Adiciona o conteúdo que falta** (fotos no `assets/`, vídeo, lista de skills).
4. **Aí ataca o JS** — Clipboard, IntersectionObserver, tema escuro.
5. **Por último, responsividade.** Testa em vários tamanhos no DevTools.

Não tenha pressa em reentregar correndo: passa item por item desse checklist com calma, testa cada um isolado, e quando tudo estiver verde aí sim manda. Boa sorte!
