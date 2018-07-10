const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000;
const { tx_baseUrl, qry_baseUrl, blkchnStatusUrl } = require('./const');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/:tx', (req, res) => {
    let tx = req.params.tx;

    makeRequest(`${ tx_baseUrl }"${tx}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/:data', (req, res) => {
    let data = req.params.data;
    makeRequest(`${ tx_baseUrl }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/status', (req, res) => {
    makeRequest(blkchnStatusUrl)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.listen(port, () => {
    console.log(`Server is up on port : ${port}`);
});


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

module.exports = app;