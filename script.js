const gridContainer = document.querySelector('#gridContainer');
const clearButton = document.querySelector('#clearButton');
const eraserButton = document.querySelector('#eraserButton');
const colorSelectButton = document.querySelector('#colorSelectButton');
const colorSelectInput = document.querySelector('#colorSelect');
const greyscaleButton = document.querySelector('#greyscaleButton');
const randomColorButton = document.querySelector('#randomColorButton');
const rainbowButton = document.querySelector('#rainbowButton');
const sizeInput = document.querySelector('#sizeInput');

let gridSize = 16;

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

createGrid(gridSize);

let brushToggle ='off' 
gridContainer.addEventListener('click', () => {
    brushToggle === 'off' ? brushToggle = 'on' : brushToggle = 'off'
})

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

clearButton.addEventListener('click', clearGrid);

function eraser() {
    draw('#eeeeee');
}

eraserButton.addEventListener('click', eraser);

colorSelectInput.addEventListener('input', () => {
    const selectedColor = colorSelectInput.value;
    draw(selectedColor);
})

colorSelectButton.addEventListener('click', () => {
    const selectedColor = colorSelectInput.value;
    draw(selectedColor); 
})

greyscaleButton.addEventListener('click', () => {
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
})

function randomColor() {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);

    const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    return color;
}

rainbowButton.addEventListener('click', () => {
    const gridBoxes = document.querySelectorAll('.gridBox');
    gridBoxes.forEach(gridBox => {
        gridBox.addEventListener('mouseenter', () => {
            if (brushToggle === 'on') {
                gridBox.style.background = randomColor();
            }
        })
    })
})


randomColorButton.addEventListener('click', () => {
    draw(randomColor());
})

function deleteGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

sizeInput.addEventListener('input', () => {
    deleteGrid();
    createGrid(sizeInput.value);
})