# Revisão v2 — Projeto 01 Cartão de Visita

**Aluna:** Maria Clara Guimarães
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária
**Reentrega de:** revisão v1 (2026-05-15, abaixo no histórico)

Maria Clara, você resolveu o bloqueador. O vídeo embedded — o único item que segurava a aprovação da v1 — está na página e funciona. Você também já tinha atacado as flags da revisão anterior: o `<br>` da seção "Sobre" virou uma lista `<ul>`, e o copiar e-mail ganhou `try/catch`. O projeto está praticamente pronto.

Praticamente. Há **um** problema que veio com o vídeo: na pressa de adicionar a seção, ela ficou duplicada. É um bug de copia-cola, de correção rápida — mas como gera HTML inválido e um defeito visível na página, ele entra como bloqueador. Vou explicar exatamente o que aconteceu e como desfazer.

---

## O que você corrigiu desde a v1

- **Vídeo embedded adicionado** (`assets/video.mp4`, embedado com `<video controls>`). O bloqueador único da v1 está resolvido — a mídia agora está completa: 3 fotos + 1 vídeo.
- **`<br>` virou lista de verdade.** A seção "Sobre" não monta mais a lista de ferramentas com `<br>`; agora é um `<ul>` com `<li>` e `<strong>` nas categorias (`index.html:110-114`), como a revisão anterior pediu.
- **Copiar e-mail com `try/catch`** (`script.js:38-49`). Se a cópia falhar, você mostra "Erro ao copiar" em vez de deixar o erro silencioso no Console.

---

## Bloqueador

### 1. A seção de vídeo está duplicada — uma `<section>` dentro da outra

Olhe o trecho do vídeo no `index.html` (linhas 177-190):

```html
<section id="video" class="video-section section-hidden">
  <h2>Vídeo</h2>

  <section id="video" class="video-section section-hidden">
  <h2>Vídeo</h2>

  <div class="video-wrapper">
    <video controls>
      <source src="assets/video.mp4" type="video/mp4">
      Seu navegador não suporta vídeo.
    </video>
  </div>
</section>
</section>
```

Repare: a `<section id="video">` abre, vem um `<h2>Vídeo</h2>` — e aí, **dentro dela, abre outra `<section id="video">` idêntica**, com outro `<h2>Vídeo</h2>`. O conteúdo real (o `<div class="video-wrapper">` com o vídeo) está só dentro da segunda. No fim, os dois `</section>` fecham as duas.

Isso causa dois problemas concretos:

- **A página mostra o título "Vídeo" duas vezes**, um embaixo do outro, antes do vídeo. É um defeito visível.
- **O atributo `id="video"` aparece duas vezes no documento.** Um `id` tem que ser único na página inteira — é a regra mais básica de HTML. Com dois `id="video"`, qualquer link âncora `#video` (e você tem um, no menu) fica ambíguo, e o HTML não valida.

**Como corrigir:** apague a `<section>` de fora (e o `</section>` extra). Deixe só uma:

```html
<section id="video" class="video-section section-hidden">
  <h2>Vídeo</h2>

  <div class="video-wrapper">
    <video controls>
      <source src="assets/video.mp4" type="video/mp4">
      Seu navegador não suporta vídeo.
    </video>
  </div>
</section>
```

Uma `<section>`, um `id`, um `<h2>`. O vídeo continua funcionando igual — você só remove a casca duplicada por fora.

---

## O que precisa arrumar (flags)

Não são linhas vermelhas, mas resolva junto.

