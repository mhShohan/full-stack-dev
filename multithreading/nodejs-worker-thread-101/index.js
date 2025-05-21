const express = require('express');
const { Worker } = require('worker_threads');

const app = express();
const PORT = 3000;
const THREAD_COUNT = 4;

app.get('/non-blocking', (req, res) => {
  res.status(200).json({ status: 'Non-blocking' });
});

app.get('/blocking', (req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', (data) => {
    res.status(200).json({ status: 'completed', count: data });
  });

  worker.on('error', (error) => {
    res.status(200).json({ status: 'error', error });
  });
});

function createWorker() {
  return new Promise(function (resolve, reject) {
    const worker = new Worker("./optimized-worker.js", {
      workerData: { thread_count: THREAD_COUNT },
    });

    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (msg) => {
      reject(`An error occurred: ${msg}`);
    });
  });
}

app.get('/blocking-optimized', async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises);
  const total = thread_results.reduce((acc, cur) => acc += cur, 0);

  res.status(200).send(`result is ${total}`);
});


app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});