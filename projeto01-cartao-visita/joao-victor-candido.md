# Revisão — Projeto 01 Cartão de Visita

**Aluno:** João Victor Cândido
**Turma:** IbTech Frontend 2026.1
**Status:** Reentrega necessária

João, leia o status com calma: "reentrega necessária" aqui **não** quer dizer projeto fraco — quer dizer um detalhe faltando numa entrega que, no resto, está entre as melhores da turma. As três interações obrigatórias estão todas corretas, você ainda somou uma extra, o vídeo está lá, a responsividade funciona, a acessibilidade está caprichada e o código é limpo de verdade. O que segura a aprovação é **um único item**: o sistema tipográfico ficou pela metade. O resto desta revisão são flags e polimentos — vale ler tudo, mas o bloqueador é só esse.

---

## O que já está bom

- **As três interações obrigatórias, todas corretas.** Tema claro/escuro (`script.js:9-33`) com toggle visível, troca por variáveis CSS, `localStorage` e `prefers-color-scheme` na primeira visita; copiar e-mail (`script.js:35-55`) com Clipboard API e feedback de 2s; e animação de entrada com `IntersectionObserver` (`script.js:57-79`). Nenhuma improvisada.
- **`IntersectionObserver` bem-feito.** Você usa `observador.unobserve(entrada.target)` (`script.js:69`) depois que a seção aparece — a animação dispara uma vez só, que é o comportamento certo. E ainda tem o `if (!("IntersectionObserver" in window))` como fallback. Isso é cuidado de quem pensou no código.
- **Progressive enhancement de verdade.** A frase de apresentação tem o texto no HTML **e** no `data-texto`, e o JS só ativa o efeito depois de marcar `js-enabled` no `body` (`script.js:7`). Se o JavaScript falhar, a página continua legível. Muita gente esquece disso.
- **Copiar e-mail com `try/catch`.** O `await navigator.clipboard.writeText(...)` está protegido (`script.js:39-54`) — se a cópia falhar, você mostra "Não foi possível copiar" em vez de deixar o erro silencioso no Console.
- **Acessibilidade caprichada.** `alt` descritivo e específico em todas as imagens (`index.html:27,74-76`), `:focus-visible` com `outline` visível (`style.css:55-59`), `width`/`height` nas imagens pra evitar layout shift, `loading="lazy"` na galeria e `rel="noopener noreferrer"` nos links externos. Esse critério está completo.
- **Variáveis CSS bem usadas.** Paleta, fontes e espaçamentos no `:root` (`style.css:1-21`), com tema claro sobrescrevendo só os valores em `:root[data-theme="light"]` — exatamente o jeito certo. As cores não aparecem chumbadas espalhadas pelo arquivo.

---

## Bloqueador

Pela tabela da seção 7 da diretriz, uma única linha vermelha já exige reentrega — e aqui há uma.

### 1. O sistema tipográfico ficou pela metade

A linha "Sistema tipográfico" da tabela pede **pelo menos 4 tamanhos de fonte definidos como variáveis e reaproveitados com consistência**. Você fez a primeira parte: declarou quatro no `:root` (`style.css:12-15`):

```css
--tamanho-pequeno: 0.9rem;
--tamanho-normal: 1rem;
--tamanho-medio: 1.4rem;
--tamanho-grande: 2.4rem;
```

O problema é a segunda parte. Só **duas** dessas variáveis são usadas de fato: `--tamanho-grande` no `h1` (`style.css:90`) e `--tamanho-medio` no `h2` (`style.css:96`). As outras duas — `--tamanho-pequeno` e `--tamanho-normal` — estão declaradas e nunca aparecem no arquivo. Os parágrafos, a lista, os botões e o rodapé não recebem `font-size` nenhum: caem no tamanho padrão do navegador. O sistema existe no papel, mas metade dele está morta.

Tem ainda um detalhe ligado: no mobile, o `h1` recebe `font-size: 2rem` chumbado (`style.css:234`) — um valor solto, fora do sistema que você mesmo montou.

Para fechar o critério, faça o sistema ser **realmente usado**. Aplique as variáveis nos elementos que hoje estão sem `font-size`:

```css
body {
  font-size: var(--tamanho-normal);
}

footer p,
.frase-apresentacao {
  font-size: var(--tamanho-pequeno);
}
```

