# ogiovaniazzi — guia de edição

## Como abrir o site

Os vídeos **não carregam** abrindo o `index.html` com dois cliques (restrição do navegador).
Rode o servidor incluído — na pasta do projeto:

```bash
python dev-server.py
```

Depois acesse `http://localhost:8899`.

> Use `dev-server.py`, **não** `python -m http.server`. O servidor embutido do Python
> não implementa HTTP Range, e sem isso o avanço/retrocesso do vídeo não funciona.
> Na Vercel o Range funciona normalmente — é só uma limitação do teste local.

## Atalhos do player

| Tecla | Ação |
|---|---|
| `Espaço` / `K` | play / pause |
| `←` `→` | −5s / +5s |
| `J` `L` | −10s / +10s |
| `↑` `↓` | volume |
| `M` | mudo |
| `F` | tela cheia |
| `0`–`9` | pular para 0%–90% |
| `Esc` | fechar |

Com o modal aberto, `←` `→` também trocam de projeto quando o foco não está no player.
O volume escolhido fica lembrado entre visitas.

## Publicar uma atualização

O site está no ar em **https://ogiovaniazzi.vercel.app**

Depois de editar qualquer coisa, rode na pasta do projeto:

```bash
vercel deploy --prod --yes
```

Para guardar a alteração também no GitHub:

```bash
git add -A && git commit -m "descreva a mudança" && git push
```

> O deploy é manual porque a Vercel está ligada à conta GitHub `giovaniazzi`,
> enquanto o repositório está em `giovaniazzi35-sys`. Se um dia quiser deploy
> automático a cada `git push`, basta conectar a conta `giovaniazzi35-sys` na
> Vercel e importar o repositório por lá.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura e todos os textos da página |
| `styles.css` | Todo o visual (cores, tipografia, espaçamentos) |
| `script.js` | **Configuração dos vídeos, categorias e contatos** |

## O que editar

Tudo o que muda com frequência está no topo do `script.js`.

### 1. Contatos

```js
const CONTATO = {
  whatsapp:  'https://wa.me/5511970799985',
  instagram: 'https://instagram.com/giovaniazzi1',
  email:     ''     // vazio = o link de e-mail nem aparece no rodapé
};
```

Para exibir o e-mail no rodapé, basta preencher o campo `email`.

### 1b. Mensagens rápidas do botão do WhatsApp

O botão verde flutuante abre uma lista de mensagens prontas. Edite em `WHATSAPP_ACOES`:

```js
const WHATSAPP_ACOES = [
  { id: 'orcamento', icone: '💰', label: 'Solicitar orçamento',
    msg: 'Olá! Gostaria de solicitar um orçamento para um vídeo.' },
  // adicione, remova ou reordene à vontade
];
```

O `id` é opcional e serve para um botão da página abrir direto aquela mensagem:

```html
<a class="js-wa" data-msg="orcamento">Pedir orçamento</a>
```

Qualquer link com a classe `js-wa` vira automaticamente um atalho de WhatsApp.
Sem `data-msg`, usa a mensagem padrão de `WHATSAPP_MSG`.

### 2. Categorias

```js
const CATEGORIAS = ['Todos', 'Filmes', 'Eventos', 'Marcas', 'Conteúdo'];
```

Adicione, remova ou renomeie à vontade. Mantenha `'Todos'` como o primeiro item.
Os botões de filtro são gerados automaticamente.

### 3. Vídeos

Cada vídeo é um bloco na lista `VIDEOS`:

```js
{
  type: 'file',                  // 'file' | 'youtube' | 'vimeo'
  src: 'meu-video.mp4',          // arquivo na pasta, OU o ID do YouTube/Vimeo
  poster: '',                    // opcional: imagem de capa própria
  title: 'Nome do projeto',
  category: 'Filmes',            // precisa existir em CATEGORIAS
  desc: 'Uma linha de descrição',
  featured: true,                // true = aparece também em "Em Destaque"
  order: 1                       // ordem de exibição (menor primeiro)
}
```

**Adicionar um vídeo novo:** copie o arquivo para a pasta e acrescente um bloco à lista.

**YouTube / Vimeo:** use só o ID, não a URL inteira.
`youtube.com/watch?v=ABC123` → `{ type: 'youtube', src: 'ABC123', ... }`

### 4. Capa dos vídeos

Sem `poster`, a capa é um quadro do próprio vídeo, tirado a 18% da duração
(evita o primeiro quadro, quase sempre escuro). Para mudar esse ponto:

```js
const POSTER_AT = 0.18;   // 0.5 = metade do vídeo
```

### 5. Vídeo de fundo do hero

```js
const HERO_BG = { type: 'file', src: 'copy_11DE4C0A-....mov' };
```

### 6. Textos da página

Estão direto no `index.html`, marcados com `<!-- EDITE -->` onde há espaço
reservado para você — principalmente em **Sobre o processo**, que hoje tem
apenas um texto genérico à espera da sua apresentação.

### 7. Cor de destaque

No `styles.css`, primeira linha do bloco `:root`:

```css
--accent: #c9a875;
```

## Sobre a proporção dos vídeos

Os 5 vídeos atuais são todos **verticais (9:16)**, então a grade usa 9:16 —
nada é cortado. Se adicionar vídeos horizontais, mude no `styles.css`:

```css
.card { aspect-ratio: 9 / 16; }   /* → 16 / 9  ou  4 / 5 */
```

O enquadramento usa `object-fit: cover`, que recorta mas **nunca distorce**.
Nas seções "Em Destaque" e no player em tela cheia, a proporção original é
sempre preservada por inteiro.

## Ainda pendente

- [ ] Renomear os projetos 002–005 (hoje com nomes provisórios)
- [ ] Revisar as categorias atribuídas a cada vídeo (foram um chute inicial)
- [ ] Revisar os textos de "Sobre o processo" — são genéricos, escritos
      sem conhecer o seu processo real. Troque pelas suas palavras.
- [ ] Definir um e-mail de contato, se quiser exibi-lo

> ⚠️ Os textos do site falam em "resposta no mesmo dia". Ajuste ou remova
> essa frase no `index.html` se não for o seu compromisso real.
