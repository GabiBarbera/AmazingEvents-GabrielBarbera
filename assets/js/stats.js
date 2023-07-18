const table1 = document.getElementById("tableOne")
const table2 = document.getElementById("tableTwo")
const table3 = document.getElementById("tableThree")
const table4 = document.getElementById("tableFour")
const table5 = document.getElementById("tableFive")
const table6 = document.getElementById("tableSix")
let date;
let dataEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        dataEvents = data.events
        date = data.currentDate
        const sortArray = Array.from(dataEvents).sort(function (a, b) {
            return b.capacity - a.capacity
        })
        let nameMajorCapacity = sortArray[0].name
        let majorCapacity = sortArray[0].capacity
        let pastEvents = dataEvents.filter(event => event.date < date)
        let UpEvents = dataEvents.filter(event => event.date >= date)
        pastEvents.sort((a, b) => calculateHighPercentage(a.assistance, a.capacity) - calculateHighPercentage(b.assistance, b.capacity))
        let majorEvent = pastEvents[pastEvents.length - 1];
        let minorEvent = pastEvents[0];
        let percentageMajor = calculateHighPercentage(majorEvent.assistance, majorEvent.capacity)
        let percentageMinor = calculateHighPercentage(minorEvent.assistance, minorEvent.capacity)
        tableOne(majorEvent, table1, percentageMajor.toFixed(2))
        tableOne(minorEvent, table2, percentageMinor.toFixed(2))
        tableThree(nameMajorCapacity, table3, majorCapacity.toLocaleString('de-DE'))
        let pastCategory = pastEvents.map(event => event.category)
        let pastCategoryArray = Array.from(new Set(pastCategory))
        console.log(pastCategoryArray);
        let upCategory = UpEvents.map(event => event.category)
        let upCategoryArray = Array.from(new Set(upCategory))
        console.log(upCategoryArray);
        tableFour(upCategoryArray, table4)
    }
    )
    .catch(error => console.log(error))

function calculateHighPercentage(assistance, capacity) {
    let percentage = (assistance / capacity) * 100
    return percentage
}

function tableOne(event, htmlContainer, percentage) {
    htmlContainer.innerHTML = `<td> ${event.name} ${percentage} % </td>`
}

function tableThree(event, htmlContainer, percentage) {
    htmlContainer.innerHTML = `<td> ${event} ${percentage} </td>`
}

function tableFour(array, htmlContainer) {
    for (const event of array) {
        htmlContainer.innerHTML += `<tr> <td> ${event}</td> </tr>`
    }
}