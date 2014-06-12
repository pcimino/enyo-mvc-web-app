// https://github.com/Kingdutch/NodeJS-Simple-Webserver
// http://erichonorez.wordpress.com/2013/02/04/a-basic-web-server-with-node-js-and-express/
var port = process.argv[2] || 8888;
var express = require('express');
var app = express();
var ip = '127.0.0.1';


app.get('/ping', function (req, res) {
  ip = req.headers['x-forwarded-for'] || req.headers['X-Real-IP'] || req.headers['X-Originating-IP'] || req.headers['X-Remote-IP']  || req.connection.remoteAddress;
  res.send({'server':ip});
});

app.use(
  "/", //the URL throught which you want to access to you static content
  express.static(__dirname + "/") //where your static content is located in your filesystem
);

app.listen(port); //the port you want to use
console.log("Static file server running at\n  => http://" + ip + ":" + port + "/\nCTRL + C to shutdown");

