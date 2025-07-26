// Creates a new empty grid and links to divs on page
function newEmptyGrid() {
  let grid = [];
  for (let row = 0; row < 9; row++) {
    grid[row] = [];
    for (let col = 0; col < 9; col++) {
      grid[row][col] = [];
      grid[row][col][0] = 0;
      
      const cellID = `cell-${row}-${col}`;
      const cellDiv = document.getElementById(cellID);
      grid[row][col][1] = cellDiv;

      // Removing clue class from cells if exists
      if (cellDiv.classList.contains('clue')) {
        cellDiv.classList.remove('clue');
      }

      // Adds borders to inner cells
      if (col % 3 === 0 || col % 3 === 1) cellDiv.classList.add('right-border');
      if (row % 3 === 0 || row % 3 === 1) cellDiv.classList.add('bottom-border');
    }
  }
  return grid;
}

let grid = newEmptyGrid();
let difficulty = "Easy";

// Changing difficulty 
const difficultyButtons = document.querySelectorAll('.difficulty-button');

difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {
    difficultyButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    difficulty = button.textContent;
  });
});