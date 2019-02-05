// document.addEventListener("DOMContentLoaded", function() {});

//save fetch URL
const bookURL = "http://localhost:3000/books";

// get what you need from the page
const listPanel = document.querySelector('#list-panel');
const showPanel = document.querySelector('#show-panel');
const ul = document.querySelector('#list');

// use state to keep track of any piece of data our app will need to function
const state = {
  books: [],
  selectedBook: null,
  users: [],
  likes: []
}

// add a single book to the listPanel
function renderSingleBookTitle(book) {
  const li = document.createElement('li')
  li.textContent = book.title;
  li.className = "list-item"
  ul.appendChild(li);
}

// add multiple books to the listPanel
function renderMultipleBooks(books) {
  // listPanel.innerHTML = ''
  books.forEach(book => renderSingleBookTitle(book))
}

// show a book's info in the show panel
function showBookInfo(book) {
  showPanel.innerHTML =
    `<div>
      <h2 data-id=${book.id}>${book.title}</h2>
      <img src=${book.img_url}/>
      <p>${book.description}</p>
    </div>`
}

// add an event listener for clicks
function addBookListener() {
  document.addEventListener('click', event => {
    if (event.target.className === 'list-item') {
      const id = parseInt(event.target.dataset.id)
      const foundBook = state.books.find(book => book.id === id)
      showBookInfo(foundBook)
      state.selectedBook = foundBook
    }
  })
}

function initialize() {
  getBooks()
    .then(books => {
      state.books = books
      renderMultipleBooks(state.books)
    })
    addBookListener()
}

// server stuff
function getBooks() {
  return fetch(bookURL)
    .then(resp => resp.json())
    // .then(books => {
    //   books.forEach(renderSingleBookTitle)
  }

function updateBook(book) {
  return fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(book)
  }).then(resp => resp.json())
}

initialize()



// const clickBookTitleHandler = function() {
//   // const showHeader = document.createElement('h2');
//   // showHeader.innerText = event.target.innerText;
//   // showHeader.style.textAlign = center;
//   showPanel.appendChild(showHeader);
//   return fetch(bookURL)
//     .then(resp => resp.json())
//     .then(books => {
//       books.forEach(showBookImage)})



//
// ul.addEventListener('click', clickBookTitleHandler)
// // }
// ul.addEventListener('click', showBookImage)
//
// ul.addEventListener('click', showDescription)
//
//
// getBooks()
