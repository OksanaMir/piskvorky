'use strict';
let activePlayer = 'circle';
const btns = document.querySelectorAll('button');

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    if (btn.disabled) {
      return;
      console.log('cant play');
    } else {
      if (activePlayer == 'circle') {
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
      btn.disabled = true;
    }
  }),
);
