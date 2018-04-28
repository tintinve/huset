let template = document.querySelector("#eventtemp").content;
let eventlist = document.querySelector("#eventlist")
let page = 1;
let lookingForData = false;


function fetchData() {
    lookingForData = true;
    fetch("http://tintinve.com/kea/16-cms/wp-json/wp/v2/events?_embed&per_page=4&page=" + page)
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
        clone.querySelector("h1").textContent = anEvent.title.rendered;
        clone.querySelector(".description").innerHTML = anEvent.content.rendered;
        clone.querySelector(".price span").textContent = anEvent.acf.price;
        console.log(anEvent.acf);
        clone.querySelector(".category").textContent = "Category: " + anEvent.acf.event_type;
        clone.querySelector(".venue").textContent = "Location: " + anEvent.acf.location;
        clone.querySelector(".date").textContent = "Date: " + anEvent.acf.date;
        clone.querySelector(".time").textContent = "Time: " + anEvent.acf.time;
        if (anEvent._embedded["wp:featuredmedia"]) {
            clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        } else {
            clone.querySelector("img").remove()
        }
        eventlist.appendChild(clone);
    } else {
    
    }
}

fetchData();

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("Getting More Events")
        page++;
        fetchData();
    }
}, 100)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}
