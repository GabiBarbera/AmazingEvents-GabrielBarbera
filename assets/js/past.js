import { createLettersPastUp, showInputs, crossFilter, showCardsPast } from "../modules/function.js"
let container = document.getElementById("pastCards")
const inputsLabels = document.getElementById("allInputs")
const searchInput = document.getElementById("search")
let allEvents;
let currentDate;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(answer => answer.json())
    .then(data => {
        allEvents = data.events
        currentDate = data.currentDate
        let categories = allEvents.map(category => category.category)
        let nonRepeatingCategories = new Set(categories)
        let nonRepeatinArray = Array.from(nonRepeatingCategories)
        showCardsPast(allEvents, currentDate, container)
        showInputs(nonRepeatinArray, inputsLabels)
        inputsLabels.addEventListener("change", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCardsPast(filter, currentDate, container)
        })
        searchInput.addEventListener("input", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCardsPast(filter, currentDate, container)
        })
    })
    .catch(error => console.log(error))