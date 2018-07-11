const request = require('request');
function makeRequest(_url) {
    console.log(_url);
    return new Promise((resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json'
        };

        request.get({ url: _url, headers: headers, json: true }, function (error, response, body) {
            if (error)
                return reject(error.message)

            return resolve(body);
        })
    })
};

module.exports = {
    makeRequest 
}