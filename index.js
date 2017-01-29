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

app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('./views/index.html', {title: "Hello"});
});

app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});

module.exports = app;
