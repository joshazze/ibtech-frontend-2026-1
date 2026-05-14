# Revisão — Projeto 01 Cartão de Visita

**Aluna:** Manuella Ferreira Pinheiro
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Oi, Manu! Antes de qualquer coisa: dá pra ver que você se dedicou. A página tem uma identidade clara (paleta rosa + creme), o conteúdo pessoal está lá (nome, foto, sobre, contato, formação, habilidades), você tentou cinco features avançadas no JS de uma vez (tema escuro, copiar email, IntersectionObserver, typewriter, persistência) e a estrutura semântica básica está correta. Isso é muita coisa pra um primeiro projeto. Esta revisão é detalhada de propósito — o objetivo não é dizer "refaz tudo", é te explicar **por que** cada item da diretriz existe, pra que na reentrega você já saiba a regra de cabeça e nos próximos projetos não precise mais consultar o checklist toda hora.

Vou separar em três níveis:

1. **Bloqueadores** — coisas que, pela tabela de avaliação da diretriz, derrubam a entrega. Tem que corrigir.
2. **Flags** — não derrubam sozinhas, mas se acumularem viram reprovação por consistência. Corrige antes da reentrega.
3. **Pontos menores** — polimento. Você decide se mexe.

No final tem um checklist de reentrega em ordem sugerida.

Como o projeto está bem incompleto em relação ao escopo da diretriz, eu reorganizei a seção 1 em duas partes: **1.A — arrumar o que existe** (estrutura de arquivos, JS que está quebrado, organização CSS) e **1.B — o que falta adicionar** (vídeo, mais fotos, variáveis CSS, Open Graph, etc). Faz a 1.A primeiro, porque os erros de lá estão escondendo features que você já tentou implementar.

---

## O que já está bom

Pra começar pelo lado positivo:

- **Estrutura semântica básica correta.** Você usou `<header>`, `<main>`, `<section>` nos lugares certos (`exercicio.html:14-82`), com `<h1>` único no topo. Isso é exatamente o que a diretriz pede em "HTML semântico".
- **`alt` descritivo na foto** (`exercicio.html:16`): `"Foto de Manuella Ferreira Pinheiro"`. Não é o ideal de descrição (a diretriz prefere algo mais rico, tipo "Foto de Manuella Ferreira Pinheiro, jovem sorrindo em ambiente externo"), mas você já entendeu que `alt` não pode ser genérico. Muita gente coloca "foto" e ponto. Você passou.
- **Layout em grid no `<main>`** (`estilo.css:39-45`). Grid duas colunas com `gap` e um card `full-width` ocupando linha inteira (`estilo.css:59-61`) — exatamente como a diretriz pede ("Flexbox e/ou Grid; nada de hack com float").
- **Responsividade mobile.** Você fez o `@media (max-width: 600px)` (`estilo.css:110-124`) virar o grid em coluna única e empilhar o header. Funciona — em 360px a página não quebra.
- **Conteúdo pessoal completo.** Nome, foto, frase de apresentação, sobre, formação, habilidades, contato com e-mail, LinkedIn, GitHub — tudo lá. Em termos de "o que precisa estar na página", você atendeu o checklist da seção 8 do bloco "Conteúdo".
- **Tentativa de cinco features JS.** Você não fugiu do JS: tentou tema escuro persistente, Clipboard API, IntersectionObserver, typewriter, e até `localStorage`. A execução tem bugs (vamos consertar abaixo), mas a *intenção* mostra que você leu a diretriz e quis cumprir os itens difíceis. Isso conta.

---

## 1.A — Bloqueadores: arrumar o que já existe

Antes de adicionar coisa nova, esses três pontos têm que ser resolvidos. São consertos de estrutura e bugs que estão quebrando features que você já escreveu.

### 1.A.1 Nomes dos arquivos não batem com a diretriz

**Diretriz seção 5 — "Estrutura mínima do repositório":**

> "Os arquivos devem se chamar exatamente `index.html`, `style.css`, `script.js`, dentro de uma pasta `assets/` com as mídias, e `README.md` na raiz."

Seu projeto tem hoje:

