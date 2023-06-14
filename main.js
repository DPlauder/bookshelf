"use strict";

let books = [];

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
}

function newBook(){
    let title = document.getElementById("title").value;
    let autor = document.getElementById("autor").value;
    let pages = document.getElementById("pages").value;
    let book = new Book(title, autor, pages)
    console.log(book);
}

form_toogle()
