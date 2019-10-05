var express = require('express');
var router = express.Router();

// initialise mongoose for mongodb
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/api_herdimm', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
let userId = Math.floor(Math.random() * 1000000);

var characterSchema = require("./models/characterSchema");
var mygSchema = require("./models/MYGSchema");

const saveCharacters = (request, response) => {
    // check if the characters are sent by the herdimm app
    console.log(request.body);

    // create schema instance which will save the datas
    var characterDB = new characterSchema();
    var totalTimeMYG = new mygSchema();

    // response for the client (herdimm application)
    var res = {};

    // character list created with the same element as the characterSchema
    const characterList = charactersList(request.body.group);
    const spentTime = mygSpentTime(request.body.totalTime);

    //  add all elements from spent time in the db
    totalTimeMYG.collection.insert(spentTime, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Spent time added to collection");
        }
    });

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


/**
 * Create an array list of character based on the schema
 * with the characterList sent by the herdimm app
 * @param characterList
 * @returns {Array}
 */
const charactersList = (characterList) => {
    const characterDbList = [];
    // let userId = Math.floor(Math.random() * 1000000);
    characterList.forEach((character) => {
        console.log(character);
        var characterObject = {
            userId: userId,
            name: character.colors.name,
            type: character.characterType,
            vulnerabilities: character.colors.options,
            svgFile: character.file,
            faceColor: character.colors.face,
            hairColor: character.colors.hairFront,
            glassesId: character.colors.glasses,
            beardsId: character.colors.beards,
            attTime: character.attTime
        };
        characterDbList.push(characterObject);
    });
    return characterDbList;
};

/**
 * Create a list of total time spend based on the schema
 * with the total time list sent by the herdimm app
 * @param characterList
 * @returns []
 */
const mygSpentTime = (totalTimeList) => {
    let totalTimeDB = {
        userId: userId,
        totalTime: totalTimeList[0]
    };
    return totalTimeDB;

};

router.post('/herdimm', saveCharacters);
// router.get('/herdimm', postCharacters);

module.exports = router;
