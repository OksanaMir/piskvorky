'use strict';
let activePlayer = 'circle';
const btns = document.querySelectorAll('button');
const boardSize = 10;
const fields = document.querySelectorAll('button');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => fields[row * boardSize + column];

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
  return undefined;
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let x;
  let y;

  let inRow = 1;
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let diagTop = 1;

  x = origin.row;
  y = origin.column;

  // Koukni nahoru doleva
  while (x > 0 && y > 0 && symbol === getSymbol(getField(x - 1, y - 1))) {
    diagTop++;
    x--;
    y--;
  }

  // Koukni nahoru doprava
  while (
    x > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x - 1, y + 1))
  ) {
    diagTop++;
    x--;
    y++;
  }

  if (diagTop >= symbolsToWin) {
    return true;
  }

  let diagBottom = 1;

  //Koukni dolu doprava
  while (
    x < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(x + 1, y + 1))
  ) {
    diagBottom++;
    x++;
    y++;
  }

  //Koukni dolu doleva
  while (
    x < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(x + 1, y - 1))
  ) {
    diagBottom++;
    x++;
    y--;
  }

  if (diagBottom >= symbolsToWin) {
    return true;
  }

  return false;
};

let gameOver = false;

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    if (gameOver) {
      return;
    }

    if (btn.disabled) {
      return;
    }

    let prevPlayer = activePlayer;

    if (activePlayer === 'circle') {
      e.target.className = 'board__field--circle';

      //btn.style.backgroundImage = 'images/circle.svg';
      document.querySelector('.game').innerHTML =
        'HRAJE: <img id="cross" src="images/cross.svg" alt="cross" />';

      //btn.disabled = true;
      activePlayer = 'cross';
    } else {
      e.target.className = 'board__field--cross';

      //btn.style.backgroundImage = 'images/cross.svg';
      activePlayer = 'circle';
      document.querySelector('.game').innerHTML =
        'HRAJE: <img id="circle" src="images/circle.svg" alt="circle" />';

      //btn.disabled = true;
      activePlayer = 'circle';
    }

    // isWinningMove(btn);
    if (isWinningMove(btn) === true) {
      //return alert(`Vyhrál ${prevPlayer}`);
      gameOver = true;

      setTimeout(function () {
        confirm(`Vyhrál ${prevPlayer}. Spustit novou hru?`);
        setTimeout(function () {
          location.reload();
        }, 1000);
      }, 200);

      //location.reload();
    }

    btn.disabled = true;
  }),
);
