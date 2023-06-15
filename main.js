"use strict";

function form_toogle(){
    let btn = document.getElementById('add_btn');
    let form = document.getElementById('form');
    let cancel = document.getElementById('cancel');
    let send = document.getElementById('send');
    btn.addEventListener('click', () => {
        form.classList.add('form_da');
    }) 
    cancel.addEventListener('click',() => {
        console.log("cancel");
        form.classList.remove('form_da');
    })
    send.addEventListener('click', () => {
        form.classList.remove('form_da');
        newBook();

    })
}
function Book(title, autor, pages){
    this.title = title,
    this.autor = autor,
    this.pages = pages
    addBook();
}
function newBook(){
    let title = document.getElementById("title").value;
    let autor = document.getElementById("autor").value;
    let pages = document.getElementById("pages").value;
    let book = new Book(title, autor, pages);
    
}
function addBook(){
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
    let check = check_read();
    console.log(check);
    if( check === true) {
        entry_read.textContent = "Read: Yes"
    } else {
        entry_read.textContent = "Read: No"
    }
    entry.appendChild(entry_read)
    shelf.appendChild(entry);
}
function check_read(){
    let checkbox = document.getElementById('box');
    let check = false;
    if( checkbox.checked ){
        check = true;
    }
    return check;
}

form_toogle()

