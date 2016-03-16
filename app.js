var http = require('http');

var Remarkable = require('remarkable');
var md = new Remarkable();

var fs = require('fs');

var ect = require('ect');
var renderer = ect({ root : './'});


fs.readFile('./test.md', 'utf8', function ( err, text) {
  if (text != null) {
    data = { 
             title : 'Hello, ect world!',
             md : md.render(text)
           };
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(renderer.render('templates.ect', data));
      res.end('Hello Woorld\n');
    }).listen(3000);
    console.log('Server running');
  }
});


