# Revisão — Projeto 01 Cartão de Visita

**Aluna:** Gabriela Cristina Amorim Lacerda
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

Gabriela, este é um projeto forte. A identidade visual é coesa e sofisticada, o HTML está semântico e bem comentado, o vídeo está lá, o tema claro/escuro está 100% completo e o README é um dos mais caprichados que apareceram. Pela tabela da seção 7, há **um único bloqueador** — e ele é, na prática, terminar uma coisa que você já começou. O resto são flags e polimentos. Você está bem perto.

---

## O que já está bom

- **Identidade visual coesa.** A estética "cyber/tech" — o terminal decorativo, os números de seção translúcidos, a paleta verde-neon sobre fundo escuro — dá uma cara própria pra página. A tabela seção 7 ("Design e identidade", "Criatividade") avalia exatamente isso, e aqui está bem resolvido.
- **HTML semântico e muito bem comentado.** `nav`, `main`, `header`, `section`, `article`, `aside`, `footer` usados corretamente (`index.html`), `h1` único, hierarquia respeitada. E os comentários explicando cada bloco mostram domínio do que você escreveu — isso ajuda na conversa de autoria (seção 9 da diretriz).
- **Vídeo embedded presente e bem configurado** (`index.html:381-386`). `iframe` do YouTube com `loading="lazy"`, `allowfullscreen`, sem autoplay com áudio, e com proporção 16:9 responsiva no CSS (`style.css:400-405`).
- **Tema claro/escuro completo.** Toggle, troca via variáveis CSS (`.light-theme`), `localStorage` e `prefers-color-scheme` na primeira visita (`script.js:7-41`). Esse critério não falta nada.
- **`IntersectionObserver` bem aplicado** (`script.js:69-88`), com `unobserve` depois que o elemento aparece — anima uma vez só, do jeito certo.
- **Vários extras de JavaScript.** Efeito typewriter (`script.js:100-127`), glow seguindo o mouse (`script.js:92-98`) e os flip cards 3D em CSS. A diretriz pede um extra; você entregou vários.
- **Acessibilidade nos detalhes.** `:focus` visível em links e botões (`style.css:76-80`), `alt` descritivo em todas as imagens, `width`/`height` definidos, `loading="lazy"` onde faz sentido, `rel="noopener noreferrer"` nos links externos.
- **README exemplar** — nome, turma, link ao vivo, stack, decisões de projeto, estrutura, como rodar. Está acima do que a diretriz pede.

---

## Bloqueador

Pela tabela da seção 7, uma única linha vermelha já exige reentrega — e aqui há uma.

### 1. O sistema tipográfico está definido, mas quase não é usado (`style.css`)

A linha "Sistema tipográfico" da tabela pede 4+ tamanhos de fonte definidos como variáveis **e reaproveitados com consistência**. Você fez metade certo: o `:root` define `--fs-sm`, `--fs-base`, `--fs-lg` e `--fs-xl` (`style.css:11-14`). O problema é que, no arquivo inteiro, só `--fs-base` é usada — uma vez, no `.hero-subtitle` (`style.css:177`). Todos os outros tamanhos estão chumbados direto em cada elemento:

- `.logo` → `1.1rem` (`style.css:112`)
- `.hero-name` → `clamp(4rem, 10vw, 7rem)` (`style.css:167`)
- `.sec-pill` → `.8rem` (`style.css:188`)
- `.sec-num` → `5rem` (`style.css:262`)
- `.abt-destaque` e `.contact-h` → `3rem` (`style.css:272`, `416`)
- `.interest-info h3` → `1.5rem` (`style.css:387`)
- `.clink-lbl` → `.75rem` (`style.css:451`)
- e mais alguns dentro dos `@media` (`2.2rem`, `4rem`, `3rem`)

O *porquê* da regra: quando os tamanhos viram variáveis e são usados de verdade, a escala tipográfica do site inteiro mora em um lugar só — ajustar todos os títulos é mexer numa linha. Hoje, se você quisesse aumentar os títulos, teria que caçar `3rem` em vários pontos.

A boa notícia: você já tem as variáveis declaradas, então o trabalho é pequeno. Amplie a escala no `:root` pra cobrir os tamanhos que a página realmente usa:

```css
:root {
  /* ...suas variáveis... */
  --fs-xs: 0.75rem;   /* clink-lbl, sec-pill */
  --fs-sm: 0.9rem;
  --fs-base: 1rem;
  --fs-md: 1.1rem;    /* logo */
  --fs-lg: 1.5rem;    /* interest-info h3 */
  --fs-xl: 3rem;      /* títulos de seção */
  --fs-2xl: 5rem;     /* sec-num */
  --fs-hero: clamp(4rem, 10vw, 7rem);
}
```

E troque os valores chumbados pelas variáveis:

```css
.logo            { font-size: var(--fs-md); }
.hero-name       { font-size: var(--fs-hero); }
.sec-pill        { font-size: var(--fs-xs); }
.sec-num         { font-size: var(--fs-2xl); }
.abt-destaque,
.contact-h       { font-size: var(--fs-xl); }
.interest-info h3{ font-size: var(--fs-lg); }
.clink-lbl       { font-size: var(--fs-xs); }
```

