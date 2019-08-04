const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    url: process.env.API_URL,
    port: process.env.PORT,
    user: process.env.DB_USER,
    host:  process.env.DB_HOST,
    database: process.env.DB_NAME,
    password:  process.env.DB_PASSWORD,
    dbPort:  process.env.DB_PORT,
};
