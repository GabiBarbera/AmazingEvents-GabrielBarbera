const container = document.getElementById("allCards")
const allEvents = data.events
let categories = allEvents.map(category => category.category)
let nonRepeatingCategories = new Set(categories)
let nonRepeatinArray = Array.from(nonRepeatingCategories)
const inputsLabels = document.getElementById("allInputs")





function createLetters(object) {
    return ` <div class="card col-md-2 float-md-end mb-3 ms-md-3 shadow-lg p-3 mb-5 rounded">
    <img src="${object.image}" class="card-img w-100 object-fit-cover" alt="cinema">
    <div class="card-body d-flex flex-column justify-content-evenly">
    <h5 class="card-title align-self-center">${object.name}</h5>
    <p class="card-text">${object.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <h6>US$${object.price}</h6>
    <a href="./assets/pages/details.html?parameter=${object._id}" class="btn btn-primary">Details</a>
    </div>
    </div>
    </div>`
}


function showCards(arrayEvent) {
    for (let info of arrayEvent) {
        container.innerHTML += createLetters(info)
    }
}
showCards(allEvents)

function createSearch() {
    return `<input type="search" name="search" id="search" placeholder="Search 🔎" class="ms-5">`
}

function showSearch(where) {
    where.innerHTML = createSearch()
}

showSearch(inputsLabels)

function createInputs(category) {
    return `<div>
    <input type="checkbox" name="checkCategory" id="${category}" value="${category}">
    <label for="${category}">${category}</label>
    </div>`
}

function showInputs(array, where) {
    for (let element of array) {
        where.innerHTML += createInputs(element)
    }
}

showInputs(nonRepeatinArray, inputsLabels)

const searchInput = document.getElementById("search")
searchInput.addEventListener("input", (e) => { console.log(e.target.value) })


inputsLabels.addEventListener("change", () => {
    container.innerHTML = " "
    let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
    let checkArray = []
    checkbox.forEach(function (values) {
        checkArray.push(values.value)
    })

    let filterCheck = allEvents.filter(event => checkArray.includes(event.category) || checkArray.length == 0)
    showCards(filterCheck, container)
})




