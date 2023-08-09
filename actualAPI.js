const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to get all users
app.get('/getColorValue', (req, res) => {
    var hue = req.query.hue
    var sat = req.query.sat

    let rawData = fs.readFileSync('library.json');
    let data = JSON.parse(rawData);

    res.json(data)
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 