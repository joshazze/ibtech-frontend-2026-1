# Cartão de Visita Pessoal - João Victor

Este é o meu primeiro cartão de visita pessoal feito para a trilha de Frontend da IbTech. A ideia do projeto é ter uma página simples, direta e com a minha cara, reunindo uma apresentação rápida sobre mim, algumas áreas que quero estudar melhor, fotos, um vídeo e meus principais links de contato.

O site foi desenvolvido com HTML, CSS e JavaScript puros, sem framework. Durante o processo, trabalhei a estrutura da página, a parte visual, responsividade e algumas interações em JavaScript.

## Link do projeto

Site publicado no GitHub Pages:

https://joaocandd.github.io/ibtech/

## O que tem na página

- Meu nome completo e uma frase curta de apresentação
- Uma seção "Sobre" contando um pouco da minha trajetória
- Uma lista com áreas de interesse e objetivos de estudo
- Galeria com três fotos
- Um vídeo incorporado do YouTube
- Links para GitHub, LinkedIn e e-mail
- Botão para alternar entre tema claro e escuro
- Botão para copiar o e-mail
- Animação de entrada das seções ao rolar a página
- Efeito de digitação na frase inicial

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript
- GitHub Pages

## Estrutura dos arquivos

```text
ibtech/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── ainnn.jpeg
    ├── nvsinvison.jpeg
    └── itauna.jpeg
```

## Como rodar localmente

Para abrir o projeto no computador:

1. Baixe ou clone este repositório.
2. Abra a pasta no VS Code.
3. Abra o arquivo `index.html` com a extensão Live Server.

Também é possível abrir o `index.html` diretamente no navegador, mas usando o Live Server fica mais próximo do jeito que a página funciona publicada.

## Sobre o JavaScript

O arquivo `script.js` ficou responsável pelas interações principais do site:

- Detectar o tema preferido do sistema na primeira visita
- Salvar o tema escolhido no `localStorage`
- Alternar entre tema claro e escuro
- Copiar o e-mail usando a Clipboard API
- Mostrar feedback visual quando o e-mail é copiado
- Animar as seções usando `IntersectionObserver`
- Aplicar o efeito de digitação na frase de apresentação

## Observações do desenvolvimento

Um dos cuidados que precisei ter foi com o caminho das imagens no GitHub Pages. Localmente, alguns arquivos funcionavam mesmo com espaço no nome, mas no site publicado isso podia quebrar. Por isso, deixei as imagens dentro da pasta `assets` e usei nomes simples, sem espaço:

```text
assets/ainnn.jpeg
assets/nvsinvison.jpeg
assets/itauna.jpeg
```

Isso deixou o projeto mais organizado e evitou erro de imagem não encontrada.

## Autor

João Victor Cândido Lopes Silva

- GitHub: https://github.com/joaocandd
- LinkedIn: https://www.linkedin.com/in/joão-victor-cândido-lopes-silva-203258313
- E-mail: lopezempirestatebuilding@gmail.com
