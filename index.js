const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000;
const baseUrl = "http://localhost:26657/broadcast_tx_commit?";

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.post('/:tx', (req, res) => {
    let tx = req.params.tx;
    makeRequest(`${ baseUrl }tx=${ tx }`)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send(err);
    }) 
});

app.listen(port, () => {
    console.log(`Server is up on port : ${ port }`);
});


function makeRequest(_url) {
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

module.exports = app;