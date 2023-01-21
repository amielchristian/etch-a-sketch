// Brushes
let brushes = document.querySelectorAll("#brushes");
for (let i = 0; i < brushes.length; i++) {
    let brush = brushes.item(i);
    brush.oninput=changeBrush;
}
let regularBrushSelected = true;
let rainbowBrushSelected = false;
let eraserSelected = false;
// Color picker
let colorPicker = document.querySelector(".color-picker");
// Slider
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".slider-value");
// Grid
let grid = document.querySelector(".grid");
let squareAmount = slider.value * slider.value;

// creates a blank 16x16 grid when the site is first loaded
sliderValue.innerHTML = slider.value+"x"+slider.value;
createNewGrid();
// updates the grid when the slider is adjusted
slider.oninput=adjustSlider;

let mouseIsDown = false;
document.body.onmousedown = function()  { mouseIsDown = true };
document.body.onmouseup = function()  { mouseIsDown = false };

function createNewGrid()   {
    console.log(squareAmount);
    grid.innerHTML = '';
    let squareSize = 480/slider.value;
    for (let i = 0; i < squareAmount; i++)  {
        let element = document.createElement("div");
        element.className = "grid-cell";
        element.style = "background-color: white; height: "+squareSize+"px; width: "+squareSize+"px;";
        element.addEventListener("mouseover", colorCell);
        element.addEventListener("mousedown", colorCell);
        grid.appendChild(element);
    }
}

function adjustSlider() {
    sliderValue.innerHTML = slider.value+"x"+slider.value;
    squareAmount = slider.value * slider.value;
    createNewGrid();
}

function changeBrush()  {
    if (this.value === "regular")   {
        regularBrushSelected = true;
        rainbowBrushSelected = false;
    }
    if (this.value === "rainbow")   {
        regularBrushSelected = false;
        rainbowBrushSelected = true;
    }
}

function generateRandomColor()  {
    let hexadecimal = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color = color + hexadecimal.charAt(Math.floor(Math.random()*15)+1);
    }
    return color;
}

function colorCell(mouseEvent)    {
    let squareSize = mouseEvent.target.style.width;

    if (mouseEvent.type === 'mouseover' && !mouseIsDown) return;
    if (regularBrushSelected)    {
        mouseEvent.target.style = "background-color: "+colorPicker.value+"; height: "+squareSize+"; width: "+squareSize+";";
    }
    if (rainbowBrushSelected)   {
        mouseEvent.target.style = "background-color: "+generateRandomColor()+"; height: "+squareSize+"; width: "+squareSize+";";
    }
}