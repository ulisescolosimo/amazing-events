/* Captura de elementos del DOM. */
let boton = document.querySelector(".enviar");
let cardContainerPast = document.querySelector('#past')
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
            <a style="width: 100px;" href="./details.html?id=${item._id}" class="btn bg-black text-white ver">Ver más</a>
        </div>
        </div>`
        if(data.currentDate > item.date){
            donde.appendChild(card)
        }
    })
}

let currentDate = data.currentDate

let filtroDataHome = data.events.filter(event => event.date.toString() < currentDate).map(event => event)

mapeoData(filtroDataHome, cardContainerPast)


let dataSearch = ""

search.addEventListener('keyup', (e) => {
    e.preventDefault()

    dataSearch = e.target.value.toLowerCase()
    searchKey()
})

let checkboxList = [];

checkbox.forEach(item => item.addEventListener("change", ()=>{
    checkboxList = Array.from(checkbox).filter(item => item.checked).map(item => item.value)
    searchKey()
    }
))

function filterName(array, search) {
    let filtroSearch = array.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    return filtroSearch
}

function filterCategory(array, filtro) {
    let elementosFiltrados = array.filter(item => filtro.includes(item.category))
    return elementosFiltrados
}

let arrayFiltro = [];

let searchKey = () => {
        if(checkboxList.length > 0 && dataSearch === ""){
            let filterEvents = filterCategory(filtroDataHome, checkboxList)
            console.log(filterEvents)
            arrayFiltro = filterEvents
            console.log(arrayFiltro)
        } else if (checkboxList.length === 0 && dataSearch.length === 0) {
            arrayFiltro = filtroDataHome
        } else if (checkboxList.length === 0 && dataSearch.length > 0) {
            let searchbarEvents = filterName(filtroDataHome, dataSearch)
            arrayFiltro = searchbarEvents
        } else {
            let filterEvents = filterCategory(filtroDataHome, checkboxList)
            let searchbarEvents = filterName(filterEvents, dataSearch)
            arrayFiltro = searchbarEvents
        }
        cardContainerPast.innerHTML = ""
        if(arrayFiltro.length === 0){
            cardContainerPast.innerHTML = "No se encontraron resultados. Por favor, ajuste la búsqueda."
        }
        mapeoData(arrayFiltro, cardContainerPast)
    }
