const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Naima'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Naima Farooqi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help text',
        title: 'Help',
        name: 'Naima'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    const location = req.query.address

    geoCode(location, (error, data ={}) =>{

        if(error){
            return res.send({error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            
            if(error){
                return res.send({error})
            }

            res.send({
                title: 'Weather app',
                forecast: forecastData,
                address: req.query.address
            })
        
        })
    })
    
})


app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provice a search term.'
        })
        
        res.send({
            product: []
        })
    
    }
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Naima',
        errormessage: 'help page not found'
    })

})

app.get('*', (req, res) => {

    res.render('404' , {
        title: '404',
        name: 'Naima',
        errormessage: 'page not found'
    })

})




// app.listen(3000, () => {

//     console.log('Server is up and running on port 3000')

// })

app.listen(port, () => {

    console.log('Server is up and running on port ' + port)

})