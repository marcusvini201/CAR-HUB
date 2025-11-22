# Enciclopédia Interativa de Marcas de Carros

Este é um projeto de front-end que funciona como uma pequena enciclopédia de marcas de carros de luxo e esportivos. A aplicação carrega os dados a partir de um arquivo `data.json` e permite que os usuários busquem informações sobre diversas marcas, exibindo os resultados de forma dinâmica.

## ✨ Funcionalidades Principais

- **Busca Inteligente e Multifacetada:** O coração do projeto é seu sistema de busca avançado, que utiliza várias estratégias para encontrar a melhor correspondência:
    1.  **Correspondência Exata:** Procura primeiro pelo nome exato da marca.
    2.  **Busca por Prefixo:** Se não encontra, busca por marcas cujo nome começa com o termo pesquisado.
    3.  **Busca Ampla:** Realiza uma busca em texto completo, verificando o termo nos campos de nome, criador e descrição.
    4.  **Busca por Aproximação (Fuzzy Search):** Como última tentativa, utiliza o **algoritmo de distância de Levenshtein** para encontrar a correspondência mais próxima, corrigindo possíveis erros de digitação do usuário.

- **Renderização Dinâmica:** Os resultados da busca são renderizados como "cards" na interface, criando uma experiência de usuário fluida e interativa sem a necessidade de recarregar a página.

- **Interface Limpa:** Quando a busca não retorna resultados, uma mensagem amigável é exibida. Se o campo de busca é limpo, a lista de cards desaparece, mantendo a interface organizada.

- **Carregamento Assíncrono de Dados:** Utiliza a `Fetch API` do JavaScript para carregar os dados do arquivo `data.json` de forma assíncrona.

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3** (para estilização dos cards e da página)
- **JavaScript (ES6+)**
- **JSON** (como fonte de dados)

Este projeto demonstra a manipulação do DOM, o tratamento de eventos, o consumo de dados locais com `fetch` e a implementação de algoritmos de busca complexos em JavaScript puro.
