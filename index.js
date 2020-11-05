// initialize web worker ⚙️
const worker = new Worker("worker.js");
// - that is using 'calculation.js' internally
const calculation = require("./calculation.js");

const display = document.querySelector(".display"); // displays result from calculation
const checkbox = document.querySelector('input[type="checkbox"]'); // used for toggling between main thread and web worker

// random calculation that is computed on either the main thread or in a worker
async function randomCalculation() {
  const multiplier = window.multiplier ?? 8; // the larger the multiplier is the slower the function runs
  const randomNumber = Math.random() * multiplier;

  if (checkbox.checked) {
    // calculate in worker
    return new Promise(resolve => {
      worker.addEventListener("message", event => {
        resolve(event.data);
      });
      worker.postMessage(randomNumber);
    });
  } else {
    // calculate on the main thread
    return Promise.resolve(calculation(randomNumber));
  }
}

// update DOM with the calculated number
function updateDisplay(number) {
  window.requestAnimationFrame(() => {
    const thread = checkbox.checked ? "web worker" : "main thread";
    display.innerText = `${number}
      (${thread})
    `;
  });
}

let interval;

function start() {
  // continously perform random calculations with varying computational intensity
  interval = window.setInterval(async function() {
    if (document.hidden === false) {
      const number = await randomCalculation();
      updateDisplay(number);
    }
  }, 50);
}

function stop() {
  if (interval) {
    window.clearInterval(interval);
    interval = null;
  }
}

window.start = start;
window.stop = stop;

start(); // 🚀
