function isAuthenticated(req, res, next) {
    if (req.method === "GET") {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

module.exports = function(app) {
    var mongoose = require('mongoose'),
        Trade = mongoose.model('Trade'),
        User = mongoose.model('User'),
        Company = mongoose.model('Company');

app.use('/profile/', isAuthenticated);

app.route('/profile/:user/trades/new')
    .post(function(req, res) {
        var trade = new Trade();
        trade.from_username = req.body.from_username;
        trade.from_capital = req.body.from_capital;
        var company = (req.body.from_company) ?
            Company.findOne({
                name: req.body.from_company
            }) : null;
        trade.from_company = company;

        trade.to_username = req.body.to_username;
        trade.to_capital = req.body.to_capital;
        company = (req.body.from_company) ?
            Company.findOne({
                name: req.body.from_company
            }) : null;
        trade.to_company = company;

        trade.save(function(err, trade) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(trade);
        });
    });

//Get all trades
app.route('/profile/:user/trades')
    .get(function(req, res) {
        var username = req.params.user;
        Trade.find({from_username: username}, function(err, trades) {
            if (err) {
              return res.send(500, err);
            }
            return res.send(200, trades);
        });
    });

app.route('/users')
    .get(function(req, res) {
        User.find().sort({ score: -1 }).exec(function(err, users) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, users);
        });
    });

app.route('/companies')
    .get(function(req, res) {
        Company.find().sort({ total_funding: -1 }).exec(function(err, companies) {
            if (err) {
                return res.send(500, err);
            }
            console.log(companies);
            return res.status(200).send(companies);
        });
    });
}