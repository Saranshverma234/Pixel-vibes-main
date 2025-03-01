const socket = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('sendMessage', { user: 'Ishanka', message });
        messageInput.value = 'Hi';
    }
});

socket.on('receiveMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.user}: ${message.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});