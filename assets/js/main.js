import { showCards, showInputs, crossFilter } from '../modules/function.js'
const container = document.getElementById("allCards")
const inputsLabels = document.getElementById("allInputs")
const searchInput = document.getElementById("search")
let allEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(answer => answer.json())
    .then(data => {
        allEvents = data.events
        let categories = allEvents.map(category => category.category)
        let nonRepeatingCategories = new Set(categories)
        let nonRepeatinArray = Array.from(nonRepeatingCategories)
        showCards(allEvents, container)
        showInputs(nonRepeatinArray, inputsLabels)
        inputsLabels.addEventListener("change", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCards(filter, container)
        })
        searchInput.addEventListener("input", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCards(filter, container)
        })
    })
    .catch(error => console.log(error))


