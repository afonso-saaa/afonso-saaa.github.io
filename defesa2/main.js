let produtosEmEstoque = [];
let descricoesVisiveis = true;

document.addEventListener("DOMContentLoaded", () => {
    const listaProdutosEl = document.getElementById('lista-produtos');
    const filtroCategorias = document.getElementById('filtro-categorias');
    const ordenacaoPreco = document.getElementById('ordenar-preco');
    const buscaProduto = document.getElementById('pesquisa-produto');
    const btnFinalizarCompra = document.getElementById("botao-compra");

    carregarCategoriasDisponiveis();
    carregarProdutosDeEstoque();

    filtroCategorias.addEventListener('change', () => {
        const categoriaEscolhida = filtroCategorias.value;
        filtrarProdutosPorCategoria(categoriaEscolhida);
    });

    ordenacaoPreco.addEventListener('change', () => {
        const criterioOrdenacao = ordenacaoPreco.value;
        ordenarProdutosPorPreco(criterioOrdenacao);
    });

    buscaProduto.addEventListener('input', () => {
        const termoPesquisa = buscaProduto.value.trim().toLowerCase();
        filtrarProdutosPorPesquisa(termoPesquisa);
    });

    btnFinalizarCompra.addEventListener("click", processarCompra);

    exibirCestoDeCompras();
});

function ordenarProdutosPorPreco(criterio) {
    const listaProdutosEl = document.getElementById('lista-produtos');
    let produtosParaExibir = [...produtosEmEstoque];

    if (criterio === "none") {
        produtosParaExibir = produtosEmEstoque;
    }else if(criterio === "asc"){
        produtosParaExibir.sort((a,b) => a.price - b.price);
    }else if(criterio === "desc"){
        produtosParaExibir.sort((a,b) => b.price - a.price);
    }else if(criterio === "ratings-asc"){
        produtosParaExibir.sort((a,b) => a.rating.count - b.rating.count);
    }else if(criterio === "ratings-desc"){
        produtosParaExibir.sort((a,b) => b.rating.count - a.rating.count);
    }

    renderizarListaProdutos(produtosParaExibir);
}

function filtrarProdutosPorPesquisa(termo) {
    if (!termo) {
        renderizarListaProdutos(produtosEmEstoque);
    } else {
        const produtosFiltrados = produtosEmEstoque.filter(produto =>
            produto.title.toLowerCase().includes(termo)
        );
        renderizarListaProdutos(produtosFiltrados);
    }
}

async function carregarCategoriasDisponiveis() {

    const categorias = await obterCategoriasDaAPI();
    popularCategoriasNoSelect(categorias);

}

async function carregarProdutosDeEstoque() {

    const produtos = await obterProdutosDaAPI();
    produtosEmEstoque = [...produtos];
    renderizarListaProdutos(produtos);

}

function popularCategoriasNoSelect(categorias) {
    const filtroCategorias = document.getElementById('filtro-categorias');
    filtroCategorias.innerHTML = '';

    const opcaoTodas = document.createElement('option');
    opcaoTodas.value = '';
    opcaoTodas.textContent = "Todas as categorias";
    filtroCategorias.appendChild(opcaoTodas);

    categorias.forEach(categoria => {
        const opcao = document.createElement('option');
        opcao.value = categoria;
        opcao.textContent = categoria;
        filtroCategorias.appendChild(opcao);
    });
}

async function obterCategoriasDaAPI() {
    const url = "https://deisishop.pythonanywhere.com/categories/";
    const resposta = await fetch(url);
    
    const categorias = await resposta.json();
    return categorias.map(categoria => categoria.trim());
}

async function obterProdutosDaAPI() {
    const url = "https://deisishop.pythonanywhere.com/products/";
    const resposta = await fetch(url);
    
    const produtos = await resposta.json();
    return produtos.map(produto => ({
        ...produto,
        category: produto.category.trim()
    }));
}

function renderizarListaProdutos(produtos) {
    const listaProdutosEl = document.getElementById("lista-produtos");
    listaProdutosEl.innerHTML = '';

    if (!produtos.length) {
        listaProdutosEl.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    produtos.forEach(produto => {
        const artigo = criarElementoProduto(produto);
        listaProdutosEl.appendChild(artigo);
    });

    listaProdutosEl.dataset.produtos = JSON.stringify(produtos);
}

function filtrarProdutosPorCategoria(categoriaSelecionada) {
    let produtosFiltrados;
    if (!categoriaSelecionada) {
        produtosFiltrados = produtosEmEstoque;
    } else {
        produtosFiltrados = produtosEmEstoque.filter(produto =>
            produto.category === categoriaSelecionada.trim()
        );
    }
    renderizarListaProdutos(produtosFiltrados);
}

function criarElementoProduto(produto) {
    const artigo = document.createElement('article');

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    imagem.width = 150;

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = "+ Adicionar ao Cesto";
    botaoAdicionar.onclick = () => adicionarProdutoAoCesto(produto);

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(botaoAdicionar);

    return artigo;
}

function adicionarProdutoAoCesto(produto) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    exibirCestoDeCompras();
}

