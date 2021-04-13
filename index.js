'use strict';
let activePlayer = 'circle';
const btns = document.querySelectorAll('button');

btns.forEach((btn) =>
  btn.addEventListener('click', () => {
    if (activePlayer == 'circle') {
      btn.style.class = 'board__field--circle';
      btn.innerHTML =
        '<img id="circle"  src="images/circle.svg" alt="circle" />';
      document.querySelector('.game').innerHTML =
        'HRAJE: <img id="cross" src="images/cross.svg" alt="cross" />';

      btn.disabled = true;
      activePlayer = 'cross';
    } else {
      btn.style.class = 'board__field--cross';
      btn.innerHTML = '<img  id="cross"  src="images/cross.svg" alt="cross"/>';
      activePlayer = 'circle';
      document.querySelector('.game').innerHTML =
        'HRAJE: <img id="circle" src="images/circle.svg" alt="circle" />';

      btn.disabled = true;
      activePlayer = 'circle';
    }
  }),
);
