# Revisão — Projeto 01 Cartão de Visita

**Aluno:** Gabriel Scarpat
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Gabriel, leia o status com calma: "reentrega necessária" aqui não significa projeto fraco — significa o contrário. A sua entrega está entre as mais completas da turma. As três interações obrigatórias em JavaScript estão lá e corretas, você somou várias extras, a mídia está completa, e — atenção a isto — você acertou o **sistema tipográfico**, que é, com folga, o critério que mais reprova gente nesta turma.

O que segura a aprovação são **dois itens**, os dois pequenos e de correção rápida. Esta revisão explica cada um, com o código pronto, e lista também algumas flags que vale resolver junto.

---

## O que já está bom

- **Sistema tipográfico completo e usado.** Você declarou cinco tamanhos de fonte no `:root` — `--fs-sm`, `--fs-base`, `--fs-lg`, `--fs-xl`, `--fs-xxl` (`style.css:17-21`) — e, o mais importante, **usou todos eles** no arquivo inteiro. Não há `font-size` chumbado solto. Esse é o ponto onde a maioria da turma tropeça (declara a escala e não usa, ou nem declara); você fechou o critério.
- **As três interações obrigatórias, todas corretas.** Tema claro/escuro com `localStorage` (`script.js:1-18`); copiar e-mail com a Clipboard API e um efeito de "scramble" no feedback (`script.js:19-47`); e animação de entrada com `IntersectionObserver` (`script.js:49-61`).
- **Vários JavaScript extras.** A diretriz pede um além dos três obrigatórios; você fez o efeito **typewriter** no subtítulo (`script.js:63-84`), o **menu hambúrguer** (`script.js:86-91`) — que ainda fecha ao clicar fora e ao apertar `Esc` (`script.js:111-125`) — e um observer que troca a cor do nav conforme a seção (`script.js:93-109`).
- **Mídia completa.** Três fotos (`IMG_1290.jpg`, `familia.jpeg`, `cruzeiro.JPG`) com `alt` descritivo, e um vídeo embedado com `<video controls>`, `poster` definido e sem autoplay (`index.html:58-60`). A linha "Mídia" da tabela está cumprida.
- **Variáveis CSS bem organizadas.** Cores, fontes e tamanhos no `:root`, reset no topo, arquivo legível.
- **Layout moderno.** Flexbox monta tudo; `position: fixed` aparece só no nav, que é uso correto. Os cards com `transform` no hover, o `scroll-snap` entre seções e o tema escuro editorial dão identidade à página.
- **Links externos seguros.** LinkedIn e GitHub com `target="_blank"` e `rel="noopener noreferrer"`.
- **README completo.** Nome, turma, descrição, stack, funcionalidades e "como rodar" — tudo lá.

---

## Bloqueadores

Pela tabela da seção 7, cada linha vermelha exige reentrega. Aqui há duas.

### 1. Só um breakpoint de responsividade

A linha "Responsividade" da tabela pede **pelo menos dois breakpoints**, pra a página funcionar bem de 360px (celular pequeno) a 1920px (monitor grande). O seu CSS tem só um: `@media (max-width: 768px)` (`style.css:301`).

Esse breakpoint único trata o nav (vira hambúrguer) — bom —, mas a faixa intermediária entre o desktop e o celular fica sem ajuste. Olhe, por exemplo, o `.midia-card`: ele tem `width: 420px` e `height: 420px` fixos (`style.css:348-355`). Numa tela de tablet retrato (~700-800px), dois cards de 420px lado a lado já não cabem, e como não há um breakpoint pra essa faixa, o resultado depende só do `flex-wrap`.

Adicione um segundo ponto de ajuste — um breakpoint de tablet, ou um de celular pequeno. Exemplo:

```css
/* tablet — até 1024px */
@media (max-width: 1024px) {
  #sobre,
  #habilidades,
  #contato { padding: 60px 1.5rem; }
  .midia-card { width: 100%; max-width: 420px; height: auto; aspect-ratio: 1; }
}
```

Depois teste no DevTools (F12 → ícone de celular) em 360px, 768px, 1024px e 1440px.

### 2. O tema não respeita a preferência do sistema na primeira visita

A linha "Tema claro/escuro" pede que o tema persista em `localStorage` **e** respeite `prefers-color-scheme` na primeira visita. A persistência você fez certo. Mas a primeira visita está assim (`script.js:3`):

```js
if (localStorage.getItem('tema') === 'claro') {
  document.body.classList.add('tema-claro');
  botao.textContent = '🌑';
}
```

Quando alguém abre a página pela primeira vez, não há nada salvo no `localStorage` — então essa condição é falsa e o site abre sempre no tema escuro padrão, **ignorando** se a pessoa configurou o computador no modo claro.

A diretriz pede que, **na primeira visita**, a página comece no tema que combina com o sistema do usuário; a partir daí, a escolha dele manda. Detecte isso com `window.matchMedia`:

