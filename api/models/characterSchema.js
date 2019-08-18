var mongoose = require("mongoose");
// create schema
var characterSchema  = mongoose.Schema({
    "userId" : String,
    "name" : String,
    "type": String,
    "options": Array,
    "svgFile": String,
    "faceColor": String,
    "hairColor": String,
    "glassesId": Number,
    "beardsId": Number
});
// create model if not exists.
module.exports = mongoose.model('character', characterSchema);
