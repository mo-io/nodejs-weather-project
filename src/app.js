const path = require('path')
const hbs = require('hbs')
const express = require('express')
const getGeu  = require('./getGeu')
const getWeather = require('./getWeather')

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main page',
        name: 'Mo Abdelazim'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About US',
        name: 'Mo Abdelazim'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'error, you have to provide a search term!'
        })
    }
    getGeu(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }

        const latlong = longitude  + ',' + latitude
        getWeather(latlong , (error, {temperature, summary, percipitation} = {}) => {
            if (error){
                return res.render('weather', {
                    error
                })
            }
            return res.send( {
                location,
                percipitation, 
                temperature, 
                summary
            })
        })
    })

})


app.listen(port, () => {
    console.log('Server running on port ' + port + '...'')
})