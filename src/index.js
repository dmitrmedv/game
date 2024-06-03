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
  winner.textContent = message;
  setTimeout(() => {
    backdrop.classList.remove('hidden');
  }, 1500);
}

function makeMurckup() {
  let murckup = '';
  for (let i = 0; i < 9; i += 1) {
    murckup += `<div class="box js-box${i}" data-id=${i}></div>`;
  }
  return murckup;
}

function reset() {
  backdrop.classList.add('hidden');
  winner.textContent = '';
  boxes.forEach(item => {
    item.innerHTML = '';
    item.classList.remove('green');
    item.classList.remove('yellow');
  });
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
  if (
    e.target.classList.contains('box') &&
    e.target.textContent === '' &&
    winner.textContent === ''
  ) {
    e.target.textContent = marker;
    if (marker === 'X') {
      userX.push(Number(e.target.dataset.id));
    } else {
      userO.push(Number(e.target.dataset.id));
    }
    marker === 'X' ? (marker = 'O') : (marker = 'X');
  }

  let conbinationX = winnerCombinations.find(item =>
    item.every(el => userX.includes(el))
  );

  let combinationO = winnerCombinations.find(item =>
    item.every(el => userO.includes(el))
  );

  if (conbinationX) {
    showBunner('Виграв гравець Х');
    [...boxes].forEach(item => {
      if (conbinationX.includes(Number(item.dataset.id))) {
        item.classList.add('green');
      }
    });
    return;
  }
  if (combinationO) {
    showBunner('Виграв гравець О');
    [...boxes].forEach(item => {
      if (combinationO.includes(Number(item.dataset.id))) {
        item.classList.add('green');
      }
    });
    return;
  }
  if (userX.length === 5 || userX.length === 5) {
    showBunner('Нічия 😵');
    boxes.forEach(item => {
      if (Number(item.dataset.id) % 2 === 0) {
        item.classList.add('green');
      } else {
        item.classList.add('yellow');
      }
    });
    return;
  }
}
