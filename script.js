// Brushes
let brushes = document.querySelectorAll("#brushes");
for (let i = 0; i < 3; i++) {
    let brush = brushes.item(i);
    brush.oninput=changeBrush;
}
let regularBrushSelected = true;
let rainbowBrushSelected = false;
let shaderSelected = false;
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

function createNewGrid()   {
    console.log(squareAmount);
    grid.innerHTML = '';
    let squareSize = 480/slider.value;
    for (let i = 0; i < squareAmount; i++)  {
        let element = document.createElement("div");
        element.className = "grid-cell";
        element.style = "background-color: white; height: "+squareSize+"px; width: "+squareSize+"px;";
        grid.appendChild(element);

        // coloring features
            /*
            let mouseIsDown = false;
            element.addEventListener("mousedown", function(){mouseIsDown = true;});
            element.addEventListener("mouseup", function(){mouseIsDown = false;});

            element.addEventListener("mousemove", function()    {
                if (mouseIsDown)    {
                    element.style = "background-color: "+colorPicker.value+"; height: "+squareSize+"px; width: "+squareSize+"px;";
                }
            });
            */

        element.addEventListener("mousemove", function()    {
            if (regularBrushSelected)    {
                element.style = "background-color: "+colorPicker.value+"; height: "+squareSize+"px; width: "+squareSize+"px;";
            }
            else if (rainbowBrushSelected)   {
                element.style = "background-color: "+generateRandomColor()+"; height: "+squareSize+"px; width: "+squareSize+"px;";
            }
            else if (shaderSelected)   {
                element.style = "background-color: "+addShade(element)+"; height: "+squareSize+"px; width: "+squareSize+"px;";
            }
        });
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
        shaderSelected = false;
    }
    if (this.value === "rainbow")   {
        regularBrushSelected = false;
        rainbowBrushSelected = true;
        shaderSelected = false;
    }
    if (this.value === "shader")   {
        regularBrushSelected = false;
        rainbowBrushSelected = false;
        shaderSelected = true;
    }
}

function generateRandomColor()  {
    let hexadecimal = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color = color + hexadecimal.charAt(Math.floor(Math.random()*16)+1);
    }
    return color;
}

function addShade(x) {
    let baseColor = x.style.backgroundColor;
    console.log(baseColor.red);

}