function removerProdutoDoCesto(index) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.splice(index, 1);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    exibirCestoDeCompras();
}

function exibirCestoDeCompras() {
    const cestoContainer = document.getElementById('produtos-cesto');
    const precoTotalContainer = document.getElementById('preco-total');
    cestoContainer.innerHTML = '';
    let precoTotal = 0;

    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];

    cesto.forEach((produto, index) => {
        const artigoCesto = document.createElement('article');

        const imagem = document.createElement('img');
        imagem.src = produto.image;
        imagem.alt = produto.title;
        imagem.width = 100;

        const titulo = document.createElement('h3');
        titulo.textContent = produto.title;

        const preco = document.createElement('p');
        preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;
        
        const rate = document.createElement('p');
        rate.innerHTML = `<strong>Preço:</strong> €${produto.rating.count}`;

        precoTotal += produto.price;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = "- Remover";
        botaoRemover.onclick = () => removerProdutoDoCesto(index);
        botaoRemover.classList.add('botao-remover'); 

        artigoCesto.appendChild(titulo);
        artigoCesto.appendChild(imagem);
        artigoCesto.appendChild(preco);
        artigoCesto.appendChild(botaoRemover);

        cestoContainer.appendChild(artigoCesto);
    });

    precoTotalContainer.textContent = `Preço Total: €${precoTotal.toFixed(2)}`;
}

async function processarCompra() {
    const estudante = document.getElementById("estudante").checked;
    const cupao = document.getElementById("cupao").value.trim();
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    const idsProdutos = cesto.map(produto => produto.id);

    if (idsProdutos.length === 0) {
        alert("Adiciona produtos antes de finalizares a compra!");
        return;
    }

    const pedido = {
        products: idsProdutos,
        student: estudante,
        coupon: cupao
    };


    const resposta = await fetch("https://deisishop.pythonanywhere.com/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    });

    const resultado = await resposta.json();
    exibirResultadoCompra(resultado);

}

function limparCesto(){
    localStorage.removeItem('cesto');
    exibirCestoDeCompras();
}
document.getElementById('limpar-cesto').addEventListener('click',limparCesto);

function desapareceDescricoes(){
    const descricoes = document.querySelectorAll('#lista-produtos p');

    descricoes.forEach(descricao=>{
        if(descricoesVisiveis){
            descricao.style.display = 'none';
        }else{
            descricao.style.display = 'block';
        }
    });
    descricoesVisiveis = !descricoesVisiveis;
    document.getElementById('toggle-descricoes').textContent=descricoesVisiveis?"Esconde Descricoes" : "Mostra Descricoes";

}
document.getElementById('toggle-descricoes').addEventListener('click',desapareceDescricoes);


function filtrarProdutosPorPesquisa(termo) {
    if (!termo) {
        renderizarListaProdutos(produtosEmEstoque);
    } else {
        const produtosFiltrados = produtosEmEstoque.filter(produto =>
            produto.title.toLowerCase().includes(termo) ||
            produto.description.toLowerCase().includes(termo)
        );
        renderizarListaProdutos(produtosFiltrados);
    }
}

async function processarCompra() {
    const estudante = document.getElementById("estudante").checked;
    const cupao = document.getElementById("cupao").value.trim();
    const nomeComprador = document.getElementById("nome-comprador").value.trim();
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    const idsProdutos = cesto.map(produto => produto.id);

    if (!nomeComprador) {
        alert("Por favor, insira o seu nome.");
        return;
    }

    if (idsProdutos.length === 0) {
        alert("Adicione produtos antes de finalizar a compra!");
        return;
    }

    const pedido = {
        name: nomeComprador,
        products: idsProdutos,
        student: estudante,
        coupon: cupao
    };

    const resposta = await fetch("https://deisishop.pythonanywhere.com/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    });

    const resultado = await resposta.json();
    exibirResultadoCompra(resultado);
}


function exibirResultadoCompra(resultado) {
    const resultadoCompraContainer = document.getElementById("resultado-compra");
    resultadoCompraContainer.innerHTML = '';

    if (resultado.error) {
        resultadoCompraContainer.innerHTML = `<p style="color: red;">Erro: ${resultado.error}</p>`;
    } else {
        resultadoCompraContainer.innerHTML = `
            <p><strong>Referência de Pagamento:</strong> ${resultado.reference}</p>
            <p><strong>Total a Pagar:</strong> €${resultado.totalCost}</p>
        `;
    }
}
