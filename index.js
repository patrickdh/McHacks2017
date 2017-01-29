var express = require('express');
var app = express();
var path = require('path');
var user = require('./models/user');
var company = require('./models/company');
var trade = require('./models/trade');
var bodyParser = require('body-parser');
var passport = require('passport');
var api = require('./routes/api');

require('./routes/routes')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});

module.exports = app;
