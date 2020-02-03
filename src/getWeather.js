const request = require('request')


const getWeather = (latLont, callback) => {
    const url = 'https://api.darksky.net/forecast/c9ba6b14f96a761158fb282c1d1cf7b8/'+ latLont + '?units=si'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('connection error!')
        }else if(body.error){
            callback(body.error)
        }else{
            callback(undefined, {
                temperature: body.currently.temperature,
                percipitation: body.currently.precipProbability, 
                summary: body.daily.data[0].summary 
            })
        }   
    })
}

module.exports = getWeather