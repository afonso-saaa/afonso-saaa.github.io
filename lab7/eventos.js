function showMessageEventos() {
    document.getElementById("hoverText").innerText = "O Mágico português do Manchester United";
}

function resetMessageEventos() {
    document.getElementById("hoverText").innerText = "Médio Centro português do Manchester United";
}

const colors = ['red', 'yellow', 'orange','#f0f0f0'];
let currentColorIndex = 0;

function changeBackgroundColor() {
    document.body.style.backgroundColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

document.addEventListener('dblclick', changeBackgroundColor);

document.addEventListener("keydown", function(event) {
    document.querySelectorAll("h1, h2").forEach(function(header) {
        header.style.fontSize = "3em"; // Aumentar o tamanho da fonte
    });
});

document.addEventListener("keyup", function(event) {
    document.querySelectorAll("h1, h2").forEach(function(header) {
        header.style.fontSize = ""; // Voltar ao tamanho normal
    });
});
