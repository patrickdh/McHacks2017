var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/McHacks2017');

var companySchema = new mongoose.Schema({
    name: {type: String, required : true},
    valuation: Number,
    growth: Number,
    num_employees: String,
    funding_rounds: Number,
    total_funding: Number,
    user: String
});

var Company = mongoose.model('Company', companySchema);

mongoose.Schema.Types.Company = companySchema;

module.exports = Company;
