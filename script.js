const gridContainer = document.querySelector('#gridContainer');
const clearButton = document.querySelector('#clearButton');
const eraserButton = document.querySelector('#eraserButton');
const colorSelectButton = document.querySelector('#colorSelectButton');
const colorSelectInput = document.querySelector('#colorSelect');
const greyscaleButton = document.querySelector('#greyscaleButton');
const randomColorButton = document.querySelector('#randomColorButton');
const rainbowButton = document.querySelector('#rainbowButton');
const sizeInput = document.querySelector('#sizeInput');
const sizeValue = document.querySelector('#sizeValue');
const gridLinesButton = document.querySelector('#gridLinesButton');

let gridSize = 16;

createGrid(gridSize);
sizeValue.textContent = "16x16";

let brushToggle ='off' 
gridContainer.addEventListener('click', () => {
    brushToggle === 'off' ? brushToggle = 'on' : brushToggle = 'off'
})

let gridLines = 'off';
gridLinesButton.addEventListener('click', () => {
    gridLines === 'off' ? gridLines = 'on' : gridLines = 'off';
})

gridLinesButton.addEventListener('click', toggleGridLines);

clearButton.addEventListener('click', clearGrid);

eraserButton.addEventListener('click', eraser);

colorSelectInput.addEventListener('input', colorSelect);

colorSelectButton.addEventListener('click', colorSelect);

greyscaleButton.addEventListener('click', greyscale);

rainbowButton.addEventListener('click', rainbow);

randomColorButton.addEventListener('click', () => {
    draw(randomColor());
})

sizeInput.addEventListener('input', changeSize);

function createGrid(size) {
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('gridBox');
        gridContainer.appendChild(gridBox);
    }

    const root = document.querySelector(':root');
    root.style.setProperty('--colNum', size); 
    
    draw('#5B8FB9');
}

function toggleGridLines() { 
    const gridBoxes = document.querySelectorAll('.gridBox');   
    if (gridLines === 'on') {        
        gridBoxes.forEach(gridBox => {
            gridBox.style.border = 'solid 1px #03001C';
        })
    } else {
        gridBoxes.forEach(gridBox => {
            gridBox.style.border = 'none';
        })
    }
}

function draw(color) {
    const gridBoxes = document.querySelectorAll('.gridBox');
    gridBoxes.forEach(gridBox => {
        gridBox.addEventListener('mouseenter', () => {
            if (brushToggle === 'on') {
                gridBox.style.background = color;
            }
        })
    })
}

function clearGrid() {
    const gridBoxes = document.querySelectorAll('.gridBox');
    gridBoxes.forEach(gridBox => {
        gridBox.style.background = '#eeeeee';
    })
    brushToggle = 'off';
    draw('#5B8FB9');
}

function deleteGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function changeSize() {
    deleteGrid();
    createGrid(sizeInput.value);
    sizeValue.textContent = `${sizeInput.value}x${sizeInput.value}`;
}

function greyscale() {
    const gridBoxes = document.querySelectorAll('.gridBox');
    gridBoxes.forEach(gridBox => {        
        gridBox.opacity = 0.1;
        gridBox.addEventListener('mouseenter', () => {
            if (brushToggle === 'on') {
                gridBox.opacity += 0.1;
                gridBox.style.background = `rgba(0, 0, 0, ${gridBox.opacity})`;                
            }
        }) 
    })
}

function randomColor() {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);

    const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    return color;
}

function rainbow() {
    const gridBoxes = document.querySelectorAll('.gridBox');
    gridBoxes.forEach(gridBox => {
        gridBox.addEventListener('mouseenter', () => {
            if (brushToggle === 'on') {
                gridBox.style.background = randomColor();
            }
        })
    })
}

function colorSelect() {
    const selectedColor = colorSelectInput.value;
    draw(selectedColor);
}

function eraser() {
    draw('#eeeeee');
}