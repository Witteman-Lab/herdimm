var express = require('express');
var router = express.Router();
const { user, host, database, password, dbPort } = require('./config');


const Client = require('pg').Client;
const client = new Client({
    user,
    host,
    database,
    password,
    port: dbPort,
});

client.connect();

const createCharacter = (request, response) => {
    const characterList = request.body;
    console.log(request.body);
    const character = {
        userid: 0,
        name: characterList[0].colors.name,
        type: characterList[0].characterType,
        vulnerabilities: characterList[0].colors.options,
        svgFile: characterList[0].file,
        facecolor: characterList[0].colors.face,
        haircolor: characterList[0].colors.hairFront,
        glassesid: 0,
        beardsid: 0
    };
    client.query('INSERT INTO characters (userid, name, type, vulnerabilities, svgfile, facecolor, haircolor, glassesid, beardsid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [character.userid, character.name, character.type, character.vulnerabilities, character.svgFile,
            character.facecolor, character.haircolor, character.glassesid, character.beardsid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${character.userid}`)
    })
};

router.post('/herdimm', createCharacter);



module.exports = router;
