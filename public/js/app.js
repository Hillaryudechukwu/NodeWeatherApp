const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const locationt = searchLocation.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + locationt
    fetch(url).then((response) => {

        response.json().then((loadedData) => {
            if (loadedData.error) {
                messageOne.textContent = loadedData.error

            } else {
                messageOne.textContent = loadedData.location
                messageTwo.textContent = loadedData.forecast
            }




        })
    })



})