var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/api_herdimm');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var characterSchema  = {
    "userId" : String,
    "name" : String,
    "type": String,
    "options": Array,
    "svgFile": String,
    "faceColor": String,
    "hairColor": String,
    "glassesId": Number,
    "beardsId": Number
};
// create model if not exists.
module.exports = mongoose.model('character', characterSchema);
