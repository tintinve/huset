let catLink = "http://tintinve.com/kea/16-cms/wp-json/wp/v2/categories"
const aside = document.querySelector('aside');

fetch(catLink).then(result => result.json()).then(cats => sort(cats));
function sort(cats){
    cats.forEach(cat => {
        console.log(cat.name);
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.name;
        a.classList.add("menu_item");
        a.addEventListener('click', () => filter(cat));
        aside.appendChild(a);
    })
}
function filter(item) {
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == item || item == "all") {
            section.classList.remove("hide");

        } else {
            section.classList.add("hide");
        }
    })
}


function burger(x) {
    x.classList.toggle("change");
}


document.querySelector(".burger").addEventListener('click', trae_menu);
function trae_menu(){
    document.querySelector("aside").classList.toggle("traeMenu");
}
