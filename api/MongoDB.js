var express = require('express');
var router = express.Router();
var config = require('./config/configMongoDB');
// initialise mongoose for mongodb
var mongoose = require("mongoose");
mongoose.connect(`mongodb://${config.API_URL_PROD}:27017/api_herdimm`, { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Replace that by getting the uid from Herdimm (either from URL or randomly generated)

var characterSchema = require("./models/characterSchema");
var mygSchema = require("./models/MYGSchema");
var checkedCaptionSchema = require("./models/SubtitleSchemas");

const saveCharacters = (request, response) => {

    // create schema instance which will save the datas
    var characterDB = new characterSchema();
    var totalTimeMYG = new mygSchema();
    var substitleDB = new checkedCaptionSchema();


    // response for the client (herdimm application)
    var res = {};

    // character list created with the same element as the characterSchema
    const characterList = charactersList(request.body.group, request.body.uid);
    const spentTime = mygSpentTime(request.body.totalTime, request.body.uid);
    const checkedCaption = captionUsed(request.body.checkedCaption, request.body.uid);

    //  add all elements from spent time in the db
    totalTimeMYG.collection.insertOne(spentTime, function (err, docs) {
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
            console.log("Characters inserted to Collection");
        }
        response.json(res);
    });

     // add checked subtitle in the db
    substitleDB.collection.insertOne(checkedCaption, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("checked caption inserted to Collection");
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
const charactersList = (characterList, uid) => {
    const characterDbList = [];
    characterList.forEach((character) => {
        console.log(character);
        var characterObject = {
            userId: uid,
            // name: character.colors.name,
            type: character.characterType,
            vulnerabilities: character.colors.options,
            svgFile: character.file,
            faceColor: character.colors.face,
            hairColor: character.colors.hairFront,
            glassesId: character.colors.glasses,
            beardsId: character.colors.beards,
            characterTime: character.colors.characterTimeCreation,
            characterEditionTime: character.colors.characterTimeEdition,
            numberOfEdition: character.colors.numberOfEdition
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
const mygSpentTime = (totalTimeList, uid) => {
    let totalTimeDB = {
        userId: uid,
        totalTime: totalTimeList[0]
    };
    return totalTimeDB;

};

const captionUsed = (checkedCaption, uid) => {
    let checkedCaptionDB = {
        userId: uid,
        checkedCaption: checkedCaption
    };
    return checkedCaptionDB;
};

router.post('/herdimm', saveCharacters);

module.exports = router;
