const axios = require('axios'); // axios is the software used to sent HTTP requests.
const { randomInt } = require('crypto');
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

function setColor(lightID, color) { // Sends colorData; other data provided by other light manipulation programmes
    try {
        let hue = library.colors[color].hue; 
        let sat = library.colors[color].sat; 

        axios.put(`${URL}${lightID}/state`, {hue:hue, sat:sat,}); 
        console.log(lightID, hue, sat); //DEBUG
    } catch (err) {
        console.error(err);
    }
};

function brightness (lightID, brightness) {
    let bri = brightness;
    axios.put(`${URL}${lightID}/state`, {bri:bri});

}
function fade(lightID, targetColor, transitionTime){ // fade between light colors
    let hue = library.colors[targetColor].hue; //index color library for hue value of desired color
    axios.put(`${URL}${lightID}/state`, {hue:hue, transitiontime: transitionTime}); //send axios PUT command to hueBridge
};

// below are some values that call these defined fuctions. feel free to have fun using them.

lightswitch(1, true) //lightID, on/off state
fade(1, "orange", 100) //lightID, Color, transitiontime(milliseconds)
setColor(1, "orange") //lightID, Color
brightness(1, 205) //light ID, brightness (1-255)






