# Laura Marcolino Ramos

**Turma:** IbTech Frontend 2026.1
**Projeto:** 01 — Cartão de Visita
**Repositório:** [lauramarcolinor/ibtech-projeto01-laura-marcolino](https://github.com/lauramarcolinor/ibtech-projeto01-laura-marcolino)
**Status final:** Aprovado (após reentrega)

---

## Revisão final — 2026-05-14

**Status:** Aprovado
**Reentrega de:** revisão inicial (2026-05-13, abaixo)

Laura, parabéns! Você passou pelos pontos da revisão anterior um por um e arrumou praticamente tudo — inclusive os opcionais. Esta nota é a confirmação da aprovação e um registro do que ficou melhor pra você guardar como referência nos próximos projetos.

### O que você corrigiu

#### Bloqueadores (os dois que derrubavam a entrega anterior)

- **Vídeo embedded adicionado** (`index.html:151-170`). Iframe do YouTube com `loading="lazy"`, sem autoplay, com `allowfullscreen` e proporção 16:9 responsiva. Você ainda colocou um parágrafo explicando a escolha do vídeo conectando ao tema do céu estrelado — esse cuidado de costurar a peça nova ao resto do site é exatamente o que diferencia um trabalho que cumpre tabela de um trabalho coerente.
- **Sistema tipográfico em variáveis** (`style.css:24-32`). Você criou 9 variáveis (`--fs-xs` a `--fs-xxl`), bem mais do que as 4 obrigatórias, e mais importante: aplicou no arquivo inteiro. Não tem mais px solto de fonte no CSS.

#### Flags

- **Cores agora 100% em variáveis.** Aquela duplicação da seção "TEMA CLARO / ESCURO" que existia no final do CSS sumiu — você refatorou pra que cada regra use `var(--cor-xxx)` desde o início, e o tema escuro virou só uma troca de valores em `body.tema-escuro` (`style.css:35-49`). É exatamente como o CSS de produção é escrito. Esse foi o ganho mais relevante de todos: você economizou ~100 linhas de código duplicado.
- **Segundo breakpoint adicionado** (`style.css:830`). Agora tem 768px e 380px, cobrindo celular comum e celular muito pequeno.
- **`<br>` removido** e substituído por `display: block` no span (`style.css:247`).
- **Hierarquia de títulos corrigida** — `<h3>` no subtítulo da seção sobre (`index.html:103`).
- **Listener de clique fora no menu mobile** (`script.js:163-176`). Implementado com a lógica certa: só fecha se o clique não foi nem no menu nem no botão.
- **Lista visível de habilidades** (`index.html:121-130`, estilizada como tags em `style.css:260-288`). Ficou bonita — borda marrom, padding generoso, espaçamento entre tags. Visualmente legível em 3 segundos, que era o ponto.

#### Pontos menores (opcionais que você fez mesmo assim)

- `body { position: relative; }` adicionado (`style.css:56`) — o céu estrelado agora cobre a página inteira ao rolar.
- Poppins importada e finalmente aplicada (`style.css:53`).
- Arquivos renomeados sem espaço (`avatarLM.PNG`, `avatas2.png`, `logopng.png`).
- `loading="lazy"` no avatar (`index.html:99`).

### Detalhes que ficaram pra polir nos próximos projetos

Esses não pesam na nota e **não exigem nova reentrega** — são só observações pra você ir afiando:

- **"VIDEO" sem acento** no título da seção (`index.html:153`). Provavelmente cabia "Vídeo" como nas outras seções.
- **Cards de projetos ainda usam `background-image`** (`style.css:363-377`) em vez de `<img>` com `alt`. Pro leitor de tela, os cards de formatura e IBMEC ficam invisíveis (background é "decorativo"). Pra um portfólio, faz sentido cada card ter `<img alt="...">` descrevendo a foto.
- **`loading="lazy"` só no avatar.** As outras imagens (logo no header é first-view, então não leva; mas os cards de portfolio são below-the-fold) também ganhariam o lazy.
- **README sem screenshot da página.** Não é obrigatório, mas em portfólios profissionais um print no README dá um toque que faz diferença.

### Considerações finais

Laura, dois recados:

1. **A diferença entre as duas entregas é noite e dia.** A primeira tinha boa base mas tabelas vermelhas; esta tem uma identidade visual coerente, código que segue padrões reais de produção, e a arquitetura de variáveis CSS que é exatamente como sites profissionais são feitos. Você não só corrigiu — você **entendeu** o porquê de cada regra, que era o objetivo da revisão didática.

2. **A coisa mais valiosa que você levou desse projeto:** o hábito de definir variáveis CSS no `:root` e só usar `var(...)` no resto do arquivo. Isso vai te economizar horas em projetos maiores. Você acabou de aprender, no Projeto 01, uma das coisas que mais separam código de iniciante de código de pessoa que entende CSS.

Parabéns pelo trabalho. Manda bala no Projeto 02.

---

## Revisão inicial — 2026-05-13

**Status:** Reentrega necessária

Oi Laura! Antes de qualquer coisa: dá pra ver que você se dedicou — o céu estrelado é uma ideia bonita, o tema claro/escuro está completo, a página tem identidade visual coerente, e o código está organizado e legível. Você fez muita coisa certa. Esta revisão é detalhada de propósito: o objetivo não é só te dizer "refaz X", e sim te explicar o **porquê** de cada critério, pra que na reentrega (e nos próximos projetos) você já saiba a regra de cabeça.

Vou separar em três níveis:

1. **Bloqueadores** — coisas que, pela tabela de avaliação da diretriz, derrubam a entrega. Tem que corrigir.
2. **Flags** — não derrubam sozinhas, mas se acumularem com os bloqueadores reprovam por consistência. Corrige antes da reentrega.
3. **Pontos menores** — polimento. Você decide se mexe.

No final tem um checklist de reentrega.

### O que já está bom

Pra começar pelo lado positivo (que é boa parte do trabalho):

- **Tema claro/escuro completo.** Toggle visível, persiste no `localStorage`, respeita `prefers-color-scheme` na primeira visita, e a troca é feita pelas variáveis CSS no `:root` — exatamente como a diretriz pede. Esse é um dos critérios mais difíceis de acertar e você acertou inteiro.
- **IntersectionObserver bem aplicado** (`script.js:90-104`). Threshold `0.2` é uma escolha razoável, e você adiciona a classe `aparecer` em vez de manipular estilo direto. Limpo.
- **Clipboard API com feedback visual de 2 segundos** (`script.js:30-43`). Funciona, volta ao normal, tudo certo.
- **`a:focus-visible` e `button:focus-visible` com outline visível** (`style.css:648-652`). Muita gente esquece disso — acessibilidade básica passada.
- **Links externos com `target="_blank"` e `rel="noopener noreferrer"`** em todos os lugares. Segurança e UX corretos.
- **Open Graph configurado** no `<head>` (`index.html:11-13`).
- **Elemento criativo autoral.** O céu estrelado animado, gerado dinamicamente no JS com posicionamento aleatório e animação de brilho, é exatamente o tipo de coisa que a diretriz 3.3 pede: "algo que VOCÊ pensou e implementou". Passa em criatividade.
- **Reset CSS no topo** (`style.css:2-6`).
- **Estrutura geral do HTML** com `<header>`, `<main>`, `<section>` e `<footer>` no lugar certo.

### 1. Bloqueadores

#### 1.1 Falta o vídeo embedded

**Diretriz 3.2 e tabela seção 7 (linha "Mídia"):**

> "Pelo menos 1 vídeo embedded. Pode ser do YouTube, um clip seu hospedado, time-lapse de algum projeto, edição que você curtiu fazer. Faça sentido com a página."

A sua página tem fotos (boas), mas zero vídeo. Não tem `<video>` nem `<iframe>` do YouTube em lugar nenhum. Pela tabela de avaliação, isso é uma linha vermelha automática — independente de tudo que está bom no resto, falta esse item.

**Por que essa regra existe:** o cartão de visita é pra ser uma página que mostra você *além do texto*. Vídeo é a forma mais rica de fazer isso — pode ser você falando, pode ser um time-lapse de um projeto, um clip que você editou, qualquer coisa que mostre dimensão. Texto + foto a gente vê em qualquer LinkedIn.

**Como corrigir:**

Escolhe um vídeo (pode ser do YouTube — mais simples) e embeda. Exemplo, dentro da seção sobre ou criando uma nova section:

```html
<section class="video animar-section" id="video">
    <div class="interface">
        <h2 class="titulo">Em vídeo</h2>
        <div class="video-wrapper">
            <iframe
                src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                title="Descrição do vídeo"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
    </div>
</section>
```

E no CSS, pra deixar o iframe responsivo (proporção 16:9 que não distorce):

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
    border-radius: 18px;
}
```

A diretriz pede também: **com controles, sem autoplay com áudio, com poster definido**. O iframe do YouTube já vem com controles por padrão; pra não ter autoplay basta não passar `autoplay=1` na URL.

#### 1.2 Sistema tipográfico sem variáveis

**Diretriz 4.2 e tabela seção 7 (linha "Sistema tipográfico"):**

> "Pelo menos 4 tamanhos definidos como variáveis e reaproveitados com consistência."

Você fez `:root` direitinho pras cores (`style.css:8-22`) — mas só pras cores. Pra tamanho de fonte, você tem px hardcoded espalhado pelo arquivo inteiro: `42px`, `32px`, `22px`, `18px`, `16px`, `15px`, `14px`, `13px`, `12px`... cada elemento decidindo seu tamanho na unha.

**Por que essa regra existe:** quando os tamanhos de fonte estão em variáveis, sua tipografia vira um *sistema*. Se você decidir amanhã que o texto base deve ser um pouquinho maior, você muda *uma linha* e o site inteiro responde proporcionalmente. Sem variáveis, você ia ter que caçar 30 valores de px diferentes e mudar um por um — e provavelmente esquecer alguns, criando aquela bagunça de "esse h2 está 32px aqui e 28px ali" que sua página tem hoje.

**Como corrigir:**

No `:root`, adiciona uma escala. Eu sugiro essa, mas escolhe os números que combinam com a página:

```css
:root {
    /* ... suas cores ... */

    /* tipografia */
    --fs-xs:   0.75rem;   /* 12px - labels pequenos, footer span */
    --fs-sm:   0.875rem;  /* 14px - subtexto, descrição footer */
    --fs-base: 1rem;      /* 16px - body, links menu, contatos */
    --fs-md:   1.125rem;  /* 18px - parágrafos, botões */
    --fs-lg:   1.5rem;    /* 24px - overlay projetos */
    --fs-xl:   2rem;      /* 32px - títulos h2 */
    --fs-xxl:  2.625rem;  /* 42px - h1 e h2 do "Sobre" */

    /* tamanho base */
    font-size: 16px;
}
```

Depois, no resto do arquivo, troca cada `font-size: 42px` por `font-size: var(--fs-xxl)`, `font-size: 22px` por `var(--fs-md)`, etc. Não precisa ser exatamente esses sete — quatro variáveis já cumprem o critério —, mas o ponto é: **toda fonte do site referencia uma variável**.

**Bônus chato que precisa arrumar junto:** você importou a fonte **Poppins** do Google Fonts (`index.html:18-20`), mas o seu `body` (`style.css:42`) usa `font-family: Arial, Helvetica, sans-serif`. A fonte é baixada e nunca aplicada — desperdício de bytes. Troca pra:

```css
body {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    /* o resto continua */
}
```

(Arial/Helvetica ficam como fallback se a Poppins falhar.)

### 2. Flags

Esses não derrubam isoladamente, mas a tabela de avaliação cita cada um deles. Se você corrige só os dois bloqueadores acima e deixa esses, vira reprovação por acúmulo.

#### 2.1 Cores hardcoded espalhadas mesmo com `:root` definido

**Tabela seção 7 — critério "Variáveis e organização CSS":**

> Reprovado se: "Cores hardcoded espalhadas pelo arquivo, sem reset, CSS sem nenhuma organização visível."

Você definiu as variáveis (linhas 8-22) e depois reutilizou bem na seção "TEMA CLARO / ESCURO" lá embaixo (537+). Mas no meio do arquivo, ainda tem cor escrita direta em vários lugares:

| Linha | O que está | O que deveria estar |
|---|---|---|
| 43 | `background-color: #f7f7f7;` | `background-color: var(--cor-fundo);` |
| 44 | `color: #000;` | `color: var(--cor-texto);` |
| 49 | `background-color: #fff;` | `background-color: var(--cor-header);` |
| 85, 100 | `color: #000;` | `color: var(--cor-texto);` |
| 107 | `color: #9c805c;` | `color: var(--cor-marrom-hover);` |
| 117 | `background-color: #f7f7f7;` | `background-color: var(--cor-fundo);` |
| 142, 198 | `background-color: #b89b72;` | `background-color: var(--cor-marrom);` |
| 153, 257 | `background-color: #b89b72;` | `background-color: var(--cor-marrom);` |
| 165, 269 | `background-color: #9c805c;` | `background-color: var(--cor-marrom-hover);` |
| 190, 231, 244 | `color: #000;` | `color: var(--cor-texto);` |
| 289 | `color: #000;` | `color: var(--cor-texto);` |
| 312 | `border: 2px solid #222;` | `border: 2px solid var(--cor-borda);` |
| 393 | `background-color: #4f3b26;` | `background-color: var(--cor-footer);` |
| 410, 419 | cores hardcoded no footer | trocar pelas variáveis correspondentes |
| 436 | `color: #c2a276;` | `color: var(--cor-marrom);` |

