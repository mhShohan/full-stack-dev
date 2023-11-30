require('dotenv').config();
const app = require('./app');
const http = require('http');
const connectDB = require('./db/connectDB');

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

main();