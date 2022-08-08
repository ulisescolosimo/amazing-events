/* Captura de elementos del DOM. */
let boton = document.querySelector(".enviar");
let cardContainerUpcoming = document.querySelector('#upcoming')
let search = document.querySelector("#search");
let checkbox = document.querySelectorAll("input[name=checkbox]");

const mapeoData = (array, donde) => {
    array.map((item) => {
        let card = document.createElement('div')
        card.className = 'card m-3'
        card.style.width = '19rem'
        card.style.height = 'auto'
        card.innerHTML = `<img src=${item.image} class="card-img-top" style='width: auto; height: 12rem' alt="...">
        <div class="card-body d-flex justify-content-evenly align-content-center flex-column">
        <h3 class="card-title text-center">${item.name}</h3>
        <p>Date: ${item.date}</p>
        <p>Place: ${item.place}</p>
        <p>Description: ${item.description}</p>
        <div class="d-flex align-items-center justify-content-evenly text-start">
            <label class="precio d-flex justify-content-start">Price:<b>$${item.price}</b></label>
            <a style="width: 100px;" href="./details.html?id=${item._id}" class="btn bg-black text-white ver">See more</a>
        </div>
        </div>`
        if(data.currentDate < item.date){
            donde.appendChild(card)
        }
    })
}

let currentDate = data.currentDate

let filtroDataHome = data.events.filter(event => event.date.toString() > currentDate).map(event => event)

mapeoData(filtroDataHome, cardContainerUpcoming)

let dataSearch = ""

search.addEventListener('keyup', (e) => {
    e.preventDefault()

    dataSearch = e.target.value.toLowerCase()
    searchKey(checkboxList, dataSearch)
})

let checkboxList = [];

checkbox.forEach(item => item.addEventListener("change", ()=>{
    checkboxList = Array.from(checkbox).filter(item => item.checked).map(item => item.value)
    searchKey(checkboxList, dataSearch)
    }
))

function filterName(array, search) {
    let filtroSearch = array.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    return filtroSearch
}

function filtrarArray(filtro) {
    let elementosFiltrados = data.events.filter(item => filtro.includes(item.category))
    return elementosFiltrados
}

let arrayFiltro = [];

let searchKey = (checks, search) => {
    /* Si el array de checkbox tiene elementos pero el search esta vacio, se filtra las cartas por categoria y no por nombre */
        if(checks.length > 0 && search.length === 0){
            let filterEvents = filtrarArray(checks)
            arrayFiltro = filterEvents
        /* Else if  los checkbox estan vacios y la searchbar tambien esta vacia, se mapea el array default (data.events) */
        } else if (checks.length === 0 && search.length === 0) {
            arrayFiltro = data.events
        /* Else if los checkbox estan vacios pero la searchbar tiene contenido, se filtran los nombres de las cartas que posean alguna letra ingresada en searchbar */
        } else if (checks.length === 0 && search.length > 0) {
            let searchbarEvents = filterName(data.events, search)
            arrayFiltro = searchbarEvents
        } else if(checks.length > 0 && search != ""){
            /* Si searchbar tiene valor y algun checkbox esta marcado: */
            let filterEvents = filtrarArray(checks)
            let searchbarEvents = filterName(filterEvents, search)
            arrayFiltro = searchbarEvents
        }
        
        /* Finalmente, si ninguna de estas condiciones se cumplen se muestra un mensaje que indica ajustar la busqueda*/
        cardContainerUpcoming.innerHTML = ""
        if(arrayFiltro.length === 0){
            cardContainerUpcoming.innerHTML = "<p>No se encontraron resultados. Por favor, ajuste la búsqueda.</p>"
        }
        mapeoData(arrayFiltro, cardContainerUpcoming)
    }


    let search2 = document.querySelector("#search2")
    let categories = document.querySelectorAll("#display")
    let dataSearch2 = "";
    
    let checkboxList2 = Array.from(checkbox).map((item) => (item.value))
    
    search2.addEventListener('keyup', (e) => {
        e.preventDefault()
        dataSearch2 = e.target.value.toLowerCase()
        if(cats[0] != "All"){
            searchKey(cats, dataSearch2)
        } else if (cats[0] == "All" && dataSearch2 != ""){
            searchKey(checkboxList2, dataSearch2)
        } else if (cats[0] == "All" && dataSearch2 == ""){
            cardContainerUpcoming.innerHTML = ''
            mapeoData(data.events, cardContainerUpcoming)
        }
    })
    
    let cats = []
    
    categories.forEach(item => item.addEventListener("change", ()=>{
        cats = Array.from(categories).filter(item => item).map(item => item.value)
        console.log(cats)
        if(cats[0] == "All" && dataSearch2 == ''){
            cardContainerUpcoming.innerHTML = ""
            mapeoData(data.events, cardContainerUpcoming)
        }else if(dataSearch2 != '' && cats[0] == "All"){
            searchKey(checkboxList2, dataSearch2)
        }else{
            searchKey(cats, dataSearch2)
        }
    }
    ))