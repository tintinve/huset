let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let id = urlParams.get("id");
console.log("el numero ganador es " + id);
