/** Database setup. */

const { Client } = require('pg');
const { DB_URI } = require('./config');

const client = new Client('postgres:///survey-test');

// const client = new Client({
//   connectionString: DB_URI
// });

client.connect();

module.exports = client;