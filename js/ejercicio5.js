  const API_URL = "https://crudcrud.com/api/58b3ca94ec4349de9ca8d4e1e4220903/libros"; 

  document.addEventListener("DOMContentLoaded", () => {
      fetchBooks();
      document.getElementById("book-form").addEventListener("submit", addBook);
  });
  
  // Obtener libros (GET)
  async function fetchBooks() {
      try {
          const response = await fetch(API_URL);
          const books = await response.json();
          console.log("Libros obtenidos del servidor:", books);
          displayBooks(books);
      } catch (error) {
          console.error("Error al obtener los libros:", error);
      }
  }
  
  // Mostrar libros en la lista
  function displayBooks(books) {
      const list = document.getElementById("book-list");
      list.innerHTML = "";
  
      books.forEach(book => {
          const li = document.createElement("li");
          li.innerHTML = `
              <span class="${book.read ? 'read' : ''}">${book.title}</span>
              <div>
                  <button class="read-btn" onclick="markAsRead('${book._id}', '${book.title}', ${book.read})">✔</button>
                  <button class="delete-btn" onclick="deleteBook('${book._id}')">✖</button>
              </div>
          `;
          list.appendChild(li);
      });
  }
  
  // Agregar libro (POST)
  async function addBook(event) {
      event.preventDefault();
      const title = document.getElementById("book-title").value.trim();
      if (!title) return;
  
      try {
          const response = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, read: false })
          });
  
          if (response.ok) {
              console.log("Libro agregado:", title);
              document.getElementById("book-title").value = "";
              fetchBooks();
          } else {
              console.error("Error al agregar el libro");
          }
      } catch (error) {
          console.error("Error en la petición POST:", error);
      }
  }
  
  // Marcar como leído (PUT)
  async function markAsRead(id, title, read) {
      try {
          const response = await fetch(`${API_URL}/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, read: !read })
          });
  
          if (response.ok) {
              console.log(`Libro actualizado (${title}) a estado: ${!read ? 'Leído' : 'No leído'}`);
              fetchBooks();
          } else {
              console.error("Error al actualizar el libro");
          }
      } catch (error) {
          console.error("Error en la petición PUT:", error);
      }
  }
  
  // Eliminar libro (DELETE)
  async function deleteBook(id) {
      try {
          const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  
          if (response.ok) {
              console.log(`Libro eliminado con ID: ${id}`);
              fetchBooks();
          } else {
              console.error("Error al eliminar el libro");
          }
      } catch (error) {
          console.error("Error en la petición DELETE:", error);
      }
  }
  