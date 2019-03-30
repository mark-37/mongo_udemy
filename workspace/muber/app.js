const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const routes = require('./routes/routes');
const app = express();

//Watch for the incoming  requests of method GET
//to the route http://localhost:3050/api

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true });
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;