1. **A lista de ferramentas está dentro de um `<p>`** (`index.html:105-115`). Você corrigiu o `<br>` — ótimo —, mas o `<ul>` novo ficou colocado **dentro** de um `<p>` que abre na linha 105 e só fecha na 115, depois do `</ul>`. Uma lista (`<ul>`) é um elemento de bloco e não pode morar dentro de um parágrafo (`<p>`); o navegador "conserta" fechando o `<p>` sozinho antes do `<ul>`, o que bagunça a estrutura. Tire o `<ul>` de dentro do `<p>`:

   ```html
   <p>
     Busco construir uma base sólida em tecnologia aplicável a futuros projetos.
     Já tenho domínio sobre ferramentas digitais de criação e edição mais básicas:
   </p>

   <ul>
     <li><strong>Edição de mídia:</strong> Adobe Photoshop, PicsArt, Canva, Adobe Lightroom e CapCut</li>
     <li><strong>Programação:</strong> Visual Studio Code, GitHub, HTML e CSS básico</li>
     <li><strong>Produtividade:</strong> Microsoft PowerPoint e Microsoft Word</li>
   </ul>
   ```

   O `<p>` fecha **antes** do `<ul>` começar. São dois elementos irmãos, não um dentro do outro.

2. **README com bloco de código não fechado** (`README.md:34`). A seção "Estrutura do projeto" abre um bloco com ` ```txt `, mas o arquivo termina sem fechar o ` ``` `. Por isso o texto "Como executar" que vem depois aparece como código. Feche o bloco logo depois da árvore de arquivos.

---

## Pontos menores

Polimento. Não pesam na nota.

- **Imagens pesadas.** `photo1.jpg` (~1,8 MB) e `photo2.jpg` (~2,1 MB) são grandes pra fotos numa página web. Vale comprimir (qualquer compressor de imagem online resolve) — a página carrega mais rápido, principalmente no celular.
- **Duas variáveis tipográficas sem uso.** `--fs-sm` e `--fs-base` estão declaradas no `:root` mas não aparecem aplicadas em nenhum elemento. Ou use-as, ou remova — não é erro, é só arrumação.
- **`h1` mobile com tamanho chumbado** (`style.css:385`). No media query o `h1` vira `2.2rem` fixo, fugindo do seu próprio sistema de variáveis. Vale criar uma variável pra esse tamanho ou usar `clamp()` no `h1`, pra ele se ajustar sozinho.

---

## Checklist de reentrega

