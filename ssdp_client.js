const ssdp = require('node-upnp-ssdp');

ssdp.on('DeviceFound', (a) => {
    console.log('DF',a);
});

ssdp.on('DeviceAvailable', (a) => {
    console.log('DA', a);
});

//ssdp.on('DeviceAvailable', console.log);
ssdp.on('DeviceUnavailable', console.log);
ssdp.on('DeviceUpdate', console.log);

ssdp.mSearch('ssdp:disocver')
setTimeout(ssdp.close, 20000);