**Por que isso importa:** seu tema escuro *parece* funcionar, mas só porque as regras lá embaixo (537+) sobrescrevem essas cores hardcoded com `var(...)`. Você está escrevendo cada regra duas vezes — uma com cor fixa, outra com variável. Se um dia você apagar a seção "TEMA CLARO / ESCURO" sem perceber, o tema escuro quebra inteiro. E em alguns botões/elementos a cor hardcoded vence quando você não esperava (especificidade do CSS).

**Como corrigir:** apaga as cores hardcoded das linhas 41-475 e usa `var(--cor-xxx)` desde o início. A seção 537+ ("TEMA CLARO / ESCURO") pode quase inteira ser apagada — ela só era necessária porque o resto do arquivo não usa variável. Quando tudo usa variável, trocar a cor no `:root` (e em `body.tema-escuro`) já muda a página inteira. Esse é o ponto.

#### 2.2 Só um breakpoint de responsividade

**Diretriz 4.2 e tabela seção 7 — critério "Responsividade":**

> "Pelo menos dois breakpoints. A página não pode quebrar em 360px nem em 1920px."

Você tem três blocos `@media screen and (max-width: 768px)` (linhas 371, 466, 693, 796) — mas todos no mesmo breakpoint de 768px. A diretriz pede no mínimo **dois breakpoints diferentes**.

