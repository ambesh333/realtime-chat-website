// node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};

io.on('connection',socket=>{    
  //starting of connection
   //if any new user joins let other users know            
    socket.on('new-user-joined', name=>{
        console.log("New user", name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message =>{
      //if someone messages show to all 
        socket.broadcast.emit('receive',{message: message,name :users[socket.id]})
    });
    socket.on('disconnect', message =>{
      //build in event when some one leaves
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})