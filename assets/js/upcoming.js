let container = document.getElementById("upcomingCards")
const dateEvent = data.currentDate
const upcomingEvents = data.events
let categories = upcomingEvents.map(category => category.category)
let nonRepeatingCategories = new Set(categories)
let nonRepeatinArray = Array.from(nonRepeatingCategories)
const inputsLabels = document.getElementById("allInputs")

function createLetters(object) {
    return ` <div class="card col-md-2 float-md-end mb-3 ms-md-3 shadow-lg p-3 mb-5 bg-body-success rounded">
      <img src="${object.image}" class="card-img w-100 object-fit-cover" alt="cinema">
      <div class="card-body d-flex flex-column justify-content-evenly">
      <h5 class="card-title align-self-center">${object.name}</h5>
      <p class="card-text">${object.description}</p>
      <div class="d-flex justify-content-between align-items-center">
      <h6>US$${object.price}</h6>
      <a href="../pages/details.html?parameter=${object._id}" class="btn btn-secondary border border-black shadow">Details</a>
          </div>
      </div>
  </div>`
}

function showCards(array, date, place) {
    let template = " "
    if (array.length == 0) {
        container.innerHTML = `<h2>❌ oops something went wrong ❌</h2>`
    }
    for (events of array) {
        if (events.date >= date) {
            template += createLetters(events)
        }
    }
    place.innerHTML += template
}
showCards(upcomingEvents, dateEvent, container)

function createSearch() {
    return `<input type="search" name="search" id="search" placeholder="Search... 🔎">`
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
searchInput.addEventListener("input", () => {
    container.innerHTML = " "
    let value = showValue(searchInput)
    let event = upcomingEvents.filter(event => event.name.toLowerCase().includes(value))
    showCards(event, dateEvent, container)
})

function showValue(input) {
    let valueInput = input.value.toLowerCase()
    return valueInput
}

inputsLabels.addEventListener("change", () => {
    container.innerHTML = " "
    let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
    let checkArray = []
    checkbox.forEach(function (values) {
        checkArray.push(values.value)
    })

    let filterCheck = upcomingEvents.filter(event => checkArray.includes(event.category) || checkArray.length == 0)
    showCards(filterCheck, dateEvent, container)
})

