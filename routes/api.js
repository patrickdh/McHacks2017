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

    app.route('/user/:user')
    .get(function(req, res) {
        User.find({ username: req.params.user }).exec(function(err, users) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, users[0]);
        });
    });


app.route('/users')
    .get(function(req, res) {
        User.find().sort({ companies_owned: -1 }).exec(function(err, users) {
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
            return res.status(200).send(companies);
        });
    });

app.route('/company/:company')
    .get(function(req, res) {
        Company.find({ name: req.params.company }).exec(function(err, companies) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, companies[0]);
        });
    });

app.route('/bid/:user')
    .post(function(req, res) {
        Company.find({}, function(err, companies) {
            if (err) return res.send(500, {error_message: err});
            for (var j=0; j<companies.length; j++) 
            for (var i=0; i<req.body.bids.length; i++) {
                if (companies[j].name == req.body.bids[i].company && req.body.bids[i].price > 0) {
                    companies[j].user = req.params.user;
                    break;
                }

                companies[j].save(function(err, company) {
                    if (err) {
                        return res.send(500, {error_message: err});
                    }
                });
            }
        });

        User.findOne({username: req.params.user}, function(err, cuser) {
                if (err) return res.send(500, {error_message: err});

            var companies_owned = [];
            for (var i=0; i<req.body.bids.length; i++) {
                if (req.body.bids[i].price > 0) {
                    companies_owned[i] = req.body.bids[i].company;
                    cuser.capital = cuser.capital - req.body.bids[i].price * 100;
                }
            }
            // hack lol
            var cleanedOwned = [];
            var cleanIndex = 0;
            for (var i=0; i<companies_owned.length; i++) {
                if (companies_owned[i]) {
                    cleanedOwned[cleanIndex++] = companies_owned[i];
                }
            }
            companies_owned = cleanedOwned;
            User.findOneAndUpdate({username: req.params.user}, { capital: cuser.capital, companies_owned: companies_owned, bids_json: JSON.stringify(req.body.bids) }, {upsert:true}, function(err, doc){
                if (err) return res.send(500, { error_message: err });
                return res.status(200).send({ state: 'success'});
            });
        });
    });

app.route('/bid/:user')
    .get(function(req, res) {
        User.findOne({username: req.params.user}, function(err, doc) {
            if (err) return res.send(500, { error_message: err });
            return res.status(200).send(doc);
        });
        // User.findOne({ username: req.params.user }).exec(function(err, user) {
        //     if (err) {
        //         return res.send(500, err);
        //     }
        //     console.log(user);
            
        //     user.save(function(err, userupdated) {
        //     if (err) {
        //         return res.send(500, err);
        //     }
        //     return res.json(userupdated);
        //     });
        // });
    });
}