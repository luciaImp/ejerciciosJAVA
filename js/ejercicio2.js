document.addEventListener("DOMContentLoaded", () => {
    const dado1 = document.getElementById("dado1");
    const dado2 = document.getElementById("dado2");
    const sumaElemento = document.getElementById("suma");
    const botonJugar = document.getElementById("jugar");

    botonJugar.addEventListener("click", () => {
        const num1 = Math.floor(Math.random() * 6) + 1;
        const num2 = Math.floor(Math.random() * 6) + 1;
        const suma = num1 + num2;

        dado1.src = `img/dado${num1}.jpg`;
        dado2.src = `img/dado${num2}.jpg`;
        sumaElemento.textContent = suma;
    });
});
