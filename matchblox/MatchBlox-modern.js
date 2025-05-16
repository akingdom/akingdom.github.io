"use strict";
//////////////////////////////////////////////////////////////////////////////
// filename: MatchBlox.js
//  version: 1.02
//
// Entire code Copyright (C) 2002, 2025 Andrew Kingdom. All rights reserved.
// http://akingdom.github.io/
//
// Do not redistribute modified versions of this -- use originals only.
// Contact me via my website for any permissions/issues/changes/etc.
//
//////////////////////////////////////////////////////////////////////////////

// ----- Constants and Global Variables -----
const xmax = 18;
const ymax = 10;

const grNames       = ["x.gif", "A.gif", "B.gif", "C.gif", "D.gif", "E.gif"]; // index 0 = clear
const grMarkedNames = ["x.gif", "Am.gif", "Bm.gif", "Cm.gif", "Dm.gif", "Em.gif"];
const grEndNames    = ["Fe.gif", "Ie.gif", "Ne.gif", "Ie.gif", "Se.gif", "He.gif", "Ee.gif", "De.gif", "x.gif"];
const grBackgrounds = ["image1.jpg", "image6.jpg", "image5.jpg", "image7.jpg", "image5-3.jpg", "image9.jpg", "image12.jpg", "image5-2.jpg"];

let grid = [];      // 2D array of cell objects
let sharr = [];     // Array storing connected cells (neighbour group)
let totalscore = 0;
let finished = false;
const scoreDigits = 10;  // number of digits in the counter

// ----- Utility Functions -----
function rndCellType() {
  // Returns a random type from 1 to grNames.length-1.
  return Math.floor(Math.random() * (grNames.length - 1)) + 1;
}

function rndBackground() {
  return grBackgrounds[Math.floor(Math.random() * grBackgrounds.length)];
}

function calculateScore(n) {
  const r = Math.sqrt(5);
  const l = Math.pow(1 - r, n);
  const g = Math.pow(1 + r, n);
  const d = Math.pow(2, n - 1);
  const s = (g - l) / (d * r);
  return Math.floor(s);
}

// ----- Display Functions -----
function displayGrid() {
  // Loop through the grid and update each cell's image source.
  for (let x = 0; x <= xmax; x++) {
    for (let y = 0; y <= ymax; y++) {
      const cell = grid[x][y];
      if (cell.type === 0) {
        cell.obj.src = "x.gif";
      } else {
        cell.obj.src = cell.selected ? grMarkedNames[cell.type] : grNames[cell.type];
      }
    }
  }
}

function displayEnd() {
  // When the game ends, set empty cells to show a diaganol FINISHED pattern.
  for (let x = 0; x <= xmax; x++) {
    for (let y = 0; y <= ymax; y++) {
      if (grid[x][y].type === 0) {
        grid[x][y].obj.src = grEndNames[(x + y) % grEndNames.length];
      } else {
        grid[x][y].obj.src = grNames[grid[x][y].type];
      }
    }
  }
}

// ----- Score Display Functions -----
function initScoreDisplay() {
  const container = document.getElementById("scoreContainer");
  container.innerHTML = "";
  for (let i = 0; i < scoreDigits; i++) {
    const digitElem = document.createElement("div");
    digitElem.className = "counter-digit";
    digitElem.id = `digit-${i}`;
    digitElem.textContent = "0";
    container.appendChild(digitElem);
  }
}

function updateScoreDisplay(score) {
  const scoreStr = score.toString().padStart(scoreDigits, "0");
  for (let i = 0; i < scoreDigits; i++) {
    const dElem = document.getElementById(`digit-${i}`);
    if (dElem) {
      dElem.textContent = scoreStr[i];
    }
  }
}

// ----- Grid Setup -----
function createGameGrid() {
  grid = [];
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // Clear previous grid content
  const table = document.createElement("table");
  table.style.backgroundImage = `url(${rndBackground()})`;
  table.style.backgroundSize = "cover";

  // Create rows and cells (with fixed IDs for later reference)
  for (let y = 0; y <= ymax; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x <= xmax; x++) {
      const cellTd = document.createElement("td");
      const img = document.createElement("img");
      // Set a random cell type.
      const cellType = rndCellType();
      img.src = grNames[cellType];
      img.id = `Cell${x}_${y}`;

      // Create cell object and store in grid.
      if (!grid[x]) grid[x] = [];
      grid[x][y] = {
        x: x,
        y: y,
        obj: img,
        type: cellType,
        selected: false
      };

      // Attach event listeners.
      img.addEventListener("click", (e) => {
        e.preventDefault();
        doCell(x, y);
      });
      img.addEventListener("mouseover", () => {
        overCell(x, y);
      });
      img.addEventListener("mouseout", () => {
        outCell(x, y);
      });
      cellTd.appendChild(img);
      row.appendChild(cellTd);
    }
    table.appendChild(row);
  }
  gameContainer.appendChild(table);
}

