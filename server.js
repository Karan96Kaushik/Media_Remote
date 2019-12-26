const net = require('net');
const ip = require('ip');
//const robot = require('robotjs');
const ks = require('node-key-sender');
const { app, BrowserWindow, dialog } = require('electron');

//console.log(path.join(logpath[0] + `/logs/Log-${logname}.csv`));
var count = 0;
var mainWindow;

var server = net.createServer(function(socket) {
	socket.setEncoding('UTF-8')

	socket.on('close', function(data) {
		console.log('Connection Closed');
	});

	socket.on('error', function(data) {
		console.log('Connection Error');
	});

	socket.on('data', function(data) {
		//console.log(data);

		var data0 = data.split(' ');

		switch (data0[0]) {
			
			case 'hi':
				//var data0 = data.split(",");
				socket.write("Hi Bitch\n");
				console.log("Rx : " + data)
				break;

			case 'time':
				//var data0 = data.split(",");
				socket.write((new Date) + "\n");
				console.log("Rx : " + data)
				break;
			
			case 'gut':
				//var data0 = data.split(",");
				socket.write("gut\n");
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
						socket.write("sending space\n");
						break;

					case 'pause':
						ks.sendKey('space');
						socket.write("sending space\n");
						break;

					case 'fwd':
						ks.sendKey('right');
						socket.write("sending right\n");
						break;

					case 'back':
						ks.sendKey('left');
						socket.write("sending left\n");
						break;

					case 'full':
						ks.sendKey('f');
						socket.write("setting fullscreen\n");
						break;

					case 'next':
						ks.sendCombination(['shift','n']);
						socket.write("next video\n");
						break;

					case 'load':
						mainWindow.loadURL(data0[2]);
						setTimeout(() => {
							ks.sendKey('f');
						}, 2000);

						socket.write("loading new vid\n");
						break;
				
					default:
						break;
				}

				socket.write(data0[1] + "\n");
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
						socket.write("sending space\n");
						break;

					case 'pause':
						ks.sendKey('space');
						socket.write("sending space\n");
						break;

					case 'fwd':
						ks.sendKey('right');
						socket.write("sending right\n");
						break;

					case 'back':
						ks.sendKey('left');
						socket.write("sending left\n");
						break;

					case 'full':
						ks.sendKey('f');
						socket.write("setting fullscreen\n");
						break;

					case 'next':
						ks.sendCombination(['shift','n']);
						socket.write("next video\n");
						break;

					case 'load':
						mainWindow.loadURL(data0[2]);
						setTimeout(() => {
							ks.sendKey('f');
						}, 2000);

						socket.write("loading new vid\n");
						break;
				
					default:
						break;
				}

				socket.write(data0[1] + "\n");
				console.log("Rx : " + data)
				break;
		
			case 'open terminal':
				//var data0 = data.split(",");
				
                ks.sendCombination(['control','alt','t']);
				
				setTimeout(() => {

				}, 300);

				socket.write("opening terminl\n");
				console.log("Rx : " + data)
				break;
			
			case 'quit':
				//var data0 = data.split(",");
				socket.write("Quitting\n");
				socket.destroy;
				console.log("Rx : " + data)
				process.exit();
				break;

			default :
				console.log(data);
				socket.write("response for " + data + "\n");
				break;

		}
	})
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

server.listen(1337, ip.address());
