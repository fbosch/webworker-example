const calculation = require("./calculation.js");

// initiate webworker that is using 'calculation.js' internally
const worker = new Worker("worker.js");

const counter = document.querySelector(".counter");
const checkbox = document.querySelector('input[type="checkbox"]');

// update DOM with calculated number
function updateCounter(number) {
  window.requestAnimationFrame(() => {
    counter.innerText = number + " \n";
  });
}

async function randomCalculation() {
  const randomNumber = Math.random() * 10;

  if (checkbox.checked) {
    // use worker
    return new Promise(resolve => {
      worker.addEventListener("message", event => {
        resolve(event.data);
      });
      worker.postMessage(randomNumber);
    });
  } else {
    // calculate on main thread
    return Promise.resolve(calculation(randomNumber));
  }
}

// performs random calculation of variating computational intensity
window.setInterval(async function() {
  const number = await randomCalculation();
  updateCounter(number);
}, 100);
