const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const goeLocation = require('./utils/geoLocation')
const forecast = require('./utils/forecast')
    //Define path for express directory
const publicDir = path.join(__filename, '../../public/')
const viewsDir = path.join(__filename, '../../templates/views')

//hbs.registerPartials(__dirname + '../../templates/partials', () => { });
const partialsPath = path.join(__dirname, '../templates/partials')
    //set up to serve static html pages
app.use(express.static(publicDir))

//handlebars for dynamic .hbs pages 
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsPath)

//express routing system
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'hillary Udechukwu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'HadaraWeb PLC',
        name: 'hillary Udechukwu'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        services: 'Our services and help',
        title: 'Our services'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided for the search'
        })
    }
    goeLocation(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        //callback chaining to alow node tracker exe in sequence
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })



})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Help not found',
        errorMessage: 'Help article not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        name: '404',
        errorMessage: '404, Page not found'
    })
})

// express server set up
app.listen(port, () => {
    console.log('Server started on port ' + port)
})