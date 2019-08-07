const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { url, port, user, host, database, password, dbPort } = require('./config');


const Client = require('pg').Client;
const client = new Client({
    user,
    host,
    database,
    password,
    port: dbPort,
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, './public')));


//to check if the app is connected to the database
client.connect();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/hello',function(req,res){
    var username = req.body.characterName;
    var htmlData = 'Hello:' + username;
    res.send(htmlData);
    console.log(htmlData);
});

// app.post('/vulnerable', (req, res) => {
//     console.log("create new user");
//     const name = req.params.characterName;
//     const reason = req.params.reason;
//     // console.log("name", req.params.characterName);
//     // console.log("reason", req.params.reason);
//     res.end();
// });


app.listen(port, () => {
    console.log(`app running on port ${port}.`)
});