**Por que isso importa:** entre 360px (celular pequeno) e 1920px (monitor grande) tem MUITA tela diferente — tablets retrato (~600-800px), tablets paisagem (~1024px), notebooks (~1280-1440px). Um único corte em 768px significa que tablets paisagem e celulares grandes podem ter problemas.

**Como corrigir:** adicione um breakpoint a mais. O mais comum é separar mobile de tablet:

```css
/* tablet — entre 769px e 1024px */
@media screen and (max-width: 1024px) {
    .interface {
        padding: 0 20px;
    }
    section.portfolio .flex {
        gap: 25px;
    }
    /* o que mais fizer sentido apertar pra tablet */
}
```

Ou, se você prefere ir pra mobile pequeno (telas muito estreitas, tipo iPhone SE):

```css
/* mobile pequeno — até 380px */
@media screen and (max-width: 380px) {
    .txt-topo-site h1 {
        font-size: 28px;
        letter-spacing: 3px;
    }
}
```

Qualquer um dos dois (ou os dois) resolve. Testa em DevTools (Chrome → F12 → ícone de celular) em 360px, 768px, 1024px, 1440px, 1920px.

#### 2.3 `<br>` pra espaçar dentro de `<h2>`

**Diretriz 4.1:**

> "Nada de estilo inline (`style="..."`) nem `<br>` pra espaçar. Espaçamento é CSS."

