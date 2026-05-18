# Revisão — Projeto 01 Cartão de Visita

**Aluno:** Augusto Gaipo
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Augusto, vou começar pelo que importa: visualmente, a sua página é uma das mais bonitas e bem-acabadas da turma. Os blobs animados no fundo, a textura de ruído, o anel girando ao redor do avatar, o texto com gradiente, o subtítulo que se redigita sozinho — dá pra ver na hora que você pensou no projeto, não só executou. O JavaScript também está completo: tema, copiar e-mail, scroll reveal e a extra, tudo funcionando.

O que segura a aprovação não é falta de capricho — é um conjunto de **requisitos técnicos da diretriz** que ficaram de fora. São seis pontos, e nenhum deles é difícil: a maior parte é reorganizar o que você já tem. Esta revisão explica cada um e já vem com o código pronto.

---

## O que já está bom

- **Identidade visual forte.** A paleta (azul `--accent` + verde `--accent-2`), o gradiente no `h1`, os cartões com `box-shadow` e borda fina, o badge "Disponível para oportunidades" pulsando — tudo conversa entre si. O critério "Design e identidade" está cumprido com folga.
- **Elemento criativo de verdade.** Os blobs no fundo com `@keyframes drift`, o `--noise` em SVG inline e o anel cônico girando no avatar (`@keyframes spin`) são autorais e mostram esforço claro. O subtítulo que digita e apaga frases em rotação é um efeito bem-feito — esse é o seu JavaScript extra, e ele funciona bem.
- **As três interações obrigatórias estão lá.** Toggle de tema com `localStorage`, copiar e-mail com Clipboard API e toast de feedback, e animação de entrada com `IntersectionObserver` usando `observer.unobserve()` (anima uma vez por seção, que é o certo).
- **Layout moderno.** Grid e Flexbox montam o esqueleto inteiro; `position: fixed`/`absolute` aparecem só onde fazem sentido (botão de tema, blobs, anel do avatar, toast). Nada de `float` pra layout.
- **CSS organizado e comentado.** Os blocos `/* ─── TOKENS ─── */`, `/* ─── HEADER ─── */`, etc. deixam o arquivo fácil de navegar. Esse hábito é exatamente o que a diretriz pede.
- **Cores em variáveis, com tema por atributo.** As cores moram em `[data-theme="dark"]` e `[data-theme="light"]`, e a troca acontece mudando o atributo no `<html>` — o jeito certo. Nenhuma cor de tema chumbada espalhada.

---

## Bloqueadores

Pela tabela da seção 7 da diretriz, cada linha vermelha exige reentrega. Aqui há seis — listadas da mais estrutural pra menor.

### 1. O projeto inteiro está num arquivo só

A seção 5 da diretriz pede três arquivos separados na raiz: `index.html`, `style.css` e `script.js` — mais o `README.md` e a pasta `assets/`. Hoje o seu CSS está dentro de um `<style>` e o seu JavaScript dentro de um `<script>`, tudo dentro do `index.html`. O seu próprio README descreve isso: *"index.html — arquivo único com HTML, CSS e JS"*.

Separar não é burocracia. Cada arquivo tem um trabalho: o HTML descreve o conteúdo, o CSS cuida da aparência, o JS cuida do comportamento. Com tudo junto, qualquer mudança obriga a caçar o trecho certo num arquivo gigante; separado, você sabe exatamente onde mexer. É também o que permite o navegador guardar o CSS em cache entre páginas.

A correção é mecânica e não muda nada na aparência:

1. Crie `style.css`. Recorte tudo que está **dentro** do `<style>...</style>` e cole no arquivo novo. Apague a tag `<style>` do HTML.
2. Crie `script.js`. Recorte tudo que está **dentro** do `<script>...</script>` e cole nele. Apague a tag `<script>` do HTML.
3. No `<head>`, ligue o CSS; e antes do `</body>`, ligue o JS:

   ```html
   <!-- no <head> -->
   <link rel="stylesheet" href="style.css">

   <!-- antes do </body> -->
   <script src="script.js" defer></script>
   ```

4. Crie a pasta `assets/` e mova `foto1.jpg`, `foto2.jpg` e `foto3.jpg` pra dentro dela. Depois atualize os `src` no HTML: `src="assets/foto1.jpg"`, e assim por diante.

> **Atenção:** estilo inline (`style="..."` direto na tag) continua proibido pela seção 4.1 — mas um `<style>` no `<head>` **não** é estilo inline, é uma folha interna. O problema aqui é só a seção 5, que exige os arquivos separados.

### 2. As seções de conteúdo são `<div>`, não `<section>`

