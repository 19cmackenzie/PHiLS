// SOURCE FROM HTML
const hueSlider = document.getElementById("hueSlider");
const satSlider = document.getElementById("satSlider");
const briSlider = document.getElementById("briSlider");
const bodyColor = document.getElementById("bodyColor");
const buttonContainer = document.getElementById('buttonContainer');
const effectContainer = document.getElementById('effectContainer');
const onOffButton = document.getElementById("onOff");
let onOffState = onOffButton.checked;

//EVENT LISTENERS
hueSlider.addEventListener("input", updateBackground);
satSlider.addEventListener("input", updateBackground);
briSlider.addEventListener("input", updateBackground);
buttonContainer.addEventListener("click", matchSliderToButtonColor);
onOffButton.addEventListener("click", manageOnOffState);
effectContainer.addEventListener('click', manageEffects);

//easily edit parameters for events / restrictions / time interval for sending requests
const fadeDifference = 100
const flickerDifference = 30
const effectInterval = 300
const fetchInterval = 300

// manage the on/off state of the light 
function manageOnOffState () {
    // use '.checked' to see if the value of the onoff button is true / false
    onOffState = onOffButton.checked;
    updateBackground();
}


// manage effect buttons
function manageEffects(event) {
    if (event.target.matches('button.material-symbols-outlined')) {
        // get value of button clicked
        const effectValue = event.target.value;
        
        // stop any other looping effects
        clearInterval(strobe);
        clearInterval(fade);
        clearInterval(flicker);
        //enable sliders again
        hueSlider.disabled = false;
        satSlider.disabled = false;
        briSlider.disabled = false;
        
        // switch case statement (executes code depending on what button value it matches)
        switch (effectValue) {
            case '1':
                fade = setInterval(fadeEffect, effectInterval);
                hueSlider.disabled = true;
                break
            case '2':
                randomColor();
                break;
            case '3':
                flicker = setInterval(flickerEffect, effectInterval)
                briSlider.disabled = true;
                break;
            case '4':
                strobe = setInterval(randomColor, effectInterval);
                hueSlider.disabled = true;
                satSlider.disabled = true;
                break;
            case '5':
                none;
        };
    };
}


// fade through hues
function fadeEffect() {
    // get current value from slider
    let hueValue = parseInt(hueSlider.value);
    // add 100 units
    hueValue += fadeDifference;
    // once values exceed scale, return to 0
    if (hueValue > 65355) {
        hueValue = 0;
    }
    hueSlider.value = hueValue
    updateBackground();
}


// generate a random number between two limits
function createRandNum(max, min) {
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt;
}


//assign random color to background & sliders
function randomColor() {
    // generare random hue & sat value
    let hueValue = createRandNum(0, 65355)
    let satValue = createRandNum(0, 255)
    
    //set sliders to those values
    hueSlider.value = hueValue
    satSlider.value = satValue
    
    // change background color
    updateBackground();
}

// flicker the lights (like a candle)
function flickerEffect() {
    let briValue = parseInt(briSlider.value);
    let min = briValue - flickerDifference;
    let max = briValue + flickerDifference;
    let newValue = createRandNum(max, min);
    // ensure light doesn't turn off
    if (newValue < 10) {
        newValue = 10;
    briValue = newValue;
    briSlider.value = briValue
}


// change the slider values to match the color of whatever button clicked
function matchSliderToButtonColor(event) {
    // make sure a button is clicked, not the container itself
    if (event.target.classList.contains('quickColorButton')) {
        
        // stop any effects on loop
        clearInterval(strobe);
        clearInterval(fade);
        clearInterval(flicker);
        // ensure sliders enables (incase clicked after an effect)
        hueSlider.disabled = false;
        satSlider.disabled = false;
        briSlider.disabled = false;
        
        // identifies the  hue/sat value of the button clicked
        let hueValue = event.target.getAttribute('hueValue');
        let satValue = event.target.getAttribute('satValue');
        
        //sets sliders to those position
        hueSlider.value = hueValue
        satSlider.value = satValue
        
        //update the background with new slider location
        updateBackground();
    }
}

// update the website's background color
function updateBackground() {
    // get the color and saturation values from the sliders
    const hueValue = hueSlider.value;
    const satValue = satSlider.value;
    
    // convert the color and saturation values to HSL format by dividing their value by the right constant to make the ratios match
    
    const hslColor = `hsl(${hueValue / 181.5}, 100%, ${100 - satValue / 5.1}%)`;
    // update the background color of the body
    bodyColor.style.backgroundColor = hslColor;

}


// send color data to API
function sendDataRequest() {
    
    // get values of sliders
    const hueValue = hueSlider.value;
    const satValue = satSlider.value;
    const briValue = briSlider.value;
    const onOffValue = onOffState;

    // prepare data to be sent through to API
    const colorData = {
        hue: hueValue,
        sat: satValue,
        bri: briValue,
        onOff: onOffValue
    }
    
    // package the data from const colorData
    const packager = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        // format data to JSON string
        body: JSON.stringify(colorData)
    }
    // send data using fetch(url, data) function
    fetch(`http://localhost:3000/sendLightData`, packager)
}


// call the updateBackground function to set the initial color. will update as the eventListeners update
updateBackground();
// every 400 milliseconds, send data values from website to API
sendData = setInterval(sendDataRequest, fetchInterval)
