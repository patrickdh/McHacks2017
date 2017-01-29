module.exports = function(app, passport) {

    //sends successful login state back to angular
    app.get('/success', function(req, res) {
        res.send({
            state: 'success',
            user: req.user ? req.user : null
        });
    });

    //sends failure login state back to angular
    app.get('/failure', function(req, res) {
        res.send({
            state: 'failure',
            user: null,
            message: "Invalid username or password"
        });
    });

    //log in
    app.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            console.log('ello');
            if (user) { 
                var name = user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : null;
                res.send({ state: 'success', username: user.username, name: name });
            }
            else {
                res.send({ state: 'error', error_message: 'Invalid user.' });
            }
        })(req, res, next); 
    });

    //sign up
    app.post('/signup', passport.authenticate('signup'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        var name = req.user.first_name && req.user.last_name ? req.user.first_name + ' ' + req.user.last_name : null;
        res.send({ state: 'success', username: req.user.username, name: name });
  });

    //log out
    app.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
