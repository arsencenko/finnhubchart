export const initSocketConnection = (symbols) => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=c711aqaad3i9rhb93e5g');
    socket.addEventListener('open', function () {
        for(let i in symbols){
            socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbols[i]}))
        }
    });

    return socket;
}

export const onSocketMessage = (socket, callback) => {
    socket.addEventListener('message', function (event) {
        callback(JSON.parse(event.data));
    });    
}

export const unsubscribeSocket = (socket, symbols) => {
    for(let i in symbols){
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbols[i]}))
    }   
}