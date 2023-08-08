require('dotenv').config();


const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT) || 3000;

const app = express();
app.use(cors()); 
const db = new sqlite3.Database(`./database/${process.env.DB_NAME}.db`);

app.use(bodyParser.json());


//TABLES FOR MY BD: POLYGONS AND COORDINATES
db.serialize(() => {
  // Table for polygons
  db.run(`
    CREATE TABLE IF NOT EXISTS polygons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL
    )
  `);

  // Table for coordinates
  db.run(`
    CREATE TABLE IF NOT EXISTS coordinates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      polygon_id INTEGER,
      latitude REAL,
      longitude REAL,
      FOREIGN KEY (polygon_id) REFERENCES polygons(id)
    )
  `);
});


//TESTING DB ENDPOINT

/**********
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
**********/


// CREATE A NEW POLYGON
app.post('/api/polygons', (req, res) => {
  const { name, color, coordinates } = req.body;

  // VERIFY IF THERE ARE MORE THAN 5 POLYGONS
  db.get('SELECT COUNT(*) AS polygon_count FROM polygons', (err, result) => {
    if (err) {
      console.error('Error fetching polygon count:', err);
      res.status(500).json({ message: 'Error registering the polygon' });
    } else {
      const polygonCount = result.polygon_count;
      if (polygonCount >= 5) {
        res.status(400).json({ message: 'Maximum number of polygons reached' });
        return;
      }

      // VERIFY IF POLYGON NAME ALREADY EXISTS
      db.get('SELECT id FROM polygons WHERE name = ?', [name], (err, result) => {
        if (err) {
          console.error('Error checking polygon name:', err);
          res.status(500).json({ message: 'Error registering the polygon' });
        } else if (result) {
          res.status(400).json({ message: 'Polygon name already exists' });
        } else {


          // INSERT NEW POLYGON IF EVERYTHING IS OK
          db.run('INSERT INTO polygons (name, color) VALUES (?, ?)', [name, color], function (err) {
            if (err) {
              console.error('Error inserting polygon:', err);
              res.status(500).json({ message: 'Error registering the polygon' });
            } else {
              const polygonId = this.lastID;

              const insertCoordinates = db.prepare('INSERT INTO coordinates (polygon_id, latitude, longitude) VALUES (?, ?, ?)');
              coordinates.forEach((coord) => {
                insertCoordinates.run(polygonId, coord.latitude, coord.longitude);
              });
              insertCoordinates.finalize();

              res.json({ message: 'Polygon and coordinates registered successfully' });
            }
          });
        }
      });
    }
  });
});


// GET ALL POLYGONS
app.get('/api/polygons', (req, res) => {
  db.all(`
    SELECT p.id AS polygon_id, p.name AS polygon_name, p.color AS polygon_color, c.latitude, c.longitude
    FROM polygons p
    LEFT JOIN coordinates c ON p.id = c.polygon_id
  `, (err, rows) => {
    if (err) {
      console.error('Error obtaining the list of polygons:', err);
      res.status(500).json({ message: 'Error obtaining the list of polygons' });
    } else {
      const polygons = [];
      const seenPolygonIds = new Set();

      rows.forEach((row) => {
        if (!seenPolygonIds.has(row.polygon_id)) {
          seenPolygonIds.add(row.polygon_id);
          polygons.push({
            id: row.polygon_id,
            name: row.polygon_name,
            color: row.polygon_color,
            coordinates: []
          });
        }

        if (row.latitude !== null && row.longitude !== null) {
          const polygonIndex = polygons.findIndex(polygon => polygon.id === row.polygon_id);
          if (polygonIndex !== -1) {
            polygons[polygonIndex].coordinates.push({ latitude: row.latitude, longitude: row.longitude });
          }
        }
      });

      res.json(polygons);
    }
  });
});

// DELETE A POLYGON AND ALL ITS COORDINATES
app.delete('/api/polygons/:id', (req, res) => {
  const polygonId = req.params.id;

  db.serialize(() => {
    db.run('DELETE FROM polygons WHERE id = ?', [polygonId], function (err) {
      if (err) {
        console.error('Error deleting polygon:', err);
        res.status(500).json({ message: 'Error deleting the polygon' });
      } else {
        db.run('DELETE FROM coordinates WHERE polygon_id = ?', [polygonId], function (err) {
          if (err) {
            console.error('Error deleting coordinates:', err);
            res.status(500).json({ message: 'Error deleting the coordinates' });
          } else {
            res.json({ message: 'Polygon and coordinates deleted successfully' });
          }
        });
      }
    });
  });
});



app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
})

