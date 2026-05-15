# Notas — Projeto 01 Cartão de Visita

**Turma:** IbTech Frontend 2026.1
**Atualizado em:** 2026-05-15

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
| Maria Clara Guimarães | **92%** | 9,2 | Reentrega |
| Gabriela Lacerda | **91%** | 9,1 | Reentrega |
| Bernardo Alvim | **69%** | 6,9 | Reentrega |
| Pedro Moreira | **64%** | 6,4 | Reentrega |
| Manuella Pinheiro | **35%** | 3,5 | Reentrega |
| Ana Júlia Rossi (v2) | **32%** | 3,2 | Reentrega |
| Luiza Paviotti | **24%** | 2,4 | Reentrega |

Médias e gargalos do grupo na seção *Leitura do grupo*, no fim do arquivo.

---

## Detalhamento por critério

Colunas: **Ana** (Ana Júlia), **Ber** (Bernardo), **Gab** (Gabriela), **Lau** (Laura),
**Lui** (Luiza), **Man** (Manuella), **MaC** (Maria Clara), **Ped** (Pedro).

| Critério (seção 7) | Ana | Ber | Gab | Lau | Lui | Man | MaC | Ped |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| HTML semântico | ~ | ✓ | ✓ | ✓ | ~ | ✓ | ~ | ✓ |
| Acessibilidade básica | ~ | ✓ | ✓ | ~ | ✗ | ✗ | ✓ | ✗ |
| Mídia (fotos + vídeo) | ✗ | ~ | ✓ | ✓ | ✗ | ✗ | ~ | ~ |
| Variáveis e organização CSS | ✗ | ~ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Sistema tipográfico | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Layout moderno | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| Responsividade | ✗ | ✓ | ✓ | ✓ | ✗ | ~ | ✓ | ✗ |
| Tema claro/escuro | ~ | ~ | ✓ | ✓ | ✗ | ~ | ✓ | ~ |
| Copiar e-mail | ✗ | ~ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Animação de entrada | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| JS extra à escolha | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| Design e identidade | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Criatividade e empenho | ~ | ✓ | ✓ | ✓ | ~ | ~ | ✓ | ✓ |
| README e repositório | ~ | ~ | ✓ | ✓ | ~ | ✗ | ✓ | ~ |
| **Nota fria** | **32%** | **69%** | **91%** | **96%** | **24%** | **35%** | **92%** | **64%** |

---

## Comentário por aluno

### Laura Marcolino — 96% · Aprovado
Único projeto aprovado. Todos os critérios técnicos cumpridos, incluindo opcionais.
Os 4% restantes são polimento citado na revisão (cards de portfólio em `background-image`
sem `alt`, `loading="lazy"` só no avatar, README sem screenshot) — nada que reprove.

### Maria Clara Guimarães — 92% · Reentrega
A nota mais alta entre as reentregas. O único bloqueador é a **ausência do vídeo
embedded**. Sistema de variáveis, tema, IntersectionObserver e dois extras (typewriter
e terminal) estão completos. HTML perde meio ponto pelo uso de `<br>` para montar lista.

### Gabriela Lacerda — 91% · Reentrega
Projeto tecnicamente sólido. O bloqueador é o **sistema tipográfico**: as 4 variáveis
de fonte estão declaradas no `:root`, mas só uma é usada — os demais tamanhos estão
chumbados. Correção pequena. Menu some no mobile (flag).

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

- **Média da turma:** ~63%. Mediana entre Pedro (64%) e Bernardo (69%).
- **Aprovação:** 1 de 8 (Laura). As outras 7 entregas precisam de reentrega.
- **Gargalo nº 1 — Sistema tipográfico:** 6 de 8 não cumprem. É o critério mais
  reprovado da turma. Vale uma revisão coletiva sobre variáveis de fonte.
- **Gargalo nº 2 — Mídia (vídeo):** o vídeo embedded falta em 5 das 8 entregas.
- **Gargalo nº 3 — Acessibilidade:** `rel="noopener noreferrer"` e foco visível
  são esquecidos com frequência (4 de 8 com falha).
- **Ponto forte do grupo:** "Design e identidade" e "Criatividade" — quase todos
  pontuam. O empenho visual existe; falta a disciplina técnica da diretriz.

---
*Avaliação por Josh — Diretoria Técnica IbTech 2026.1*
