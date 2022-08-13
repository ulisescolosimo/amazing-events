/* Captura de elementos del DOM. */
let boton = document.querySelector(".enviar");
let home = document.querySelector('#home')
let search = document.querySelector("#search");

/* funcion reutilizable para mapear las cartas, con dos parámetros para definir su destino. */

let data;
let categorias;

async function getData(){
    try{
        const res = await fetch("https://amazing-events.herokuapp.com/api/events")
        data = await res.json();
        mapeoData(data.events, home)
        categorias = categoriasSinRepetir(data.events)
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

/* Llamo a la funcion mapeoData para mapear el array filtrado por fecha menor a la actual en home */

/* Agrego una funcion con add event listener de keyup, para que cada vez que escriba me filtre los elementos en el DOM a traves del buscador. El array inicial contiene los 14 elementos del data.events
Si llamo a la funcion searchKey y le paso por parametro el array que va a buscar, se enfoca solo en ese hasta que le vuelva a indicar lo contrario.
*/

let dataSearch = ""

search.addEventListener('keyup', (e) => {
    e.preventDefault()
    dataSearch = e.target.value.toLowerCase()
    /* Llamo a searchKey para poder buscar en los elementos mapeados inicialmente sin necesidad de tener que marcar algun checkbox */
    searchKey(checkboxList, dataSearch)
})

/* Creo un array para ir agregando los nombres de los checkbox marcados. Cuando se destildan se retiran del array */


let checkboxList = [];

/* Declaro la funcion filterName para realizar el filtrado a traves de la busqueda de los elementos cuyos nombres coincidan con search value*/

function filterName(array, search) {
    let filtroSearch = array.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    return filtroSearch
}

/* Declaro una funcion reutilizable que, a través de una parametro array y una condicion de filtro, me retorna los elementos que cumplen con dicha condicion*/

function filtrarArray(filtro) {
    let elementosFiltrados = data.events.filter(item => filtro.includes(item.category))
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
        home.innerHTML = ""
        
        if(arrayFiltro.length === 0){
            home.innerHTML = "<p>No se encontraron resultados. Por favor, ajuste la búsqueda.</p>"
        }
        mapeoData(arrayFiltro, home)
    }



