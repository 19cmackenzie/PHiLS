const axios = require('axios');
const fs = require('fs');
var URL = "GET THE URL HERE WHEN HOME";

let rawdata = fs.readFileSync('colorlibrary.json');
let colors = JSON.parse(rawdata);
