var Server = require('node-ssdp').Server
, server = new Server()
;

server.addUSN('urn:creepy:service:target:1');

server.on('advertise-alive', function (headers) {
// Expire old devices from your cache.
// Register advertising device somewhere (as designated in http headers heads)
});

server.on('advertise-bye', function (headers) {
// Remove specified device from cache.
});

server.on('ssdp:discover', function (headers) {
    console.log('hello')
    // Remove specified device from cache.
    });

// start the server
server.start();

process.on('exit', function(){
server.stop() // advertise shutting down and stop listening
})