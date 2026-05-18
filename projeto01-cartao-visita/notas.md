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
| Maria Clara Guimarães | **92%** | 9,2 | Reentrega |
| Gabriela Lacerda | **91%** | 9,1 | Reentrega |
| Augusto Gaipo | **72%** | 7,2 | Reentrega |
| Bernardo Alvim | **69%** | 6,9 | Reentrega |
| Pedro Moreira | **64%** | 6,4 | Reentrega |
| Manuella Pinheiro | **35%** | 3,5 | Reentrega |
| Ana Júlia Rossi (v2) | **32%** | 3,2 | Reentrega |
| Luiza Paviotti | **24%** | 2,4 | Reentrega |

Médias e gargalos do grupo na seção *Leitura do grupo*, no fim do arquivo.

---

## Detalhamento por critério

Colunas: **Ana** (Ana Júlia), **Aug** (Augusto), **Ber** (Bernardo), **Gab** (Gabriela),
**Joa** (João Victor), **Lau** (Laura), **Lui** (Luiza), **Man** (Manuella),
**MaC** (Maria Clara), **Ped** (Pedro).

| Critério (seção 7) | Ana | Aug | Ber | Gab | Joa | Lau | Lui | Man | MaC | Ped |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| HTML semântico | ~ | ~ | ✓ | ✓ | ✓ | ✓ | ~ | ✓ | ~ | ✓ |
| Acessibilidade básica | ~ | ✗ | ✓ | ✓ | ✓ | ~ | ✗ | ✗ | ✓ | ✗ |
| Mídia (fotos + vídeo) | ✗ | ~ | ~ | ✓ | ✓ | ✓ | ✗ | ✗ | ~ | ~ |
| Variáveis e organização CSS | ✗ | ~ | ~ | ✓ | ~ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Sistema tipográfico | ✗ | ✗ | ✗ | ✗ | ~ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Layout moderno | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| Responsividade | ✗ | ~ | ✓ | ✓ | ✓ | ✓ | ✗ | ~ | ✓ | ✗ |
| Tema claro/escuro | ~ | ~ | ~ | ✓ | ✓ | ✓ | ✗ | ~ | ✓ | ~ |
| Copiar e-mail | ✗ | ✓ | ~ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Animação de entrada | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| JS extra à escolha | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Design e identidade | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Criatividade e empenho | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ | ~ | ✓ | ✓ |
| README e repositório | ~ | ~ | ~ | ✓ | ✓ | ✓ | ~ | ✗ | ✓ | ~ |
| **Nota fria** | **32%** | **72%** | **69%** | **91%** | **95%** | **96%** | **24%** | **35%** | **92%** | **64%** |

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

### Maria Clara Guimarães — 92% · Reentrega
A nota mais alta entre as reentregas que não foram revisadas agora. O único bloqueador
é a **ausência do vídeo embedded**. Sistema de variáveis, tema, IntersectionObserver e
dois extras (typewriter e terminal) estão completos. HTML perde meio ponto pelo uso de
`<br>` para montar lista.

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

### Bernardo Alvim — 69% · Reentrega
Estrutura de HTML excelente. Reprova por acúmulo: falta o vídeo, o sistema tipográfico
não está em variáveis, o tema não persiste e não há animação de entrada
(IntersectionObserver). São quatro linhas vermelhas — todas aditivas, não refação.

### Pedro Moreira — 64% · Reentrega
O terminal interativo é o ponto criativo forte. Reprova por: links sem `rel="noopener"`,
tipografia sem variáveis, zero responsividade, imagens vindas de URL temporária do
LinkedIn (pasta `assets/` ausente) e dark mode sem persistência.

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

### Luiza Paviotti — 24% · Reentrega
Projeto em estágio de rascunho: não há arquivo `script.js` (nenhuma das interações JS),
sem vídeo, só uma foto, sem responsividade, sem tema, sem variáveis CSS. A ideia visual
(menu céu estrelado) tem identidade e criatividade — daí os pontos em "Design" e
"Criatividade". O resto é trabalho a adicionar.

---

## Leitura do grupo

- **Média da turma:** ~67%. Mediana entre Bernardo (69%) e Augusto (72%): 70,5%.
- **Aprovação:** 1 de 10 (Laura). As outras 9 entregas precisam de reentrega.
- **Gargalo nº 1 — Sistema tipográfico:** 8 de 10 não cumprem plenamente. Continua
  sendo o critério mais reprovado da turma. Vale uma revisão coletiva sobre variáveis
  de fonte — o erro recorrente é declarar a escala no `:root` e não usá-la (Gabriela,
  João), ou nem declarar (Augusto e a maioria).
- **Gargalo nº 2 — Mídia (vídeo):** o vídeo embedded falta ou está incompleto em 5 das
  10 entregas. João e Augusto entregaram o vídeo corretamente.
- **Gargalo nº 3 — Acessibilidade:** `rel="noopener noreferrer"`, foco visível e `alt`
  descritivo são esquecidos com frequência (5 de 10 com falha).
- **Ponto forte do grupo:** "Design e identidade" e "Criatividade" — quase todos
  pontuam. O empenho visual existe; falta a disciplina técnica da diretriz. A entrega
  do Augusto é o exemplo mais claro: visual de destaque, mas reprovada por requisitos.

---
*Avaliação por Josh — Diretoria Técnica IbTech 2026.1*
