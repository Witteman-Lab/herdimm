var express = require('express');
var router = express.Router();

// initialise mongoose for mongodb
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/api_herdimm', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var characterSchema = require("./models/characterSchema");

const saveCharacters = (request, response) => {
    // check if the characters are sent by the herdimm app
    console.log(request.body);

    // create schema instance which will save the datas
    var characterDB = new characterSchema();

    // response for the client (herdimm application)
    var res = {};

    // character list created with the same element as the characterSchema
    const characterList = charactersList(request.body);

    //  add all elements from character list in the db
    characterDB.collection.insertMany(characterList, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
        response.json(res);
    });
};
// const postCharacters = (request, response) => {
//     // check if the characters are sent by the herdimm app
//     console.log(request.body);
//
//     // create schema instance which will save the datas
//     var characterDB = new characterSchema();
//
//     // response for the client (herdimm application)
//     var res = {};
//
//     // character list created with the same element as the characterSchema
//     const characterList = charactersList(request.body);
//
//     //  add all elements from character list in the db
//     characterDB.collection.insertMany(characterList, function (err, docs) {
//         if (err) {
//             return console.error(err);
//         } else {
//             console.log("Multiple documents inserted to Collection");
//         }
//         response.json(res);
//     });
// };

/**
 * Create an array list of character based on the schema
 * with the characterList sent by the herdimm app
 * @param characterList
 * @returns {Array}
 */
const charactersList = (characterList) => {
    const characterDbList = [];
    characterList.forEach((character) => {
        var characterObject = {
            userId: 0,
            name: character.colors.name,
            type: character.characterType,
            vulnerabilities: character.colors.options,
            svgFile: character.file,
            faceColor: character.colors.face,
            hairColor: character.colors.hairFront,
            glassesId: character.colors.glasses,
            beardsId: character.colors.beards
        };
        characterDbList.push(characterObject);
    });
    return characterDbList;
};

router.post('/herdimm', saveCharacters);
// router.get('/herdimm', postCharacters);

module.exports = router;
