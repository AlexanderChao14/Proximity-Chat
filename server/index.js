const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.send('Hello world!');
});
let seating = new Array(20).fill(0).map(() => new Array(10).fill(0));

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
   //Whenever someone disconnects this piece of code executed

   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

   socket.on('message', function(message) {
      console.log(message);
      io.emit('new message', message);
   });

   socket.on('user moved seats', function(data) {
      console.log(data);
      const old = data['old'];
      const new_ = data['new'];
      const user = data['user'];

      seating[old[0]][old[1]] = 0;
      seating[new_[0]][new_[1]] = user;
      socket.broadcast.emit('user moved seats', seating);
   });
});






http.listen(5000, function() {
   console.log('listening on *:5000');
});