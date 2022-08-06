let data;

async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(res => res.json())
        .then(json => data = json);
        console.log(data);
}

getData();