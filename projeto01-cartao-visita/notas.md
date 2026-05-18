# Notas — Projeto 01 Cartão de Visita

**Turma:** IbTech Frontend 2026.1
**Atualizado em:** 2026-05-18

> A **nota fria** mede o percentual do que a diretriz exige que o aluno efetivamente
> cumpriu. Ela é **independente do veredito** aprovado/reentrega: o veredito segue a
> regra da tabela da seção 7 ("uma linha vermelha = reentrega"), então um aluno pode
> ter nota alta e ainda assim precisar reentregar por um único critério não atendido.

## Metodologia

A nota considera os **14 critérios avaliáveis** da tabela da seção 7 da diretriz
(o 15º — "Autoria e domínio" — é verificado oralmente e não entra no cálculo por código).

Cada critério recebe:

| Símbolo | Significado | Peso |
|:---:|---|:---:|
| ✓ | Cumprido | 1,0 |
| ~ | Parcial — existe, mas com falha relevante | 0,3–0,8 |
| ✗ | Ausente ou não funcional | 0,0–0,2 |

A nota fria é a soma dos pesos dividida por 14, em percentual.

---

## Resumo

| Aluno | Nota fria | Nota (0–10) | Veredito |
|---|:---:|:---:|:---:|
| Laura Marcolino | **96%** | 9,6 | Aprovado |
| João Victor Cândido | **95%** | 9,5 | Reentrega |
| Cauã Moraes | **94%** | 9,4 | Reentrega |
| Atos Barros | **92%** | 9,2 | Reentrega |
| Maria Clara Guimarães | **92%** | 9,2 | Reentrega |
| Gabriela Lacerda | **91%** | 9,1 | Reentrega |
| Augusto Gaipo | **72%** | 7,2 | Reentrega |
| Felipe Medeiros | **71%** | 7,1 | Reentrega |
| Bernardo Alvim | **69%** | 6,9 | Reentrega |
| Pedro Moreira | **64%** | 6,4 | Reentrega |
| Vitor Batista | **50%** | 5,0 | Reentrega |
| Manuella Pinheiro | **35%** | 3,5 | Reentrega |
| Ana Júlia Rossi (v2) | **32%** | 3,2 | Reentrega |
| André Coelho | **29%** | 2,9 | Reentrega |
| Luiza Paviotti | **24%** | 2,4 | Reentrega |

Médias e gargalos do grupo na seção *Leitura do grupo*, no fim do arquivo.

---

## Detalhamento por critério

Colunas: **Ana** (Ana Júlia), **And** (André), **Ato** (Atos), **Aug** (Augusto),
**Ber** (Bernardo), **Cau** (Cauã), **Fel** (Felipe), **Gab** (Gabriela),
**Joa** (João Victor), **Lau** (Laura), **Lui** (Luiza), **Man** (Manuella),
**MaC** (Maria Clara), **Ped** (Pedro), **Vit** (Vitor).

| Critério (seção 7) | Ana | And | Ato | Aug | Ber | Cau | Fel | Gab | Joa | Lau | Lui | Man | MaC | Ped | Vit |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| HTML semântico | ~ | ~ | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ✓ | ~ | ✓ | ✗ |
| Acessibilidade básica | ~ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ✗ | ✗ | ✓ | ✗ | ~ |
| Mídia (fotos + vídeo) | ✗ | ~ | ✓ | ~ | ~ | ✓ | ~ | ✓ | ✓ | ✓ | ✗ | ✗ | ~ | ~ | ✗ |
| Variáveis e organização CSS | ✗ | ✗ | ✓ | ~ | ~ | ✓ | ~ | ✓ | ~ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Sistema tipográfico | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ~ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Layout moderno | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Responsividade | ✗ | ✗ | ✓ | ~ | ✓ | ~ | ~ | ✓ | ✓ | ✓ | ✗ | ~ | ✓ | ✗ | ~ |
| Tema claro/escuro | ~ | ✗ | ✓ | ~ | ~ | ✓ | ~ | ✓ | ✓ | ✓ | ✗ | ~ | ✓ | ~ | ✗ |
| Copiar e-mail | ✗ | ✗ | ✗ | ✓ | ~ | ~ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Animação de entrada | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ |
| JS extra à escolha | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Design e identidade | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Criatividade e empenho | ~ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ~ | ✓ | ✓ | ✓ |
| README e repositório | ~ | ~ | ✓ | ~ | ~ | ✓ | ✗ | ✓ | ✓ | ✓ | ~ | ✗ | ✓ | ~ | ✓ |
| **Nota fria** | **32%** | **29%** | **92%** | **72%** | **69%** | **94%** | **71%** | **91%** | **95%** | **96%** | **24%** | **35%** | **92%** | **64%** | **50%** |

