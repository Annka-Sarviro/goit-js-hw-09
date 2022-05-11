const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartSwitcher);
stopBtn.addEventListener('click', onStopSwitcher);
let timerId = null;

function onStartSwitcher() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
    console.log('вызвали функцию')
    startBtn.disabled = true;
};


function onStopSwitcher() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
};





console.log(startBtn)









function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }