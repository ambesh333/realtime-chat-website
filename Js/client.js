const socket= io('http://localhost:8000');

// get dom element in respective js elements 
const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer =document.querySelector(".container");
//audio that will play
var audio =new Audio('notification.mp3');
// function which will append event info to the container
const append=(message,position)=>{
 const messageElement= document.createElement('div');
 messageElement.innerText = message;
 messageElement.classList.add('message');
 messageElement.classList.add(position);
 messageContainer.append(messageElement);
 if(position== 'left'){
     audio.play();
}
}

//ask new uuser for his or her name and let the server know
const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

//if the new user joins,receive his name from the event from server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

//if server sents the message receive it 
socket.on('receive', data =>{
    append(`${data.name}:${data.message}`,'left')
})

//if a user leaves the chat append message to the container
socket.on('left', name =>{
    append(`${name} left the chat `,'left')
})

//if the form gets submitted send the server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
})