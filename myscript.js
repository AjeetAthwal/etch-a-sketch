let totalRows = 16;
let totalGrids = totalRows * totalRows;

for (let gridNumber = 0; gridNumber < totalGrids; gridNumber++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-cell");
    document.querySelector(".grid").appendChild(cell);
}

function doSomething(e) {
    this.style.backgroundColor = "black";
}

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach(key => key.addEventListener(("mouseover"), doSomething));