| Arquivo atual | Deveria se chamar |
|---|---|
| `exercicio.html` | `index.html` |
| `estilo.css` | `style.css` |
| `READ.md` | `README.md` |
| `1775050427384.png` (na raiz) | `assets/manuella.png` (dentro de pasta) |

**Por que essa regra existe (e não é frescura):**

- **`index.html`:** servidores web (GitHub Pages, Netlify, Vercel, qualquer um) servem automaticamente o arquivo chamado `index.html` quando alguém acessa a URL raiz. Se o arquivo se chama `exercicio.html`, a pessoa precisa digitar `seusite.com/exercicio.html` em vez de só `seusite.com`. Em um cartão de visita, isso é morte por mil cliques.
- **`style.css` e `script.js`:** são convenção universal. Qualquer dev que abrir seu repo procura por esses nomes — `estilo.css` funciona, mas obriga a pessoa a caçar.
- **`README.md`:** o GitHub renderiza automaticamente um arquivo chamado **exatamente** `README.md` (com R maiúsculo e .md) na página inicial do repositório. `READ.md` o GitHub ignora — seu README não aparece quando alguém abre o repo, fica como arquivo solto.
- **`assets/`:** centraliza mídias num lugar só. Quando você tiver 5 fotos + 1 vídeo + 1 favicon (que é o escopo desse projeto), ter tudo na raiz vira bagunça.

**Como corrigir:**

```bash
# na raiz do projeto:
mv exercicio.html index.html
mv estilo.css style.css
mv READ.md README.md
mkdir assets
mv 1775050427384.png assets/manuella.png
```

E depois, dentro do `index.html`, troca o `<link>`:

```html
<link rel="stylesheet" href="style.css">
```

E o `<img>`:

```html
<img src="assets/manuella.png" alt="Foto de Manuella Ferreira Pinheiro, ..." class="avatar">
```

(Aproveita pra renomear a foto também — `1775050427384.png` parece código de barras. `manuella.png` ou `avatar.png` é mais legível.)

**Outra coisa pra resolver junto:** seu repo tem duas pastas que **não fazem parte do projeto** — `style/styles.css` e `views/index.html`. Esses arquivos são lixo gerado automaticamente pela extensão "Go Live Server" do VS Code quando você instalou (olha o conteúdo: está em espanhol, fala "¡Bienvenido a Go Live Server!"). Pode apagar as duas pastas inteiras:

```bash
rm -rf style/ views/
```

Isso confunde quem abre o repo, porque parece que existem dois projetos.

---

### 1.A.2 Seu JavaScript inteiro está quebrado por causa de um ID errado

**Tabela seção 7 — critério "JavaScript funcional":**

> "Reprovado se: erros no console, funcionalidades anunciadas que não funcionam."

No HTML, o botão de tema tem `id="theme-toggle"` (`exercicio.html:21`):

```html
<button id="theme-toggle">🌓 Tema</button>
```

Mas no JS, você procura por outro ID (`script.js:1`):

```javascript
const toggle = document.getElementById("toggle");
```

`getElementById("toggle")` retorna `null` (não existe nenhum elemento com esse ID). Aí na linha seguinte (`script.js:3`):

```javascript
toggle.onclick = () => { ... }
```

Isso lança um `TypeError: Cannot read properties of null (reading 'onclick')` **imediatamente** quando a página carrega. E aqui está o problema sério: quando o JS lança um erro no nível do script (fora de uma função), **a execução para nessa linha**. Tudo que vem depois — Clipboard API, IntersectionObserver, typewriter — nunca chega a rodar.

**Como você pode confirmar isso:** abre o `exercicio.html` no Chrome, aperta F12, vai na aba "Console". Você vai ver o erro vermelho gritando.

**Como corrigir (uma linha):**

```javascript
const toggle = document.getElementById("theme-toggle");
```

Mas tem um segundo bug no mesmo arquivo: você procura por `document.getElementById("feedback")` (`script.js:26`), mas no HTML não existe nenhum elemento com `id="feedback"`. Você até estilizou ele no CSS (`estilo.css:154-158`):

```css
#feedback {
  color: green;
  font-size: 14px;
  margin-top: 5px;
}
```

…mas esqueceu de criar o elemento no HTML. Sem ele, a linha `feedback.innerText = "Copiado!"` também quebra (`feedback` é `null`).

**Como corrigir:** adicionar um `<span>` no HTML, ao lado do botão (`exercicio.html:29`):

```html
<button id="copy-email">Copiar Email</button>
<span id="feedback"></span>
```

Depois desses dois ajustes, seu JS vai funcionar inteiro de uma vez. Você tem cinco features escritas — elas só não rodam por causa de dois IDs errados.

---

### 1.A.3 Falta o `prefers-color-scheme` no tema escuro

**Diretriz 4.4 e tabela seção 7 — critério "Tema claro/escuro":**

> "Toggle visível, variáveis CSS, `localStorage`, **`prefers-color-scheme` na 1ª visita**."

Seu JS hoje (`script.js:15-17`) faz:

```javascript
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
```

Isso é metade do trabalho: respeita a preferência salva, mas se a pessoa nunca esteve no seu site e o sistema operacional dela está em modo escuro (Mac em "Dark Mode", Windows em "Tema escuro"), seu site abre no claro mesmo assim. A diretriz pede pra detectar isso na primeira visita.

**Por que essa regra existe:** quem usa o sistema em modo escuro normalmente está num ambiente com pouca luz (de noite, em quarto fechado). Abrir um site branco brilhante de cara é desconfortável e a pessoa fecha. Respeitar o `prefers-color-scheme` é uma cortesia de acessibilidade.

**Como corrigir:**

```javascript
const themeStored = localStorage.getItem("theme");

if (themeStored === "dark") {
  document.body.classList.add("dark");
} else if (themeStored === null) {
  // primeira visita — segue a preferência do sistema
  const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefereEscuro) {
    document.body.classList.add("dark");
  }
}
```

A lógica: se a pessoa **já escolheu** um tema antes (`themeStored` não é null), respeita. Se é a primeira vez (`themeStored === null`), pergunta pro sistema operacional.

---

## 1.B — Bloqueadores: o que falta adicionar

Esses são itens da diretriz que você ainda não começou. Cada um sozinho derruba pela tabela seção 7.

### 1.B.1 Só uma imagem; a diretriz pede pelo menos três

**Diretriz 3.2 e tabela seção 7 — linha "Mídia":**

> "Pelo menos 3 fotos relacionadas a você (não precisa ser selfie — pode ser hobby, lugar que gosta, projeto que fez). Imagens otimizadas (WebP ou JPG comprimido), todas com `alt` descritivo."

Você tem 1 foto (o avatar). Faltam pelo menos 2.

**Por que essa regra existe:** o cartão de visita é a sua *vitrine*. Texto + uma foto a gente vê em qualquer LinkedIn. Mais imagens (de hobby, viagens, projeto que você fez, lugar que ama, café favorito) mostram dimensão — quem é você além do currículo.

**Como corrigir:** adiciona uma seção nova, por exemplo "Galeria" ou "Momentos", com 2-3 fotos. Sugestão de estrutura:

```html
<section class="card full-width">
  <h2>Momentos</h2>
  <div class="galeria">
    <figure>
      <img src="assets/foto-canterbury.jpg"
           alt="Manuella na escola Worthgate em Canterbury durante o intercâmbio de 2023"
           loading="lazy">
      <figcaption>Intercâmbio em Canterbury, 2023</figcaption>
    </figure>
    <figure>
      <img src="assets/foto-cozinhando.jpg"
           alt="Manuella cozinhando uma receita italiana"
           loading="lazy">
      <figcaption>Um dos meus hobbies favoritos</figcaption>
    </figure>
    <figure>
      <img src="assets/foto-faculdade.jpg"
           alt="Manuella em sala de aula no curso de Ciência de Dados"
           loading="lazy">
      <figcaption>Curso de Ciência de Dados</figcaption>
    </figure>
  </div>
</section>
```

E no CSS, pra deixar em grid responsivo:

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.galeria figure {
  margin: 0;
}

.galeria img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.galeria figcaption {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
  margin-top: 4px;
  text-align: center;
}
```

**Detalhe importante sobre `alt`:** evita `alt="Foto"` ou `alt="Manuella"`. Descreve a cena — quem está, fazendo o quê, onde. Isso é o que um leitor de tela vai falar pra alguém cego, então quanto mais informação útil, melhor.

---

### 1.B.2 Falta o vídeo embedded

**Diretriz 3.2 e tabela seção 7 — linha "Mídia":**

> "Pelo menos 1 vídeo embedded. Pode ser do YouTube, um clip seu, time-lapse de algum projeto. Faça sentido com a página. Sem autoplay com áudio."

Zero vídeo na sua página. Pela tabela, isso é uma linha vermelha automática.

**Por que essa regra existe:** vídeo é a forma mais rica de se apresentar. Pode ser você falando 30 segundos sobre por que escolheu Ciência de Dados, pode ser uma viagem que você gravou, pode ser um time-lapse de algo que você fez — qualquer coisa que adicione *movimento* à página.

**Como corrigir:**

Escolhe um vídeo do YouTube (pode ser de viagem, de hobby, de um lugar que você gosta — mais simples do que gravar do zero). Adiciona uma seção:

```html
<section class="card full-width">
  <h2>Em vídeo</h2>
  <div class="video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/SEU_VIDEO_ID"
      title="Descrição do vídeo"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy">
    </iframe>
  </div>
</section>
```

E no CSS, pro iframe ficar responsivo na proporção 16:9 sem distorcer:

```css
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}
```

Sobre autoplay: o YouTube por padrão **não** dá autoplay quando você usa `/embed/`. Então tá tranquilo — basta não passar `?autoplay=1` na URL.

---

### 1.B.3 Sem variáveis CSS (`:root`)

**Diretriz 4.2 e tabela seção 7 — linha "Variáveis e organização CSS":**

> "`:root` com paleta de cores + tipografia + espaçamentos; sem cor hardcoded espalhada."

Seu CSS hoje não tem `:root` em lugar nenhum. Você escreveu `pink`, `white`, `#f4f1ea`, `#333`, `#4a5d45`, `#ddd`, `#ff8fb1`, `#d63384`, `#1e1e1e`, `#2b2b2b`, `#ff69b4`, `#ffc0cb` espalhados pelo arquivo inteiro. Cada elemento decidindo sua cor na unha.

**Por que essa regra existe:** quando as cores estão em variáveis, sua paleta vira um *sistema*. Se você decidir amanhã trocar o rosa por azul, você muda **uma linha** e o site inteiro responde. Sem variáveis, você ia ter que caçar uns 10 lugares e mudar um por um — e provavelmente esquecer alguns. É exatamente isso que acontece no seu CSS hoje: a parte `.dark` tem cores diferentes da parte clara, mas conectadas só pelo costume — não pelo sistema.

**Como corrigir:**

No topo do `style.css`, define:

```css
:root {
  /* paleta — modo claro */
  --cor-fundo: #f4f1ea;
  --cor-texto: #333;
  --cor-card: #ffffff;
  --cor-primaria: #ffb6c1;        /* rosa principal (substitui "pink") */
  --cor-primaria-hover: #ff8fb1;
  --cor-titulo: #4a5d45;
  --cor-link: #d63384;
  --cor-borda: #dddddd;

  /* tipografia */
  --fs-xs:   0.75rem;    /* 12px - legendas */
  --fs-sm:   0.875rem;   /* 14px - feedback "copiado" */
  --fs-base: 1rem;       /* 16px - body, parágrafos */
  --fs-md:   1.25rem;    /* 20px - h2 */
  --fs-lg:   2rem;       /* 32px - h1 */

  /* espaçamentos */
  --sp-1: 8px;
  --sp-2: 16px;
  --sp-3: 24px;
  --sp-4: 32px;
}

/* modo escuro — só sobrescreve as variáveis, não duplica regras */
body.dark {
  --cor-fundo: #1e1e1e;
  --cor-texto: #f0f0f0;
  --cor-card: #2b2b2b;
  --cor-primaria: #ff69b4;
  --cor-titulo: #ffc0cb;
  --cor-borda: #444444;
}
```

E aí, no resto do arquivo, troca **toda cor hardcoded** por `var(--...)`. Exemplo:

```css
body {
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
  padding: var(--sp-2);
  font-size: var(--fs-base);
}

.header {
  background-color: var(--cor-primaria);
  padding: var(--sp-4);
}

.card {
  background: var(--cor-card);
  padding: var(--sp-3);
  border-top: 5px solid var(--cor-primaria);
}

h1 { font-size: var(--fs-lg); }
h2 { font-size: var(--fs-md); color: var(--cor-titulo); }

button {
  background-color: var(--cor-primaria);
  font-size: var(--fs-base);
}
```

**O segredo do tema escuro com variáveis:** quando todas as regras usam `var(--cor-primaria)` e a única coisa que muda em `.dark` é o **valor** da variável, você não precisa duplicar nenhuma regra. Hoje você tem `.dark .card`, `.dark .header`, `.dark h2` — toda essa seção (`estilo.css:125-141`) some quando você usa variáveis direito. O CSS fica muito mais limpo.

---

### 1.B.4 Sem sistema tipográfico

**Tabela seção 7 — linha "Sistema tipográfico":**

> "Pelo menos 4 tamanhos definidos como variáveis e reaproveitados com consistência."

Hoje o seu CSS não define **nenhum** tamanho de fonte. Tudo está no default do navegador (16px) — o que significa que `h1`, `h2`, `p`, `button`, `li` aparecem todos com o tamanho automático que o browser dá. Sem hierarquia visual deliberada.

**Por que essa regra existe:** uma página com tipografia bem pensada tem ritmo — o leitor reconhece "isso é título grande", "isso é subtítulo", "isso é texto", "isso é legenda". Sem isso, tudo parece chapado.

**Como corrigir:** já incluí as variáveis `--fs-xs/sm/base/md/lg` no exemplo da seção 1.B.3 acima. Depois é só aplicar:

```css
h1 { font-size: var(--fs-lg); }
h2 { font-size: var(--fs-md); }
p, li, a, button { font-size: var(--fs-base); }
.tagline { font-size: var(--fs-sm); }
#feedback { font-size: var(--fs-sm); }
```

Quatro tamanhos já cumprem o critério. Cinco é melhor.

---

### 1.B.5 README.md sem conteúdo mínimo

**Diretriz seção 5 e tabela seção 7 — linha "README":**

> "Limpo, com nome do projeto, breve descrição, tecnologias, como rodar, link da versão publicada (se houver), créditos."

Seu `READ.md` hoje (que vai virar `README.md` depois do 1.A.1) tem o esqueleto certo, mas:

- O título tem dois `##` em vez de `# Projeto 01...` + `## Manuella...` — hierarquia errada.
- O "Como rodar" diz "Abra o arquivo index.html" — mas seu arquivo se chama `exercicio.html`. Depois do 1.A.1 isso fica certo automaticamente.
- Falta um print da página renderizada.
- Falta link pra versão publicada (se você publicar no GitHub Pages, coloca o link aqui).

**Como corrigir:**

```markdown
# Projeto 01 — Cartão de Visita

Página pessoal de **Manuella Ferreira Pinheiro**, desenvolvida na trilha
Frontend 2026.1 da IbTech.

![Print da página](assets/preview.png)

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS)
- JavaScript (vanilla)

## Funcionalidades

- Tema claro/escuro com persistência (`localStorage`) e detecção do
  `prefers-color-scheme` na primeira visita
- Copiar e-mail para a área de transferência com feedback visual
- Animação de entrada nos cards via `IntersectionObserver`
- Efeito *typewriter* na seção de perfil

## Como rodar

Abra o arquivo `index.html` no navegador. Não há dependências externas.

## Links

- [LinkedIn](https://www.linkedin.com/in/manuella-ferreira-pinheiro-001aa3387/)
- [GitHub](https://github.com/manufpinheiro)
```

Tira o print da sua própria página (Cmd+Shift+4 no Mac), salva como `assets/preview.png` e referencia. Dá um toque profissional.

---

## 2. Flags

Esses não derrubam isoladamente, mas a tabela cita cada um. Se você corrigir só os bloqueadores e deixar esses, vira reprovação por acúmulo.

### 2.1 Links externos sem `rel="noopener noreferrer"`

**Diretriz 3.2 e tabela seção 7 — linha "Acessibilidade & segurança":**

> "Todo `target=\"_blank\"` precisa de `rel=\"noopener noreferrer\"`."

Seus dois links pra LinkedIn e GitHub (`exercicio.html:31, 34`) têm `target="_blank"` mas não têm `rel`.

**Por que essa regra existe:** sem `rel="noopener"`, a página que você abre numa nova aba ganha acesso ao `window.opener` da sua página — em casos extremos, isso permite que a página externa redirecione a sua. `noreferrer` esconde de onde a pessoa veio, o que é bom pra privacidade. É uma boa prática de segurança que todo navegador moderno recomenda.

**Como corrigir:**

```html
<a href="https://www.linkedin.com/in/manuella-ferreira-pinheiro-001aa3387/"
   target="_blank" rel="noopener noreferrer">LinkedIn</a>

<a href="https://github.com/manufpinheiro"
   target="_blank" rel="noopener noreferrer">GitHub</a>
```

E pra qualquer link externo que você adicionar depois — sempre os dois (`target` + `rel`).

---

### 2.2 Falta `:focus-visible` (acessibilidade do teclado)

**Diretriz 3.2 e tabela seção 7 — linha "Acessibilidade":**

> "Foco visível com `:focus-visible` — usuário de teclado precisa ver onde está navegando."

Seu CSS hoje não tem nenhuma regra `:focus-visible`. Quando alguém navega só pelo teclado (Tab pra pular entre elementos), o destaque do navegador é fraco ou some — especialmente com `outline: none` default em alguns reset.

**Por que essa regra existe:** nem todo mundo usa mouse. Pessoas com deficiência motora, pessoas que preferem teclado, pessoas que estão de mão ocupada — todas dependem do "vejo onde estou". Sem `:focus-visible`, sua página é praticamente inutilizável pra esse público.

**Como corrigir:** adiciona no final do CSS:

```css
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--cor-primaria);
  outline-offset: 2px;
  border-radius: 4px;
}
```

Testa: abre a página, aperta Tab várias vezes. Deve aparecer uma borda destacada em cada link/botão conforme você navega.

---

### 2.3 Sem Open Graph e sem favicon

**Diretriz 4.3 e tabela seção 7 — linha "Meta tags + Open Graph":**

> "description, og:title, og:description, og:image, favicon."

Hoje você tem só `<meta name="description">` (`exercicio.html:6`) — bom começo, mas falta o resto.

**Por que essa regra existe:** quando você manda o link da sua página no WhatsApp, no Discord, no LinkedIn, no Twitter, esses apps leem as meta tags `og:*` pra gerar aquele preview bonito com título + descrição + imagem. Sem `og:image`, aparece um quadrado cinza. Sem `og:title`, aparece a URL crua. Pra um cartão de visita, isso importa MUITO — é a primeira impressão antes mesmo da pessoa clicar.

**Como corrigir:** no `<head>` do `index.html`, adiciona:

```html
<meta property="og:title" content="Manuella Ferreira Pinheiro — Currículo">
<meta property="og:description" content="Estudante de Ciência de Dados, dedicada e curiosa. Conheça meu perfil.">
<meta property="og:image" content="https://SEU_DOMINIO/assets/preview.png">
<meta property="og:url" content="https://SEU_DOMINIO/">
<meta property="og:type" content="website">

<link rel="icon" type="image/png" href="assets/favicon.png">
```

Pro favicon: pega um ícone pequeno (32x32 ou 64x64), salva em `assets/favicon.png`. Pode ser uma letra "M" estilizada, um emoji exportado como PNG, qualquer coisa.

---

### 2.4 Só um breakpoint de responsividade

**Diretriz 4.2 e tabela seção 7 — linha "Responsividade":**

> "Pelo menos dois breakpoints. A página tem que funcionar de 360px a 1920px."

Você tem um `@media (max-width: 600px)` (`estilo.css:110`). É um. Faltam pelo menos mais um.

**Por que isso importa:** entre 360px (celular pequeno) e 1920px (monitor grande) tem MUITA tela diferente — tablets retrato (~768px), tablets paisagem (~1024px), notebooks (~1280-1440px). Um único corte em 600px deixa tablets sem ajuste — eles veem layout de desktop esmagado.

**Como corrigir:** adiciona um breakpoint pra tablet, antes do mobile:

