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
  src: 'videos/meu-video.mp4',   // gerado por build-videos.sh
  poster: 'videos/meu-video.jpg', // idem — obrigatório para type:'file'
  title: 'Nome do projeto',
  category: 'Filmes',            // precisa existir em CATEGORIAS
  desc: 'Uma linha de descrição',
  featured: true,                // true = aparece também em "Em Destaque"
  order: 1                       // ordem de exibição (menor primeiro)
}
```

> ⚠️ Para `type: 'file'`, o campo `poster` é obrigatório na prática — sem ele
> o card fica sem imagem (quebrado). Só é opcional para `type: 'youtube'`
> (usa a miniatura do próprio YouTube automaticamente).

**Adicionar um vídeo novo:** coloque o arquivo original na pasta, registre-o
em `build-videos.sh`, rode `bash build-videos.sh` (gera o `.mp4` e o `.jpg`
dentro de `videos/`) e só então acrescente o bloco correspondente aqui.

**YouTube / Vimeo:** use só o ID, não a URL inteira.
`youtube.com/watch?v=ABC123` → `{ type: 'youtube', src: 'ABC123', ... }`

### 4. Capa dos vídeos

Cada capa é um arquivo `.jpg` gerado pelo `build-videos.sh` (não é calculada
na hora — os cards carregam só a imagem, o vídeo baixa apenas ao clicar).
Por padrão, o quadro escolhido fica a 18% da duração do vídeo, para evitar
o primeiro quadro (quase sempre escuro ou em transição).

Se a capa cair numa legenda, transição ou quadro sem conteúdo — como
aconteceu com dois vídeos aqui — defina um ponto manual no 3º campo de
`ITEMS` dentro do `build-videos.sh`:

```bash
ITEMS=(
  "meu-video.mp4|projeto-006|4.2"   # capa no segundo 4.2
  "outro-video.mp4|projeto-007|"    # vazio = usa os 18% automáticos
)
```

Depois rode `bash build-videos.sh` de novo para regenerar.

### 5. Vídeo de fundo do hero

```js
const HERO_BG = { src: 'videos/hero.mp4', poster: 'videos/projeto-002.jpg' };
```

`hero.mp4` é gerado pelo `build-videos.sh` a partir do vídeo escolhido como
fundo (20s, sem áudio, mais leve). Para trocar qual vídeo vira o fundo,
edite a seção "Fundo do hero" no fim do `build-videos.sh`.

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

- [ ] Renomear os projetos (hoje "Projeto 001" a "Projeto 005", provisórios)
- [ ] Revisar as categorias atribuídas a cada vídeo (foram um chute inicial)
- [ ] Revisar os textos de "Sobre o processo" — são genéricos, escritos
      sem conhecer o seu processo real. Troque pelas suas palavras.
- [ ] Definir um e-mail de contato, se quiser exibi-lo no rodapé
