# Perguntas de verificação — Projeto 01 Cartão de Visita

**Turma:** IbTech Frontend 2026.1
**Uso:** Diretoria Técnica · conversa de ~5 minutos por aluno

> A diretriz (seção 9.3) prevê que a Diretoria Técnica pode pedir ao aluno para
> abrir o projeto e explicar trechos do próprio código. Estas perguntas servem
> exatamente para isso: distinguir quem **entendeu** o que entregou de quem apenas
> colou prompts. Cada conjunto é diferente e amarrado ao código real do aluno —
> não há como decorar resposta sem ter feito o projeto.

**Como conduzir:** não é prova. Peça o projeto aberto, faça as perguntas em ordem,
e observe se o aluno **navega no próprio código com naturalidade**. Travar em uma
pergunta isolada não reprova; travar em todas, sim. A pergunta de "mudança ao vivo"
é a mais reveladora — quem fez sabe por onde começar.

---

## Ana Júlia Rossi

1. No seu `script.js` existem **duas** funções chamadas `modoEscuro` — uma dentro do `window.onload` e outra solta no fim do arquivo. Qual das duas é executada quando o botão é clicado? Por quê?
2. As imagens da sua página não aparecem. Olhe o `src` no HTML e a localização real dos arquivos no repositório, e explique onde está o erro.
3. O seu copiar e-mail dispara `alert("E-mail copiado!")`. O que **de fato** acontece quando o usuário clica? A mensagem do alerta está dizendo a verdade?
4. **Mudança ao vivo:** seu `h1` está com `font-size: 7rem`. Adicione uma media query que faça ele caber num celular de 360px de largura.
5. Explique o que a sua animação `@keyframes flutuar` faz. Para que servem o `infinite` e o `ease-in-out` na linha do `animation`?

---

## André Coelho

1. O seu projeto não tem um arquivo `script.js`. A diretriz pede três comportamentos obrigatórios em JavaScript — quais são esses três, e o que cada um faz na página?
2. No seu CSS as cores estão escritas direto em cada regra (`#111111`, `#1f1f1f`, `#333`...). Se eu pedir para deixar o fundo da página um pouco mais claro, quantos lugares você precisa mexer hoje? Como um `:root` com variáveis mudaria isso?
3. Os seus links de LinkedIn e GitHub usam `target="_blank"` mas sem `rel="noopener noreferrer"`. O que esse atributo evita? O que pode acontecer sem ele?
4. **Mudança ao vivo:** sua grade de três fotos (`.imagens-grid`) usa `grid-template-columns: repeat(3, 1fr)`. Adicione uma media query que faça as fotos ficarem uma embaixo da outra num celular.
5. Explique a diferença entre as tags `<header>`, `<main>` e `<section>` que você usou. Por que usar essas tags em vez de `<div>` para tudo?

---

## Atos Barros

1. O seu flip card vira com clique e também com o teclado (`Enter`/`Espaço`). Abra o `script.js` e mostre o trecho que trata o teclado — por que você precisou do `event.preventDefault()` ali?
2. O seu `script.js` tem **dois** `IntersectionObserver` diferentes: um marca o link de navegação ativo, o outro revela os elementos com fade. Qual a diferença no que cada um observa e faz?
3. A diretriz pede um botão de "copiar e-mail" com a Clipboard API — hoje a sua página tem só links `mailto:`. Qual a diferença, na prática, entre o que o `mailto:` faz e o que a diretriz pede?
4. **Mudança ao vivo:** no fim do seu CSS, dentro do `@media (max-width: 520px)`, há uma regra `.button, { width: 100%; }` que está quebrada. Conserte-a e explique por que ela não estava funcionando.
5. No seu `setTheme()` você alterna a classe `light-theme`. Como o seu código descobre a preferência de tema do sistema operacional do usuário na primeira visita?

---

## Augusto Gaipo

1. O seu projeto inteiro está num único `index.html` — o CSS dentro de um `<style>` e o JS dentro de um `<script>`. A diretriz pede `style.css` e `script.js` separados. O que muda, na prática, separar os arquivos? Por que a diretriz exige isso?
2. As suas seções de conteúdo ("Sobre mim", "Objetivos"...) são `<div class="section">`. Qual tag semântica a diretriz espera no lugar dessas `div`? O que muda para quem usa leitor de tela?
3. As fotos da galeria têm `alt="Foto 1"`, `alt="Foto 2"`, `alt="Foto 3"`. Por que a diretriz considera isso um `alt` ruim? Reescreva o `alt` da `foto1.jpg` do jeito certo.
4. **Mudança ao vivo:** hoje, na primeira visita, o site sempre abre no tema escuro (`localStorage.getItem('theme') || 'dark'`). Faça ele respeitar a preferência do sistema operacional do usuário nessa primeira visita.
5. Você não declarou nenhuma variável CSS de tamanho de fonte — os tamanhos estão escritos direto em cada regra (`1.6rem`, `.97rem`, `.88rem`...). Qual a vantagem de declarar uma escala tipográfica no `:root`? Quantos lugares você mexeria hoje para aumentar todos os textos em 10%?

---

## Bernardo Alvim

1. Explique como o seu "radar de foco" funciona: passo a passo, o que acontece no JavaScript quando o usuário clica num dos chips (Front-end, Automação...)?
2. No copiar e-mail você usou `try/catch`. O que entra no bloco `catch`? Descreva uma situação real em que ele seria executado.
3. Na linha 44 do HTML a foto do hero usa `src="/Imagens/..."` e na linha 89 a galeria usa `src="Imagens/..."` — sem a barra. Uma carrega e a outra não. Qual quebra e por quê?
4. **Mudança ao vivo:** faça o tema escolhido pelo usuário continuar aplicado depois que a página for recarregada.
5. O seu CSS tem a classe `.video-frame` estilizada, mas não há vídeo no HTML. Por que a diretriz torna o vídeo obrigatório, e onde na página você o colocaria?

---

## Cauã Moraes

1. O seu easter egg da C4 é ativado clicando 5 vezes na foto de perfil. Abra o `script.js` e explique como o código conta esses cliques — e o que o `setTimeout` de 3 segundos faz no meio dessa contagem.
2. No seu copiar e-mail você cria um `<input>` temporário e chama `document.execCommand("copy")`. Existe uma forma mais moderna de fazer a mesma coisa. Qual é, e por que a diretriz a prefere?
3. O seu CSS tem só uma media query (`max-width: 768px`). A diretriz pede pelo menos duas. Que problema um único breakpoint pode causar entre um tablet e um celular de 360px de largura?
4. **Mudança ao vivo:** você declarou `--fs-sm`, `--fs-base`, `--fs-lg` e `--fs-xl`, mas o `.section-title` está com `font-size: 2rem` chumbado. Crie uma variável para esse tamanho e use-a.
5. No seu menu mobile você fecha o menu ao clicar fora dele e ao apertar `Esc`. Mostre os dois trechos no `script.js`. Como o código sabe que o clique foi "fora" do menu?

---

## Felipe Medeiros

1. O seu botão de tema salva a escolha em `localStorage` quando é clicado. Mas se o usuário escolhe o tema claro e recarrega a página, ela volta para o escuro. Por que isso acontece? O que falta no seu código?
2. No seu `:root` existe uma única variável de tamanho de fonte, `--fs-xl`. A diretriz pede pelo menos quatro. O que é uma "escala tipográfica" e qual a vantagem de declará-la em variáveis?
3. O seu `IntersectionObserver` chama `obs.unobserve(e.target)` quando a seção aparece. O que essa linha faz? O que mudaria na animação se você a removesse?
4. **Mudança ao vivo:** o seu copiar e-mail usa o endereço `felipe.medeiros@exemplo.com`, que é um placeholder. Troque pelo seu e-mail real e me diga em que linha do código esse valor está definido.
5. O seu efeito typewriter é disparado por `window.onload = type`. Explique como a função `type` consegue mostrar uma letra de cada vez — para que serve o `setTimeout` dentro dela?

---

## Gabriela Lacerda

1. Você declarou `--fs-sm`, `--fs-base`, `--fs-lg` e `--fs-xl` no `:root`. Abra o CSS e me mostre onde cada uma é usada — ou onde deveria estar sendo usada e não está.
2. Explique como o seu efeito de "glow seguindo o mouse" funciona. Como o CSS descobre a posição do cursor na tela?
3. No celular, o seu menu (`.nlinks`) recebe `display: none`. O que o usuário de celular perde com isso? Como você resolveria sem simplesmente esconder?
4. **Mudança ao vivo:** o botão de tema mostra sempre 🌓. Faça o ícone alternar entre ☀️ e 🌙 conforme o tema ativo.
5. Seus flip cards giram com `transform: rotateY(180deg)` e usam `backface-visibility: hidden`. Qual o papel do `backface-visibility`? O que apareceria na tela sem ele?

---

## João Victor Cândido

1. No seu `script.js`, a função `temaInicial()` decide qual tema mostrar. Explique o que acontece na primeiríssima visita de alguém que nunca abriu a página — qual linha roda e como ela escolhe entre claro e escuro?
2. Você declarou 4 variáveis de tamanho de fonte no `:root` (`--tamanho-pequeno`, `--tamanho-normal`, `--tamanho-medio`, `--tamanho-grande`). Abra o CSS e me mostre onde cada uma é usada. Duas delas não aparecem em lugar nenhum — quais são, e em que elementos deveriam estar?
3. **Mudança ao vivo:** no mobile o seu `h1` está com `font-size: 2rem` chumbado. Troque esse valor por uma variável CSS, sem mudar o tamanho que aparece na tela.
4. O seu `IntersectionObserver` chama `observador.unobserve(entrada.target)` quando a seção aparece. O que essa linha faz? O que aconteceria com a animação se você a removesse?
5. O parágrafo de apresentação tem o texto escrito tanto no HTML quanto no atributo `data-texto`, e o JS adiciona a classe `js-enabled` ao `body`. Por que você duplicou o texto? O que o usuário veria se o JavaScript não carregasse?

---

## Laura Marcolino

