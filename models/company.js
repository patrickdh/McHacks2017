var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/McHacks2017');

var companySchema = mongoose.Schema({
    name: String,
    valuation: Number,
    growth: Number
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