`index.html:103`:

```html
<h2>MUITO PRAZER, <span><br>SOU LAURA MARCOLINO.</span></h2>
```

**Por que essa regra existe:** `<br>` tem um significado semântico de "quebra de linha forçada" (usado em poesia, endereços, letras de música — coisas onde a quebra É parte do conteúdo). Espaçar visualmente "MUITO PRAZER" de "SOU LAURA MARCOLINO" não é semântica, é layout. Layout é CSS.

**Como corrigir:**

```html
<h2>MUITO PRAZER,<span>SOU LAURA MARCOLINO.</span></h2>
```

E no CSS:

```css
.txt-sobre h2 span {
    display: block;       /* faz o span virar uma "linha" inteira */
    color: var(--cor-marrom);
}
```

Resultado visual idêntico, sem `<br>`.

#### 2.4 Dois `<h2>` na mesma seção (hierarquia)

**Diretriz 4.1 e tabela seção 7 — critério "HTML semântico":**

> "h1 único, hierarquia sem pular nível."

Na sua seção "sobre", tem dois `<h2>` consecutivos:

- `index.html:93` — `<h2>Sobre mim</h2>` (o título da seção)
- `index.html:103` — `<h2>MUITO PRAZER, SOU LAURA MARCOLINO</h2>` (subtítulo dentro da seção)

