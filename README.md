# FORMA — Mini E-commerce

Loja virtual de moda desenvolvida com HTML, CSS e JavaScript puro. Sem frameworks, sem dependências, sem build step.

## 📁 Estrutura

```
/
├── index.html   # Estrutura da página
├── style.css    # Estilos e animações
├── script.js    # Lógica do carrinho e produtos
└── README.md    # Este arquivo
```

## 🚀 Como rodar

Basta colocar os arquivos na mesma pasta e abrir o `index.html` no navegador. Não precisa de servidor.

## ✨ Funcionalidades

- **Catálogo de produtos** — 12 itens em 4 categorias (Roupas, Acessórios, Calçados)
- **Filtros** — por categoria e por promoção (Sale)
- **Carrinho lateral** — abre como sidebar com animação suave
- **Gerenciamento do carrinho** — adicionar, remover e ajustar quantidade
- **Preços promocionais** — suporte a preço original riscado + preço de venda
- **Tags visuais** — "Novo" e "Sale" nos cards de produto
- **Notificação toast** — feedback visual ao adicionar itens
- **Finalização de compra** — limpa o carrinho e exibe confirmação
- **Design responsivo** — adaptado para mobile

## 🎨 Design

| Elemento     | Valor                  |
|--------------|------------------------|
| Cor base     | `#F5F0E8` (creme)      |
| Cor escura   | `#1A1A18`              |
| Destaque     | `#C8A96E` (dourado)    |
| Fonte título | Playfair Display       |
| Fonte corpo  | DM Sans                |

As fontes são carregadas via Google Fonts (requer conexão à internet).

## 🛠 Personalização

**Adicionar produtos** — edite o array `products` em `script.js`:

```js
{ id: 13, name: 'Novo Produto', brand: 'Marca', price: 199, category: 'roupas', emoji: '🧤', stars: 5 }
```

Campos disponíveis:

| Campo       | Tipo     | Descrição                                      |
|-------------|----------|------------------------------------------------|
| `id`        | número   | Identificador único                            |
| `name`      | string   | Nome do produto                                |
| `brand`     | string   | Nome da marca                                  |
| `price`     | número   | Preço atual                                    |
| `oldPrice`  | número   | Preço original (opcional, ativa tag "Sale")    |
| `category`  | string   | `roupas`, `acessorios` ou `calcados`           |
| `emoji`     | string   | Emoji usado como imagem do produto             |
| `tag`       | string   | `new` ou `sale` (opcional)                     |
| `stars`     | número   | Avaliação de 1 a 5                             |

**Adicionar categoria** — crie um botão de filtro no `index.html` e use o mesmo valor em `category` nos produtos.

## 📦 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties, animações)
- JavaScript ES6+ (sem bibliotecas externas)
- Google Fonts
