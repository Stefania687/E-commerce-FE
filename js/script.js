
/*********************************** numero totale pagine **************************************/
const ELEMENTS_FOR_PAGE = 3;


let getPages = () => {
    showLoading(true);
    let numberOfArticles = fetch("http://localhost:8080/api/articoli/conta")
        .then(response => response.json())
        .then(data => {
            let modulo = data % ELEMENTS_FOR_PAGE;
            numberOfPages = data / ELEMENTS_FOR_PAGE;
            if (modulo > 0) {
                numberOfPages = parseInt(data / ELEMENTS_FOR_PAGE) + 1;
            }
            for (i = 0; i < numberOfPages; i++) {
                let pagesContainer = document.getElementById("pages-container");
                let elem = document.createElement("li");
                let page = i + 1;
                elem.innerHTML = `<li class = 'm-auto text-center page-item'><a class = 'page-link' onclick = 'showPages(${i})'>${page}</a></li>`;
                pagesContainer.appendChild(elem);
            }
        }).then(() => {
            showLoading(false);
        });
}

/********************************** CREO LA PAGINAZIONE **********************************/

// let showFirstPage = () => {
//     showLoading(true);
//     const container = document.getElementById("pagine-articoli");
//     let data = fetch("http://localhost:8080/api/pag-articoli/0/" + ELEMENTS_FOR_PAGE + "/articoli-list")
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(element => {
//             let elem = document.createElement('div');
//             elem.innerHTML = "<div class='card w-90 m-auto'><img src=" + element.image + " class='card-img-top'><div class='card-body'><h5 id='card-title-list' class='card-title'>" + element.nomeArticolo + "</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-primary'>Aggiungi al carrello</a></div></div>";
//             container.appendChild(elem);
//         });
//     }).then(() => {
//         showLoading(false);
//     })

// }

let showPages = (pageNumber) => {
    showLoading(true);
    const container = document.getElementById("pagine-articoli");
    if (container.innerText == "") {
        pageNumber = 0;
    }
    container.innerText = "";
    let data = fetch("http://localhost:8080/api/pag-articoli/" + pageNumber + "/" + ELEMENTS_FOR_PAGE + "/articoli-list")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                let elem = document.createElement('div');
                elem.innerHTML = "<div class='card w-90 m-auto'><img src=" + element.image + " class='card-img-top'><div class='card-body'><h5 id='card-title-list' class='card-title'>" + element.nomeArticolo + "</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-primary'>Aggiungi al carrello</a></div></div>";
                container.appendChild(elem);
            });
        }).then(() => {
            showLoading(false);
        });
}

/************************************ FIND ALL ***************************************/
// let getAllArticles = () => {
//     showLoading(true);
//     let data = fetch("http://localhost:8080/api/articoli/cerca-tutto")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             let container = document.getElementById("pagine-articoli");
//             data.forEach(element => {
//                 let elem = document.createElement('div');
//                 elem.innerHTML = "<div class='card mr-md-1'><img src=" + element.image + " class='card-img-top'><div class='card-body'><h5 id='card-title-list' class='card-title'>" + element.nomeArticolo + "</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-primary'>Aggiungi al carrello</a></div></div>";
//                 container.appendChild(elem);
//             });
//         })
//         .then(() => {
//             showLoading(false);
//         });

// }

/****************************** CERCA ARTICOLO PER NOME *************************************/
let getArticlesByName = () => {
    showLoading(true);
    const articoloParam = document.getElementById("articolo").value;
    let nomeArticolo = { "nome-articolo": articoloParam };
    let data = fetch("http://localhost:8080/api/articoli/cerca" + createRequestParam(nomeArticolo))
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("pagine-articoli");
            let elem = "<div class='card mr-md-1'><img src=" + data.image + " class='card-img-top'><div class='card-body'><h5 id='card-title-list' class='card-title'>" + data.nomeArticolo + "</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-primary'>Go somewhere</a></div></div>";
            container.innerHTML = elem;
        })
        .then(() => {
            showLoading(false)
        });


}

/*********************************** FUNZIONE CREA QUERY STRING **********************************/
const createRequestParam = (obj, applyNull = null) => {
    let requestParams = '';
    if (obj) { // controllo null
        for (const key in obj) { // Cicla per le proprietà di obj
            if (key) { // richiesto da alcuni minimizzatori JS
                if (obj[key] !== undefined &&
                    (obj[key] != null ||
                        applyNull && applyNull.includes(key))) {
                    if (requestParams) { // se non è stringa vuota, vuol dire parametro 2
                        requestParams += '&';
                    } else { // se è stringa vuota vuol dire parametro 1
                        requestParams += '?';
                    }
                    requestParams += key + '=' + encodeURIComponent(obj[key]); // funzione base di javascript
                }
            }
        }
    }
    return requestParams;
}

/********************************** FUNZIONE LOADING *****************************************/
function showLoading(show) {
    if (show) {
        console.log('sto caricando')
        document.getElementById("loading-spinner").style = "display: block";
    } else {
        console.log("ho finito")
        document.getElementById("loading-spinner").style = "display: none";
    }
}
