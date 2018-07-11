const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 3000;
const config = require('./const');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/:tx', (req, res) => {
    let tx = req.params.tx;

    makeRequest(`${ config.tx_baseUrl }"${tx}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/status', (req, res) => {
    makeRequest(config.blkchnStatusUrl)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/validators', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.validators }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/genesis', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.genesis }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/netInfo', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.net_info }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/pendingTransactions', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.unconfirmedTxs }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/consensusState', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.dump_consensus_state }"${data}"`)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/:data', (req, res) => {
    let data = req.params.data;
    makeRequest(`${config.qry_baseUrl }"${data}"`)
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