---

## Comentário por aluno

### Laura Marcolino — 96% · Aprovado
Único projeto aprovado. Todos os critérios técnicos cumpridos, incluindo opcionais.
Os 4% restantes são polimento citado na revisão (cards de portfólio em `background-image`
sem `alt`, `loading="lazy"` só no avatar, README sem screenshot) — nada que reprove.

### João Victor Cândido — 95% · Reentrega
Entrega forte, tecnicamente entre as melhores da turma. O único bloqueador é o
**sistema tipográfico**: as 4 variáveis de tamanho estão declaradas no `:root`, mas só
duas (`--tamanho-medio`, `--tamanho-grande`) são usadas — as outras duas ficam mortas e
o `h1` mobile chumba `2rem`. As três interações obrigatórias estão todas corretas e
bem-feitas (fallback no `IntersectionObserver`, `try/catch` no copiar e-mail, página
funcional sem JavaScript). Acessibilidade completa. Flag pequena: comentários de seção
só aparecem na metade do CSS.

### Cauã Moraes — 94% · Reentrega
Uma das entregas mais completas da turma. HTML semântico exemplar, acessibilidade bem
feita (`aria-*`, `alt` descritivos, `rel="noopener noreferrer"`), variáveis CSS
organizadas com os 4 tamanhos de fonte usados, tema completo e um easter egg autoral
(a C4 do Counter-Strike) bem implementado. O **único bloqueador** é a responsividade
com **apenas 1 breakpoint** — a diretriz pede no mínimo 2. Flag relevante: o copiar
e-mail funciona, mas usa o `document.execCommand` descontinuado em vez da Clipboard API.

### Atos Barros — 92% · Reentrega
Um dos projetos mais bem-acabados da turma — flip card 3D, `:focus-visible` global,
três breakpoints, sete variáveis tipográficas todas usadas, acessibilidade acima do
esperado. O **único bloqueador** é a ausência do **"copiar e-mail" com a Clipboard
API** — a página tem só links `mailto:`, que não cumprem o requisito. Bug menor: uma
regra CSS quebrada no breakpoint de 520px (vírgula sobrando + seletor vazio) faz os
botões não receberem `width: 100%` no mobile. Repositório fora do padrão de nome (`card`).

### Maria Clara Guimarães — 92% · Reentrega
O único bloqueador é a **ausência do vídeo embedded**. Sistema de variáveis, tema,
IntersectionObserver e dois extras (typewriter e terminal) estão completos. HTML perde
meio ponto pelo uso de `<br>` para montar lista.

### Gabriela Lacerda — 91% · Reentrega
Projeto tecnicamente sólido. O bloqueador é o **sistema tipográfico**: as 4 variáveis
de fonte estão declaradas no `:root`, mas só uma é usada — os demais tamanhos estão
chumbados. Correção pequena. Menu some no mobile (flag).

### Augusto Gaipo — 72% · Reentrega
A página visualmente mais bem-acabada da turma (blobs animados, textura de ruído, anel
cônico girando no avatar, texto em gradiente) e o JavaScript completo — daí a nota alta
apesar de seis bloqueadores. Reprova por requisitos da diretriz: CSS e JS não separados
em arquivos próprios (tudo dentro do `index.html`), seções de conteúdo em `<div>` e não
`<section>`, `alt` não descritivo ("Foto 1/2/3"), sistema tipográfico sem variáveis, só
um breakpoint, e tema sem `prefers-color-scheme` na primeira visita. Quase tudo se
resolve reorganizando o que já existe.

### Felipe Medeiros — 71% · Reentrega
Identidade visual marcante (faixa *marquee*, padrão cônico animado no hero) e os três
comportamentos de JS presentes — daí a nota apesar de vários bloqueadores. Reprova por
acúmulo de requisitos: falta o `README.md` e a pasta `assets/`, falta o vídeo (e fotos
reais são só duas), sistema tipográfico com **uma única** variável de tamanho, só um
breakpoint. Tem ainda um bug real: o tema é salvo no `localStorage` mas **nunca lido**
na carga — recarregar a página descarta a escolha do usuário. O copiar e-mail está
correto (Clipboard API + feedback de 2s), mas com endereço de placeholder.

### Bernardo Alvim — 69% · Reentrega
Estrutura de HTML excelente. Reprova por acúmulo: falta o vídeo, o sistema tipográfico
não está em variáveis, o tema não persiste e não há animação de entrada
(IntersectionObserver). São quatro linhas vermelhas — todas aditivas, não refação.

### Pedro Moreira — 64% · Reentrega
O terminal interativo é o ponto criativo forte. Reprova por: links sem `rel="noopener"`,
tipografia sem variáveis, zero responsividade, imagens vindas de URL temporária do
LinkedIn (pasta `assets/` ausente) e dark mode sem persistência.

