module.exports = function(app) {

    var controller = require('../index.js');

    //what view to send when the login section is loaded
    app.get('/signup', function(req, res) {
        res.send('./signup', {
            title: 'Test'
        });
    });

    //when a new user is created successfully, send the user to the home/profile page
    app.post('/profile/:name', function(req, res) {
        res.sendFile('profile.html', {
            root: __dirname
        });
    });

    //what view to send when the profile page is loaded
    app.get('/profile/:name', function(req, res) {
        res.sendFile('profile.html', {
            root: __dirname
        });
    });

    //when the transactions page is loaded send transactions.html
    app.get('/transactions', function(req, res) {
        res.sendFile('transactions.html', {
            root: __dirname
        });
    });

    //when the companies page is loaded send companies.html
    app.get('/companies', function(req, res) {
        res.sendFile('companies.html', {
            root: __dirname
        });
    });

    //when the teams page is loaded send teams.html
    app.get('/teams', function(req, res) {
        res.sendFile('teams.html', {
            root: __dirname
        });
    });

};
