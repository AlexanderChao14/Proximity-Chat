const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.send('Hello world!');
});

app.get('/reset', function(req, res) {
   // removes all sockets from connections and seats
   seating = new Array(20).fill(0).map(() => new Array(10).fill(0));  
   console.log('reseting')
});

let seating = new Array(20).fill(0).map(() => new Array(10).fill(0));
let socket_location = {};

function calculateDistance(p1, p2){
   return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}
function findRandomSeat(){
   let x = Math.floor(Math.random() * 10);
   let y = Math.floor(Math.random() * 20);
   while(seating[x][y] != 0){
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 20);
   }
   return [x, y];
}

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
   // assign new user with random seat
   let new_seat = findRandomSeat();
   seating[new_seat[0]][new_seat[1]] = socket.id;
   socket_location[socket.id] = new_seat;
   socket.emit('random seat', new_seat);
   io.emit('new seating arrangement', seating);;

   //console.log('A user connected');
   //Whenever someone disconnects this piece of code executed

   socket.on('disconnect', function () {
      console.log('A user disconnected');
      // remove them from seating list
      if(socket_location[socket.id]){
         seating[socket_location[socket.id][0]][socket_location[socket.id][1]] = 0;
         delete socket_location[socket.id];
         socket.broadcast.emit('new seating arrangement', seating);
      }

      
   });
   socket.on('message', function(message) {
      console.log(message);
      io.emit('new message', message);
   });

   socket.on('user moved seats', function(data) {
      console.log('moving seats', data);
      const old = data['old'];
      const new_ = data['new'];
      const user = data['user'];

      seating[old[0]][old[1]] = 0;
      seating[new_[0]][new_[1]] = user;

      // key position, value socket
      socket_location[socket.id] = new_;
      //console.log(socket_location);
      io.emit('new seating arrangement', seating);
   });

   socket.on('set username', ({username}) => {
      console.log('setting username', username);
      // find that sockets location in socket_locations
      const location = socket_location[socket.id];
      seating[location[0]][location[1]] = username;
      io.emit('new seating arrangement', seating);
   })

   socket.on('range message', function(data){
      console.log('sending message', data);
      const range = data['range'];
      const user = data['user'];
      const text = data['text'];
      const time = data['time'];

      // get the senders position
      const position = socket_location[socket.id];
      //console.log('message was sent from', position);
      // get all sockets within range and send message
      Object.keys(socket_location).forEach(key => {
         const location = socket_location[key];
         if(calculateDistance(position, location) <= range){
            console.log('message was sent to', location);
            io.to(key).emit('new message', {'user': user, 'text': text, 'time': time});
         }
      });

   });
});






http.listen(5500, function() {
   console.log('listening on *:5500');
});