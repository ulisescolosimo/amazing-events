let tableMain = document.querySelector(".mainTable");
let tableUpcoming = document.querySelector(".body-upcoming");
let tablePast = document.querySelector(".body-past");

let data;
let upcomingEvents;
let pastEvents;

const getData = async() => {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(res => res.json())
    .then(json => data = json)
    upcomingEvents = data.events.filter(event => event.date.toString() > data.currentDate)
    pastEvents = data.events.filter(event => event.date.toString() < data.currentDate)

    /* --------------------------------------Tabla 1--------------------------------------------------- */

    let stats = statsCalc(data.events)
    console.log(stats)
    /* Nuevo array de data.events con name, percent, assistance y capacity*/

    let maxAtt = maxAssistance(stats)
    /* Past events ordenado de mayor a menor en porcentaje de asistencia */
    console.log(maxAtt)

    let minAtt = minAssistance(stats)
    /* Past events ordenado de menor a mayor en porcentaje de asistencia */
    console.log(minAtt)

    let maxCap = maxCapacity(stats)
    console.log(maxCap)

    innerDataAttendance(maxAtt, minAtt, maxCap, tableMain)

    /* --------------------------------------Tabla 2 y 3--------------------------------------------------- */

    let categories = [...(new Set(data.events.map(item => item.category)))]
    console.log(categories)

    let upcomingStatistics = statsForUpcomingAndPast(upcomingEvents, categories)
    console.log(upcomingStatistics)


    let pastStatistics = statsForUpcomingAndPast(pastEvents, categories)
    console.log(pastStatistics)

    showTableUpcomingAndPast(upcomingStatistics, tableUpcoming)
    showTableUpcomingAndPast(pastStatistics, tablePast)

}

getData()

const innerDataAttendance = (array1, array2, array3, tbodyContainer) => {
    let tr = document.createElement("tr")
    tr.innerHTML += `<td>${array1[0].name} - ${array1[0].percent}% of assistance</td>
                    <td>${array2[0].name} - ${array2[0].percent}% of assistance</td>
                    <td>${array3[0].name} - Capacity of the venue:${array3[0].capacity} people</td>`
    tbodyContainer.appendChild(tr)
}

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
        return newElement
    })
    return newArray
}

const statsForUpcomingAndPast = (array, categories) => {
    let categoriesStats = [];
        for(let category of categories){
            let cant = 0;
            let sum = 0;
            let attendance = 0;
            for(let element of array){
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
    return array.filter(element=>element.assistance).sort((a,b)=> b.percent - a.percent)
}

let minAssistance = (array) => {
    return array.filter(element=>element.assistance).sort((a,b)=> a.percent - b.percent)
}

let maxCapacity = (array) => {
    return array.sort((a,b)=> b.capacity - a.capacity)
}