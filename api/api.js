const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var postgres = require('./examplePostgresSQL');
var mongodb = require('./exampleMongoDB');
const { port } = require('./config');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.use('/api/postgres', postgres);
app.use('/api/mongodb', mongodb);


app.listen(port, () => {
    console.log(`app running on port ${port}.`)
});
