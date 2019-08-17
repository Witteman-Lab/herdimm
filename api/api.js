const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var postgres = require('./examplePostgresSQL');
var mongodb = require('./exampleMongoDB');

const { port } = require('./config');


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
