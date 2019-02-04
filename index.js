// document.addEventListener("DOMContentLoaded", function() {});
const bookURL = "http://localhost:3000/books";
const listPanel = document.querySelector('#list-panel');
const showPanel = document.querySelector('#show-panel');
const ul = document.querySelector('#list');

const getBooks = function() {
  return fetch(bookURL)
    .then(resp => resp.json())
    .then(books => {
      books.forEach(renderSingleBookTitle)
    })
    // .then(books => {
    //   books.forEach(renderSingleBookImage)
    // })
  }

const renderSingleBookTitle = function(book) {
  const li = document.createElement('li')
  li.textContent = book.title;
  ul.appendChild(li);
}



// const createBookCoverImage = function(book) {
//   const image = document.createElement('img');
//   img.src = book.img_url;
//
// }

const clickBookTitleHandler = function() {
  const showHeader = document.createElement('h2');
  showHeader.innerText = event.target.innerText;
  // showHeader.style.textAlign = center;
  showPanel.appendChild(showHeader);
  return fetch(bookURL)
    .then(resp => resp.json())
    .then(books => {
      books.forEach(showBookImage)})


  // if showHeader.innerText != "";
  // showHeader.remove();
}

const showBookImage = function(book) {
  const bookCoverImage = document.createElement('img');
  bookCoverImage.src = book.img_url
  showPanel.appendChild(bookCoverImage)

}

const showDescription = function(book) {
  const bookDescription = document.createElement('p');
  bookDescription.innerText = book.description
  showPanel.appendChild(bookDescription)
}

  // const createBookEl(book) {
ul.addEventListener('click', clickBookTitleHandler)
// }
ul.addEventListener('click', showBookImage)

ul.addEventListener('click', showDescription)


getBooks()


// const createButton = function() =>