```js
const temaSalvo = localStorage.getItem('tema');
const sistemaClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

if (temaSalvo === 'claro' || (temaSalvo === null && sistemaClaro)) {
  document.body.classList.add('tema-claro');
  botao.textContent = '🌑';
}
```

A ordem importa: **se já existe escolha salva, respeita; se não existe (primeira visita), pergunta pro sistema.**

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas resolva antes de reenviar.

1. **Pasta `images/` em vez de `assets/`.** A seção 5 da diretriz pede a pasta de mídia com o nome `assets/`. Renomeie `images/` pra `assets/` e atualize os `src` no HTML. Não é regra dura, mas é o padrão pedido.

2. **Falta o `<header>` semântico.** Você usou `<nav>`, `<main>`, `<section>` e `<footer>` corretamente — mas o `<nav>` está solto direto no `<body>`. A diretriz lista `<header>` entre as tags esperadas. Envolva o `<nav>` num `<header>`:

   ```html
   <header>
     <nav> ... </nav>
   </header>
   ```

3. **Foco visível via `:focus` em vez de `:focus-visible`.** O seu CSS estiliza o foco com `a:focus`/`button:focus` (`style.css:368-372`). Funciona, mas isso faz o anel de foco aparecer também no **clique de mouse**, não só na navegação por teclado. Troque por `:focus-visible`, que mostra o outline só pra quem navega por teclado:

   ```css
   a:focus-visible,
   button:focus-visible {
     outline: 2px solid var(--cor-destaque);
     outline-offset: 4px;
   }
   ```

4. **`loading="lazy"` no `<video>`** (`index.html:58`). O atributo `loading="lazy"` só é válido em `<img>` e `<iframe>` — em `<video>` ele é ignorado pelo navegador. Não quebra nada, mas pode remover, porque não faz efeito ali.

5. **Botão do hambúrguer sem rótulo.** O `<button id="hamburger">☰</button>` tem só o caractere `☰` como conteúdo. Pra um leitor de tela, isso não diz nada. Adicione `aria-label="Abrir menu"`.

---

## Pontos menores

Polimento. Não pesam na nota.

- **README com `###` em texto corrido.** Nas linhas 6 e 21 do `README.md`, frases inteiras (a descrição e o "como rodar") estão marcadas como título `###`. Isso deixa o texto grande e em destaque sem necessidade — use `###` só nos títulos de seção e deixe o texto como parágrafo normal.
- **Texto do "Sobre" um pouco pequeno.** O `#sobre p` usa `var(--fs-sm)` (0.85rem). Pra um bloco de texto corrido que a pessoa vai ler por inteiro, `--fs-base` (1rem) é mais confortável. `--fs-sm` cabe melhor em rótulos e legendas.
- **O vídeo `torcida.mp4` tem ~60 MB.** É muito pesado pra uma página web — quem abre no celular espera o arquivo inteiro baixar antes de ver qualquer coisa. Vale comprimir o vídeo (um exportador em resolução menor, ou uma ferramenta como o HandBrake) ou, mais simples, subir pro YouTube e embedar com `<iframe>`, como a Laura fez.

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Adicionar um segundo breakpoint de responsividade (bloqueador 1)
2. [ ] Fazer o tema detectar `prefers-color-scheme` na primeira visita (bloqueador 2)
3. [ ] Renomear a pasta `images/` pra `assets/` e atualizar os `src` (flag 1)
4. [ ] Envolver o `<nav>` num `<header>` (flag 2)
5. [ ] Trocar `:focus` por `:focus-visible` (flag 3)
6. [ ] Remover o `loading="lazy"` do `<video>` e adicionar `aria-label` no hambúrguer (flags 4 e 5)
7. [ ] (Opcional) Ajustar o README e o tamanho do texto do "Sobre"
8. [ ] Testar em 360px, 768px, 1024px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Gabriel, este é um projeto bem feito. Você não só cumpriu as três interações obrigatórias como somou várias extras, e acertou o sistema tipográfico — o critério que mais derruba a turma. O tema escuro editorial, o `scroll-snap`, o efeito de scramble no copiar e-mail: dá pra ver que você se envolveu com o projeto, não só cumpriu tabela.

Os dois bloqueadores são honestamente pequenos: um é colar um bloco de `@media`, o outro é trocar três linhas no `script.js` pra detectar a preferência do sistema. Nenhum dos dois é refação — é acabamento. Resolva os dois, passe pelas flags (que também são rápidas), e a aprovação vem na próxima rodada.

Antes de reenviar, abre o DevTools (F12), ativa o modo responsivo e confere a página em 360px e 1920px — e dá uma olhada no Console pra garantir que nenhum erro de JavaScript ficou pra trás.

Capricho reconhecido. Manda a reentrega.

---
*Revisão por Josh — 2026-05-19*
