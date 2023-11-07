const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
//const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{ cors: { origin: '*' } });
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  

  console.log(socket);
});

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
