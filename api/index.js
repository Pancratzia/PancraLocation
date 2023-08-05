require('dotenv').config();


const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const port = parseInt(process.env.PORT) || 3000;

const app = express();
const db = new sqlite3.Database(`./database/${process.env.DB_NAME}.db`);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//Testing Endpoint

app.get('/db-connection', (req, res) => {
    db.get('SELECT 1', (err, result) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        res.status(500).json({ message: 'Failed to connect to the database' });
      } else {
        console.log('Connected to the database successfully!');
        res.json({ message: `Connected to the database ${process.env.DB_NAME}.db successfully` });
      }
    });
});



app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
})

