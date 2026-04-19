const { createServer } = require("http");
const app = require("./app");

const server = createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});