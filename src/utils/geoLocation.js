const request = require('request')
const goeLocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGlsbGFyeXVkZWNodWt3dSIsImEiOiJjazBhbDFleTYwajFvM25td2oxZ2lpbTEwIn0.0lNChd_XpKAWqjDiD-BfwA&limit=1'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to access the location information!', undefined)
        } else if (body.features.length === 0) {
            callback('Please check the details you provide and try again!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })


}

module.exports = goeLocation