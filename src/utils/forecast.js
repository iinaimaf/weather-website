const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=97ec9860c123ea8000077dbe2104123f&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url: url, json: true}, (error, response) => {

        if(error){

            callback('Unable to connect to the weather service', undefined)
        
        } else if(response.body.error){
            
            callback('Unable to find location', undefined)
        
        } else{

            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feels_like: response.body.current.feelslike
            })

        }

    })

}

module.exports = forecast