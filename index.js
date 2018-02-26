var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();

const port = process.env.PORT || 4000;

var server = app.listen(process.env.PORT || 4000, function(){
  console.log('Listening on the port 4000.');
})


//Static files
app.use(express.static('public'));

//socket setup
var io = require('socket.io').listen(server);
//var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data){
      io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
      socket.broadcast.emit('typing',data);
    });
});
