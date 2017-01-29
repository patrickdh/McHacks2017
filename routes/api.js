var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Trade = mongoose.model('Trade'),
    User = mongoose.model('User');

function isAuthenticated(req, res, next) {
    if (req.method === "GET") {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/#login');
}

router.use('/profile/', isAuthenticated);

router.route('/profile/:user/trades/new')
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
router.route('/profile/:user/trades')
    .get(function(req, res) {
        var username = req.params.user;
        trade.find({from_username: username}, function(err, trades) {
            if (err) {
              return res.send(500, err);
            }
            return res.send(200, posts);
        });
    });
