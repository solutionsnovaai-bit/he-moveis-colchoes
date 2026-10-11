# H&E Móveis e Colchões

Site de uma página em português, com foco em contato pelo WhatsApp. Projeto estático, sem backend, CMS ou formulários. A entrega contém o código-fonte e os arquivos públicos. `node_modules` e `dist` são gerados localmente.

## Executar

Use Node.js 22 ou superior e npm.

```bash
npm install
npm run check
npm run dev
```

Para gerar e conferir a versão de produção:

```bash
npm run check
npm run build
npm run preview
```

O resultado fica em `dist`. Na Vercel, importe o repositório: `vercel.json` define o build, o diretório de saída e os cabeçalhos.

## Antes de publicar

- Configure o domínio HTTPS definitivo em `site.url`, em `src/config/site.ts`.
- Confirme o endereço da Loja 2. O Instagram enviado mostra Rua dos Bandeirantes, 453; o WhatsApp mostra Rua Bandeirantes, 478. O número e o CEP foram omitidos dessa unidade até confirmação. O mapa e os dados estruturados usam apenas Rua Newton Prado, 160.
- Confirme os horários da semana. Somente domingo fechado foi informado.
- Mantenha `indexar: false` durante a prévia. Quando os dados e o domínio estiverem confirmados, altere para `true` e faça novo build.
- Informe o repositório remoto antes do push. Não há URL remota configurada nesta entrega.

O build gera `robots.txt`, `sitemap.xml` e `manifest.webmanifest`. Com `indexar: false`, o HTML recebe `noindex,nofollow` e o sitemap fica vazio. O rastreamento é permitido para que os buscadores consigam ler o `noindex`. Com `indexar: true`, o domínio é obrigatório e o sitemap recebe a página principal. `noindex` não substitui controle de acesso.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `src/config/site.ts` | Dados da loja, contatos, mensagens, domínio e indexação |
| `src/config/imagens.ts` | Arquivos, dimensões e enquadramento das imagens |
| `src/content/textos.ts` | Textos, legendas, nomes acessíveis e navegação |
| `src/content/servicos.ts` | Grupos e itens da lista de opções |
| `src/styles/tema.css` | Tokens de cor, fontes e espaçamento em `@theme` |

As dependências diretas são exatamente as versões fixadas em `package.json`, sem intervalos. As declarações de tipos ficam em `src/types` para não acrescentar pacotes à stack. As respectivas licenças estão junto aos arquivos de tipos. As fontes locais em WOFF2 têm suas licenças em `public/fonts`.

## Imagens

O hero usa uma composição ilustrativa de móveis e colchão com a marca, em versões desktop e mobile. Não representa uma fotografia da loja ou uma oferta de um modelo específico. O convite final segue o mesmo ambiente, conforme o ajuste de direção visual.

A galeria usa os registros reais presentes nos prints fornecidos. O enquadramento é feito no componente `Imagem`, preservando os arquivos originais convertidos em AVIF e WebP. Para melhorar a definição, substitua por fotografias originais dos produtos. Não há foto de equipe fornecida; `Sobre` fica oculto até configurar `imagens.sobre`.

O breakpoint de `<picture>` e CSS é `767px`. No desktop, a arte ocupa toda a largura, preserva sua proporção original e não depende da altura da janela. Em telas largas o Hero pode ultrapassar uma altura de tela para manter a fotografia e o logotipo inteiros. No celular, a imagem vertical original permanece inteira, com o texto abaixo da região da marca e dos móveis.

Os diretórios `/assets`, `/fonts`, `/hero`, `/marca`, `/fotos` e `/icones` usam cache de um ano e `immutable`. Ao alterar um arquivo nessas pastas, mude obrigatoriamente o nome, por exemplo de `-v2` para `-v3`, e atualize as referências. O Vite gera nomes com hash para JS e CSS. `og.jpg`, HTML e arquivos de descoberta não usam esse cache longo.

## Movimento e acesso

A abertura aguarda as duas fontes e a imagem escolhida pelo `<picture>`, com limite de dois segundos e saída de 550 ms. O percentual corresponde aos recursos concluídos, sem simulação. O botão “Pular abertura” permite entrar imediatamente. Revisitas na mesma sessão, movimento reduzido e a preferência salva de pausa desativam a abertura. Durante a abertura e o menu, o conteúdo de fundo e o botão flutuante não recebem interação ou foco.

O rodapé permite pausar o movimento. A preferência é salva no navegador; a preferência do sistema por movimento reduzido tem prioridade. O carrossel pausa no hover, no foco, durante o arrasto, fora da tela e com a aba oculta. No modo reduzido, usa rolagem horizontal nativa. Setas do teclado e os controles laterais também navegam pelos produtos.

Menu mobile com Escape, foco preso e retorno ao botão de abertura. Link para pular ao conteúdo, foco visível, texto alternativo, botões de controle identificados e WhatsApp fixo. Animações visuais usam somente transform e opacity; a abertura do acordeão muda o conteúdo imediatamente, sem animar altura.

## Verificação do refinamento premium

- Checagem TypeScript e build de produção aprovados.
- Validação em Chrome nas larguras 320, 390, 767, 768, 900, 1024, 1440, 1920 e 2560 px: Hero ocupa toda a largura, imagens carregam e não há rolagem horizontal da página.
- Menu mobile: Tab/Shift+Tab, Escape, retorno de foco, navegação para seções e fechamento ao ampliar a janela aprovados.
- Galeria com movimento reduzido: teclado, rolagem e estado desabilitado do controle final aprovados; acordeão abre e fecha normalmente.
- Abertura normal, revisita sem abertura e liberação do conteúdo após fechar menu aprovados. Nenhuma exceção JavaScript ou erro HTTP de recursos locais nos cenários testados.
- Imagens, fontes, dados comerciais, textos, contatos, dependências e configuração de deploy preservados.
- Neste Windows, o módulo nativo do Rollup foi bloqueado pelo sistema. A validação local usou a distribuição oficial WebAssembly da mesma versão, somente em node_modules, sem alterar package.json ou o lockfile.
- Core Web Vitals de visitantes reais, entrega de mensagens e Google Maps externo não foram medidos. Domínio definitivo, indexação e dados comerciais pendentes seguem as observações acima.

## GitHub

O arquivo `he-moveis-colchoes-main.bundle`, entregue junto ao ZIP, preserva o commit local em `main`. Para recuperar esse histórico, extraia o ZIP e execute no diretório que contém o bundle:

```bash
git clone he-moveis-colchoes-main.bundle he-moveis-colchoes-git
cd he-moveis-colchoes-git
git remote remove origin
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Também é possível enviar a pasta de código-fonte diretamente a um repositório. Nesse caso, o histórico do bundle não é importado.
