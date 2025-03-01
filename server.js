const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB (optional)
mongoose.connect('mongodb://localhost/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple message schema
const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
  timestamp: Date
});

const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', async (data) => {
    const message = new Message({ user: data.user, message: data.message, timestamp: new Date() });
    await message.save();
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});