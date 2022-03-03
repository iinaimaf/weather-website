const request = require('request')


const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWluYWltYWYiLCJhIjoiY2wwOTc5MjNzMGE5dzNvbnlyMmszcGh5OSJ9.kWXv-1gX-kSTuFllQIGWhg'
    //console.log(url)
    request({url, url, json: true}, (error, response) => {

        if(error){

            callback('Unable to connet to the location services', undefined)

        } else if(response.body.features.length === 0){

            callback('Unable to find location', undefined)
        
        } else{

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geoCode