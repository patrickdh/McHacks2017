module.exports = function(app){

  var controller = require('../index.js');

  app.get('/', function(req, res) {
      res.render('index', {title: "McHacks2017"});
  });

  app.get('/login', function(req, res) {
    res.render('login', {title: 'McHacks2017 Login'});
  })
  
  app.get('/signup', function(req, res){
    res.render('signup', {title: 'McHacks2017 Signup' });
  });

  //when a new user is created successfully, send the user to the home/profile page
  app.post('/profile/:name', function(req, res){
    res.sendFile('profile.html', {root: __dirname});
  });

  //what view to send when the profile page is loaded
  app.get('/profile/:name', function(req, res){
    res.sendFile('profile.html', {root: __dirname});
  });

  //when the transactions page is loaded send transactions.html
  app.get('/transactions', function(req, res){
    res.sendFile('transactions.html', {root: __dirname});
  });

  //when the teams page is loaded send teams.html
  app.get('/teams', function(req, res){
    res.sendFile('teams.html', {root: __dirname});
  });

};
