var mongoose = require("mongoose");
// create schema
var MYGSchema  = mongoose.Schema({
    "userId" : String,
    "totalTime" : Number
});
// create model if not exists.
module.exports = mongoose.model('MYG Time', MYGSchema);