Nos `@media`, faça o mesmo (ou, melhor ainda, use `clamp()` nas variáveis pra elas se ajustarem sozinhas e você poder remover os overrides).

---

## O que precisa arrumar (flags)

Não são linhas vermelhas isoladas, mas resolva antes de reenviar.

1. **O menu some por completo no celular** (`style.css:496-498`). No breakpoint de 768px você faz `.nlinks { display: none }` — mas não existe um menu alternativo (hambúrguer) no lugar. Resultado: no celular, a pessoa fica sem nenhuma navegação. A página ainda funciona rolando, mas perder a navegação inteira é um problema de usabilidade. Duas saídas:
   - **Mínimo:** em vez de esconder, deixe os links quebrarem em duas linhas (`flex-wrap: wrap` + `font-size` menor).
   - **Ideal:** um botão hambúrguer que abre/fecha a lista. Isso, inclusive, contaria como mais uma interação JS.

2. **`og:image` aponta pra um arquivo que não existe** (`index.html:18`). A meta tag referencia `assets/og-image.png`, mas a pasta `assets/` só tem `cooking.jpg`, `eye.jpg`, `pilates.jpg`, `reading.jpg` e `writing.jpg`. Crie a imagem (pode ser um print da página) ou ajuste o caminho pra uma que exista.

3. **Favicon aponta pra um arquivo que não existe** (`index.html:24`). Mesmo caso: `assets/favicon.png` não está na pasta. Adicione o arquivo ou ajuste o caminho.

4. **Copiar e-mail sem tratamento de erro** (`script.js:50-65`). O `navigator.clipboard.writeText(...)` pode falhar (por exemplo, fora de `https`/`localhost`). Hoje, se falhar, o botão mostra "copiado ✓" mesmo sem ter copiado. Trate:
   ```js
   btnEmail.addEventListener('click', () => {
     navigator.clipboard.writeText('gabicalacerda@gmail.com')
       .then(() => {
         btnEmail.innerHTML = `
           <span class="clink-lbl">status</span>
           <span class="clink-val">copiado ✓</span>`;
       })
       .catch(() => {
         btnEmail.innerHTML = `
           <span class="clink-lbl">status</span>
           <span class="clink-val">erro ao copiar</span>`;
       })
       .finally(() => {
         setTimeout(() => { btnEmail.innerHTML = htmlOriginal; }, 2000);
       });
   });
   ```

---

## Pontos menores

Não pesam na nota e não exigem reentrega — só polimento.

- **Espaçamentos não estão em variáveis.** Você colocou cores, fontes e tipografia no `:root`, mas os espaçamentos (`1rem`, `2rem`, `3rem`, `7rem`...) estão soltos. A diretriz (seção 4.2) sugere uma escala de espaçamentos em variáveis também — `--space-sm`, `--space-md`, `--space-lg`. Não derruba a nota, mas fecharia o sistema de design.
- **A pasta `.vscode/` está versionada.** `settings.json` é configuração do seu editor, não do projeto. Crie um arquivo `.gitignore` com a linha `.vscode/` pra ela não ir pro repositório.
- **Telefone pessoal exposto num repositório público.** O `(37) 99955-0778` aparece na página e no README. A diretriz pede LinkedIn, GitHub e e-mail no mínimo — o telefone é um extra seu. Só um aviso de privacidade: repositório público é indexado por buscadores; pense se você quer mesmo o número ali.
- **O ícone do botão de tema não muda** (`index.html:57`). Ele fica sempre 🌓. É um detalhe simples: trocar pra ☀️/🌙 conforme o tema dá um feedback visual a mais.

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Ampliar a escala de `--fs-*` no `:root` e aplicar nos elementos (bloqueador 1)
2. [ ] Resolver o menu no mobile — wrap ou hambúrguer (flag 1)
3. [ ] Criar `assets/og-image.png` e `assets/favicon.png` (flags 2 e 3)
4. [ ] Adicionar `.then/.catch` no copiar e-mail (flag 4)
5. [ ] (Opcional) Variáveis de espaçamento e `.gitignore` pra `.vscode/`
6. [ ] Testar em 360px e 1920px no DevTools antes de reenviar

---

## Considerações finais

Gabriela, o status "reentrega necessária" aqui não reflete a qualidade geral do trabalho — reflete uma regra específica da tabela. O seu projeto é, no conjunto, um dos mais bem-acabados desta leva: identidade visual forte, JavaScript variado e funcionando, README exemplar.

O bloqueador é quase irônico: você fez a parte difícil (criar as variáveis tipográficas) e parou antes da parte fácil (usá-las). Termine isso, resolva o menu mobile e os dois caminhos de imagem quebrados, e a aprovação vem na próxima rodada.

Antes de reenviar, abra o DevTools (F12), ative o modo responsivo e confira a página em 360px e em 1920px — principalmente o menu, que é onde está a flag mais visível. E dá uma olhada no Console pra garantir que nenhum erro ficou para trás.

Trabalho muito bom. Manda a reentrega.

---
*Revisão por Josh — 2026-05-15*
