const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);
refs.btnStop.disabled = true;

function onBtnStart() {
  timerId = setInterval(onChangeBodyColor, 1000);
  refs.btnStop.disabled = false;
  refs.btnStart.disabled = true;
}

function onBtnStop() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
}

function onChangeBodyColor() {
  //console.log(refs.btnStart);
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
