const container = document.querySelector('.container');
const text = document.querySelector('.text');
const restart = document.querySelector('.restart');
const backdrop = document.querySelector('.backdrop');
const winner = document.querySelector('.winner');

container.insertAdjacentHTML('beforeend', makeMurckup());
const boxes = document.querySelectorAll('.box');

let userX = [];
let userO = [];
let marker = 'X';
let count = {
  userX: 0,
  userO: 0,
};

restart.addEventListener('click', reset);

function showBunner(message) {
  console.log(12345);
  backdrop.classList.remove('hidden');
  winner.textContent = message;
}

function makeMurckup() {
  let murckup = '';
  for (let i = 0; i < 9; i += 1) {
    murckup += `<div class="box" data-id=${i}></div>`;
  }
  return murckup;
}

function reset() {
  backdrop.classList.add('hidden');
  boxes.forEach(item => (item.innerHTML = ''));
  userX = [];
  userO = [];
  marker = 'X';
}

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

container.addEventListener('click', onClick);

function onClick(e) {
  if (e.target.classList.contains('box') && e.target.textContent === '') {
    e.target.textContent = marker;
    if (marker === 'X') {
      userX.push(Number(e.target.dataset.id));
    } else {
      userO.push(Number(e.target.dataset.id));
    }
    marker === 'X' ? (marker = 'O') : (marker = 'X');
  }

  if (winnerCombinations.some(item => item.every(el => userX.includes(el)))) {
    showBunner('Виграв гравець Х');
    return;
  }
  if (winnerCombinations.some(item => item.every(el => userO.includes(el)))) {
    showBunner('Виграв гравець О');
    return;
  }
  if (userX.length === 5 || userX.length === 5) {
    showBunner('Нічия 😵');
    return;
  }
}
