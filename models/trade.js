var mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    User = mongoose.model('User'),
    Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost:27017/McHacks2017');

var tradeSchema = mongoose.Schema({
    to_username: {type: String, required: true},
    to_company: {
        type: Schema.ObjectId,
        ref: 'Company'
    },
    to_capital: Number,

    from_username: {type: String, required: true},
    from_company: {
        type: Schema.ObjectId,
        ref: 'Company'
    },
    from_capital: Number,

    status: Boolean
});

var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;

// create a new user called chris
var chris = new User({
    first_name: 'chris',
    email: 'hellffoa',
    password: 'password'
});

var snapchat = new Company({
    name: 'Snapchat'
});

var trade = new Trade({
    to_username: chris,
    to_company: snapchat,
    to_capital: 93.11,

    from_username: chris,
    from_company: snapchat,
    from_capital: 1,

    status: false
});

// call the built-in save method to save to the database
trade.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully!');
    // get all the users
    Trade.find({}, function(err, trades) {
        if (err) throw err;

        // object of all the users
        console.log(trades);
    });
});
