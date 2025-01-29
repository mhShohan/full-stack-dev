import { Server, createServer } from 'http';
import mongoose from 'mongoose';
import config from './utils/config';
import app from './app';

let server: Server = createServer(app);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = server.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
