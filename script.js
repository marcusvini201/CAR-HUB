// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const cardConteiner = document.querySelector(".card-container");
    let dados = [];

    // Função para buscar os dados do arquivo JSON
    async function buscarDados() {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
            // Não renderiza cards ao carregar a página, aguarda a busca
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    }

    // Função para renderizar os cards na tela
    function renderizarCards(items) {
        cardConteiner.innerHTML = ""; // Limpa a área de cards antes de renderizar
        const termoBusca = document.querySelector("#caixa-busca").value;
        if (items.length === 0 && termoBusca !== "") {
            // Mensagem estilizada quando a busca não encontra resultados
            cardConteiner.innerHTML = "<p class='not-found'>Nenhuma marca encontrada para sua busca.</p>";
        } else {
            for (const item of items) {
                const article = document.createElement("article");
                article.classList.add("card");

                // Se o item for "Vinicius", o nome vira o link. Para os outros, o nome é só texto.
                const nomeElemento = item.nome === "Vinicius" 
                    ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color: #D4AF37; font-size: 1.4em; text-decoration: none;">${item.nome}</a>`
                    : `<strong style="color: #D4AF37; font-size: 1.4em;">${item.nome}</strong>`;

                article.innerHTML = `
                    <p>${nomeElemento}</p>
                    <p><strong>Criador:</strong> ${item.criador}</p>
                    <p>${item.ano}</p>
                    <p>${item.descricao}</p>
                `;
                cardConteiner.appendChild(article);
            }
        }
    }

    // Função para filtrar os dados com base na busca
    function iniciarBusca(evento) {
        evento.preventDefault(); // Impede o recarregamento da página
        const termoBusca = document.querySelector("#caixa-busca").value.toLowerCase();

        if (!termoBusca) {
            renderizarCards([]); // Se a busca for limpa, não mostra nenhum carro
            return;
        }

        // 1. Busca por correspondência exata do nome
        let dadosFiltrados = dados.filter(dado => dado.nome.toLowerCase() === termoBusca);

        // 2. Se não encontrou, busca por nomes que começam com o termo
        if (dadosFiltrados.length === 0) {
            dadosFiltrados = dados.filter(dado => dado.nome.toLowerCase().startsWith(termoBusca));
        }

        // 3. Se ainda não encontrou, faz a busca ampla (comportamento anterior)
        if (dadosFiltrados.length === 0) {
            const termosDaBusca = termoBusca.split(' ').filter(t => t.length > 0);
            dadosFiltrados = dados.filter(dado => {
            const textoCompleto = `${dado.nome.toLowerCase()} ${dado.descricao.toLowerCase()} ${dado.criador.toLowerCase()}`;
            return termosDaBusca.every(termo => textoCompleto.split(' ').some(palavra => palavra.startsWith(termo)));
        });
        }

        // Se não encontrar, faz a busca por aproximação
        if (dadosFiltrados.length === 0) {
            const melhoresResultados = dados.map(dado => {
                const distancia = levenshteinDistance(termoBusca, dado.nome.toLowerCase());
                return { ...dado, distancia };
            }).sort((a, b) => a.distancia - b.distancia);

            // Considera um bom resultado se a distância for pequena (ex: até 2 erros)
            if (melhoresResultados.length > 0 && melhoresResultados[0].distancia <= 2) {
                dadosFiltrados = [melhoresResultados[0]];
            }
        }

        renderizarCards(dadosFiltrados);
    }

    // Função para calcular a distância de Levenshtein (mede a similaridade entre duas strings)
    function levenshteinDistance(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
        for (let i = 0; i <= a.length; i += 1) {
            matrix[0][i] = i;
        }
        for (let j = 0; j <= b.length; j += 1) {
            matrix[j][0] = j;
        }
        for (let j = 1; j <= b.length; j += 1) {
            for (let i = 1; i <= a.length; i += 1) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator);
            }
        }
        return matrix[b.length][a.length];
    }

    // Inicia o processo buscando os dados
    buscarDados();

    // Adiciona o listener de evento ao formulário de busca
    const formBusca = document.querySelector("#form-busca");
    if (formBusca) {
        formBusca.addEventListener("submit", iniciarBusca);
    }
});
