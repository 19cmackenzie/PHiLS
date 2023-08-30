// node applications
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 3000;

// hueBridge data
const USERNAME = "7XQYtgKtcn6vZ2rcFSZD04aeAzYJt3OLzsDlev51"; // username needed to verify a legitamate request specific only to my hueBridge
const IP = '192.168.1.160'; //IP of the Huebridge, the modem that sends HTTP requests to the lights over local WIFI
const URL = `http://${IP}/api/${USERNAME}/lights/`; // the full HTTP directory
const lightID = 2
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to get all users
app.put('/sendLightData', (req, res) => {

 // assign data to in-file variables for easier manipulation
  var hue = req.body.hue
  var sat = req.body.sat
  var bri = req.body.bri
  var onOff = req.body.onOff

  
  // send HTTP request to the bridge
  axios.put(`${URL}${lightID}/state`, {hue:parseFloat(hue), sat:parseFloat(sat), bri:parseFloat(bri), on:onOff})
  .then(response => {
    console.log(response.data)
  })
  console.log(`hue: ${hue}  sat: ${sat}  bri: ${bri} onOff: ${onOff}`); // DEBUG
  res.send()
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 
