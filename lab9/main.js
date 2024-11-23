document.addEventListener("DOMContentLoaded", () => {
    const listaProdutos = document.getElementById('lista-produtos');
    carregarProdutos(produtos, listaProdutos);
    atualizarCestorCesto();
});

function carregarProdutos(produtos, listaProdutos) {
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.appendChild(artigo);
    });
}

function criarProduto(produto) {
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

    const botao = document.createElement('button');
    botao.textContent = " + Adicionar ao Cesto";
    botao.onclick = () => adicionarAoCesto(produto);

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(botao);

    return artigo;
}

function adicionarAoCesto(produto) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    atualizarCesto();
}

function removerDoCesto(index) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.splice(index, 1); 
    localStorage.setItem('cesto', JSON.stringify(cesto)); 
    atualizarCesto(); 
}

function atualizarCesto() {
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

        precoTotal += produto.price;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerDoCesto(index); 

        artigoCesto.appendChild(titulo);
        artigoCesto.appendChild(imagem);
        artigoCesto.appendChild(preco);
        artigoCesto.appendChild(botaoRemover);

        cestoContainer.appendChild(artigoCesto);
    });

    precoTotalContainer.textContent = `Preço Total: €${precoTotal.toFixed(2)}`;
}
