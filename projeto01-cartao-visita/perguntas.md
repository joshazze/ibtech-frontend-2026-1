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

## Bernardo Alvim

1. Explique como o seu "radar de foco" funciona: passo a passo, o que acontece no JavaScript quando o usuário clica num dos chips (Front-end, Automação...)?
2. No copiar e-mail você usou `try/catch`. O que entra no bloco `catch`? Descreva uma situação real em que ele seria executado.
3. Na linha 44 do HTML a foto do hero usa `src="/Imagens/..."` e na linha 89 a galeria usa `src="Imagens/..."` — sem a barra. Uma carrega e a outra não. Qual quebra e por quê?
4. **Mudança ao vivo:** faça o tema escolhido pelo usuário continuar aplicado depois que a página for recarregada.
5. O seu CSS tem a classe `.video-frame` estilizada, mas não há vídeo no HTML. Por que a diretriz torna o vídeo obrigatório, e onde na página você o colocaria?

---

## Gabriela Lacerda

1. Você declarou `--fs-sm`, `--fs-base`, `--fs-lg` e `--fs-xl` no `:root`. Abra o CSS e me mostre onde cada uma é usada — ou onde deveria estar sendo usada e não está.
2. Explique como o seu efeito de "glow seguindo o mouse" funciona. Como o CSS descobre a posição do cursor na tela?
3. No celular, o seu menu (`.nlinks`) recebe `display: none`. O que o usuário de celular perde com isso? Como você resolveria sem simplesmente esconder?
4. **Mudança ao vivo:** o botão de tema mostra sempre 🌓. Faça o ícone alternar entre ☀️ e 🌙 conforme o tema ativo.
5. Seus flip cards giram com `transform: rotateY(180deg)` e usam `backface-visibility: hidden`. Qual o papel do `backface-visibility`? O que apareceria na tela sem ele?

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
*Perguntas preparadas por Josh — Diretoria Técnica IbTech 2026.1*
