const cells = document.querySelectorAll('.sudoku-cell');
let selectedButton = null;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cells.forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
  });
});