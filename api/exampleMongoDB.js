var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/api_herdimm', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var mongoOp = require("./models/mongo");

const createCharacter = (request, response) => {
    console.log(request.body);
    var characterDb = new mongoOp();
    var res = {};
    // fetch email and password from REST request.
    // Add strict validation when you use this in Production.

    const characterList = charactersList(request.body);

    characterDb.collection.insertMany(characterList, function (err, docs) {
        if (err) {
                return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
        response.json(res);
    });
};

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
}


router.post('/herdimm', createCharacter);







module.exports = router;
