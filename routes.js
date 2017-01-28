module.exports = function(app){
  var controller = require('./index.js');

  //what view to send when the login section is loaded
  app.get('/login', function(req, res){
    res.sendFile('login.html', {root: __dirname })
  });

  //what view to send when the profile page is loaded
  app.get('/profile', function(req, res){
    res.sendFile('profile.html', {root: __dirname})
  });

}
