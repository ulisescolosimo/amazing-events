let data;

async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(res => res.json())
        .then(json => data = json);
    filtroFecha();
    arrayCategoriasUpcoming()
    arrayCategoriasPast()
    firstTable()
}

getData();

let bodyPast = document.querySelector(".body-past")
let bodyUpcoming = document.querySelector(".body-upcoming")
let events = document.querySelector(".events")
let categoriesNoRepeat = [];
let upcomingEvents = [];
let pastEvents = [];

const filtroFecha = () =>{
    let currentDate = data.currentDate
    upcomingEvents = data.events.filter(event => event.date.toString() > currentDate).map(event => event)
    pastEvents = data.events.filter(event => event.date.toString() < currentDate).map(event => event)
}

const arrayCategoriasUpcoming = () => {
    upcomingEvents.forEach((item) =>{
        bodyUpcoming.innerHTML += `<tr>
            <td>${item.category}</td>
            <td>${item.estimate}</td>
            <td>${((item.estimate * 100)/item.capacity).toFixed(0)}%</td>
        </tr>
        `
    })
}

const arrayCategoriasPast = () => {
    pastEvents.forEach((item) =>{
        bodyPast.innerHTML += `<tr>
            <td>${item.category}</td>
            <td>${item.assistance}</td>
            <td>${((item.assistance * 100)/item.capacity).toFixed(0)}%</td>
        </tr>
        `
    })
}

const firstTable = () => {
    console.log(data.events)
    data.events.forEach((item) =>{
        events.innerHTML += `
        <tr>
            <td>
                ${((item.assistance*100)/item.capacity) > 50 ? item.name : item.name}
            </td>
            <td>
                ${((item.assistance*100)/item.capacity) < 50 ? item.name : item.name}
            </td>
            <td>
                ${item.assistance ? item.assistance : item.estimate}
            </td>
        </tr>
        `
    })
}

