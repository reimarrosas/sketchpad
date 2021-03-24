"use strict";

const root = document.getElementById("root");

function generateGrid(size = 16) {
  const container = document.createElement("div");
  container.className = "container";


  for (let i = 0; i < size; ++i) {
    const rowDiv = createDiv(1, size, "row"); 

    for (let j = 0; j < size; ++j) {
      const colDiv = createDiv(size, 1, "col");
      rowDiv.appendChild(colDiv);
    }

    container.appendChild(rowDiv);
  }

  root.appendChild(container);
  
  generateSquareEventListeners();
}

function createDiv(widthRatio, heightRatio, name) {
  const div = document.createElement("div");
  div.style.width = `${100 / widthRatio}%`;
  div.style.height = `${100 / heightRatio}%`;
  div.className = name;

  return div;
}

function generateSquareEventListeners() {
  const squares = document.querySelectorAll(".col");
  squares.forEach(square => (square.addEventListener("mouseover", () => { drawOnMouseOver(square) })));
}

function drawOnMouseOver(square) {
  const defaultSquareStyles = window.getComputedStyle(square);
  if (defaultSquareStyles.backgroundColor === "rgba(0, 0, 0, 0)" ||
      defaultSquareStyles.backgroundColor === "transparent") {
    square.style.backgroundColor = `rgba(${generateRGBA()})`;
  }
}

function generateRGBA() {
  const rgba = [randomNumber(0, 220), randomNumber(0, 220), randomNumber(0, 220), Math.random() * 0.6 + 0.4];
  
  return rgba.join(", ");
}

function randomNumber(start, end) {
  return Math.floor(Math.random() * Math.abs(end - start)) + start;
}

generateGrid();

const changeSizeButton = document.getElementById("changeSize");

changeSizeButton.addEventListener("click", () => {
  for(;;) {
    const newSize = parseInt(prompt("Enter new size: "));
    console.log(newSize)
    if (newSize && newSize <= 100 && newSize > 0) {
      const oldContainer = document.querySelector(".container");
      root.removeChild(oldContainer);
      generateGrid(newSize);
      break;
    }
    alert("Not a number!")
  }
})

