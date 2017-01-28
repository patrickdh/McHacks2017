var mongoose = require('mongoose'),
    assert = require('assert'),
    bcrypt = require('bcrypt-nodejs');

// Connection URL
mongoose.connect('mongodb://localhost:27017/McHacks2017');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    capital: Number,
    score: Number,
    companies_owned: [String],
    companies_watched: [String],
    trades: [String],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

// on every save, hash the password
userSchema.pre('save', function(next) {

    this.password = bcrypt.hashSync(this.password, null);

    next();
});

module.exports = User;

// // create a new user called chris
// var chris = new User({
//     first_name: 'chris',
//     email: 'hellffoa',
//     password: 'password'
// });
//
// // call the built-in save method to save to the database
// chris.save(function(err) {
//     if (err) throw err;
//
//     console.log('User saved successfully!');
//     // get all the users
//     User.find({}, function(err, users) {
//         if (err) throw err;
//
//         // object of all the users
//         console.log(users);
//     });
// });
