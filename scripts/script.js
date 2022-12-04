//getting all the DOM data from the user
const title = document.getElementById("title");
const year = document.getElementById("year");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const tbody = document.getElementById("data");
const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");

let myLibrary = [];

class Book {
  constructor(title, year, author, pages, read) {
    this.title = title;
    this.year = year;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }

  get pages() {
    return this._pages;
  }

  set pages(value) {
    this._pages = value;
  }

  get read() {
    return this._read;
  }

  set read(value) {
    this._read = value;
  }

  toggleRead() {
    this._read = !this._read;
  }
}

function addBookToLibrary(title, year, author, pages, read) {
  let newBook = new Book(title, year, author, pages, read);
  myLibrary.push(newBook);
}

function addBooksToTable() {
  for (let i = 0; i < myLibrary.length; i++){   
    tr = tbody.insertRow()   
    tr.dataset.number = i 
    td = tr.insertCell()
    td.innerHTML = myLibrary[i].title
    td = tr.insertCell()
    td.innerHTML = myLibrary[i].year
    td = tr.insertCell()
    td.innerHTML = myLibrary[i].author
    td = tr.insertCell()
    td.innerHTML = myLibrary[i].pages
    td = tr.insertCell()
    let icon = document.createElement("i");
    myLibrary[i].read ? icon.className = "checkedIcon" : icon.className = "deleteIcon"
    td.append(icon); 
    icon.addEventListener("click", changeIcon)
    td = tr.insertCell()
    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("deleteIcon")
    td.append(deleteIcon); 
    deleteIcon.addEventListener("click", DeleteRowFunction);
  }  
}

function DeleteRowFunction(e) {
  // event.target will be the input element.
  let td = e.target.parentNode; 
  let tr = td.parentNode; // the row to be removed
  myLibrary.splice(tr.dataset.number, 1);
  tr.parentNode.removeChild(tr);
}

function changeIcon(e) {
  // store the position of the called array
  let bookPosition = e.target.parentNode.parentNode.dataset.number
  console.log(bookPosition)
  if (e.target.classList == "checkedIcon"){
    e.target.classList.remove("checkedIcon")
    e.target.classList.add("deleteIcon")
  } else {
    e.target.classList.remove("deleteIcon")
    e.target.classList.add("checkedIcon")
  }
  myLibrary[bookPosition].read = !myLibrary[bookPosition].read;
}

function clear() {
  title.value = " "
  year.value = " "
  author.value = " "
  pages.value = " "
  read.checked = false
}

submitBtn.addEventListener("click", () => {
  //delete every row to not duplicate it later
  while(tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }
    addBookToLibrary(title.value, year.value, author.value, pages.value, read.checked)
    addBooksToTable()
    clear()
});
