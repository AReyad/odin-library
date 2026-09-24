const library = [];
const booksEle = document.querySelector('.books');
const bookForm = document.querySelector('#book-form');
const bookDialog = document.querySelector('#book-dialog');

function Book(title, author, pages, year, status) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to construct a book") 
    };

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.status = status;
};

Book.prototype.toggleStatus = function() {
    this.status = (this.status === "read") ? "not read" : "read";
}

function addBookToLibrary(title, author, pages, year, status) {
   const book = new Book(title, author, pages, year, status);

    library.push(book);
    return book;
};

function createBookElement(book) {
   const bookEle = document.createElement('div');
   bookEle.dataset.id = book.id;
   bookEle.insertAdjacentHTML('beforeend', `<h3>Title: ${book.title}</h3>`);
   bookEle.insertAdjacentHTML('beforeend', `<h3>Written by: ${book.author}</h3>`);
   bookEle.insertAdjacentHTML('beforeend', `<p>Publish year: ${book.year}</p>`);
   bookEle.insertAdjacentHTML('beforeend', `<p>Pages: ${book.pages}</p>`);
   bookEle.insertAdjacentHTML('beforeend', `<p class="book-status">Status: ${book.status}</p>`);
   bookEle.insertAdjacentHTML('beforeend', `<button class="change-book-status-btn" onclick="changeBookStatus(this)">Change read status</button>`);
   bookEle.insertAdjacentHTML('beforeend', `<button class="delete-book-btn" onclick="deleteBook(this)">Delete book</button>`);
   return bookEle;
};

function deleteBook(e) {
    const targetBookId = e.parentElement.dataset.id
    const targetBookIdx = library.findIndex((book) => book.id == targetBookId);
    library.splice(targetBookIdx, 1)
    e.parentElement.remove();
};

function changeBookStatus(e) {
    const bookElement = e.parentElement
    const targetBookId = bookElement.dataset.id
    const targetBook = library.find((book) => book.id == targetBookId);
    targetBook.toggleStatus()
    bookElement.querySelector('.book-status').textContent = `Status: ${targetBook.status}`
}

function displayBooks(library, books) {
    library.forEach((book) => {
        books.append(createBookElement(book))
    });
};

function submitBookForm() {
    const formData = Object.fromEntries(new FormData(bookForm));
    const bookStatus = formData["book-status"] ? "read" : "not read";
    const book = addBookToLibrary(formData["book-title"], formData["book-author"], formData["book-pages"], formData["book-publish-year"], bookStatus);;
    booksEle.append(createBookElement(book));
}

bookForm.addEventListener("submit", (e) => { 
    e.preventDefault();
    submitBookForm();
    bookDialog.close();
    e.target.reset();
})

displayBooks(library, booksEle)