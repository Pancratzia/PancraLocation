const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const port = parseInt(process.env.PORT) || 3000;

const app = express();
app.use(cors());
const db = new Datastore({ filename: './database/polygons.db', autoload: true });

app.use(bodyParser.json());

// CREATE A NEW POLYGON
app.post('/api/polygons', (req, res) => {
  const { features } = req.body;

  const messages = [];

  features.forEach(feature => {
    const { geometry, properties } = feature;
    if (geometry.type === 'Polygon') {
      db.findOne({ 'properties.name': properties.name }, (err, existingPolygon) => {
        if (err) {
          console.error('Error checking for existing polygon:', err);
          res.status(500).json({ message: 'Error registering the polygon' });
        } else if (existingPolygon) {
          messages.push(`Polygon ${properties.name} already exists`);
        } else {
          const polygon = {
            type: 'Feature',
            properties: properties,
            geometry: geometry
          };
          db.insert(polygon, (err, insertedPolygon) => {
            if (err) {
              console.error('Error inserting polygon:', err);
              res.status(500).json({ message: 'Error registering the polygon' });
            }
          });
        }

        if (messages.length === features.length) {
          if (messages.length > 0) {
            res.status(400).json({ message: messages.join('\n') });
          } else {
            res.json({ message: 'Polygons registered successfully' });
          }
        }
      });
    }
  });
});


// GET ALL POLYGONS
app.get('/api/polygons', (req, res) => {
  db.find({ 'geometry.type': 'Polygon' }, (err, polygons) => {
    if (err) {
      console.error('Error obtaining the list of polygons:', err);
      res.status(500).json({ message: 'Error obtaining the list of polygons' });
    } else {
      res.json(polygons);
    }
  });
});

// DELETE A POLYGON
app.delete('/api/polygons/:id', (req, res) => {
  const polygonId = req.params.id;

  db.findOne({ _id: polygonId }, (err, polygon) => {
    if (err) {
      console.error('Error finding polygon:', err);
      res.status(500).json({ message: 'Error finding the polygon' });
    } else if (!polygon) {
      res.status(404).json({ message: 'Polygon not found' });
    } else {
      db.remove({ _id: polygonId }, {}, (err, numRemoved) => {
        if (err) {
          console.error('Error deleting polygon:', err);
          res.status(500).json({ message: 'Error deleting the polygon' });
        } else {
          res.json({ message: 'Polygon deleted successfully' });
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

