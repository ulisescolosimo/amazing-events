const info = data

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const evento = info.events.find(item => item._id == id)

const contenedorDetalle = document.querySelector('.contenedor-detalle')

contenedorDetalle.innerHTML = `
        <div class="card m-2 w-auto h-auto">
            <img src=${evento.image} class="card-img-top" style='width: auto; height: 15rem' alt="...">
            <div class="card-body d-flex justify-content-evenly align-content-center flex-column" style='width: auto; height: auto'>
            <div class="card-body">
                <h3 class="card-title p-2 text-center"><b>${evento.name}</b></h3>
                <p class="desc"><b>Date:</b> ${evento.date}</p>
                <p class="desc"><b>Description:</b> ${evento.description}</p>
                <p class="desc"><b>Category:</b> ${evento.category}</p>
                <p class="desc"><b>Place:</b> ${evento.place}</p>
                <p class="desc"><b>Capacity:</b> ${evento.capacity}</p>
                <p class="desc">${evento.assistance ? `<b>Asisstance:</b> ${evento.assistance}` : `<b>Estimate:</b> ${evento.estimate}`}</p>
                <p class="desc"><b>Price:</b> $${evento.price}</p>
            </div>
        </div>
        `;