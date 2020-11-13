let totalRows = 16;
let totalGrids = totalRows * totalRows;

for (let gridNumber = 0; gridNumber < totalGrids; gridNumber++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-cell");
    document.querySelector(".grid").appendChild(cell);
}

function colorInCell(e) {
    this.style.backgroundColor = "black";
}

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach(cell => cell.addEventListener("mouseover", colorInCell));

function clearGridCells() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => cell.remove());
}

function addGridCells(totalGrids) {
    for (let gridNumber = 0; gridNumber < totalGrids; gridNumber++) {
        let cell = document.createElement("div");
        cell.classList.add("grid-cell");
        document.querySelector(".grid").appendChild(cell);
    }
}

function updateGridCells(totalRows) {
    totalGrids = totalRows * totalRows;
    clearGridCells();
    document.documentElement.style.setProperty("--row-number", totalRows);
    addGridCells(totalGrids);

    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => cell.addEventListener("mouseover", colorInCell));
}

function resetGrid(e) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => cell.removeAttribute("style"));
    totalRows = Number(prompt("How many grid rows would you like? (16 to 100)"));
    if (totalRows !== Number(totalRows)) totalRows = 16;
    if (totalRows < 16) totalRows = 16;
    if (totalRows > 100) totalRows = 100;
    console.log(totalRows);
    updateGridCells(totalRows);
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGrid)