let myLibrary = [];
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

// Add new book to the library
function addNewBook(title, author, page, status) {
  let book = new Book(title, author, page, status);
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
  const readBtn = document.createElement('button')
  
  readBtn.classList.add('btn-read-status')

  removeBtn.classList.add('btn')
  removeBtn.classList.add('remove-btn')
  removeBtn.innerHTML = 'Remove';

  h3.textContent = `${item.title}`;
  h3.classList.add("book-title");
  p1.innerHTML = `Author: ${item.author}`;
  p2.innerHTML = `Page: ${item.page}`;

  toggleRead(!item.status, readBtn, item);

  div.appendChild(h3);
  div.appendChild(p1);
  div.classList.add('card');
  div.appendChild(p2);
  div.appendChild(readBtn)
  div.appendChild(removeBtn)
  container.appendChild(div);

  removeBtn.addEventListener('click', () => {
    const index = myLibrary.indexOf(item)
    myLibrary.splice(index, 1)
    updateLocalStorage()
    updateBook()
  })

  readBtn.addEventListener('click', () => {
    toggleRead(readBtn.classList.contains('read'), readBtn, item);
  })
}

// Set the 'Read' status
function toggleRead(condi, readBtn, item) {
  if (condi) {
    readBtn.classList.remove('read');
    readBtn.innerHTML = 'NOT READ';
    item.status = false;
  } else {
    readBtn.classList.add('read');
    readBtn.innerHTML = 'READ';
    item.status = true
  }
  return readBtn;
}

// Get book to show up in card
function updateBook() {
  clearBook();
  checkLocalStorage()
  for (let book of myLibrary) {
    showBook(book)
  }
}

// Run to check if book exist
updateBook()

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
  if (titleForm.value === '' || authorForm.value === '') {
    alert('Please, fill all the fields')
    return
  }
  const book = addNewBook(titleForm.value, authorForm.value, pageForm.value, statusForm.checked);
  updateLocalStorage();
  updateBook();
  document.getElementById("myForm").style.display = "none";
  emptyForm();
})

// Local Storage
// Set the local storage to be myLibrary
function updateLocalStorage() {
  // Assign array to the storage
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

// Check if there is a local library that consist of library
function checkLocalStorage() { 
  if (localStorage.getItem('library')) {
    myLibrary = JSON.parse(localStorage.getItem('library'))
  }
}
