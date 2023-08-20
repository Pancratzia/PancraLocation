const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const path = require('path');
const port = parseInt(process.env.PORT) || 3000;

const app = express();
app.use(cors());
const db = new Datastore({ filename: './database/nedb_polygons.db', autoload: true });

app.use(bodyParser.json());

// CREATE POLYGON
app.post('/api/polygons', async (req, res) => {
  const existingPolygonsCount = await new Promise((resolve, reject) => {
    db.count({ 'geometry.type': 'Polygon' }, (err, count) => {
      if (err) reject(err);
      resolve(count);
    });
  });

  if (existingPolygonsCount >= 5) {
    res.status(400).json({ message: 'Cannot register more than 5 polygons' });
    return;
  }

  const { features } = req.body;
  const errors = [];

  for (const feature of features) {
    const { properties, geometry } = feature;

    if (geometry.type === 'Polygon') {
      const coordinates = geometry.coordinates || [];

      if (coordinates.length === 0) {
        errors.push('Coordinates are required for each polygon');
        continue;
      }

      const name = properties.name || '';
      const color = properties.color || '';

      if (!name || !color) {
        errors.push('Name and color are required for each polygon');
        continue;
      }

      const polygon = {
        type: 'Feature',
        properties: {
          name: name.toUpperCase(),
          color: color
        },
        geometry: geometry
      };

      try {
        await new Promise((resolve, reject) => {
          db.insert(polygon, (err, insertedPolygon) => {
            if (err) reject(err);
            resolve(insertedPolygon);
          });
        });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error registering the polygon' });
        return;
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ message: errors.join('\n') });
  } else {
    res.json({ message: 'Polygon registered successfully' });
  }
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

  db.findOne({ _id: polygonId }, (err, existingPolygon) => {
    if (err) {
      console.error('Error checking existing polygon:', err);
      res.status(500).json({ message: 'Error deleting the polygon' });
      return;
    }

    if (!existingPolygon) {
      res.status(400).json({ message: 'Polygon does not exist' });
      return;
    }

    db.remove({ _id: polygonId }, {}, (err, numRemoved) => {
      if (err) {
        console.error('Error deleting polygon:', err);
        res.status(500).json({ message: 'Error deleting the polygon' });
      } else {
        res.json({ message: 'Polygon deleted successfully' });
      }
    });
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
