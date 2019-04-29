const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const expressVal = require('express-validator');

module.exports = function(){
    const app = express();
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())

    app.use(expressVal);

    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);
    
    return app;
};