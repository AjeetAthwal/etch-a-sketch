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

function randomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function grayScaler(oldColor) {
    let rgbColor = oldColor.substring(oldColor.indexOf("(") + 1, oldColor.indexOf(","));

    if (oldColor == "") rgbColor = 220;
    else rgbColor -= 25;
    return `rgb(${rgbColor},${rgbColor},${rgbColor})`
}

function colorInCell(e) {
    switch (this.dataset.colorSwitch) {
        case "on":
            switch (this.dataset.color) {
                case "black":
                    this.style.backgroundColor = "rgb(0,0,0)";
                    break;
                case "white":
                    this.style.backgroundColor = "rgb(255,255,255)";
                    break;
                case "random":
                    this.style.backgroundColor = randomHexColor();
                    break;
                case "gray-scale":
                    this.style.backgroundColor = grayScaler(this.style.backgroundColor);
                    break;
            }
            break
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


function changeBtn(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    const btns = document.querySelectorAll(".change-btn");

    // this code relies on the first class name of these buttons being of the structure dataColor-btn <- this class MUST be first
    let dataColorClass = this.className;
    // keep only first class
    if (dataColorClass.indexOf(" ") !== -1) dataColorClass = dataColorClass.substring(0, dataColorClass.indexOf(" "))
    // remove "-btn"
    let dataColor = dataColorClass.substring(0, dataColorClass.length - 4)

    gridCells.forEach(cell => {
        cell.removeAttribute("data-color");
        cell.setAttribute("data-color", dataColor);
    });

    btns.forEach(btn => {
        btn.removeAttribute("data-switch");
    });
    document.querySelector("." + dataColor + "-btn").setAttribute("data-switch", "on");
}

btns = document.querySelectorAll(".change-btn");

btns.forEach(btn => btn.addEventListener("click", changeBtn));

function colorSwitch(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
        if (cell.dataset.colorSwitch === "on") cell.dataset.colorSwitch = "off";
        else cell.dataset.colorSwitch = "on";
    });
}

const mainGrid = document.querySelector(".grid");
mainGrid.addEventListener("click", colorSwitch);