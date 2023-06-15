"use strict";

function init() {
    form_toogle();
    change_book(shelf, 'click');
}

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
    })
    send.addEventListener('click', () => {
        form.classList.remove('form_da');
        newBook();
    })
}
function Book(title, autor, pages) {
    this.title = title,
        this.autor = autor,
        this.pages = pages
    addBook();
}
function newBook() {
    let title = document.getElementById("title").value;
    let autor = document.getElementById("autor").value;
    let pages = document.getElementById("pages").value;
    let book = new Book(title, autor, pages);
}
function addBook() {
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
    shelf.appendChild(entry);

    let btns = add_btns()
    entry.appendChild(btns);
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
function change_book(rootElement, event) {
    rootElement.addEventListener(event, (e) => {
        console.log(e);  
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.textContent === 'X') {
                targetElement.parentElement.parentElement.remove();
            }           
            if (targetElement.textContent === 'O')  {
                let change = document.getElementById('read_status');
                console.log(change);
                if (change.textContent === 'Read: Yes'){
                    change.textContent = "Read: No"
                    console.log('yes');
                } else {
                    change.textContent = "Read: Yes"
                    console.log('no');
                }
            } 
            targetElement = targetElement.parentElement;      
        }       
    },true)

}

init()

