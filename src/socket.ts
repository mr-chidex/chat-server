import { Server } from 'socket.io';
import { httpServer } from './app';

let io: Server;

export default {
  init: () => {
    io = new Server(httpServer);
    console.log('socket connected');
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
