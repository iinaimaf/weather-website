console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.text = data.error
            } else {
                console.log(data.address)
                console.log(data.forecast)

                messageOne.textContent = data.address

                const msg = data.forecast.weather_descriptions + '. It is currently ' + data.forecast.temperature + ' degrees. Feels like ' + data.forecast.feels_like + ' degrees.'
                messageTwo.textContent = msg
            }
        })
    })
})