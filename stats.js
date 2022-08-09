let tableMain = document.querySelector(".mainTable");
let tableUpcoming = document.querySelector(".body-upcoming");
let tablePast = document.querySelector(".body-past");

const getData = async() => {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(res => res.json())
    .then(json => data = json)
    .catch(err => console.log(err))

    upcomingEvents = data.events.filter(event => event.date.toString() > data.currentDate)
    pastEvents = data.events.filter(event => event.date.toString() < data.currentDate)

    /* --------------------------------------Tabla 1--------------------------------------------------- */

    let stats = statsCalc(data.events)
    console.log(stats)
    /* Nuevo array de data.events con name, percent, assistance y capacity*/

    let maxAtt = maxAssistance(stats)
    /* Past events ordenado de mayor a menor en porcentaje de asistencia */
    /* console.log(maxAtt) */

    let minAtt = minAssistance(stats)
    /* Past events ordenado de menor a mayor en porcentaje de asistencia */
    /* console.log(minAtt) */

    let maxCap = maxCapacity(stats)
    /* Todos los eventos ordenados de mayor a menor por capacidad */
    console.log(maxCap)

    innerDataAttendance(maxAtt, minAtt, maxCap, tableMain)
    /* Creo la tabla numero 1. Maximo porcentaje de asistencia, menor y maxima capacidad de evento. */

    /* --------------------------------------Tabla 2 y 3--------------------------------------------------- */

    let categories = [...(new Set(data.events.map(item => item.category)))]
    /* Creo todas las categorias no repetidas */

    let upcomingStatistics = statsForUpcomingAndPast(upcomingEvents, categories)
    /* console.log(upcomingStatistics) */


    let pastStatistics = statsForUpcomingAndPast(pastEvents, categories)
    /* console.log(pastStatistics) */

    showTableUpcomingAndPast(upcomingStatistics, tableUpcoming)
    showTableUpcomingAndPast(pastStatistics, tablePast)

}

getData()

const innerDataAttendance = (array1, array2, array3, table) => {
    let tr = document.createElement("tr")
    /* Utilizo el [0] para determinar el primer elemento de cada array, ya sea por maximo o minimo en cada caso. */
    tr.innerHTML += `<td>${array1[0].name} - ${array1[0].percent}% of assistance</td>
                    <td>${array2[0].name} - ${array2[0].percent}% of assistance</td>
                    <td>${array3[0].name} - apacity for ${array3[0].capacity} people</td>`
    table.appendChild(tr)
}

/* Funcion que crea la tabla 2 y 3  */

const showTableUpcomingAndPast = (array, table) =>{
    array.forEach(item => {
        let tr = document.createElement("tr")
        tr.innerHTML += `<td>${item.category}</td>
                        <td>$${item.revenue}</td>
                        <td>${item.attendance > 0 ? item.attendance : 0}%</td>`
        table.appendChild(tr)
    })
}

const statsCalc = (array) => {
    let newArray = array.map(element => {
        let percent = Math.round(Number(element.assistance) * 100 / Number(element.capacity))
        let newElement = {
            name: element.name,
            percent: percent,
            assistance: element.assistance,
            capacity: element.capacity
        }
        /* devuelvo cada elemento del array con el formato de newElement */
        /* console.log(newElement) */
        return newElement
    })
    /* console.log(newArray) */
    return newArray
}

const statsForUpcomingAndPast = (array, categories) => {
    let categoriesStats = [];
        for(let category of categories){
            /* for de las categorias no repetidas */
            /* declaro tres variables en 0 */
            let cant = 0;
            let sum = 0;
            let attendance = 0;
            for(let element of array){
                /* for de los elementos del array, ya sea upcoming o past. Combino el for de las categorias y el for de los eventos */
                /* Si la categoria del evento coincide con la categoria del array categories, se realizan las cuentas y se almacenan en objectCat. Luego se pushea el nuevo objeto a categoriesStats */
                if(element.category === category){
                sum += element.price * Number(element.assistance ? element.assistance : element.estimate)
                attendance += Number(element.assistance? element.assistance : element.estimate) * 100 / Number(element.capacity)
                cant += 1;
                }
            }

            let objectCat = {
                category: category,
                revenue: sum,
                attendance: (Math.round(attendance / cant).toFixed(2))
            }
        categoriesStats.push(objectCat);
    }
    console.log(categoriesStats)
    return categoriesStats
}

let maxAssistance = (array) => {
    /* Filtro los elementos que tengan assistance y los ordeno de mayor a menor */
    return array.filter(element=>element.assistance).sort((a,b)=> b.percent - a.percent)
}

let minAssistance = (array) => {
    /* Filtro los elementos que tengan assistance y los ordeno de menor a mayor */
    return array.filter(element=>element.assistance).sort((a,b)=> a.percent - b.percent)
}

let maxCapacity = (array) => {
    /* Ordeno los elementos de mayor a menor por capacidad */
    return array.sort((a,b)=> b.capacity - a.capacity)
}