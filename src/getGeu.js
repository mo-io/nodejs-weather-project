const request = require('request')
const geoToken = 'pk.eyJ1IjoibW9hbGF6aW0iLCJhIjoiY2s2M2hrMGdrMGs1YzNlbzRyamV4MGo1YiJ9.a8ZYr_jE8Ud6MuEqlp0z7A'

const getGeu = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + geoToken + '&limit=1'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('connection error!')
        }else if(body.features.length === 0){
            callback('unabel fo find this addres, try othor addres.', undefined)
        }else{
            callback(undefined, {
                latitude:  body.features[0].center[0],
                longitude: body.features[0].center[1], 
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = getGeu