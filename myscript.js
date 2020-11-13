let totalRows = 16;
let totalGrids = totalRows * totalRows;

function addGridCells(totalGrids, gridColor, colorSwitch) {
    for (let gridNumber = 0; gridNumber < totalGrids; gridNumber++) {
        let cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.setAttribute("data-color", gridColor);
        cell.setAttribute("data-color-switch", colorSwitch);
        cell.style.color = "rgb(255,255,255)";
        document.querySelector(".grid").appendChild(cell);
    }
}


addGridCells(totalGrids, "black", "on");

function colorInCell(e) {
    if (this.dataset.colorSwitch === "on") {
        if (this.dataset.color === "black") this.style.backgroundColor = "rgb(0,0,0)";
        if (this.dataset.color === "random") {
            let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            this.style.backgroundColor = randomColor;
        }
        if (this.dataset.color === "gray-scale") {
            let cellColor = this.style.backgroundColor;
            console.log(cellColor);

            let rgbColor = cellColor.substring(cellColor.indexOf("(") + 1, cellColor.indexOf(","));
            console.log(rgbColor);
            if (cellColor == "") rgbColor = 220;
            else rgbColor -= 25;
            this.style.backgroundColor = `rgb(${rgbColor},${rgbColor},${rgbColor})`
        };
    }
}

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach(cell => cell.addEventListener("mouseover", colorInCell));

function clearGridCells() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => cell.remove());
}

function updateGridCells(totalRows, gridColor) {
    totalGrids = totalRows * totalRows;
    clearGridCells();
    document.documentElement.style.setProperty("--row-number", totalRows);
    addGridCells(totalGrids, gridColor);

    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => cell.addEventListener("mouseover", colorInCell));
}

function resetGrid(e) {
    const gridCells = document.querySelectorAll(".grid-cell");

    gridColor = gridCells[0].dataset.color;
    gridCells.forEach(cell => cell.removeAttribute("style"));

    totalRows = Number(prompt("How many grid rows would you like? (16 to 100)"));
    if (totalRows !== Number(totalRows)) totalRows = 16;
    if (totalRows < 16) totalRows = 16;
    if (totalRows > 100) totalRows = 100;

    updateGridCells(totalRows, gridColor);
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGrid);

function changeToBlack(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
        cell.removeAttribute("data-color");
        cell.setAttribute("data-color", "black");
    });
}

function changeToRandom(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
        cell.removeAttribute("data-color");
        cell.setAttribute("data-color", "random");
    });
}

function changeToGrayScale(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
        cell.removeAttribute("data-color");
        cell.setAttribute("data-color", "gray-scale");
    });
}


const blackBtn = document.querySelector(".black-btn");
blackBtn.addEventListener("click", changeToBlack);

const rainbowBtn = document.querySelector(".random-btn");
rainbowBtn.addEventListener("click", changeToRandom);

const grayScaleBtn = document.querySelector(".gray-scale-btn");
grayScaleBtn.addEventListener("click", changeToGrayScale);

function colorSwitch(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
        if (cell.dataset.colorSwitch === "on") cell.dataset.colorSwitch = "off";
        else cell.dataset.colorSwitch = "on";
    });
}


const mainGrid = document.querySelector(".grid");
mainGrid.addEventListener("click", colorSwitch);