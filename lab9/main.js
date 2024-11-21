document.addEventListener("DOMContentLoaded", function () {
    const listaProdutos = document.getElementById("produto-lista");

    // A lista de produtos é carregada do arquivo produtos.js
    if (typeof produtos === 'undefined') {
        console.error("Arquivo produtos.js não carregado corretamente.");
        return;
    }

    // Exibe todos os produtos na página
    produtos.forEach(produto => {
        const artigoProduto = document.createElement("article");
        artigoProduto.classList.add("produto");

        artigoProduto.innerHTML = `
    <h3>${produto.title}</h3>
    <div class="imagem-preco">
        <img src="${produto.image}" alt="${produto.title}">
        <p><strong>${produto.price.toFixed(2)} €</strong></p>
    </div>
    <p class="descricao">${produto.description}</p>
    <button class="adicionar-cesto" data-id="${produto.id}" data-preco="${produto.price}">+ Adicionar ao Cesto</button>
`;


        listaProdutos.appendChild(artigoProduto);
    });

    // Função para adicionar produtos ao cesto
    let cesto = [];
    const totalCestoElement = document.getElementById("total-cesto");
    const itensCestoElement = document.getElementById("itens-cesto");

    document.querySelectorAll(".adicionar-cesto").forEach(botao => {
        botao.addEventListener("click", function () {
            const idProduto = this.getAttribute("data-id");
            const precoProduto = parseFloat(this.getAttribute("data-preco"));
            const produto = produtos.find(p => p.id == idProduto);

            // Adiciona o produto ao cesto
            cesto.push(produto);
            atualizarCesto();
        });
    });

    // Função para atualizar o cesto de compras
    function atualizarCesto() {
        // Limpa a lista de itens no cesto
        itensCestoElement.innerHTML = "";

        // Adiciona os produtos no cesto
        let total = 0;
        cesto.forEach(produto => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${produto.title} - ${produto.price.toFixed(2)} €
                <button class="remover-produto" data-id="${produto.id}">Remover</button>
            `;
            itensCestoElement.appendChild(li);
            total += produto.price;
        });

        // Atualiza o total do cesto
        totalCestoElement.textContent = `${total.toFixed(2)} €`;

        // Atualiza os eventos de remover produto do cesto
        document.querySelectorAll(".remover-produto").forEach(botao => {
            botao.addEventListener("click", function () {
                const idProduto = this.getAttribute("data-id");
                cesto = cesto.filter(produto => produto.id != idProduto);
                atualizarCesto();
            });
        });
    }

    
});
