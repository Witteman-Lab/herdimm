var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect('mongocharacterDb://localhost:27017/api_herdimm');
var mongoOp = require("./models/mongo");

const createCharacter = (request, response) => {
    console.log(request.body);
    const characterList = request.body;
    var characterDb = new mongoOp();
    var res = {};
    // fetch email and password from REST request.
    // Add strict validation when you use this in Production.
    const character = {
        userid: 0,
        name: characterList[0].colors.name,
        type: characterList[0].characterType,
        vulnerabilities: characterList[0].colors.options,
        svgFile: characterList[0].file,
        facecolor: characterList[0].colors.face,
        haircolor: characterList[0].colors.hairFront,
        glassesid: characterList[0].colors.glasses,
        beardsid: characterList[0].colors.beards
    };

    characterDb.userId = character.userid;
    characterDb.name = character.name;
    characterDb.type = character.type;
    characterDb.vulnerabilities = character.vulnerabilities;
    characterDb.svgFile = character.svgFile;
    characterDb.faceColor = character.facecolor;
    characterDb.hairColor = character.haircolor;
    characterDb.glassesId = character.glassesid;
    characterDb.beardsId = character.beardsid;

    characterDb.save(function(err) {
        if (err) {
            res = {"error" : true,"message" : "Error adding data"};
        } else {
            res = {"error" : false,"message" : "Data added"};
        }
        response.json(res);
    });
};


router.post('/herdimm', createCharacter);







module.exports = router;
