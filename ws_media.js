const WebSocketServer = require('websocket').server;
const http = require('http');
const ip = require('ip');
const ks = require('node-key-sender');
const { app, BrowserWindow, dialog } = require('electron');

var mainWindow;


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

    console.log('Connected');

    connection.on('message', function (message) {
        data = message.utf8Data;
        var data0 = data.split(' ');

        switch (data0[0]) {

            case 'control':
                ks.sendKey(data0[1])
                break;

            case 'browser':
                //var data0 = data.split(",");
                connection.sendUTF("Hi Bitch\n");
                getfocus = BrowserWindow.getFocusedWindow();
                //console.log(getfocus);
                //if (getfocus === null) {
                    console.log('its null')
                    mainWindow.show();
                    mainWindow.loadURL(data0[1]);
                    mainWindow.setFullScreen(true);

                    if (false)
                        setTimeout(() => {
                            ks.sendKey('f');
                        }, 2000);
                //}
                console.log("Rx : " + data)
                break;

            case 'hi':
                //var data0 = data.split(",");
                connection.sendUTF("Hi Bitch\n");
                console.log("Rx : " + data)
                break;

            case 'time':
                //var data0 = data.split(",");
                connection.sendUTF((new Date) + "\n");
                console.log("Rx : " + data)
                break;

            case 'gut':
                //var data0 = data.split(",");
                connection.sendUTF("gut\n");
                console.log("Rx : " + data)
                break;

            case 'youtube':
                //var data0 = data.split(",");
                getfocus = BrowserWindow.getFocusedWindow();
                //console.log(getfocus);
                if (getfocus === null) {
                    console.log('its null')
                    mainWindow.show();
                    mainWindow.loadURL(`https://www.youtube.com/watch?v=dWFyRxZxE9A`);
                    mainWindow.setFullScreen(false);

                    setTimeout(() => {
                        ks.sendKey('f');
                    }, 2000);
                }

                switch (data0[1]) {
                    case 'play':
                        ks.sendKey('space');
                        connection.sendUTF("sending space\n");
                        break;

                    case 'pause':
                        ks.sendKey('space');
                        connection.sendUTF("sending space\n");
                        break;

                    case 'fwd':
                        ks.sendKey('right');
                        connection.sendUTF("sending right\n");
                        break;

                    case 'back':
                        ks.sendKey('left');
                        connection.sendUTF("sending left\n");
                        break;

                    case 'full':
                        ks.sendKey('f');
                        connection.sendUTF("setting fullscreen\n");
                        break;

                    case 'next':
                        ks.sendCombination(['shift', 'n']);
                        connection.sendUTF("next video\n");
                        break;

                    case 'load':
                        mainWindow.loadURL(data0[2]);
                        setTimeout(() => {
                            ks.sendKey('f');
                        }, 2000);

                        connection.sendUTF("loading new vid\n");
                        break;

                    default:
                        break;
                }

                connection.sendUTF(data0[1] + "\n");
                console.log("Rx : " + data)
                break;

            case 'prime':
                //var data0 = data.split(",");
                getfocus = BrowserWindow.getFocusedWindow();
                //console.log(getfocus);
                if (getfocus === null) {
                    console.log('its null')
                    mainWindow.show();
                    mainWindow.loadURL(`https://primevideo.com`);
                    mainWindow.setFullScreen(true);

                    setTimeout(() => {
                        ks.sendKey('f');
                    }, 2000);
                }

                switch (data0[1]) {
                    case 'play':
                        ks.sendKey('space');
                        connection.sendUTF("sending space\n");
                        break;

                    case 'pause':
                        ks.sendKey('space');
                        connection.sendUTF("sending space\n");
                        break;

                    case 'fwd':
                        ks.sendKey('right');
                        connection.sendUTF("sending right\n");
                        break;

                    case 'back':
                        ks.sendKey('left');
                        connection.sendUTF("sending left\n");
                        break;

                    case 'full':
                        ks.sendKey('f');
                        connection.sendUTF("setting fullscreen\n");
                        break;

                    case 'next':
                        ks.sendCombination(['shift', 'n']);
                        connection.sendUTF("next video\n");
                        break;

                    case 'load':
                        mainWindow.loadURL(data0[2]);
                        setTimeout(() => {
                            ks.sendKey('f');
                        }, 2000);

                        connection.sendUTF("loading new vid\n");
                        break;

                    default:
                        break;
                }

                connection.sendUTF(data0[1] + "\n");
                console.log("Rx : " + data)
                break;

            case 'open terminal':
                //var data0 = data.split(",");

                ks.sendCombination(['control', 'alt', 't']);

                setTimeout(() => {

                }, 300);

                connection.sendUTF("opening terminl\n");
                console.log("Rx : " + data)
                break;

            case 'close':
                //var data0 = data.split(",");
                connection.sendUTF("Closing\n");
                mainWindow.hide();
                console.log("Rx : " + data)
                break;

            case 'quit':
                //var data0 = data.split(",");
                connection.sendUTF("Quitting\n");
                connection.destroy;
                console.log("Rx : " + data)
                process.exit();
                break;

            default:
                console.log(data);
                connection.sendUTF("response for " + data + "\n");
                break;

        }
    });

    connection.on('close', function (reasonCode, description) {
        console.log(' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});

server.listen('1337', function () {
    console.log((new Date()).toISOString() + `  OCPP Server is listening on port 1337`);
});



app.on('ready', () => {	// Display UI Window

    mainWindow = new BrowserWindow({
        height: 860,
        width: 900,
        icon: __dirname + '/public/icon.png',
        show: false
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.setMenu(null);

});

console.log('Server Started');
console.log(ip.address());