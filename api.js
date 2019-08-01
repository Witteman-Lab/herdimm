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
        extended: true,
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

app.post('/', (req, res) => {
    console.log("create new user");
    res.end();
})


app.listen(port, () => {
    console.log(`app running on port ${port}.`)
})