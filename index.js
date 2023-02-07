const createBtn = document.querySelector("#createBtn");
const gridSize = document.querySelector("#gridSize");
const gridContainer = document.querySelector("#gridContainer");

createBtn.addEventListener("click", () => {
  createGrid(gridSize.value);
});

const createGrid = (size) => {
  gridContainer.innerHTML = "";

  const squares = [];
  for (let i = 0; i < size * size; i++) {
    squares.push(i + 1);
  }

  squares.sort(() => Math.random() - 0.5);

  squares.forEach((num) => {
    const square = document.createElement("div");
    square.classList.add("gridSquare");
    square.textContent = num;
    square.draggable = true;
    square.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", num);
    });
    gridContainer.appendChild(square);
  });

  gridContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const num = e.dataTransfer.getData("text/plain");
    e.target.textContent = num;
    checkOrder();
  });

  gridContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
};

const checkOrder = () => {
  const squares = Array.from(gridContainer.children);
  for (let i = 0; i < squares.length; i++) {
    if (parseInt(squares[i].textContent) !== i + 1) {
      return;
    }
  }

  alert("Welcome to the team!");
};
