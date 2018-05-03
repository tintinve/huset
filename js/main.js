let template = document.querySelector("#eventtemp").content;
let eventlist = document.querySelector("#eventlist")
let page = 1;
let lookingForData = false;
let catLink = "http://tintinve.com/kea/16-cms/wp-json/wp/v2/categories"
const aside = document.querySelector('aside');
const mytimer = setInterval(myTimer, 10000);


function fetchData() {
    lookingForData = true;
    fetch("http://tintinve.com/kea/16-cms/wp-json/wp/v2/events?_embed&per_page=75&page=" + page)
        .then(e => e.json())
        .then(showContent)
}

function showContent(data) {
    console.log(data);
    lookingForData = false;
    data.forEach(showEvent)
}

function showEvent(anEvent) {
    if (anEvent._embedded.author[0].name === "PedroMMD") {
        //console.log(anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        let clone = template.cloneNode(true);
        console.log(anEvent._embedded.author[0].name);
        clone.querySelector("h1").textContent = anEvent.title.rendered;
        let cat = anEvent.acf.event_type.replace(" ", "_");
        clone.querySelector('.event').classList.add(cat)
        clone.querySelector(".price span").textContent = anEvent.acf.price;
        clone.querySelector(".category").textContent = anEvent.acf.event_type;
        clone.querySelector(".venue").textContent = "Location: " + anEvent.acf.location;
        let date = anEvent.acf.date
        clone.querySelector(".date").textContent = "Date: " + date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8);
        let time = anEvent.acf.time;
        clone.querySelector(".time").textContent = "Time: " + time.substring(0,2) + ":" + time.substring(2,4);
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        clone.querySelector('.readmore').href = "subpage.html?id=" + anEvent.id;
        eventlist.appendChild(clone);
    } else {

    }

}

fetchData();
/*
setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("Getting More Events")
        page++;
        fetchData();
    }
}, 100)
*/
function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight - 20
    return bottomOfPage || pageHeight < visible
}

fetch(catLink).then(result => result.json()).then(cats => sort(cats));

function sort(cats) {
    cats.forEach(cat => {
         console.log(cat);
        const a = document.createElement("a");
        a.href = "#";
        if(cat.count > 0){
        a.textContent = cat.name + " (" + cat.count + ")";}
        else{
            a.textContent = cat.name
        }
        if(cat.name === "Supplement"){
            a.style.display = "none"
        }
        a.classList.add("menu_item");
        a.addEventListener('click', () => filter(cat));
        aside.appendChild(a);
    })
}

function filter(category) {
    console.log(category.slug);
    if (document.querySelector("#loader").style.display = "none") {
        document.querySelector("#loader").style.display = "block";
        myTimer
    }
    // Esto es el primer paso para que Uncategorized muestre los eventos de Clemens y Karoline
    if(category.slug === "uncategorized"){
        console.log("EEE")
    }
    //document.querySelector(".burger").classList.remove("change")
    document.querySelectorAll(".event").forEach(el => {
        el.classList.add("hidden")
        if (el.classList.contains(category.slug)) {
            console.log("i have a class called " + category.slug)
            el.classList.remove("hidden")
        } else {
            console.log("i DONT have a class called " + category.slug)
        }
        aside.classList.remove("traeMenu");
        document.querySelector(".burger").classList.toggle("change");
    })

}
function burger(x) {
    x.classList.toggle("change");
    console.log("change")
}


document.querySelector(".burger").addEventListener('click', trae_menu);

function trae_menu() {
    document.querySelector("aside").classList.toggle("traeMenu");
    aside.style.display = "block";   
}

function myTimer() {
    document.querySelector("#loader").style.display = "none";
}
