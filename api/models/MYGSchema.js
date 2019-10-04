var mongoose = require("mongoose");
// create schema
var MYGSchema  = mongoose.Schema({
    "userId" : String,
    "creationTime" : Number
});
// create model if not exists.
module.exports = mongoose.model('MYG', MYGSchema);
