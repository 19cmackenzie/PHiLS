// get id values from HTML
const hueSlider = document.getElementById("hueSlider");
const satSlider = document.getElementById("satSlider");
const briSlider = document.getElementById("briSlider");
const bodyColor = document.getElementById("bodyColor");
const buttonContainer = document.getElementById('buttonContainer');
const onOffButton = document.getElementById("onOff");
let onOffState = onOffButton.checked;

//event listeners
hueSlider.addEventListener("input", validateChoice);
satSlider.addEventListener("input", validateChoice);
briSlider.addEventListener("input", validateChoice);
buttonContainer.addEventListener("click", changeSlider);
onOffButton.addEventListener("click", manageOnOffState);


function changeSlider(event) {
    // make sure a button is clicked, not the container itself
    if (event.target.classList.contains('quickColorButton')) {
        
        // identifies the  hue/sat value of the button clicked
        let hueValue = event.target.getAttribute('hueValue');
        let satValue = event.target.getAttribute('satValue');
        let briValue = event.target.getAttribute('briValue');
        
        // sets sliders to those position
        hueSlider.value = hueValue
        satSlider.value = satValue
        briSlider.value = briValue
        
        //update the background with new slider location
        validateChoice();
    }
}


function manageOnOffState () {
    // use '.checked' to see if the value of the onoff button is true / false
    onOffState = onOffButton.checked;
    validateChoice();
}


function validateChoice() {
   
    // get the color and saturation values from the sliders
    const hueValue = hueSlider.value;
    const satValue = satSlider.value;
    const briValue = briSlider.value;
    const onOffValue = onOffState;
    
    // convert the color and saturation values to HSL format by dividing their value by the right constant to make the ratios match
    const hslColor = `hsl(${hueValue / 167}, 100%, ${100 - satValue / 5.1}%)`;
    // update the background color of the body
    bodyColor.style.backgroundColor = hslColor;

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

// call the validateChoice function to set the initial color. will update as the eventListeners update
validateChoice();