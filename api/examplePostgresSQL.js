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
    // const { name, email } = request.body;
    const character = {userid: 0, name: 'John', type: 'avatar', vulnerabilities: [],
        svgFile: 'adult01', facecolor: 'red', haircolor: 'blue', glassesid: 0, beardsid: 0};
    client.query('INSERT INTO characters (userid, name, type, vulnerabilities, svgfile, facecolor, haircolor, glassesid, beardsid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [character.userid, character.name, character.type, character.vulnerabilities, character.svgFile,
            character.facecolor, character.haircolor, character.glassesid, character.beardsid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${character.userid}`)
    })
};

const createListeCharacter = (request, response) => {

};

router.post('/herdimm', createCharacter);



module.exports = router;