```css
/* tablet */
@media (max-width: 1024px) {
  .container {
    max-width: 100%;
    padding: 0 var(--sp-2);
  }
  .grid-container {
    gap: var(--sp-2);
  }
}

/* mobile (que você já tem) */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  .header {
    flex-direction: column;
    text-align: center;
  }
  .full-width {
    grid-column: 1;
  }
}
```

Testa em DevTools (F12 → ícone de celular no Chrome) em 360px, 768px, 1024px, 1440px, 1920px. Nada pode quebrar.

---

### 2.5 Animação de entrada não está aparecendo

**Diretriz 4.4 e tabela seção 7 — linha "Animação de entrada":**

> "`IntersectionObserver`, NÃO scroll listener."

Você escreveu o IntersectionObserver no JS (`script.js:40-56`) — está certo, é o caminho correto. Mas no HTML, nenhum elemento tem a classe `hidden` (a classe que o JS procura via `querySelectorAll(".hidden")`). Resultado: o observer não observa nada, e nada anima.

**Como corrigir:** adiciona a classe `hidden` nos cards que você quer animar (`exercicio.html`):

```html
<section class="card hidden">
  <h2>Contato</h2>
  ...
</section>

<section class="card hidden">
  <h2>Sobre</h2>
  ...
</section>
```

E nos outros também. As regras CSS `.hidden` e `.show` (`estilo.css:143-152`) já estão escritas — só falta marcar os elementos no HTML pra entrar na lista de observados.

**Detalhe:** pra animação ficar mais natural, escalonar com pequeno delay entre cards é um plus:

```css
.hidden:nth-child(2) { transition-delay: 0.1s; }
.hidden:nth-child(3) { transition-delay: 0.2s; }
.hidden:nth-child(4) { transition-delay: 0.3s; }
```

---

### 2.6 Falta interação JS extra além das obrigatórias

**Diretriz 4.4 e tabela seção 7 — linha "Interação JS extra":**

> "Além das obrigatórias (tema, copiar email, animação de entrada), pelo menos uma a mais: menu mobile, modal, typewriter, contador, filtro, etc."

Boa notícia: você **já tem** o typewriter (`script.js:59-77`). Esse cumpre o critério. Mas ele também não está rodando hoje pelos motivos da seção 1.A.2 (o script para no primeiro erro). Quando você consertar o `getElementById("theme-toggle")`, o typewriter vai começar a funcionar e esse item fica resolvido automaticamente.

Pra deixar mais robusto, dá pra adicionar também um menu mobile (hambúrguer que abre/fecha no celular). Hoje seu header empilha mas não tem navegação — não é obrigatório, mas seria um plus.

---

## 3. Pontos menores

Polimento. Não pesam na nota, mas melhoram o resultado.

- **Bug do typewriter — texto inicial perdido.** Você escreve `"Fatos sobre mim"` no HTML (`exercicio.html:65`), mas o JS faz `document.getElementById("typewriter").innerHTML = ""` (`script.js:64`) — apaga e reescreve com o texto `"Estudante dedicada com foco em tecnologia..."`. O texto original do HTML é só lixo. Tira o texto do HTML ou troca a abordagem.

- **`READ.md` linha 13 diz "Abra o arquivo index.html"** — mas o arquivo se chama `exercicio.html` hoje. Depois do 1.A.1 isso fica certo automaticamente.

- **Ortografia "Liceo Scientifico" (`exercicio.html:48`)** — em português seria "Liceu Científico" ou se você quis manter o nome em italiano (que é uma escolha legítima por ser nome próprio), tudo bem deixar como está. Só checa se foi intencional.

- **"Estudante de Ciência de Dados" no h1 (`exercicio.html:20`) e "Sou uma pessoa muito curiosa..." no parágrafo.** O conteúdo está bom, só sugiro revisar se quer abrir a página dizendo "19 anos" — alguns recrutadores associam idade a inexperiência. Você decide; é seu cartão.

- **Cor `pink` (`estilo.css:19, 56, 82`).** O CSS aceita esse keyword (resolve pra `#ffc0cb`), mas é uma cor antiga, gritante. Quando você criar a variável `--cor-primaria`, escolhe um rosa um pouco mais discreto — `#ffb6c1` (light pink) ou `#f8b4c4` ficam mais elegantes.

