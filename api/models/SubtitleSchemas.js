var mongoose = require("mongoose");
// create schema
var SubstitleSchema  = mongoose.Schema({
    "CheckedSubtitle" : Boolean,
});
// create model if not exists.
module.exports = mongoose.model('CheckedSubtitle', SubstitleSchema);