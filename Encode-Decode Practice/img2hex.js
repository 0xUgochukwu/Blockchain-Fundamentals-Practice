// Require file system access
fs = require('fs');

// Read file buffer 
imgReadBuffer = fs.readFileSync('nodeCat.png');


// Encode image buffer to hex
imgHexEncode = new Buffer.from(imgReadBuffer).toString('hex');

// Output encoded data to console
// console.log(imgHexEncode);


// Decode hex
var imgHexDecode = new Buffer.from(imgHexEncode, 'hex');

// Save decoded file file system 
// fs.writeFileSync('decodedNodeCat.png', imgHexDecode);
fs.writeFileSync('decodedNodeCat.jpg', imgHexDecode);