const calculation = require("./calculation.js");

const isWorker = // check if 'self' is instance of worker
  typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;

if (isWorker) {
  self.addEventListener("message", event => {
    const response = calculation(event.data);
    self.postMessage(response);
  });
}
