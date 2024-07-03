const express = require('express');
const os = require('os');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    time: new Date().toLocaleDateString(),
    platform: os.hostname(),
    ip: req.ip,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});