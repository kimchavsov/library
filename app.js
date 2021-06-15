const myLibrary = [];
const container = document.querySelector('#container');
const addNew = document.querySelector('#btn-add-new')
const btnClose = document.querySelector('#btn-close')
const btnAddbook = document.querySelector('#btn-add')

// Form input
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const pageForm = document.getElementById('page');

// Object constructor to create book
function Book(title, author, page) {
  this.title = title;
  this.author = author;
  this.page = page;
}

// Add new book to the library
function addNewBook(title, author, page) {
  let book = new Book(title, author, page);
  myLibrary.push(book)
  return book
}

// Function to shwow book in the HTML content
function showBook(item) { 
    // Create Element to the card
  const div = document.createElement('div')
  const h3 = document.createElement('h3');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p')
  
  const removeBtn = document.createElement('button')
  removeBtn.classList.add('btn')
  removeBtn.classList.add('remove-btn')
  removeBtn.innerHTML = 'Remove';

  h3.textContent = `${item.title}`;
  h3.classList.add("book-title");
  p1.innerHTML = `Author: ${item.author}`;
  p2.innerHTML = `Page: ${item.book}`;

  div.appendChild(h3);
  div.appendChild(p1);
  div.classList.add('card');
  div.appendChild(p2);
  div.appendChild(removeBtn)
  container.appendChild(div);

  removeBtn.addEventListener('click', () => {
    const index = myLibrary.indexOf(item)
    myLibrary.splice(index, 1)
    updateBook()
  })
}

// Get book to show up in card
function updateBook() {
  clearBook();
  for (let book of myLibrary) {
    showBook(book)
  }
}

// Function to clear book from the self inorder to update the new book
function clearBook() {
  container.innerHTML = "";
}

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
  const book = addNewBook(titleForm.value, authorForm.value, pageForm.value);
  remove = updateBook()
  document.getElementById("myForm").style.display = "none";
  emptyForm()
})