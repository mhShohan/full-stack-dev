import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Initialize Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const EVENTS_NAME = {
  joinRoom: 'JOIN_ROOM',
  message: 'MESSAGE',
  typing: 'TYPING',
  stopTyping: 'STOP_TYPING',
  notice: 'NOTICE',
} as const;
const ROOM_NAME = 'MY_ROOM';

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // When someone join in the room
  socket.on(EVENTS_NAME.joinRoom, async (user) => {
    await socket.join(ROOM_NAME);
    // broadcast to connected user
    socket.to(ROOM_NAME).emit(EVENTS_NAME.notice, user);
  });

  // send messages to the room
  socket.on(EVENTS_NAME.message, (payload) => {
    socket.to(ROOM_NAME).emit(EVENTS_NAME.message, payload);
  });

  socket.on(EVENTS_NAME.typing, (username) => {
    socket.to(ROOM_NAME).emit(EVENTS_NAME.typing, username);
  });

  socket.on(EVENTS_NAME.stopTyping, (username) => {
    socket.to(ROOM_NAME).emit(EVENTS_NAME.stopTyping, username);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