A linha "HTML semântico" da tabela pede `header`, `main`, `section`, `footer` usados corretamente. Você acertou no `<header>`, no `<main>` e no `<footer>` — mas os quatro blocos de conteúdo ("Sobre mim", "Objetivos de Aprendizado", "Fotos & Vídeo", "Contato") são todos `<div class="section">`.

Cada um desses blocos é uma **seção temática** da página: é exatamente para isso que existe a tag `<section>`. Um leitor de tela anuncia uma `<section>` (ainda mais com um título dentro) como uma região navegável; uma `<div>` é invisível pra ele. Como você não muda o nome da classe, o CSS continua funcionando igual:

```html
<section class="section reveal reveal-delay-1">
  <div class="section-label">Quem sou</div>
  <h2>Sobre mim</h2>
  ...
</section>
```

Troque as quatro `<div class="section">` por `<section class="section">` (e o `</div>` correspondente por `</section>`). Aproveite e envolva o botão de tema num `<nav>`, que é a tag pra blocos de navegação/ações.

### 3. O `alt` das fotos não descreve nada

A linha "Acessibilidade" da tabela pede `alt` descritivo em toda imagem — e a seção 3.2 é explícita: *"alt descritivo (não é 'imagem', é o que ela mostra)"*. As suas fotos da galeria estão assim (`index.html`):

```html
<img src="foto1.jpg" alt="Foto 1">
<img src="foto2.jpg" alt="Foto 2">
<img src="foto3.jpg" alt="Foto 3">
```

"Foto 1" é justamente o tipo de `alt` que a diretriz rejeita: quem não enxerga a imagem ouve "Foto 1" e não fica sabendo de nada. O `alt` precisa contar o que aparece na foto:

```html
<img src="assets/foto1.jpg" alt="Augusto em pé num evento, vestindo camisa social">
```

(Ajuste a descrição pra o que cada foto realmente mostra.) O `alt` do avatar — "Foto de Augusto Gaipo" — já está aceitável.

### 4. Não há sistema tipográfico em variáveis

A linha "Sistema tipográfico" pede **pelo menos 4 tamanhos de fonte definidos como variáveis e reaproveitados com consistência**. Hoje o seu `:root` tem variáveis de cor, de raio (`--radius`) e de transição (`--ease`), mas **nenhuma de tamanho de fonte**. Os tamanhos estão escritos um a um, soltos, em cada regra: `1.6rem` no `h2`, `.97rem` no `p`, `.88rem`, `.78rem`, `.72rem`, `.82rem`, `.75rem`...

Isso é o que a coluna "reprovado" descreve como "tamanhos chumbados em valores aleatórios". Junte-os numa escala no `:root`:

```css
:root {
  --fs-xs: 0.75rem;
  --fs-sm: 0.88rem;
  --fs-base: 0.97rem;
  --fs-lg: 1.6rem;
  --fs-xl: clamp(2.4rem, 6vw, 4.2rem);
}
```

E troque os valores soltos pelas variáveis nos elementos:

```css
h1 { font-size: var(--fs-xl); }
h2 { font-size: var(--fs-lg); }
p  { font-size: var(--fs-base); }
```

Assim, se um dia você quiser todos os textos um pouco maiores, muda em um lugar só.

### 5. Só há um breakpoint de responsividade

A linha "Responsividade" pede **pelo menos dois breakpoints**, pra a página funcionar bem de 360px a 1920px. Hoje o seu CSS tem uma única media query: `@media (max-width: 640px)`. O uso de `clamp()` e de grids `auto-fill` ajuda muito — a página não quebra —, mas o critério exige dois pontos de ajuste explícitos.

Acrescente um breakpoint intermediário, pra tablet, e ajuste o que faz sentido nessa faixa:

```css
@media (max-width: 960px) {
  .section { padding: 2rem; }
  header { padding: 5.5rem 0 4rem; }
}

@media (max-width: 640px) {
  /* o que você já tem */
}
```

### 6. O tema não respeita a preferência do sistema na primeira visita

A linha "Tema claro/escuro" pede que o tema persista em `localStorage` **e** respeite `prefers-color-scheme` na primeira visita. A persistência você fez. Mas a primeira visita está assim (`script.js`):

```js
const saved = localStorage.getItem('theme') || 'dark';
```

Quando ninguém nunca abriu a página, não há nada no `localStorage`, então o tema cai sempre em `'dark'` — ignorando se o usuário configurou o computador no modo claro. Detecte isso com `window.matchMedia`:

```js
function temaInicial() {
  const salvo = localStorage.getItem('theme');
  if (salvo) return salvo;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const saved = temaInicial();
```