Pela hierarquia, o segundo está *dentro* do primeiro, então deveria ser `<h3>`.

**Como corrigir:** troca `<h2>` por `<h3>` na linha 103. Ajusta o seletor CSS `.txt-sobre h2` pra `.txt-sobre h3` (ou usa classe se preferir não acoplar ao tipo de tag).

**Por que isso importa:** leitores de tela usam a hierarquia de títulos pra navegar a página (tipo um índice). Quando você pula nível ou tem dois títulos do mesmo nível onde um é claramente subordinado ao outro, a navegação fica confusa.

#### 2.5 Menu mobile não fecha no clique fora

**Diretriz 4.4:**

> "Menu mobile (hambúrguer) que abre, fecha no clique fora e no Esc"

Seu menu (`script.js:106-138`) fecha:
- Ao clicar nos links (linha 124) — bom
- Ao pressionar Esc (linha 132) — bom
- Ao clicar fora do menu — **falta**

**Como corrigir:** adiciona um listener no `document`:

```javascript
document.addEventListener('click', function (event) {
    if (!menuMobile.classList.contains('ativo')) return;

    const clicouNoMenu = menuMobile.contains(event.target);
    const clicouNoBotao = botaoMenu.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        menuMobile.classList.remove('ativo');
        botaoMenu.textContent = '☰';
        botaoMenu.setAttribute('aria-label', 'Abrir menu');
    }
});
```

A lógica: se o menu está aberto E o clique não foi nem dentro do menu nem no botão de abrir, fecha.

#### 2.6 Falta lista explícita de habilidades

**Checklist seção 8 — bloco "Conteúdo":**

> "Lista de habilidades ou interesses"

Nos seus parágrafos da seção "Sobre", você menciona Python, HTML, CSS, C, inglês — mas tudo dentro do texto corrido. A diretriz pede uma *lista* visível.

**Por que isso importa:** quando um recrutador abre seu cartão de visita, ele quer escanear suas skills em 3 segundos. Parágrafo corrido obriga a ler tudo. Uma lista visual entrega o dado direto.

**Como corrigir:** adicione um bloco antes ou depois dos parágrafos. Sugestão:

