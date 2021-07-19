const container = document.querySelector('#container');
const addNew = document.querySelector('#btn-add-new')
const btnClose = document.querySelector('#btn-close')
const btnAddbook = document.querySelector('#btn-add')

// Form input
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const pageForm = document.getElementById('page');
const statusForm = document.getElementById('status')

// Object constructor to create book
function Book(title, author, page, status) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.status = status;
}

Book.prototype.toggleStatus = function(condi) {
  if (condi) {
    this.status = false;
  } else {
    this.status = true;
  }
};

// Create a constructor function
function Library() {
  //Library Storage
  this.myLibrary = []
}

// Add new book to the library
Library.prototype.addNewBook = function(title, author, page, status) {
  let book = new Book(title, author, page, status);
  this.myLibrary.push(book)
};

// Function to shwow book in the HTML content
Library.prototype.showBook = function(item) { 
  // Create Element to the card
const div = document.createElement('div')
const h3 = document.createElement('h3');
const p1 = document.createElement('p');
const p2 = document.createElement('p')

const removeBtn = document.createElement('button')
const readBtn = document.createElement('button')

readBtn.classList.add('btn-read-status')

removeBtn.classList.add('btn')
removeBtn.classList.add('remove-btn')
removeBtn.innerHTML = 'Remove';

h3.textContent = `${item.title}`;
h3.classList.add("book-title");
p1.innerHTML = `Author: ${item.author}`;
p2.innerHTML = `Page: ${item.page}`;

this.toggleRead(!item.status, readBtn, item);

div.appendChild(h3);
div.appendChild(p1);
div.classList.add('card');
div.appendChild(p2);
div.appendChild(readBtn)
div.appendChild(removeBtn)
container.appendChild(div);

removeBtn.addEventListener('click', () => {
  const index = this.myLibrary.indexOf(item)
  this.myLibrary.splice(index, 1)
  updateLocalStorage()
  this.updateBook()
})

readBtn.addEventListener('click', () => {
  this.toggleRead(readBtn.classList.contains('read'), readBtn, item);
  updateLocalStorage()
  this.updateBook()
})
};

// Get book to show up in card
Library.prototype.updateBook = function() {
  this.clearBook();
  checkLocalStorage()
  for (let book of this.myLibrary) {
    this.showBook(book)
  }
}
 // Function to clear book from the self inorder to update the new book
Library.prototype.clearBook = function() {
  container.innerHTML = "";
};

// Set the 'Read' status
Library.prototype.toggleRead = function(condi, readBtn, item) {
  if (condi) {
    readBtn.classList.remove('read');
    readBtn.innerHTML = 'NOT READ';
    item.toggleStatus(condi);
  } else {
    readBtn.classList.add('read');
    readBtn.innerHTML = 'READ';
    item.toggleStatus(condi);
  }
};

const library = new Library()
// Run to check if book exist
library.updateBook()

// Empty the form
function emptyForm() {
  // Empty space
  titleForm.value = ''
  authorForm.value = ''
  pageForm.value = ''
}

// Click this button to show popup form
addNew.addEventListener('click', () => {
    document.getElementById("myForm").style.display = "block";
    emptyForm()
});

btnClose.addEventListener('click', () => {
  document.getElementById("myForm").style.display = "none";
})

// Button to create new book
btnAddbook.addEventListener('click', () => {
  if (titleForm.value === '' || authorForm.value === '') {
    alert('Please, fill all the fields')
    return
  }
  library.addNewBook(titleForm.value, authorForm.value, pageForm.value, statusForm.checked);
  updateLocalStorage();
  library.updateBook();
  document.getElementById("myForm").style.display = "none";
  emptyForm();
})

// Local Storage
// Set the local storage to be myLibrary
function updateLocalStorage() {
  // Assign array to the storage
  localStorage.setItem('mylibrary', JSON.stringify(library.myLibrary));
}

// Check if there is a local library that consist of library
function checkLocalStorage() { 
  if (localStorage.getItem('myibrary')) {
    library.myLibrary = JSON.parse(localStorage.getItem('library'))
  }
}
