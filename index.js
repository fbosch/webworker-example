// initialize web worker ⚙️
const worker = new Worker("worker.js");
// - that is using 'calculation.js' internally
const calculation = require("./calculation.js");

const counter = document.querySelector(".display"); // displays number result from calculation
const checkbox = document.querySelector('input[type="checkbox"]'); // used for toggling between main thread and wb worker

// random calcation that is computed on either the main thread or in a worker
async function randomCalculation() {
  const randomNumber = Math.random() * 10;

  if (checkbox.checked) {
    // calculate in worker
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

// update DOM with calculated number
function updateDisplay(number) {
  window.requestAnimationFrame(() => {
    const thread = checkbox.checked ? "web worker" : "main thread";
    counter.innerText = `${number}
      (${thread})
    `;
  });
}

let interval;

function start() {
  // constantly perform random calculations of varying computational intensity
  interval = window.setInterval(async function() {
    const number = await randomCalculation();
    updateDisplay(number);
  }, 150);
}

function stop() {
  if (interval) {
    window.clearInterval(interval);
    interval = null;
  }
}

window.start = start;
window.stop = stop;

start();
