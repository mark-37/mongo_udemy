const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

//Watch for the incoming  requests of method GET
//to the route http://localhost:3050/api

app.use(bodyParser.json());
routes(app);


module.exports = app;