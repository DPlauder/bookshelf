"use strict";

let books = [];

function init() {
    form_toogle();
    change_book(shelf, 'click');
    checkStorage();
}
//+-------------------------Form öffnet + Input Abfrage + Reset Input---------------------------------------------------------------------
function form_toogle() {
    let btn = document.getElementById('add_btn');
    let form = document.getElementById('form');
    let cancel = document.getElementById('cancel');
    let send = document.getElementById('send');
    btn.addEventListener('click', () => {
        form.classList.add('form_da');
    })
    cancel.addEventListener('click', () => {
        console.log("cancel");
        form.classList.remove('form_da');
        resetInputs()
    })
    send.addEventListener('click', () => {
        let title = document.getElementById("title").value;
        let autor = document.getElementById("autor").value;
        let pages = document.getElementById("pages").value;
        
        if(title === '' || autor === '' || pages === ''){
            alert("Input incomplete");
        } else {
            form.classList.remove('form_da');
            let book = new Book(title, autor, pages);
            addStorage()
            resetInputs()
        }
    })
}
function resetInputs(){
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
    this.pages = pages
    let book = [title, autor, pages];
    books.push(book);
    addBook();
    resetInputs()
}
//---------------------------------------Buch wird gerendert für Overlay-----------------------------------------------------------------------------------
function addBook(lib) {
    let shelf = document.getElementById('shelf');
    let entry = document.createElement('div');
    entry.classList.add('buch');

    let entry_title = document.createElement('h2')
    entry_title.textContent = title.value;
    entry.appendChild(entry_title);

    let entry_autor = document.createElement('p')
    entry_autor.textContent = autor.value;
    entry.appendChild(entry_autor);

    let entry_pages = document.createElement('p')
    entry_pages.textContent = "Pages: " + pages.value;
    entry.appendChild(entry_pages);

    let entry_read = document.createElement('p')
    entry_read.id = 'read_status';
    let check = check_read();
    if (check === true) {
        entry_read.textContent = "Read: Yes";
    } else {
        entry_read.textContent = "Read: No";
    }
    entry.appendChild(entry_read)
    
    let btns = add_btns()
    entry.appendChild(btns);
    
    shelf.appendChild(entry);


}
function check_read() {
    let checkbox = document.getElementById('box');
    let check = false;
    if (checkbox.checked) {
        check = true;
    }
    return check;
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
        }
    }, true)
}
//-----------------------------Storage---------------------------------------------------------------------------------------------------------------------
function addStorage(){
    let library = [localStorage.setItem('library', JSON.stringify(books))];

    console.log(books);
}

function checkStorage(){
    let lib = JSON.parse(localStorage.getItem('library'));
    let title = document.getElementById("title");
    let autor = document.getElementById("autor");
    let pages = document.getElementById("pages");

    if (!lib == ''){
            lib.forEach(element =>{
            title.value = element[0];
            let title1 = element[0];
            autor.value = element[1];
            let autor1 = element[1];
            pages.value = element[2];
            let pages1 = element[2];
            let book = new Book(title1, autor1, pages1);
        });    
     }
}

init()

