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
        donde.appendChild(card)
    })
}

const categoriasSinRepetir = (array) =>{
    let categorias = [];
    array.forEach(item => categorias.push(item.category))
    const categoriasSinReps = new Set(categorias)
    let result = [...categoriasSinReps]
    return result
}

const crearCheckbox = (checkboxs) =>{
    let checkboxContainer = document.querySelector(".categorias")
    checkboxs.forEach(item => {
        checkboxContainer.innerHTML += `<div class="form-check form-switch cbox">
        <label class="form-check-label text-center">${item}
            <input class="form-check-input" name="checkbox" type="checkbox" id="${item.toLowerCase()}" value="${item}" />
        </label>
    </div>`
    checkbox = document.querySelectorAll("input[type='checkbox']");
    })
}