1. [ ] Remover a `<section id="video">` duplicada — deixar só uma (bloqueador 1)
2. [ ] Tirar o `<ul>` de dentro do `<p>` na seção "Sobre" (flag 1)
3. [ ] Fechar o bloco de código ` ``` ` no README (flag 2)
4. [ ] (Opcional) Comprimir `photo1.jpg` e `photo2.jpg`; usar ou remover `--fs-sm`/`--fs-base`
5. [ ] Validar o HTML no [validator.w3.org](https://validator.w3.org/#validate_by_input) — confirmar que não há `id` duplicado
6. [ ] Testar em 360px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Maria Clara, o status "reentrega" aqui é quase uma formalidade: você cumpriu o que a v1 pediu e o projeto está completo. O que segura é um único bug de copia-cola — a seção de vídeo entrou em dobro. Apague a casca duplicada, tire o `<ul>` de dentro do `<p>`, feche o bloco do README, e a aprovação vem na próxima rodada.

Antes de reenviar, abre a página no navegador e confere visualmente: o título "Vídeo" tem que aparecer **uma vez** só. Roda o HTML no validador pra garantir que não sobrou `id` repetido. São cinco minutos de ajuste numa entrega que, no resto, está entre as melhores da turma.

Manda a v3.

---
*Revisão v2 por Josh — 2026-05-19*

---

# Histórico — Revisão v1

# Revisão — Projeto 01 Cartão de Visita

**Aluna:** Maria Clara Guimarães
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Maria Clara, boa notícia logo de cara: o seu projeto está perto da aprovação. A parte de JavaScript — que é onde a maioria tropeça — está praticamente toda resolvida: tema, animação de entrada, copiar e-mail, typewriter e até um terminal interativo, tudo funcionando. O que falta pra aprovar é essencialmente **um item**: o vídeo. O resto desta revisão são flags e polimentos que valem a pena, mas o bloqueador é só um.

---

## O que já está bom

- **Sistema de variáveis CSS completo e exemplar.** Você definiu cores, **5 tamanhos de fonte** (`--fs-sm` a `--fs-xxl`) e uma escala de espaçamentos (`--space-sm/md/lg`) no `:root` (`style.css:13-33`) — e usou de verdade no arquivo inteiro. Isso é exatamente o que a diretriz pede e o que muita gente não faz.
- **Tema claro/escuro 100% completo.** Toggle visível, troca via variáveis CSS, salva em `localStorage` e respeita o `prefers-color-scheme` na primeira visita (`script.js:3-31`). Não falta nada nesse critério.
- **Animação de entrada com `IntersectionObserver` bem-feita** (`script.js:59-84`). Você usou `observer.unobserve()` depois que a seção aparece — assim a animação dispara uma vez só, que é o comportamento correto.
- **Dois JavaScript extras, não um.** A diretriz pede um além dos três obrigatórios; você fez o efeito **typewriter** (`script.js:88-109`) e o **terminal interativo** (`script.js:113-154`).
- **Terminal interativo como elemento criativo.** Os comandos `whoami`, `skills` e `contact` funcionam e a ideia é autoral — atende o critério de criatividade da seção 7.
- **Acessibilidade caprichada.** `:focus-visible` com `outline` visível em links, botões e inputs (`style.css:344-349`), `alt` descritivo nas imagens, `width`/`height` definidos pra evitar layout shift, `loading="lazy"` na galeria e `rel="noopener noreferrer"` nos links externos.

---

## Bloqueador

Pela tabela da seção 7 da diretriz, uma única linha vermelha já exige reentrega — e aqui há uma.

### 1. Falta o vídeo embedded

A linha "Mídia (fotos + vídeo)" da tabela exige **pelo menos 3 fotos e 1 vídeo embedded**. As 3 fotos estão lá (`assets/photo1-3.jpg`), mas não há nenhum vídeo na página. Curiosamente o seu CSS já tem a classe `.video-section` estilizada e sem uso (`style.css:225` e `239`) — então parte do caminho já estava planejada.

Adicione uma seção de vídeo dentro do `<main>` (uma boa posição é logo depois da galeria, antes do terminal):

```html
<section id="video" class="video-section section-hidden">

  <h2>Vídeo</h2>

  <div class="video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/SEU_ID_AQUI"
      title="Vídeo de apresentação de Maria Clara"
      loading="lazy"
      allowfullscreen></iframe>
  </div>

