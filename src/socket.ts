import { Server } from 'socket.io';

let io: Server;

export default {
  init: (httpServer: any) => {
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
