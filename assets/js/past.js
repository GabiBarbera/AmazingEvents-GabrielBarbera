
let container = document.getElementById("pastCards")

function createLetters(object) {
    return ` <div class="card col-md-2 float-md-end mb-3 ms-md-3 bg-success shadow-lg p-3 mb-5 bg-body-success rounded">
      <img src="${object.image}" class="card-img w-100 object-fit-cover" alt="cinema">
      <div class="card-body d-flex flex-column justify-content-evenly">
      <h5 class="card-title align-self-center">${object.name}</h5>
      <p class="card-text">${object.description}</p>
      <div class="d-flex justify-content-between align-items-center">
      <h6>US$${object.price}</h6>
      <a href="../pages/details.html" class="btn btn-primary">Details</a>
          </div>
      </div>
  </div>`
}
const dateEvent = data.currentDate
const upcomingEvents = data.events

function showCards() {
    for (events of upcomingEvents) {
        if (events.date <= dateEvent) {
            container.innerHTML += createLetters(events)
        }
    }
}
showCards()
console.log("hola")