### Vitor Batista — 50% · Reentrega
Caso particular: um **livro interativo** com virada de página em 3D, lombada e pilha de
páginas — tudo em CSS, sem imagens. Execução técnica e criativa de alto nível (CSS 3D,
controle de `z-index`, swipe por trackpad e toque), e por isso pontua cheio em variáveis
CSS, layout, design, criatividade, JS extra e README. Mas a entrega seguiu um conceito
autoral e deixou de fora boa parte da checklist: HTML 100% `div`/`span` (sem tags
semânticas nem `<h1>`), zero fotos e zero vídeo, nenhuma variável de tamanho de fonte,
sem tema claro/escuro, sem "copiar e-mail" e sem `IntersectionObserver`. A nota baixa
reflete requisitos não cumpridos, não falta de capacidade — a revisão orienta encaixar
a diretriz dentro do conceito de livro, sem descaracterizá-lo.

### Manuella Pinheiro — 35% · Reentrega
O JavaScript está quase todo escrito, mas **morto** por um `id` errado
(`getElementById("toggle")` vs `theme-toggle` no HTML) — corrigir essa linha reativa
Clipboard, IntersectionObserver e typewriter de uma vez. Falta vídeo, 2 fotos,
variáveis CSS e sistema tipográfico. A pontuação parcial reflete código presente
porém não funcional.

### Ana Júlia Rossi — 32% · Reentrega (v2)
Houve progresso real desde a v1 (HTML não está mais embaralhado, dark mode persistente
foi adicionado). Ainda faltam: vídeo, variáveis CSS, sistema tipográfico, responsividade,
animação de entrada e interação extra; o copiar e-mail ainda usa `alert()`. Os caminhos
`assets/` apontam para uma pasta inexistente — nenhuma imagem aparece.

### André Coelho — 29% · Reentrega
Entrega de apenas **HTML e CSS** — não existe arquivo `script.js`, então nenhuma das
interações obrigatórias (tema, copiar e-mail, IntersectionObserver) nem a extra. Falta
também o `:root` com variáveis (cores escritas direto nas regras), o sistema
tipográfico, qualquer responsividade (zero `@media`), o vídeo e a pasta `assets/`. A
base de HTML/CSS é limpa e o tema escuro é coerente — daí os pontos em layout e design.
O resto é trabalho a adicionar.

### Luiza Paviotti — 24% · Reentrega
Projeto em estágio de rascunho: não há arquivo `script.js` (nenhuma das interações JS),
sem vídeo, só uma foto, sem responsividade, sem tema, sem variáveis CSS. A ideia visual
(menu céu estrelado) tem identidade e criatividade — daí os pontos em "Design" e
"Criatividade". O resto é trabalho a adicionar.

---

## Leitura do grupo

- **Média da turma:** ~67% (15 entregas). Mediana: 71% (Felipe).
- **Aprovação:** 1 de 15 (Laura). As outras 14 entregas precisam de reentrega.
- **Gargalo nº 1 — Sistema tipográfico:** 11 de 15 não cumprem plenamente. Continua
  sendo, com folga, o critério mais reprovado da turma. Só Laura, Maria Clara, Cauã e
  Atos têm a escala de fontes em variáveis e efetivamente usada. O erro recorrente é
  declarar a escala no `:root` e não usá-la (Gabriela, João), ou nem declarar (Augusto,
  Felipe, André e a maioria). Vale uma revisão coletiva sobre o tema.
- **Gargalo nº 2 — Mídia (vídeo):** o vídeo embedded falta ou está incompleto em 10 das
  15 entregas. Só Gabriela, João, Laura, Cauã e Atos entregaram a mídia completa.
- **Gargalo nº 3 — Acessibilidade:** `rel="noopener noreferrer"`, foco visível e `alt`
  descritivo continuam esquecidos com frequência (8 de 15 com falha). Em contrapartida,
  as entregas recentes mais fortes (Atos, Cauã) trataram acessibilidade com cuidado
  acima do esperado — `aria-*`, `:focus-visible`, navegação por teclado.
- **Padrão recorrente — talento visual × disciplina técnica:** as melhores entregas em
  *design/criatividade* (Augusto, Vitor, Felipe) reprovam não por falta de capacidade,
  mas por não seguir a checklist da seção 7. O caso do Vitor é o mais nítido: execução
  técnica de alto nível gasta num conceito autoral que ignorou metade dos requisitos.
  A mensagem coletiva é a mesma: ler a diretriz como um checklist antes de entregar.

---
*Avaliação por Josh — Diretoria Técnica IbTech 2026.1*
