const createBtn = document.querySelector("#createBtn");
const gridSize = document.querySelector("#gridSize");
const gridContainer = document.querySelector("#gridContainer");
let input = []

createBtn.addEventListener("click", () => {
  createGrid(gridSize.value);
  input.push(gridSize.value)
  gridSize.value = ""
});

const createGrid = (size) => {
  gridContainer.innerHTML = "";
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

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
      e.dataTransfer.setData("text/plain", e.target.innerHTML);
      e.dataTransfer.setData("text/index", e.target.getAttribute("data-index"));
    });
    square.setAttribute("data-index", squares.indexOf(num));
    gridContainer.appendChild(square);
  });

  gridContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const targetIndex = e.target.getAttribute("data-index");
    const draggedIndex = e.dataTransfer.getData("text/index");
    const targetHTML = e.target.innerHTML;
    const draggedHTML = e.dataTransfer.getData("text/plain");

    e.target.innerHTML = draggedHTML;
    e.target.setAttribute("data-index", draggedIndex);

    const square = gridContainer.querySelector(`[data-index="${draggedIndex}"]`);
    square.innerHTML = targetHTML;
    square.setAttribute("data-index", targetIndex);

    checkOrder();
  });

  gridContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
};

const customAlert = (message) => {
  const alertWrapper = document.createElement("div");
  alertWrapper.style.position = "fixed";
  alertWrapper.style.top = "0";
  alertWrapper.style.left = "0";
  alertWrapper.style.right = "0";
  alertWrapper.style.bottom = "0";
  alertWrapper.style.backgroundColor = "rgba(0, 0, 0, 0)";
  alertWrapper.style.display = "flex";
  alertWrapper.style.alignItems = "center";
  alertWrapper.style.justifyContent = "center";
  alertWrapper.style.zIndex = "9999";

  const alertBox = document.createElement("div");
  alertBox.style.backgroundColor = "#1a2330";
  alertBox.style.padding = "20px 40px 20px 40px";
  alertBox.style.borderRadius = "10px";
  alertBox.style.textAlign = "center";

  const messageText = document.createElement("p");
  messageText.textContent = message;
  messageText.style.margin = "0";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.style.marginTop = "20px";
  closeBtn.style.padding = "10px 20px";
  closeBtn.style.backgroundColor = "#0cff84";
  closeBtn.style.color = "#1a2330";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "5px";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(alertWrapper);
    input.push(gridContainer.value)
    gridContainer.innerHTML = "";
  });

  alertBox.appendChild(messageText);
  alertBox.appendChild(closeBtn);
  alertWrapper.appendChild(alertBox);
  document.body.appendChild(alertWrapper);
};

const checkOrder = () => {
  const squares = Array.from(gridContainer.children);
  for (let i = 0; i < squares.length; i++) {
    if (parseInt(squares[i].textContent) !== i + 1) {
      return;
    }
  }

  customAlert("Welcome to the team!");
};

