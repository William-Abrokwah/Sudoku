// Initializing grid and linking divs on page
const grid = [];
for (let row = 0; row < 9; row++) {
  grid[row] = [];
  for (let col = 0; col < 9; col++) {
    grid[row][col] = [];
    grid[row][col][0] = 0;
    
    const cellID = `cell-${row}-${col}`;
    const cellDiv = document.getElementById(cellID);
    grid[row][col][1] = cellDiv;
  }
}