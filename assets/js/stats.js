const table1 = document.getElementById("tableOne")
const table2 = document.getElementById("tableTwo")
const table3 = document.getElementById("tableThree")
const table4 = document.getElementById("tablePast")
const table5 = document.getElementById("tableUpComing")
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
        let upCategory = UpEvents.map(event => event.category)
        let upCategoryArray = Array.from(new Set(upCategory))

        let revenues;
        let assistanceAverage

        pastCategoryArray.forEach(pastCategory => {
            revenues = 0
            assistanceAverage = 0
            let categoriesByEvents = pastEvents.filter(pastEvent => pastEvent.category == pastCategory)
            categoriesByEvents.forEach(event => {
                revenues += event.assistance * event.price
                assistanceAverage += calculateHighPercentage(event.assistance, event.capacity)
            })
            revenues = revenues
            assistanceAverage = assistanceAverage / categoriesByEvents.length
            createRowTwo(pastCategory, assistanceAverage, revenues, table4)
        })

        upCategoryArray.forEach(upCategory => {
            revenues = 0
            assistanceAverage = 0
            let categoriesByEvents = UpEvents.filter(upEvent => upEvent.category == upCategory)
            categoriesByEvents.forEach(event => {
                revenues += event.estimate * event.price
                assistanceAverage += calculateHighPercentage(event.estimate, event.capacity)
            })
            revenues = revenues
            assistanceAverage = assistanceAverage / categoriesByEvents.length
            createRowTwo(upCategory, assistanceAverage, revenues, table5)
        })
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

function createRowTwo(name, asistenceAverage, revenues, place) {
    place.innerHTML += `
    <tr>
    <td> ${name} </td>
    <td> US$ ${revenues.toLocaleString('de-DE')} </td>
    <td> ${asistenceAverage.toFixed(2)} % </td>
     </tr>
    `
}
