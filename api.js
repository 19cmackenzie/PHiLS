const axios = require('axios'); // axios is the software used to sent HTTP requests.
const fs = require('fs'); // fs (fileSystem) is the software used to read between files

const USERNAME = "bUrp9C1fJD7CnkOyTILhNJdx-YIKB28PKSfXg0Kk"; // username needed to verify a legitamate request specific only to my hueBridge
const IP = '192.168.1.62'; //IP of the Huebridge, the modem that sends HTTP requests to the lights over local WIFI
const URL = `http://${IP}/api/${USERNAME}/lights/`; // the full HTTP directory

let rawdata = fs.readFileSync('library.json'); // converts .json information from bytes into string form
let library = JSON.parse(rawdata);


function lightswitch(lightId, onOff) { //simple lightswitch to send information over WIFI, turns light on / off 
    try {
        axios.put(`${URL}${lightId}/state`, {on:onOff}); //send HTTP request
        console.log(lightId, onOff); //DEBUG
    } catch (err) {
        console.error(err);
    }
};

function sendData(lightId, func) { // Sends colorData/ other data provided by other light manipulation programmes
    try {
        let hue = library.colors[func].hue; //index hue value from library.json
        let sat = library.colors[func].sat; //index saturation value from library.json
        let bri = library.colors[func].bri; //index saturation value from library.json

        axios.put(`${URL}${lightId}/state`, {hue:hue, sat:sat, bri:bri,}); 
        console.log(lightId, hue, sat, bri); //DEBUG
    } catch (err) {
        console.error(err);
    }
};

lightswitch(1, true)
sendData(1, 'white'); //change light color data


