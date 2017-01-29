var express = require('express');
var app = express();
var path = require('path');
var users = require('./models/user');

require('./routes/routes')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});

module.exports = app;
