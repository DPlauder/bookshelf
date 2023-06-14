"use strict";

let books = [];

function form_toogle(){
    let btn = document.getElementById('add_btn');
    let form = document.getElementById('form');
    let cancel = document.getElementById('cancel');
    let send = document.getElementById('send');
    let checked = false;
    btn.addEventListener('click', () => {
        checked = true;
        form.classList.add('form_da');
    }) 
    cancel.addEventListener('click',() => {
        checked = false;
        console.log("cancel");
        form.classList.remove('form_da');
    })
    send.addEventListener('click', () => {
        info()
        form.classList.remove('form_da');       
    })
}

function info(){
    let title = document.getElementById("title").value;
    let autor = document.getElementById("autor").value;
    let pages = document.getElementById("pages").value;
    console.log(title, autor, pages);
}

form_toogle()
