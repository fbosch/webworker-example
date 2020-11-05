const isWorker =
  typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;

if (isWorker) {
  const calculation = require("./calculation.js");
  self.addEventListener("message", async event => {
    const response = await calculation(event.data);
    self.postMessage(response);
  });
}
