var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('user_connect', 'A user has connected to the chatroom.');

  socket.on('disconnect', () => socket.broadcast.emit('user_disconnect', 'A user has left the chatroom.'));

  socket.on('user_message', (msg) => {
    socket.broadcast.emit('user_message', msg);
  });
});

http.listen(5000, () => {
  console.log('listening on *:5000');
});
