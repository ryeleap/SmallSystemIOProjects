const fs = require('fs');
const geoip = require('geoip-lite');
const FILE = 'data.json';

function generateRandomIPv4() {
    const octet1 = Math.floor(Math.random() * 256);
    const octet2 = Math.floor(Math.random() * 256);
    const octet3 = Math.floor(Math.random() * 256);
    const octet4 = Math.floor(Math.random() * 256);

    return `${octet1}.${octet2}.${octet3}.${octet4}`;
}


function getGeolocation(ip) {
    var geo = null;
    while (geo === null) {
        ip = generateRandomIPv4();
        geo = geoip.lookup(ip);
    }
    console.log(`Random IP: ${ip}`);
    console.log('Geolocation Info:', geo);

    fs.writeFileSync(FILE, JSON.stringify(geo, null, 2), 'utf-8');
}


const initialRandomIP = generateRandomIPv4();
getGeolocation(initialRandomIP);