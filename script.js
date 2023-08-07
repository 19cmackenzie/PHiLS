// get id values from HTML
const hueSlider = document.getElementById("hueSlider");
const satSlider = document.getElementById("satSlider");
const bodyColor = document.getElementById("bodyColor");
const buttonContainer = document.getElementById('buttonContainer');

//event listeners
hueSlider.addEventListener("input", validateChosenColor);
satSlider.addEventListener("input", validateChosenColor);
buttonContainer.addEventListener('click', changeSlider);

function changeSlider(event) {
    // make sure a button is clicked, not the container itself
    if (event.target.classList.contains('quickColorButton')) {
        // identifies the  hue/sat value of the button clicked
        let hueValue = event.target.getAttribute('hueValue');
        let satValue = event.target.getAttribute('satValue');
        // sets sliders to those position
        hueSlider.value = hueValue
        satSlider.value = satValue
        //update the background with new slider location
        validateChosenColor();
    }
}

function validateChosenColor() {
    // get the color and saturation values from the sliders
    const colorValue = hueSlider.value;
    const saturationValue = satSlider.value;
    // convert the color and saturation values to HSL format by dividing their value by the right constant to make the ratios match
    const hslColor = `hsl(${colorValue / 167}, 100%, ${100 - saturationValue / 5.1}%)`;
    // update the background color of the body
    bodyColor.style.backgroundColor = hslColor;
}

// call the validateChosenColor function to set the initial color. will update as the eventListeners update
validateChosenColor();

