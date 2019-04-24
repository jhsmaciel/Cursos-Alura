require('marko/node-require').install();
require('marko/express');


const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use('/static',express.static('src/app/public'));

app.use(bodyparser.urlencoded({
    extended: true
}));

const route = require('../app/routes/routes')
route(app);
module.exports = app;