1. Você refatorou o tema escuro para trocar apenas os valores das variáveis em `body.tema-escuro`. Explique, sem olhar o código, por que o site inteiro muda de cor sem você reescrever cada regra de CSS.
2. Você usou `IntersectionObserver` na animação de entrada. Por que ele é melhor do que escutar o evento `scroll`? O que o `threshold` controla?
3. Abra o `script.js` e mostre o trecho que fecha o menu mobile quando o usuário clica fora dele. Como o código decide que o clique foi "fora" do menu?
4. **Mudança ao vivo:** faça o vídeo do YouTube aparecer só no tema escuro e ficar escondido no tema claro. Por onde você começa?
5. Você criou 9 variáveis tipográficas (`--fs-xs` a `--fs-xxl`). Se eu pedir para aumentar todos os títulos do site em 20%, quantos lugares você precisa editar? Por quê?

---

## Luiza Paviotti

1. Você usou a tag `<details>` na seção "Marcos". O que essa tag faz **sozinha**, sem JavaScript? Por que você a escolheu em vez de uma `<div>` com botão?
2. No seu menu, cada item usa `position: absolute` com valores em `px` e `%`. O que acontece com esse menu numa tela de celular de 360px? Por quê?
3. Hoje o seu e-mail é um link `mailto:`. Qual a diferença entre o que o `mailto:` faz e o que a diretriz pede (copiar o endereço para a área de transferência)?
4. **Mudança ao vivo:** troque a cor dourada de destaque (`#ffd700`) da página inteira. Quantos lugares do CSS você precisa mexer hoje? Como uma variável CSS mudaria isso?
5. A diretriz exige `rel="noopener noreferrer"` nos links externos. O que esse atributo evita? O que poderia acontecer sem ele?

---

## Manuella Pinheiro

1. O seu JavaScript inteiro parou de funcionar por causa de uma linha. Abra o `script.js` e o `exercicio.html` e me diga: qual `id` o JS procura, e qual `id` existe de fato no HTML?
2. Quando esse `id` for corrigido, três funcionalidades voltam a funcionar ao mesmo tempo. Quais são, e por que todas estavam mortas pela mesma causa?
3. Explique o que o seu efeito typewriter faz e como ele consegue mostrar uma letra de cada vez.
4. A diretriz pede um `:root` com variáveis CSS. O que é o `:root`? Qual a vantagem de declarar as cores ali em vez de repeti-las pelo arquivo?
5. **Mudança ao vivo:** seu tema escuro não respeita a preferência do sistema operacional na primeira visita. Onde, no código, você faria essa checagem?

---

## Maria Clara Guimarães

1. Explique como o seu tema claro/escuro decide qual tema mostrar na **primeira visita** de um usuário que nunca abriu a página.
2. No seu `IntersectionObserver` você chama `observer.unobserve(entry.target)`. O que essa linha faz? O que aconteceria com a animação se você a removesse?
3. Na seção "Sobre" você usou vários `<br>` para listar suas ferramentas. Por que a diretriz desaconselha isso? Qual tag seria mais correta para uma lista?
4. **Mudança ao vivo:** o seu copiar e-mail não trata erro. Adicione um `try/catch` e explique em que situação o `catch` seria acionado.
5. Qual a diferença, na prática, entre escrever `var(--fs-base)` e escrever `1rem` direto no elemento? Por que a diretriz pede variáveis?

---

## Pedro Moreira

1. Explique, passo a passo, como o seu terminal interativo decide qual resposta dar quando o usuário digita um comando como `whoami`.
2. **Mudança ao vivo:** adicione um comando novo ao terminal — `help` — que liste todos os comandos disponíveis.
3. As suas imagens hoje vêm de uma URL do LinkedIn. Por que isso é um problema? O que tende a acontecer com a página daqui a alguns meses?
4. O seu dark mode funciona, mas esquece a escolha quando a página recarrega. O que é o `localStorage` e em que ponto do seu código ele entraria?
5. Você declarou `:focus-visible` no CSS mas sem nenhum estilo visível. Quem é prejudicado por isso e por quê?

---

## Vitor Batista

1. A sua página é construída inteira com `<div>` e `<span>` — não há `<header>`, `<main>`, `<section>` nem `<h1>`. Para quem usa leitor de tela, o que muda entre uma `<div>` e uma `<section>` com um `<h2>`?
2. O seu `script.js` controla o `z-index` de cada página manualmente durante a virada. Explique por que isso é necessário — o que apareceria errado sem esse controle?
3. A sua trava `animating` impede novas ações enquanto uma página está virando. Mostre onde ela é ativada e onde é desativada. O que aconteceria se o usuário clicasse rápido várias vezes sem ela?
4. **Mudança ao vivo:** seus tamanhos de fonte estão todos chumbados (`0.92rem`, `1.6rem`, `0.65rem`...). Crie uma variável `--fs-base` no `:root` e aplique-a no `.body-text`.
5. A diretriz pede um "copiar e-mail" com a Clipboard API — hoje a sua página de Contato tem só um link `mailto:`. Como você transformaria esse link num botão que copia o endereço para a área de transferência?

---
*Perguntas preparadas por Josh — Diretoria Técnica IbTech 2026.1*
