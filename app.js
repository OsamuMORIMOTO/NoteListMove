var http = require('http');
var Remarkable = require('remarkable');
var md = new Remarkable();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(md.render('# Remarkable rulezz!'));
    res.end('Hello Woorld\n');
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');

