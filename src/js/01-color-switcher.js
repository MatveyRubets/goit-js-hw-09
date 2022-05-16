const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

function changeBgColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
  refs.stopBtn.removeAttribute('disabled', 'true');
}

function stopInterval() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled', 'true');
  refs.stopBtn.setAttribute('disabled', 'true');
}

refs.startBtn.addEventListener('click', changeBgColor);
refs.stopBtn.addEventListener('click', stopInterval);
