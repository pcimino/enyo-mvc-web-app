// http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server
var port = process.argv[2] || 8888;
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + "/public")
).listen(port);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
