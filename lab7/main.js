function showMessageIndex() {
    document.getElementById("hoverText").innerText = "1. Obrigado por passares!";
}

function resetMessageIndex() {
    document.getElementById("hoverText").innerText = "1. Passa por aqui!";
}

function showMessageEventos() {
    document.getElementById("hoverText").innerText = "O Mágico português do Manchester United";
}

function resetMessageEventos() {
    document.getElementById("hoverText").innerText = "Médio Centro português do Manchester United";
}

function changeColor(color) {
    document.getElementById("pintaMe").style.color = color;
}

function changeBoxColor() {
    const inputBox = document.getElementById("colorfulText");
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    inputBox.style.backgroundColor = randomColor;
}

function changeBackgroundColor() {
    const color = document.getElementById("colorInput").value.toLowerCase();
    document.body.style.backgroundColor = color;
}

let count = 0;
function incrementCounter() {
    count++;
    document.getElementById("counter").innerText = count;
}

document.body.addEventListener("mousemove", function(event) {
    const width = window.innerWidth;
    
    const ratio = event.clientX / width;
    
    const greenAndBlue = Math.floor(255 * ratio);

    document.body.style.backgroundColor = `rgb(255, ${greenAndBlue}, ${greenAndBlue})`;
});
