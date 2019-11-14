var express = require('express');
var router = express.Router();
const { user, host, database, password, dbPort } = require('./configPostgres');

const client = {
    user,
    host,
    database,
    password,
    port: dbPort,
};

const pgp = require('pg-promise')({
    capSQL: true
});

const db = pgp(client);

// set all columns in characters table so postgres will understand
const cs = new pgp.helpers
    .ColumnSet(['userid', 'name', 'type',
    'vulnerabilities', 'svgfile', 'facecolor',
    'haircolor', 'glassesid', 'beardsid'],
    {table: 'characters'}
    );

const createCharacter = (request, response) => {
    // check if the characters are sent by the herdimm app
    console.log(request.body);

    // get character list with the right format for the db
    const characterList = charactersList(request.body);

    // insert character inside query with the columns format
    const query = pgp.helpers.insert(characterList, cs);
    db.none(query)
        .then(data => {
            response.status(201).send('Characters saved successfully on postgresSQL')
        })
        .catch(error => {
            console.log(error);
            response.status(400).send(error)
        });
};

router.post('/herdimm', createCharacter);


/**
 * Create an array list of character based on the columns inside "characters" table
 * with the characterList sent by the herdimm app
 * @param characterList
 * @returns {Array}
 */
const charactersList = (characterList) => {
    const characterDbList = [];
    characterList.forEach((character) => {
        if (character.colors.beards === "") {
            character.colors.beards = -1;
        }
        if (character.colors.glasses === "") {
            character.colors.glasses = -1;
        }
        var characterObject = {
            userid: 0,
            name: character.colors.name,
            type: character.characterType,
            vulnerabilities: character.colors.options,
            svgfile: character.file,
            facecolor: character.colors.face,
            haircolor: character.colors.hairFront,
            glassesid: character.colors.glasses,
            beardsid: character.colors.beards
        };
        characterDbList.push(characterObject);
    });
    return characterDbList;
};


module.exports = router;
