console.log('Wagwan world!')
const socket = io();

const user = document.getElementById('user');
const messages = document.getElementById('messages');
const form = document.querySelector('form');
const input = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {

        const message = {
            user: user.value || 'Anonymous',
            msg: input.value
        };
        console.log(message);

        socket.emit('chat-message', message);
        input.value = '';
    }
});

socket.on('new-chat', (chat) => {
    const item = document.createElement('li');
    item.textContent = `${chat.user}: ${chat.msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});