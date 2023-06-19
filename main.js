"use strict";

let books = [];
let bookId = 0;

function init() {
    checkStorage();
    form_toogle();
    change_book(shelf, 'click');
}
//-------------------------Form öffnet + Input Abfrage + Reset Input---------------------------------------------------------------------
function form_toogle() {
    let btn = document.getElementById('add_btn');
    let form = document.getElementById('form');
    let cancel = document.getElementById('cancel');
    let send = document.getElementById('send');
    btn.addEventListener('click', () => {
        form.classList.add('form_da');
    })
    cancel.addEventListener('click', () => {
        form.classList.remove('form_da');
        resetInputs()
    })
    send.addEventListener('click', () => {
        let title = document.getElementById("title").value;
        let autor = document.getElementById("autor").value;
        let pages = document.getElementById("pages").value;

        if (title === '' || autor === '' || pages === '') {
            alert("Input incomplete");
        } else {
            form.classList.remove('form_da');
            let book = new Book(title, autor, pages);
            books.push(book);
            addStorage()
            renderBook();
            resetInputs()
        }
    })
}
function resetInputs() {
    let title = document.getElementById("title");
    let autor = document.getElementById("autor");
    let pages = document.getElementById("pages");
    let checkbox = document.getElementById('box')
    title.value = "";
    autor.value = "";
    pages.value = "";
    checkbox.checked = false;
}
//---------------------------------------Konstruktor Buch erstellen------------------------------------------------------------------------
function Book(title, autor, pages) {
    this.title = title,
        this.autor = autor,
        this.pages = pages,
        this.info = check_read(),
        this.id = createId();
}
function createId() {
    return bookId++
}
function check_read() {
    let checkbox = document.getElementById('box');
    let check = false;
    if (checkbox.checked) {
        check = true;
    }
    return check;
}
//---------------------------------------Bücher werden gerendert für Overlay-----------------------------------------------------------------------------------
function renderBook() {
    let shelf = document.getElementById('shelf');
    shelf.innerHTML = "";
    books.forEach(book => {      
        let entry = document.createElement('div');
        entry.classList.add('buch');
        entry.setAttribute('data-id', book.id);

        let entry_title = document.createElement('h2')
        entry_title.textContent = book.title;
        entry.appendChild(entry_title);

        let entry_autor = document.createElement('p')
        entry_autor.textContent = book.autor;
        entry.appendChild(entry_autor);

        let entry_pages = document.createElement('p')
        entry_pages.textContent = "Pages: " + book.pages;
        entry.appendChild(entry_pages);

        let entry_read = document.createElement('p')
        entry_read.id = 'read_status';
        if (book.info === true) {
            entry_read.textContent = "Read: Yes";
        } else {
            entry_read.textContent = "Read: No";
        }
        entry.appendChild(entry_read)

        let btns = add_btns()
        entry.appendChild(btns);

        shelf.appendChild(entry);
        resetInputs()
    })

}
function add_btns() {
    let btnsContainer = document.createElement('div')
    btnsContainer.classList.add('knopf');

    let trash = document.createElement('div');
    trash.classList.add('btn');
    trash.textContent = "X"
    btnsContainer.appendChild(trash);

    let read = document.createElement('div');
    read.classList.add('btn');
    read.textContent = "O";
    btnsContainer.appendChild(read);
    return btnsContainer
}
//-------------------------------------Löschen/Ändern Abfrage für Buch------------------------------------------------------------------------------------
function change_book(rootElement, event) {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.textContent === 'X') {
                targetElement.parentElement.parentElement.remove();

                let id = targetElement.parentElement.parentElement.dataset.id;
                books.splice(id, 1);
            }
            if (targetElement.textContent === 'O') {
                let change = targetElement.parentElement.previousElementSibling;
                if (change.textContent === 'Read: Yes') {
                    change.textContent = "Read: No";
                } else {
                    change.textContent = "Read: Yes";
                }
            }
            targetElement = targetElement.parentElement;
            addStorage();
        }
    }, true)
}
//-----------------------------Storage---------------------------------------------------------------------------------------------------------------------
function addStorage() {
   localStorage.setItem('library', JSON.stringify(books));
   //bookId = 0;
}
function checkStorage() {
    if(localStorage.length > 0) {
        books = JSON.parse(localStorage.getItem('library'));
        bookId = books.length;
        renderBook();
    }else{
        books = [];
        bookId = 0;
    }
}


init()

