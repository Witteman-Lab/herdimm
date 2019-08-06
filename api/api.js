const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { url, port, user, host, database, password, dbPort } = require('./config');


const Client = require('pg/lib').Client;
const client = new Client({
    user,
    host,
    database,
    password,
    port: dbPort,
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'dist')));


//to check if the app is connected to the database
client.connect();

client.query('SELECT * from character', (err, res) =>{
    console.log(err,res);
    client.end();
})
    // .then(() => console.log("Connecté"))
    // .then( () => client.query("select * from AvataR"))
    // .then( results => console.table(results.rows))
    // .catch( e => console.log(e))
    // .finally( () => client.end());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); });

app.post('/save', (req, res) => {
    console.log("create new user");
    const name = req.params.characterName;
    const reason = req.params.reason;
    console.log("name", req.params.characterName);
    console.log("reason", req.params.reason);
    //         client.query("INSERT INTO vulnerable(name, reasonone,  reasontwo, reasonthree) VALUES (?,?,?,?)", [name, reason, reason, reason], (err, results, fields) => {
    //             if (err) {
    //         console.log("failed to insert", + err);
    //         res.sendStatus(500);
    //         return
    //     }
    //     console.log("inserted a new vulnerable with id: " + results);
    //     res.end();
    // });
    res.end();
});


app.listen(port, () => {
    console.log(`app running on port ${port}.`)
});
