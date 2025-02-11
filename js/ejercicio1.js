document.addEventListener("DOMContentLoaded", () => {
    let contador = 0;
    const contadorElemento = document.getElementById("contador");
    
    document.getElementById("añadir").addEventListener("click", () => {
        if (contador < 10) {
            contador++;
            contadorElemento.textContent = contador;
        } else {
            alert("El contador no puede ser mayor que 10.");
        }
    });

    document.getElementById("quitar").addEventListener("click", () => {
        if (contador > 0) {
            contador--;
            contadorElemento.textContent = contador;
        } else {
            alert("El contador no puede ser negativo.");
        }
    });

    document.getElementById("reset").addEventListener("click", () => {
        contador = 0;
        contadorElemento.textContent = contador;
    });
});