// ----- Shape & Neighbour Detection -----
function clearShape() {
  sharr.forEach(cell => cell.selected = false);
  sharr = [];
}

function detectSubshape(x, y, type) {
  if (x < 0 || y < 0 || x > xmax || y > ymax) return;
  const cell = grid[x][y];
  if (!cell.selected && cell.type === type) {
    cell.selected = true;
    sharr.push(cell);
    detectSubshape(x - 1, y, type);
    detectSubshape(x + 1, y, type);
    detectSubshape(x, y - 1, type);
    detectSubshape(x, y + 1, type);
  }
}

function detectShape(x, y) {
  clearShape();
  if (grid[x][y].type !== 0) {
    detectSubshape(x, y, grid[x][y].type);
  }
}

// ----- Event Handlers -----
function overCell(x, y) {
  detectShape(x, y);
  // Only highlight if there are at least 2 connected cells.
  if (sharr.length < 2) {
    clearShape();
  }
  displayGrid();
}

function outCell(x, y) {
  clearShape();
  displayGrid();
}

function doCell(x, y) {
  if (grid[x][y].type === 0) return;
  detectShape(x, y);
  if (sharr.length < 2) {
    clearShape();
    displayGrid();
    return;
  }
  const blockCount = sharr.length;
  // Remove matching blocks:
  sharr.forEach(cell => {
    cell.type = 0;
    cell.selected = false;
  });
  clearShape();
  totalscore += calculateScore(blockCount);
  updateScoreDisplay(totalscore);
  displayGrid();
  applyGravity();
  if (detectEnd()) {
    finished = true;
    displayEnd();
  }
}

// ----- Gravity: Drop and Shift -----
function applyGravity() {
  let colCounts = []; // count of non-zero cells for each column
  
  // Step 1: For each column, drop blocks (non-zero cells gather at bottom)
  for (let x = 0; x <= xmax; x++) {
    let nonEmpty = [];
    for (let y = 0; y <= ymax; y++) {
      if (grid[x][y].type !== 0) {
        nonEmpty.push(grid[x][y].type);
      }
    }
    colCounts[x] = nonEmpty.length; // record how many cells are occupied in column x
    const emptyCount = (ymax + 1) - nonEmpty.length;
    const newTypes = Array(emptyCount).fill(0).concat(nonEmpty);
    for (let y = 0; y <= ymax; y++) {
      grid[x][y].type = newTypes[y];
      grid[x][y].selected = false;
    }
  }
  
  // Step 2: Collapse non-empty columns to the left.
  // "target" is the index in grid where the next non-empty column should go.
  let target = 0;
  for (let x = 0; x <= xmax; x++) {
    if (colCounts[x] > 0) { // if current column x holds one or more non-zero cells
      // If the non-empty column is not already where it should be,
      // copy its data to the "target" column.
      if (target !== x) {
        for (let y = 0; y <= ymax; y++) {
          grid[target][y].type = grid[x][y].type;
        }
      }
      target++;
    }
  }
  
  // Step 3: Fill remaining columns (from target to xmax) with zeros.
  for (let x = target; x <= xmax; x++) {
    for (let y = 0; y <= ymax; y++) {
      grid[x][y].type = 0;
    }
  }
  displayGrid();
}


// ----- End Detection -----
function detectEnd() {
  for (let x = 0; x <= xmax; x++) {
    for (let y = 0; y <= ymax; y++) {
      const cell = grid[x][y];
      if (cell.type !== 0) {
        if (x > 0 && grid[x - 1][y].type === cell.type) return false;
        if (x < xmax && grid[x + 1][y].type === cell.type) return false;
        if (y > 0 && grid[x][y - 1].type === cell.type) return false;
        if (y < ymax && grid[x][y + 1].type === cell.type) return false;
      }
    }
  }
  return true;
}

// ----- Game Initialization -----
function reinit() {
  totalscore = 0;
  finished = false;
  initScoreDisplay();
  createGameGrid();
  updateScoreDisplay(totalscore);
}

// Initialize game on DOMContentLoaded and attach New Game button handler.
document.addEventListener("DOMContentLoaded", () => {
  reinit();
  document.getElementById("newGameBtn").addEventListener("click", reinit);
});