Assim a primeira visita já abre no tema que combina com o sistema da pessoa, e a partir daí a escolha dela manda.

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas resolva antes de reenviar.

1. **Falta estado de foco visível.** O seu CSS tem `:hover` em tudo, mas nenhum `:focus`/`:focus-visible`. Quem navega por teclado (Tab) não vê onde está. O `outline` padrão do navegador ainda funciona porque você não o removeu — mas vale dar um foco que combine com o design:

   ```css
   a:focus-visible,
   button:focus-visible {
     outline: 2px solid var(--accent);
     outline-offset: 3px;
   }
   ```

2. **`rel="noopener"` sem o `noreferrer`.** Os links externos usam `rel="noopener"`; a diretriz pede `rel="noopener noreferrer"`. Acrescente o `noreferrer` nos três links de `target="_blank"`.

3. **O `iframe` do vídeo permite `autoplay`.** O atributo `allow="...; autoplay; ..."` libera reprodução automática. Na prática o vídeo não dá autoplay (a URL não tem `&autoplay=1`), então não é um bloqueador — mas o ideal é remover `autoplay` da lista do `allow`, pra deixar claro que a página não tem essa intenção.

4. **Copiar e-mail sem tratamento de erro.** O `navigator.clipboard.writeText(...).then(...)` não tem `.catch()`. Se a cópia falhar, nada acontece e o erro vai pro Console. Acrescente um `.catch()` que mostre uma mensagem de falha.

5. **Sem variáveis de espaçamento.** A diretriz pede paleta, tipografia **e espaçamentos** no `:root`. Os `padding`/`margin` da página estão todos soltos (`2.5rem`, `1.5rem`, `.75rem`...). Vale criar `--space-sm/md/lg` junto com a escala tipográfica do bloqueador 4.

6. **Nome do repositório.** A seção 10 pede o formato `ibtech-projeto01-seunome`. O seu está como `cardvisita`. Em **Settings → General → Repository name**, renomeie pra `ibtech-projeto01-augusto`.

---

## Pontos menores

Não pesam na nota e não exigem reentrega — só polimento.

- **README sem turma e sem "como rodar".** A seção 6 pede que o README traga o seu nome **e a turma** ("IbTech Frontend 2026.1") e uma linha de "como rodar" (basta "abrir `index.html` no navegador"). O seu README está bem escrito, só faltam esses dois itens — e ele ainda descreve o "arquivo único", que vai mudar depois do bloqueador 1.
- **`foto3.jpg` faz dois papéis.** A mesma imagem é o avatar e a terceira foto da galeria. Funciona, mas a galeria ganha identidade com três fotos realmente diferentes.

---

## Checklist de reentrega

Sugestão de ordem — comece pela reorganização, que destrava o resto:

1. [ ] Separar o CSS em `style.css` e o JS em `script.js`; criar a pasta `assets/` (bloqueador 1)
2. [ ] Trocar as quatro `<div class="section">` por `<section>` e envolver o botão de tema num `<nav>` (bloqueador 2)
3. [ ] Reescrever o `alt` das três fotos da galeria com descrições reais (bloqueador 3)
4. [ ] Criar a escala tipográfica no `:root` e aplicar as variáveis (bloqueador 4)
5. [ ] Adicionar um segundo breakpoint, pra tablet (bloqueador 5)
6. [ ] Fazer o tema detectar `prefers-color-scheme` na primeira visita (bloqueador 6)
7. [ ] Resolver as flags: foco visível, `noreferrer`, `allow` do vídeo, `.catch()` no copiar e-mail, variáveis de espaçamento, nome do repositório
8. [ ] Atualizar o README (turma + "como rodar") e testar em 360px e 1920px no DevTools

---

## Considerações finais

Augusto, não confunda "seis bloqueadores" com "projeto ruim" — é o contrário. A parte difícil, a que mais derruba gente nesta turma, você já fez: a página tem identidade, o JavaScript está completo e o elemento criativo é de verdade. O que falta são requisitos da diretriz que ficaram de fora, e quase todos se resolvem **reorganizando** o que você já escreveu — separar arquivos, trocar `div` por `section`, juntar tamanhos numa escala. Você não vai recomeçar nada; vai arrumar o acabamento.

Faça item por item, sem pressa, na ordem do checklist — comece separando os arquivos, porque isso deixa tudo mais fácil de mexer. E lembre: a IA pode ajudar a sugerir, mas quem precisa entender e saber explicar cada trecho na conversa de avaliação é você. Abra o DevTools (F12), teste em 360px e 1920px, confira o Console.

O capricho visual está aí. Agora é alinhar com a diretriz e reenviar.

---
*Revisão por Josh — 2026-05-18*
