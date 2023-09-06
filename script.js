
// SOURCE FROM HTML
// sliders & buttons
const hueSlider = document.getElementById("hueSlider");
const satSlider = document.getElementById("satSlider");
const briSlider = document.getElementById("briSlider");
const bodyColor = document.getElementById("bodyColor");
const buttonContainer = document.getElementById('buttonContainer');
const onOffButton = document.getElementById("onOff");
let onOffState = onOffButton.checked;
// effects
const effectContainer = document.getElementById('effectContainer');
let strobe = null;
let flicker = null;

//EVENT LISTENERS
// sliders & buttons
hueSlider.addEventListener("input", updateBackground);
satSlider.addEventListener("input", updateBackground);
briSlider.addEventListener("input", updateBackground);
buttonContainer.addEventListener("click", matchSliderToButtonColor);
onOffButton.addEventListener("click", manageOnOffState);
effectContainer.addEventListener('click', manageEffects);

// move hue& sat sliders to the specified values
function updateColorSliders(hueValue, satValue) {
    hueSlider.value = hueValue
    satSlider.value = satValue
}


// manage the on/off state of the light 
function manageOnOffState () {
    // use '.checked' to see if the value of the onoff button is true / false
    onOffState = onOffButton.checked;
    updateBackground();
}


// manage effect button
function manageEffects(event) {
    if (event.target.matches('button.material-symbols-outlined')) {
        // get value of button clicked
        const effectValue = event.target.value;
        
        // stop any other looping effects
        clearInterval(strobe);
        clearInterval(fade);
        clearInterval(flicker);
        
        // switch case statement (executes code depending on what button value it matches)
        switch (effectValue) {
            case '1':
                fadeLight();
            case '2':
                randomColor();
                break;
            case '3':
                flickerLight();
                break;
            case '4':
                strobeLight();
                break;
        };
    };
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
    
    // set sliders to those values
    updateColorSliders(hueValue, satValue);
    
    // change background color
    console.log()
    updateBackground();
}

// strobe loop
function strobeLight() {
    strobe = setInterval(randomColor, 500);
}


// change the slider values to match the color of whatever button clicked
function matchSliderToButtonColor(event) {
    // make sure a button is clicked, not the container itself
    if (event.target.classList.contains('quickColorButton')) {
        
        // identifies the  hue/sat value of the button clicked
        let hueValue = event.target.getAttribute('hueValue');
        let satValue = event.target.getAttribute('satValue');
        
        // sets sliders to those position
        updateColorSliders(hueValue, satValue);
        
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
sendData = setInterval(sendDataRequest, 400)
  
