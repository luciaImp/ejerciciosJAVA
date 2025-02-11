document.addEventListener("DOMContentLoaded", () => {
    const palabraOcultaElem = document.getElementById("palabra-oculta");
    const intentosElem = document.getElementById("intentos");
    const letraInput = document.getElementById("letra");
    const probarBtn = document.getElementById("probar");
    const reiniciarBtn = document.getElementById("reiniciar");
    const mensajeElem = document.getElementById("mensaje");
    const letrasIncorrectasElem = document.getElementById("letras-incorrectas");
  
    let palabra = "";
    let palabraOculta = [];
    let intentos = 6;
    let letrasIncorrectas = []; // Array para almacenar las letras falladas
  
    // Función para inicializar o reiniciar el juego
    async function inicializarJuego() {
      // Reiniciar variables y mensajes
      intentos = 6;
      letrasIncorrectas = [];
      palabraOculta = [];
      mensajeElem.textContent = "";
      letrasIncorrectasElem.textContent = "";
      letraInput.value = "";
      probarBtn.disabled = false;
      reiniciarBtn.style.display = "none";
  
      // Obtener palabra aleatoria desde la API
      try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
        const data = await response.json();
        palabra = data[0].toLowerCase();
        palabraOculta = Array(palabra.length).fill("_");
        palabraOcultaElem.textContent = palabraOculta.join(" ");
        intentosElem.textContent = intentos;
      } catch (error) {
        mensajeElem.textContent = "Error al obtener la palabra.";
      }
    }
  
    // Inicializamos el juego al cargar la página
    inicializarJuego();
  
    probarBtn.addEventListener("click", () => {
      const letra = letraInput.value.toLowerCase();
      letraInput.value = "";
  
      // Validación de entrada
      if (!letra || letra.length !== 1 || !/^[a-z]$/.test(letra)) {
        mensajeElem.textContent = "Introduce una letra válida.";
        return;
      }
  
      // Comprobar si la letra ya ha sido probada (correcta o incorrecta)
      if (palabraOculta.includes(letra) || letrasIncorrectas.includes(letra)) {
        mensajeElem.textContent = "Ya has probado esa letra.";
        return;
      }
  
      let acierto = false;
      // Verificar si la letra está en la palabra y actualizar la palabra oculta
      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
          palabraOculta[i] = letra;
          acierto = true;
        }
      }
  
      // Si la letra no está, se añade a las letras incorrectas y se reduce el número de intentos
      if (!acierto) {
        letrasIncorrectas.push(letra);
        intentos--;
        letrasIncorrectasElem.textContent = letrasIncorrectas.join(", ");
      }
  
      // Actualizar la interfaz
      palabraOcultaElem.textContent = palabraOculta.join(" ");
      intentosElem.textContent = intentos;
      mensajeElem.textContent = "";
  
      // Comprobar condiciones de victoria o derrota
      if (!palabraOculta.includes("_")) {
        mensajeElem.textContent = "¡Ganaste! La palabra era: " + palabra;
        probarBtn.disabled = true;
        reiniciarBtn.style.display = "inline-block";
      } else if (intentos === 0) {
        mensajeElem.textContent = "Perdiste. La palabra era: " + palabra;
        probarBtn.disabled = true;
        reiniciarBtn.style.display = "inline-block";
      }
    });
  
    // Evento para reiniciar el juego
    reiniciarBtn.addEventListener("click", () => {
      inicializarJuego();
    });
  });
  