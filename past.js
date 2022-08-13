/* Captura de elementos del DOM. */
let boton = document.querySelector(".enviar");
let cardContainerPast = document.querySelector('#past')
let search = document.querySelector("#search");
let checkbox = document.querySelectorAll("input[name=checkbox]");

let data;
let filtroDataHome

async function getData(){
    try{
        const res = await fetch("https://amazing-events.herokuapp.com/api/events")
        data = await res.json();
        filtroDataHome = data.events.filter(event => event.date < data.currentDate);
        categorias = categoriasSinRepetir(data.events)
        mapeoData(filtroDataHome, cardContainerPast)
        crearCheckbox(categorias)
        document.querySelectorAll("input[type='checkbox']").forEach(item => item.addEventListener("change", ()=>{
            checkboxList = Array.from(checkbox).filter(item => item.checked).map(item => item.value)
            searchKey(checkboxList, dataSearch)
            }
        ))
    }catch (error){
        console.error("Error: " + error)
    }
}

getData()

let dataSearch = ""

search.addEventListener('keyup', (e) => {
    e.preventDefault()
    dataSearch = e.target.value.toLowerCase()
    searchKey(checkboxList, dataSearch, cardContainerPast)
})

let checkboxList = [];

function filterName(array, search) {
    let filtroSearch = array.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    return filtroSearch
}

function filtrarArray(filtro) {
    let elementosFiltrados = filtroDataHome.filter(item => filtro.includes(item.category))
    return elementosFiltrados
}

let searchKey = (checks, search) => {
    /* Si el array de checkbox tiene elementos pero el search esta vacio, se filtra las cartas por categoria y no por nombre */
        if(checks.length > 0 && search.length === 0){
            let filterEvents = filtrarArray(checks)
            arrayFiltro = filterEvents
        /* Else if  los checkbox estan vacios y la searchbar tambien esta vacia, se mapea el array default (data.events) */
        }
        
        if (checks.length === 0 && search.length === 0) {
            arrayFiltro = data.events
        /* Else if los checkbox estan vacios pero la searchbar tiene contenido, se filtran los nombres de las cartas que posean alguna letra ingresada en searchbar */
        }
        
        if (checks.length === 0 && search.length > 0) {
            let searchbarEvents = filterName(data.events, search)
            arrayFiltro = searchbarEvents
        }
        
        if(checks.length > 0 && search != ""){
            /* Si searchbar tiene valor y algun checkbox esta marcado: */
            let filterEvents = filtrarArray(checks)
            let searchbarEvents = filterName(filterEvents, search)
            arrayFiltro = searchbarEvents
        }
        
        /* Finalmente, si ninguna de estas condiciones se cumplen se muestra un mensaje que indica ajustar la busqueda*/
        cardContainerPast.innerHTML = ""
        
        if(arrayFiltro.length === 0){
            cardContainerPast.innerHTML = "<p>No se encontraron resultados. Por favor, ajuste la búsqueda.</p>"
        }
        mapeoData(arrayFiltro, cardContainerPast)
    }
