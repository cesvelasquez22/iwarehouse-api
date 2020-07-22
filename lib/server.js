const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('https/key.pem', 'utf8');
const certificate = fs.readFileSync('https/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const portHttp = process.env.PORT || 8080;
const portHttps = process.env.PORT || 8483;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use('/', require('../routes/routes'));

app.use(function (req, res, next) {
  return res.status(404).send({ message: 'Route ' + req.url + ' Not found.' });
});

app.init = function () {
  httpServer.listen(portHttp, () => console.log('Listening on port 8080'));
  httpsServer.listen(portHttps, () => console.log('Listening on port 8483'));
};

module.exports = app;
