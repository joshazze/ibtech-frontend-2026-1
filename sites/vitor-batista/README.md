# meu-cartao-de-visita
Vitor Batista · IbTech · Trilha Frontend · Projeto 01 · 2026.1

Ao vivo: https://vitorb849.github.io/meu-cartao-de-visita/

Cartão de visita pessoal feito em HTML, CSS e JavaScript puros.
Sem framework. Sem dependência. Vanilla.

## Sobre

O site é um **livro interativo** — cada página virada conta um capítulo da minha história. A navegação acontece por swipe (trackpad e mobile) ou pelos botões, e a animação de virada usa CSS 3D puro.

A ideia era fugir do scroll vertical tradicional: o formato de livro dá ritmo à leitura e cada página tem um propósito claro, do primeiro ao último capítulo.

## Stack

HTML5 · CSS3 · JavaScript · Git · GitHub · VS Code

| Camada | Tecnologia |
|--------|------------|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 — variáveis, Flexbox, transform 3D, animações |
| Lógica | JavaScript ES2022 — vanilla, zero libs |
| Tipografia | Press Start 2P · DM Serif Display · DM Sans — Google Fonts |

## Interações JavaScript

**Navegação do livro**
- Virada de página com CSS 3D (`rotateY`) e `cubic-bezier` suave
- Swipe horizontal no **trackpad macOS** via `wheel` com detecção de `deltaX`
- Swipe por toque no **mobile** via `touchstart` / `touchend`
- Botões ‹ › e dots indicadores sincronizados com a página atual

## Decisões de projeto

**Formato livro** — A metáfora do livro organiza o conteúdo em 8 capítulos: Capa → Sobre → Formação → Trajetória → Habilidades → Idiomas → Interesses → Contato. Cada página tem intenção, não é só scroll com seções.

**Estética pixel art** — A capa usa `Press Start 2P` e uma grade de pixels em CSS, uma referência ao universo gamer/retro que contrasta com o interior limpo e tipográfico das páginas internas.

**Profundidade do livro** — A lombada grossa com gradiente, a pilha de páginas na borda direita e a sombra de encadernação interna foram feitas só em CSS, sem imagens.

**Zero dependências** — Todos os efeitos foram implementados em JavaScript vanilla. O site funciona offline: abre o `index.html` e pronto.

## Estrutura

```
meu-cartao-de-visita/
├── index.html      — marcação semântica, 8 páginas do livro
├── style.css       — estilização, animações 3D e responsividade
├── script.js       — navegação, swipe (trackpad + mobile) e lógica do livro
└── README.md
```

## Como rodar

```bash
# opção 1 — abre direto no navegador
open index.html

# opção 2 — servidor local
python3 -m http.server 8000
# acesse http://localhost:8000

# opção 3
npx serve .
```

## Contato

Vitor Batista de Carvalho

vitorbatistadc@gmail.com  
linkedin.com/in/vitorbatistadc  
github.com/vitorb849
