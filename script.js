const gridContainer = document.querySelector('#gridContainer');
let gridSize = 16;

function createGrid(size) {
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('gridBox');
        gridContainer.appendChild(gridBox);
    }

    const root = document.querySelector(':root');
    root.style.setProperty('--colNum', size);    
}

createGrid(gridSize);

