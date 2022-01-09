const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url= 'http://api.weatherstack.com/current?access_key=84496ed4a2e2994f1df350fcfef4c801&query=' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to Connect, please check your internet', undefined)
        } else if(response.body.error){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, "The temperature is " + response.body.current.temperature + '. but feels like ' + response.body.current.feelslike )
        }
    })
}

module.exports= forecast