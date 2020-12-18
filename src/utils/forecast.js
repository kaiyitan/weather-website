// weatherstack
// MY API KEY : 482b8892df017225360c93f1b54666d0
// MY API Based URL:  http://api.weatherstack.com/
// MY API Full URL:
// http://api.weatherstack.com/current?access_key=482b8892df017225360c93f1b54666d0&query=37.8267,-122.4233

const request = require('request');

forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=482b8892df017225360c93f1b54666d0&query=" + latitude + "," + longitude;
    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location');
        }
        else {
            const temp = body.current.temperature;
            const feel_temp = body.current.feelslike;
            callback(error, {
                temperature: temp,
                feel_temperature: feel_temp,
                descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast;