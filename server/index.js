const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const keys = require('./keys.js');
const { Pool } = require('pg');
const pgClient = new Pool({
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase,
    user: keys.pgUser,
    password: keys.pgPassword
});
pgClient.on('error', () => console.log('lost postgress :('));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.send('ok');
});

app.get('/events', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM event ORDER BY event_id');

    res.send(values.rows);
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});