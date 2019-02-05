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
  likedBook: false
}

// add a single book to the listPanel
function renderSingleBookTitle(book) {
  const li = document.createElement('li')
  li.textContent = book.title;
  li.className = "list-item"
  li.dataset.id = book.id;
  ul.appendChild(li);
}

// add multiple books to the listPanel
function renderMultipleBooks(books) {
  // listPanel.innerHTML = ''
  books.forEach(book => renderSingleBookTitle(book))
}

// get users who liked a book
function getUsers(book) {
  users = book.users.map(user => user.username)
}

// show a book's info in the show panel
function showBookInfo(book) {
  users = book.users.map(user => `<p><strong>${user.username}</strong></p>`).join("")
  showPanel.innerHTML =
    `<div>
      <h2>${book.title}</h2>
      <img src=${book.img_url}/></img>
      <p>${book.description}</p>
      ${users}
      <button class="like-button">Read Book</button>
    </div>`
}

// add an event listener for clicks
function addBookListener() {
  document.addEventListener('click', event => {
    if (event.target.className === 'list-item') {
      const id = parseInt(event.target.dataset.id)
      const foundBook = state.books.find(book => book.id === id)
      // debugger
      showBookInfo(foundBook)
      state.selectedBook = foundBook
    }
  })
}

// add an event listener for likes
function updateUsers () {
  document.querySelector('.like-button').remove()
  showPanel.innerHTML += '<p><strong>pouros</strong></p><button class="like-button">Read Book</button>'
}


function addToggleBookListener() {
  document.addEventListener('click', event => {
    if (event.target.className === 'like-button') {
      if (state.selectedBook.likedBook === true) {
        alert("You read this already!") }
        else {
      toggleLikeBook()
      updateUsers()
      }
    }
  })
}

// toggle like book
function toggleLikeBook() {
  state.selectedBook.likedBook = !state.selectedBook.selectedBook
  showBookInfo(state.selectedBook)
}

function initialize() {
  getBooks()
    .then(books => {
      state.books = books
      renderMultipleBooks(state.books)
    })
    addBookListener()
    addToggleBookListener()
}

// server stuff
function getBooks() {
  return fetch(bookURL)
    .then(resp => resp.json())
  }

function updateBook(book) {
  return fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(book)
  }).then(resp => resp.json())
}

initialize()