- **`box-shadow` muito sutil nos cards (`estilo.css:54`).** `rgba(0, 0, 0, 0.1)` quase não aparece em fundo claro. Aumenta pra `0.15` ou usa duas sombras (uma sutil curta, uma maior difusa) pra dar profundidade.

- **Indentação inconsistente no HTML** — alguns blocos de `<p>` do "Perfil" (`exercicio.html:67-80`) ficaram colados na margem esquerda. Não quebra nada, mas dificulta ler depois. Reformata com 2 espaços de indentação.

---

## Checklist de reentrega

Marca conforme for resolvendo. Eu organizei na ordem que faz mais sentido:

**Fase 1 — Arrumar a base**

- [ ] Renomear `exercicio.html` → `index.html`
- [ ] Renomear `estilo.css` → `style.css`
- [ ] Renomear `READ.md` → `README.md`
- [ ] Criar pasta `assets/` e mover a foto pra lá com nome legível (`manuella.png`)
- [ ] Atualizar `<link>` e `<img src>` no HTML
- [ ] Apagar as pastas `style/` e `views/` (lixo do Live Server)
- [ ] Consertar o ID no `script.js`: `"toggle"` → `"theme-toggle"`
- [ ] Adicionar `<span id="feedback"></span>` no HTML, ao lado do botão de copiar
- [ ] Verificar no Console (F12) que zero erros aparecem ao carregar a página

**Fase 2 — Variáveis CSS**

- [ ] Criar `:root` com paleta de cores
- [ ] Criar variáveis tipográficas (`--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-md`, `--fs-lg`)
- [ ] Substituir todas as cores hardcoded por `var(--...)`
- [ ] Migrar `.dark` pra só sobrescrever variáveis (não duplicar regras)

**Fase 3 — Conteúdo que falta**

- [ ] Adicionar pelo menos 2 fotos novas com `alt` descritivo (total ≥ 3)
- [ ] Adicionar 1 vídeo embedded (YouTube ou hospedado)
- [ ] Adicionar `prefers-color-scheme` no JS (detecção na 1ª visita)
- [ ] Adicionar as classes `hidden` nos cards que devem animar na entrada

**Fase 4 — Meta tags e acessibilidade**

- [ ] Adicionar Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Adicionar favicon em `assets/favicon.png` + `<link rel="icon">`
- [ ] Adicionar `rel="noopener noreferrer"` nos dois links externos
- [ ] Adicionar regras `:focus-visible` no CSS
- [ ] Adicionar segundo breakpoint de responsividade (tablet)

**Fase 5 — README**

- [ ] Reescrever README com hierarquia correta de títulos e print da página

**Fase 6 — Testar**

- [ ] Testar em DevTools em 360px, 768px, 1024px, 1440px e 1920px
- [ ] Clicar em cada botão e link, confirmar que nada quebra
- [ ] Abrir o Console e confirmar zero erros vermelhos
- [ ] Trocar o tema do sistema operacional pra modo escuro e abrir a página em aba anônima — deve abrir no escuro

---

## Considerações finais

Manu, o que você entregou tem uma intenção clara e bastante coisa começada — tema escuro, Clipboard, IntersectionObserver, typewriter, layout em grid, responsividade. O problema é que três coisas pequenas (um ID errado de um caractere, um elemento HTML faltando, e nomes de arquivo que não batem) estão *escondendo* boa parte do trabalho que você já fez. Quando você consertar a Fase 1 do checklist, vai ver que metade dos seus "features quebrados" passam a funcionar de uma vez — não porque você fez de novo, mas porque o JS finalmente roda inteiro.

Depois disso, a Fase 2 (variáveis CSS) e a Fase 3 (mais mídia) são o resto do escopo. São pedidas que valem pra **todos os projetos** desse curso e dos próximos — então não pense nelas como "burocracia da Manu", pense como "vocabulário base que daqui pra frente vou aplicar sem pensar".

Não tenha pressa em reentregar correndo: passa fase por fase desse checklist com calma, abre o Console depois de cada mudança grande pra confirmar que nada quebrou, e quando tudo estiver verde aí sim manda. Você tem base — só falta fechar os detalhes da diretriz. Boa sorte!
