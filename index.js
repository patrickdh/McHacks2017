var express = require('express');
var path = require('path');
var user = require('./models/user');
var company = require('./models/company');
var trade = require('./models/trade');
var bodyParser = require('body-parser');
var passport = require('passport');
var api = require('./routes/api');
var mongoose = require('mongoose');
var session = require('express-session');
var authenticate = require('./routes/authenticate')(passport);
var app = express();
// Connection URL
mongoose.connect('mongodb://localhost:27017/McHacks2017');

require('./routes/routes')(app);

app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080, function() {
  console.log('Kickin\' it in port 8080.');
});

module.exports = app;
