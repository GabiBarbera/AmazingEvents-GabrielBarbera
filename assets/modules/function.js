export function createLetters(object) {
    return ` <div class="card col-md-2 float-md-end mb-3 ms-md-3 shadow-lg p-3 mb-5 rounded">
    <img src="${object.image}" class="card-img w-100 object-fit-cover" alt="cinema">
    <div class="card-body d-flex flex-column justify-content-evenly">
    <h5 class="card-title align-self-center">${object.name}</h5>
    <p class="card-text">${object.description}</p>
    <div class="d-flex justify-content-between align-items-center">
    <h6>US$${object.price}</h6>
    <a href="./assets/pages/details.html?parameter=${object._id}" class="btn btn-secondary border border-black shadow">Details</a>
    </div>
    </div>
    </div>`
}

export function createLettersPastUp(object) {
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

export function showCards(arrayEvent, place) {
    let card = " "
    if (arrayEvent.length == 0) {
        card = `<h2>❌ oops something went wrong ❌</h2>`
        place.innerHTML = card
        return
    }
    for (let info of arrayEvent) {
        place.innerHTML += createLetters(info)
    }
}

export function createInputs(category) {
    return `<div>
    <input type="checkbox" name="checkCategory" id="${category}" value="${category}">
    <label for="${category}">${category}</label>
    </div>`
}

export function showInputs(array, where) {
    for (let element of array) {
        where.innerHTML += createInputs(element)
    }
}

export function searchfilter(arrayEvents, text) {
    return arrayEvents.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
}

export function checkFilter(eventList, categories) {
    if (categories.length == 0) {
        return eventList
    } else {
        let aux = eventList.filter(event => categories.includes(event.category) || categories.length == 0)
        return aux
    }
}

export function crossFilter(eventList, searchvalue, categories) {
    let checkFilter2 = checkFilter(eventList, categories)
    let checkInput2 = searchfilter(checkFilter2, searchvalue)
    return checkInput2
}

export function showCardsUp(array, date, place) {
    let template = " "
    if (array.length == 0) {
        place.innerHTML = `<h2>❌ oops something went wrong ❌</h2>`
    } else {
        place.innerHTML += " "
        for (let events of array) {
            if (events.date >= date) {
                template += createLettersPastUp(events)
            }
        }
        place.innerHTML += template
    }
}

export function showCardsPast(array, date, place) {
    let template = " "
    if (array.length == 0) {
        place.innerHTML = `<h2>❌ oops something went wrong ❌</h2>`
    } else {
        place.innerHTML += " "
        for (let events of array) {
            if (events.date <= date) {
                template += createLettersPastUp(events)
            }
        }
        place.innerHTML += template
    }
}

export function calculateHighPercentage(assistance, capacity) {
    let percentage = (assistance / capacity) * 100
    return percentage
}

export function tableOne(event, htmlContainer, percentage) {
    htmlContainer.innerHTML = `<td> ${event.name} ${percentage} % </td>`
}

export function tableThree(event, htmlContainer, percentage) {
    htmlContainer.innerHTML = `<td> ${event} ${percentage} </td>`
}

export function createRowTwo(name, asistenceAverage, revenues, place) {
    place.innerHTML += `
    <tr>
    <td> ${name} </td>
    <td> US$ ${revenues.toLocaleString('de-DE')} </td>
    <td> ${asistenceAverage.toFixed(2)} % </td>
     </tr>
    `
}