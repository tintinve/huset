

function burger(x) {
    x.classList.toggle("change");
}


document.querySelector(".burger").addEventListener('click', trae_menu);
function trae_menu(){
    document.querySelector("#sideMenu").classList.toggle("traeMenu");
}
