// get id values from HTML
const colorSlider = document.getElementById("hueSlider");
const saturationSlider = document.getElementById("saturationSlider");
const bodyColor = document.getElementById("bodyColor");

// Add event listeners to the sliders
colorSlider.addEventListener("input", updatePreview);
saturationSlider.addEventListener("input", updatePreview);


function updateBackground() {
    // Get the color and saturation values from the sliders
    const colorValue = colorSlider.value;
    const saturationValue = saturationSlider.value;

    // Convert the color and saturation values to HSL format by dividing their value by the right constant to make the ratios match
    const hslColor = `hsl(${colorValue / 167}, 100%, ${100 - saturationValue / 5.1}%)`;

    // Update the background color of the body
    bodyColor.style.backgroundColor = hslColor;
}

// Call the updateBackground function to set the initial color. will update as the eventListeners update
updateBackground();