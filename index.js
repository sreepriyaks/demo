const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const config = require('./const');
const makeRequest = require('./common').makeRequest;

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
    makeRequest(config.validators)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/genesis', (req, res) => {
    let data = req.params.data;
    makeRequest(config.genesis)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/netInfo', (req, res) => {
    let data = req.params.data;
    makeRequest(config.net_info)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/pendingTransactions', (req, res) => {
    let data = req.params.data;
    makeRequest(config.unconfirmedTxs)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/consensusState', (req, res) => {
    let data = req.params.data;
    makeRequest(config.dump_consensus_state)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/blockInfo/:blockHeight', (req, res) => {
    let blockHeight = req.params.blockHeight;
    makeRequest(`${ config.blockInfo }${ blockHeight }`)
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

module.exports = app;