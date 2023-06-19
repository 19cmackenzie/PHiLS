const axios = require('axios'); // axios is the software used to sent HTTP requests.
const fs = require('fs'); // fi (fileSystem) is the software used to read between files

const USERNAME = "bUrp9C1fJD7CnkOyTILhNJdx-YIKB28PKSfXg0Kk"; // username needed to verify a legitamate request
const IP = '192.168.1.62'; //IP of the Huebridge, the modem that sends HTTP requests to the lights over local WIFI
const URL = `http://${IP}/api/${USERNAME}/lights/`; // the full HTTP directory

let rawdata = fs.readFileSync('colorlibrary.json'); // converts .json information from bytes into string form
let colors = JSON.parse(rawdata);


const lightswitch = async (lightId, on) => { //simple lightswitch to test if the information can be sent over WIFI, turns light on / off 
    try {
        axios.put(`${URL}${lightId}/state`, {on,});
    } catch (err) {
        console.error(err);
    }
};

lightswitch(1, false);