```html
<div class="habilidades">
    <h3>Habilidades e interesses</h3>
    <ul>
        <li>HTML & CSS</li>
        <li>JavaScript (vanilla)</li>
        <li>Python (iniciante)</li>
        <li>Linguagem C (básico)</li>
        <li>Inglês fluente</li>
        <li>Trabalho em equipe</li>
    </ul>
</div>
```

E estiliza com flex/grid pra ficar em tags, cards ou bullets bonitos — fica a seu critério.

### 3. Pontos menores

Polimento. Não pesam na nota, mas melhoram o resultado.

- **`loading="lazy"` ausente em todas as imagens.** A diretriz pede onde fizer sentido. Pra imagens "below the fold" (avatar do Sobre, fotos dos projetos), adiciona: `<img src="..." alt="..." loading="lazy">`. Imagens da primeira tela (logo, hero) **não** levam lazy.

- **Cards de projeto com `background-image` perdem alt.** Os cards de formatura e IBMEC (`index.html:153-159`) são `<article>` sem imagem real — a foto vem por CSS (`style.css:329-335`). Background-image é "decorativo" pro leitor de tela, então a foto fica invisível. Considere trocar por `<img>` com `alt` descritivo dentro do card e tirar o `background-image`.

- **Nomes de arquivo com espaço.** `avatas 2.png`, `logo png.png` — funciona, mas espaço em nome de arquivo gera URL feia (`avatas%202.png`) e pode quebrar em alguns deploys. Renomeia pra `avatar-2.png`, `logo.png`. Atualiza as referências no HTML e CSS.

- **Pasta `images/` em vez de `assets/`.** A diretriz seção 5 sugere `assets/`. Não é regra dura, mas é o padrão pedido.

- **`body` com cores duplicadas** (`style.css:41-45` e depois `537-540`). Quando você fizer o cleanup do item 2.1, isso some naturalmente.

- **Bug provável do céu estrelado.** O `.ceu-estrelado` (`style.css:482-490`) tem `position: absolute` mas o `body` não tem `position: relative` definido. Isso faz o `inset: 0` ser relativo ao viewport, então as estrelas só cobrem a primeira tela mesmo com o JS setando `height = scrollHeight`. Testa rolando a página — se as estrelas não acompanham, adiciona:

  ```css
  body {
      position: relative;
  }
  ```

- **README sem print da página.** A diretriz fala que é recomendado, não obrigatório. Mas um screenshot em `assets/` referenciado no README dá um toque profissional.

### Checklist de reentrega

Marca conforme for resolvendo:

- [ ] Adicionar 1 vídeo embedded (YouTube ou hospedado), com controles, sem autoplay com áudio
- [ ] Criar pelo menos 4 variáveis de tamanho de fonte no `:root` e substituir os px hardcoded
- [ ] Trocar a `font-family` do `body` pra usar a Poppins importada
- [ ] Substituir todas as cores hardcoded por `var(--...)`
- [ ] Adicionar um segundo breakpoint de responsividade
- [ ] Trocar o `<br>` por `display: block` no span
- [ ] Trocar o segundo `<h2>` da seção "sobre" por `<h3>`
- [ ] Adicionar listener de clique fora no menu mobile
- [ ] Criar uma lista visível de habilidades/interesses
- [ ] (Opcional) `loading="lazy"` nas imagens below-the-fold
- [ ] (Opcional) Renomear arquivos com espaço
- [ ] (Opcional) Testar o céu estrelado em página rolada — corrigir se só cobrir a primeira tela
- [ ] Testar em 360px, 768px, 1024px e 1920px no DevTools antes de reentregar

### Considerações finais

Laura, o que você entregou tem uma base sólida — JavaScript correto, identidade visual coerente, criatividade autêntica. Os bloqueadores são **escopo faltando** (vídeo) e **organização** (variáveis de fonte e cores), não erros de raciocínio. Quem entende JS a ponto de fazer IntersectionObserver e Clipboard API funcionando junto com tema escuro persistente sabe programar — só falta fechar os detalhes da diretriz.

Não tenha pressa em reentregar correndo: passa item por item desse checklist com calma, testa cada um isolado, e quando tudo estiver verde aí sim manda. Boa sorte!
