const net = require('net');

var args = process.argv
var client = new net.Socket();

var SimulatorDeviceId = "amzn1.ask.device.AHNO6NEHBF6KQ7WJZQQ7BAGXYXYM4GFBVLR5QJHIDE6J7BYKQTYHJ5AAHTHGPTH5THNIWVNO64LPV5L74RXPBLGIIEY7UFUWHPVPIPP7P76YK52NQ34UEKFHSZ3XON7RHQXQ2LKXTJEWLHYDRXMZ73A2GCYA";
var PhoneDeviceId = "amzn1.ask.device.AHNO6NEHBF6KQ7WJZQQ7BAGXYXYI2L5EWAD7INIM5LSMKZGCHFQBNFGITPURWABHYNWDY646NU36NGNI6MNLIU6RNXIHT64MVSZB4JVRY2IZISHJDZWYEP3IM35PJ23WZZQI5JW22TWDCT7VIKUZKPXMQQ45GEC7TZWQU7J3J5IYTVRN37FSM"

var host = '192.168.0.161';
if(args.includes('dev')) {
	host = 'localhost';
}

client.connect(1337, host, function () {
	console.log('Connected');
	//client.write('youtube');
});

client.on('data', function (data) {
	if(data + "" == "ID")
		client.write("AB")
	console.log(data + "")
});

client.on('close', function () {
	console.log('Connection closed');
	setTimeout(() => {
		client.connect(1337, host, function () {
			console.log('Connected');
			//client.write('CONNECT');
		});
	}, 3000);
});

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
	let chunk;
	while ((chunk = process.stdin.read()) !== null) {
		var data = chunk + '';
		//console.log(data.split('\n')[0])
		client.write(data.split('\n')[0]);
	}
});