</section>
```

E no CSS, pra o vídeo ficar responsivo sem distorcer:

```css
.video-wrapper {
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}
```

Note que coloquei a classe `section-hidden` na seção — assim ela entra com a mesma animação das outras (o seu `IntersectionObserver` já observa tudo que tem essa classe). Pode ser qualquer vídeo que faça sentido com a página. O `iframe` do YouTube já vem com controles e sem autoplay com áudio.

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas resolva antes de reenviar.

1. **`<br>` usado pra montar uma lista** (`index.html:106-110`). A seção "Sobre" usa vários `<br>` pra quebrar linha e listar suas ferramentas. A diretriz (seção 4.1 e checklist seção 8) pede explicitamente: nada de `<br>` pra espaçar — espaçamento e listas são feitos com tags próprias. Aquele trecho é, na verdade, uma lista de categorias. Reescreva assim:

   ```html
   <p>
     Busco construir uma base sólida em tecnologia aplicável a futuros projetos.
     Já tenho domínio sobre ferramentas digitais de criação e edição mais básicas:
   </p>

   <ul>
     <li><strong>Edição de mídia:</strong> Adobe Photoshop, PicsArt, Canva, Adobe Lightroom, CapCut</li>
     <li><strong>Programação:</strong> Visual Studio Code, GitHub, HTML e CSS básico</li>
     <li><strong>Produtividade:</strong> Microsoft PowerPoint, Microsoft Word</li>
   </ul>
   ```

   Fica mais legível pra quem lê e pra leitores de tela — e some o `<br>`.

2. **`og:image` aponta pra um arquivo que não existe** (`index.html:12`). A meta tag referencia `assets/og-image.png`, mas a pasta `assets/` só tem `avatar.png` e `photo1-3.jpg`. Crie a imagem (pode ser um print da página) e salve como `assets/og-image.png`, ou troque o caminho pra uma imagem que exista (ex.: `assets/avatar.png`).

3. **Favicon aponta pra um arquivo que não existe** (`index.html:18`). Mesmo caso: `assets/favicon.png` não está na pasta. Adicione o arquivo ou ajuste o caminho.

4. **`copiar e-mail` sem tratamento de erro** (`script.js:38-52`). O `await navigator.clipboard.writeText(...)` pode falhar (por exemplo, se a página for aberta fora de `https`/`localhost`). Sem `try/catch`, o feedback "Copiado!" simplesmente não aparece e o erro vai pro Console. Proteja:

   ```js
   copyEmailButton.addEventListener("click", async () => {
     try {
       await navigator.clipboard.writeText("gmariaclaraaa@gmail.com");
       copyEmailButton.textContent = "Copiado!";
     } catch {
       copyEmailButton.textContent = "Erro ao copiar";
     }
     setTimeout(() => {
       copyEmailButton.textContent = "Copiar e-mail";
     }, 2000);
   });
   ```

---

## Pontos menores

Não pesam na nota e não exigem reentrega — só polimento.

- **Erros de acentuação/ortografia em texto visível.** No typewriter, "atraves" e "experiencias" (`script.js:92`); na seção "Sobre", "aplicavel", "Ja", "basicas", "prudutividade" e "sob" (deveria ser "sobre") — `index.html:106-110`. O `charset="UTF-8"` está configurado, então é só corrigir a digitação.
- **`h1` com tamanho fixo no media query** (`style.css:385`). No mobile o `h1` vira `2.2rem` chumbado, fugindo do seu próprio sistema de variáveis. Vale criar uma variável ou usar `clamp()` no `h1` pra ele se ajustar sozinho sem precisar do override.
- **`<article>` pra cada `.skill-card`** (`index.html:125-134`). `<article>` é pra conteúdo que faz sentido sozinho (um post, um card de projeto). Um card de uma palavra ("C", "GitHub") cabe melhor como item de lista. Não está errado a ponto de reprovar, mas vale saber a diferença.
- **README sem a seção "como rodar".** A seção 6 da diretriz pede uma linha dizendo como abrir o projeto (basta "abrir `index.html` no navegador").

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Adicionar a seção de vídeo embedded (bloqueador 1)
2. [ ] Converter o `<br>` da seção "Sobre" em lista `<ul>` (flag 1)
3. [ ] Criar `assets/og-image.png` e `assets/favicon.png` (flags 2 e 3)
4. [ ] Envolver o copiar e-mail em `try/catch` (flag 4)
5. [ ] Corrigir os erros de acentuação na página e no typewriter
6. [ ] Acrescentar "como rodar" no README
7. [ ] Testar em 360px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Maria Clara, leia o status com tranquilidade: "reentrega necessária" aqui não significa um projeto fraco — significa **um item faltando** numa entrega que, no resto, está bem acima da média. Você implementou as três interações obrigatórias corretamente, somou duas extras, e ainda montou um sistema de variáveis CSS que é exatamente como código profissional é escrito.

Adicione o vídeo, limpe os `<br>` e os caminhos quebrados de imagem, e a aprovação vem na próxima rodada. Antes de reenviar, abra o DevTools (F12), ative o modo responsivo e confira a página em 360px e em 1920px — e dá uma olhada no Console pra garantir que nenhum erro de JavaScript ficou para trás.

Capricho reconhecido. Manda a reentrega.

---
*Revisão por Josh — 2026-05-15*
