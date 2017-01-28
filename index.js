var express = require('express');
var app = express();
var path = require('path');
var users = require('./models/user');

require('./routes/routes')(app);

app.use(express.static(__dirname + '/views/'));

app.get('/', function(req, res) {
    res.render('index', {title: "McHacks2017"});
});

app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});

module.exports = app;
