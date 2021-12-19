const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.send('Hello world!');
});

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
});






http.listen(5000, function() {
   console.log('listening on *:5000');
});