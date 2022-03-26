import io from 'socket.io-client';

// eslint-disable-next-line import/no-mutable-exports
let socket;

function connectToSocket() {
    socket = io(
        'http://localhost:3200',
        {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 1500,
            reconnectionAttempts: 60 * 60 * 24
        }
    );
}

export { socket, connectToSocket };
