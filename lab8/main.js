function showMessageIndex() {
    document.getElementById("hoverText").innerText = "1. Obrigado por passares!";
}

const resetMessageIndex = () => {
    document.getElementById("hoverText").innerText = "1. Passa por aqui!";
};


document.querySelectorAll('button[data-color]').forEach((button) => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;

        document.getElementById("pintaMe").style.color = color;
    });
});


function changeBoxColor() {
    const inputBox = document.getElementById("colorfulText");
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    inputBox.style.backgroundColor = randomColor;
}

let count = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;
document.getElementById("counter").innerText = count;

function incrementCounter() {
    count++;
    localStorage.setItem("counter", count);
    document.getElementById("counter").innerText = count;
}


window.onload = function () {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
}

function showGreeting() {
    const name = document.getElementById("userName").value;
    const age = document.getElementById("userAge").value;

    document.getElementById("greetingMessage").innerText = `Olá, o ${name} tem ${age}!`;

}

function changeBackgroundColor(element) {
    document.body.style.backgroundColor = element.value;
}



let autoCount = 0;

setInterval(function() {
    autoCount++;
    document.getElementById("autoCounter").innerText = autoCount;
}, 1000); 
