let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".slider-value");
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
    }
}

function adjustSlider() {
    sliderValue.innerHTML = slider.value+"x"+slider.value;
    squareAmount = slider.value * slider.value;
    createNewGrid();
}