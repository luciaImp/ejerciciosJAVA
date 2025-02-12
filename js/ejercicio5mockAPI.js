const API_URL = 'https://67ac82963f5a4e1477dacf5d.mockapi.io/libros/libros';
const booksList = document.getElementById('booksList');
const bookForm = document.getElementById('bookForm');

// GET - Obtener y mostrar libros
async function getBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        console.log('Libros obtenidos:', books);
        displayBooks(books);
    } catch (error) {
        console.error('Error al obtener libros:', error);
    }
}

// Mostrar libros en HTML
function displayBooks(books) {
    booksList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.className = `book-item ${book.leido ? 'leido' : ''}`;
        li.innerHTML = `
            <div>
                <h3>${book.titulo}</h3>
                <p>Autor: ${book.autor}</p>
                <p>Estado: ${book.leido ? 'Leído' : 'No leído'}</p>
            </div>
            <div class="actions">
                <button class="toggle-read" data-id="${book.id}">
                    ${book.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                </button>
                <button class="delete" data-id="${book.id}">Eliminar</button>
            </div>
        `;
        booksList.appendChild(li);
    });
}

// POST - Añadir nuevo libro
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newBook = {
        titulo: document.getElementById('title').value,
        autor: document.getElementById('author').value,
        leido: false
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
        
        if(response.ok) {
            bookForm.reset();
            getBooks();
        }
    } catch (error) {
        console.error('Error al añadir libro:', error);
    }
});

// PUT - Marcar como leído/no leído
// DELETE - Eliminar libro
booksList.addEventListener('click', async (e) => {
    if(e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            getBooks();
        } catch (error) {
            console.error('Error al eliminar libro:', error);
        }
    }
    
    if(e.target.classList.contains('toggle-read')) {
        const id = e.target.dataset.id;
        const currentStatus = e.target.textContent.includes('no leído');
        
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ leido: !currentStatus })
            });
            getBooks();
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    }
});

// Inicializar
getBooks();