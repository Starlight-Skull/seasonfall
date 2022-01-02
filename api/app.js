const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/hello', function(req, res){
    res.send('Hello World!')
});

app.get('', function (req, res) {

});

app.post('', function (req, res) {

});

app.put('', function (req, res) {

});

app.delete('', function (req, res) {

});

app.listen(port, function () {});