E troque o valor chumbado do `h1` mobile por uma variável. Como você vai querer um `h1` um pouco menor no celular do que no desktop, o caminho mais limpo é criar uma variável pra isso e sobrescrevê-la dentro da media query, em vez de chumbar `2rem`:

```css
:root {
  /* ...as outras variáveis... */
  --tamanho-titulo: 2.4rem;
}

h1 {
  font-size: var(--tamanho-titulo);
}

@media (max-width: 768px) {
  :root {
    --tamanho-titulo: 2rem;
  }
}
```

Repare que esse padrão é o mesmo que você já usou tão bem com as cores: a variável muda, e o elemento se ajusta sozinho. Aqui a regra `h1` nem precisa ser repetida na media query.

Se quiser, dá pra usar `clamp()` no `h1` e dispensar a media query pra ele — mas isso é opcional. O que o critério exige é só que os quatro tamanhos sejam variáveis **e** sejam usados.

---

## O que precisa arrumar (flags)

Não são linhas vermelhas, mas resolva antes de reenviar.

1. **Comentários de seção só na metade do CSS** (`style.css`). O checklist da seção 8 pede o arquivo "organizado por seções com comentários". Você fez isso da metade pra baixo — `/* Galeria de fotos */`, `/* Vídeo... */`, `/* Animação de entrada */`, `/* Responsividade */` —, mas o começo do arquivo (reset, `body`, header, tipografia, botões) está sem nenhum marcador. Acrescente comentários nesses blocos também:

   ```css
   /* ===== Variáveis ===== */
   :root { ... }

   /* ===== Reset e base ===== */
   * { box-sizing: border-box; }

   /* ===== Tipografia ===== */
   h1 { ... }
   ```

   É rápido e deixa o critério "Variáveis e organização CSS" redondo.

2. **A imagem de Open Graph é uma foto quadrada** (`index.html:11`). Funciona — o arquivo `assets/itauna.jpeg` existe —, mas imagens de OG aparecem melhor num formato mais largo (o padrão é 1200×630). Não reprova; é só uma observação pra o link ficar bonito quando compartilhado.

---

## Pontos menores

Não pesam na nota e não exigem reentrega — só polimento.

- **A mesma foto faz quatro papéis.** `itauna.jpeg` é o hero, o favicon, a imagem de OG e a terceira foto da galeria (`index.html:14,11,27,76`). Não está errado, mas a galeria fica com mais identidade se as três fotos forem realmente diferentes — a diretriz sugere "você em contextos diferentes".
- **O favicon é uma foto pesada** (`index.html:14`). Um `.jpeg` de retrato como favicon funciona, mas o ícone aparece em 16×16px — uma imagem simples (uma inicial, um símbolo) lê melhor nesse tamanho.
- **A URL do LinkedIn tem acentos** (`index.html:99`). O endereço `.../joão-victor-cândido-...` abre normalmente porque o navegador converte os acentos, mas URLs costumam evitar caracteres acentuados. Se o LinkedIn deixar, vale personalizar pra uma versão sem acento.

---

## Checklist de reentrega

Sugestão de ordem:

1. [ ] Aplicar `--tamanho-pequeno` e `--tamanho-normal` nos elementos que hoje estão sem `font-size` (bloqueador 1)
2. [ ] Trocar o `font-size: 2rem` chumbado do `h1` mobile por uma variável (bloqueador 1)
3. [ ] Adicionar comentários de seção no começo do `style.css` (flag 1)
4. [ ] (Opcional) Usar fotos diferentes na galeria e um favicon mais simples
5. [ ] Testar em 360px e 1920px no DevTools antes de reenviar

---

## Considerações finais

João, este é um projeto bem construído. Você não só cumpriu as três interações obrigatórias como as fez com cuidado — o fallback do `IntersectionObserver`, o `try/catch` no copiar e-mail, o texto duplicado pra página funcionar sem JS. Esses são detalhes que separam "funcionou" de "foi bem feito", e você acertou neles.

O bloqueador é honestamente pequeno: você montou o sistema tipográfico certo, só não terminou de usá-lo. Aplique as duas variáveis que sobraram, tire o `2rem` solto do mobile, e a aprovação vem na próxima rodada. Antes de reenviar, abra o DevTools (F12), ative o modo responsivo e confira a página em 360px e em 1920px — e dá uma olhada no Console pra garantir que nenhum erro ficou pra trás.

Capricho reconhecido. Manda a reentrega.

---
*Revisão por Josh — 2026-05-18*
