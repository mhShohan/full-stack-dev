import { io } from 'socket.io-client';

export default function connectWebSocket() {
  return io('http://localhost:8000');
}
