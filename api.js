const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 8080
const Client = require('pg').Client
const client = new Client({
    user: 'naddyn',
    host: 'localhost',
    database: 'api_herdimm',
    password: '1234',
    port: 5432,
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: false,
    })
)
app.use(express.static(path.join(__dirname, 'dist')));


//to check if the app is connected to the database
client.connect()
    .then(() => console.log("Connecté"))
    .then( () => client.query("select * from vulnerable"))
    .then( results => console.table(results.rows))
    .catch( e => console.log(e))
    .finally( () => client.end())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); });

app.post('/save', (req, res) => {
    console.log("create new user");
    const name = req.body.characterName;
    const reason = req.body.reason;
    console.log("name", + req.body.characterName);
    console.log("reason", + req.body.reason);
    client.query("INSERT INTO vulnerable(name, reasonone,  reasontwo, reasonthree) VALUES (?,?,?,?)", [name, reason, reason, reason], (err, results, fields) => {
        if(err){
            console.log("failed to insert", + err);
            res.sendStatus(500);
            return
        }
        console.log("inserted a new vulnerable with id: " + results);
        res.end();

    })

    res.end();
})


app.listen(port, () => {
    console.log(`app running on port ${port}.`)
})