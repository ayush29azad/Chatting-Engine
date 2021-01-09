

var socket = io('http://localhost:7000', { transports: ['websocket', 'polling', 'flashsocket'] });
var audio = new Audio("ring.mp3")
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append =(message,position)=>{

const messageElement = document.createElement('div');
messageElement.innerHTML = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position == 'left'){
    audio.play();
}

}

form.addEventListener('submit',(e)=>{
 e.preventDefault();
 const message = messageInput.value;
    append('You : '+''+ message , 'right');
    socket.emit('send',message);
    messageInput.value ='';

})
const client = prompt("enter your name to join");
socket.emit('new-user-joined', client);

socket.on('user-joined',client=>{ // when user joins

append(client +' joined the chat','left');

});

socket.on('receive',data=>{      // when someone is sending chat message  send others the massage

append(data.name  + ': ' + data.message ,'left' );
});


