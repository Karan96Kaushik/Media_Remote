const WebSocketServer = require('websocket').server;
const http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(404);
    response.end();
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function (request) {

    var connection = request.accept('mine', request.origin);

    connection.on('message', function (message) {
        console.log(message)
    });

    connection.on('close', function (reasonCode, description) {
        console.log((new Date()).toISOString() + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});

server.listen('1337', function () {
    console.log((new Date()).toISOString() + `  OCPP Server is listening on port 1337`);
});