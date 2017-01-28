var express = require('express');
var app = express();
var users = require('./users');

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});
