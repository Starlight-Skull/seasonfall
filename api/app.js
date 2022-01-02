// express
const express = require('express');
const app = express();
const port = 3000;

// bodyparser & cors
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

// requests
const stats = require('./requests/requests_stats');
const {Request_stats} = require("./requests/requests_stats");

app.get('/stats/', (req, res) => {
    stats.getAllStats()
        .then((records) => {
            res.setHeader("Content-Type", "application/json");
            res.send(records);
        }).catch((error) => {
        res.send({error: error, status: 500});
    });
});

app.post('/stats/', (req, res) => {
    const body = req.body;
    if (!body.hasOwnProperty("user")) {
        return res.send({error: "invalid input", status: 422});
    }
    stats.postStats(
        new Request_stats(body.user, body.timeTaken, body.kills, body.attacks, body.attacksHit, body.damageTaken, body.damageDealt)
    ).then(() => {
        res.send({
            body: body,
            message: 'post successful',
            status: 201
        });
    });
});

app.listen(port, () => {
});