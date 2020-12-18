const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Kai Yi"
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Kai Yi"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpText: "Some help text",
        name: "Kai Yi"
    });
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, { temperature, feel_temperature, descriptions, humidity } = {}) => {

            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: "The temperature is " + temperature + " degrees. But it feels like " + feel_temperature + "degrees. " + descriptions + ". The humidity is " + humidity,
                location: location,
                address: req.query.address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kai Yi',
        errorMessage: "Help article not found"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kai Yi',
        errorMessage: "Page not found"
    });
})

app.listen(port, () => {
    console.log('Listen on ' + port);
})