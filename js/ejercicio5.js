// Reemplaza 'YOUR_UNIQUE_API_KEY' con la clave que te proporciona crudcrud
const API_URL = "https://crudcrud.com/api/";

// Al cargar el DOM se ejecuta la función para obtener los libros y se añade el listener al formulario
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  // Listener para el formulario de agregar libro
  document.getElementById("add-book-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addBook();
  });
});

/**
 * Función para obtener los libros desde la API (GET)
 */
async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();
    console.log("Libros obtenidos (GET):", books); // Mostrar JSON en la consola

    renderBooks(books);
  } catch (error) {
    console.error("Error al obtener libros:", error);
  }
}

/**
 * Función para renderizar los libros en el HTML
 * @param {Array} books - Array de objetos libro
 */
function renderBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Limpiar la lista antes de renderizar

  books.forEach(book => {
    // Crear elemento de lista para cada libro
    const li = document.createElement("li");

    // Span para mostrar el título del libro
    const titleSpan = document.createElement("span");
    titleSpan.className = "book-title";
    titleSpan.textContent = book.title;
    // Si el libro está marcado como leído, se muestra con tachado
    if (book.read) {
      titleSpan.style.textDecoration = "line-through";
    }
    li.appendChild(titleSpan);

    // Div contenedor de botones de acción
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "book-actions";

    // Botón para marcar como leído (PUT)
    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "Leído" : "Marcar como leído";
    // Si ya está leído, se deshabilita el botón
    if (book.read) {
      readButton.disabled = true;
    }
    readButton.addEventListener("click", () => {
      markAsRead(book);
    });
    actionsDiv.appendChild(readButton);

    // Botón para eliminar el libro (DELETE)
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      deleteBook(book);
    });
    actionsDiv.appendChild(deleteButton);

    li.appendChild(actionsDiv);
    bookList.appendChild(li);
  });
}

/**
 * Función para agregar un nuevo libro (POST)
 */
async function addBook() {
  const titleInput = document.getElementById("title");
  const title = titleInput.value.trim();
  
  if (!title) {
    alert("Por favor ingresa un título para el libro.");
    return;
  }

  // Objeto libro con la propiedad 'read' iniciada en false
  const newBook = {
    title: title,
    read: false
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBook)
    });

    if (!response.ok) {
      throw new Error("Error al agregar el libro");
    }

    // Limpiar el input después de agregar el libro
    titleInput.value = "";
    // Actualizar la lista de libros
    fetchBooks();
  } catch (error) {
    console.error("Error al agregar libro:", error);
  }
}

/**
 * Función para marcar un libro como leído (PUT)
 * @param {Object} book - Objeto libro a actualizar
 */
async function markAsRead(book) {
  // Se crea el objeto actualizado sin el _id (ya que crudcrud requiere el objeto completo sin _id)
  const updatedBook = {
    title: book.title,
    read: true
  };

  try {
    const response = await fetch(`${API_URL}/${book._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedBook)
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el libro");
    }

    // Actualizar la lista después de la modificación
    fetchBooks();
  } catch (error) {
    console.error("Error al marcar libro como leído:", error);
  }
}

/**
 * Función para eliminar un libro (DELETE)
 * @param {Object} book - Objeto libro a eliminar
 */
async function deleteBook(book) {
  try {
    const response = await fetch(`${API_URL}/${book._id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el libro");
    }

    // Actualizar la lista después de eliminar el libro
    fetchBooks();
  } catch (error) {
    console.error("Error al eliminar libro:", error);
  }
}
