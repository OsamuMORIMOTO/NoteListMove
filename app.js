var http = require('http');

var Remarkable = require('remarkable');
var md = new Remarkable();

var fs = require('fs');

var ect = require('ect');
var renderer = ect({ root : './'});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  findDocuments(db, function() {
//  insertDocuments(db, function() {
    db.close();
  });
});

// fs.readFile('./test.md', 'utf8', function ( err, text) {
//   if (text != null) {
//     data = { 
//              title : 'Hello, ect world!',
//              md : md.render(text)
//            };
//     http.createServer(function (req, res) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(renderer.render('templates.ect', data));
//       res.end('Hello Woorld\n');
//     }).listen(3000);
//     console.log('Server running');
//   }
// });


http.createServer(function (req, res) {
  ct = GetContentType(req['url']);
if(ct == 'text/html' || ct == undefined)
{
  fs.readFile('./test.md', 'utf8', function ( err, text) {
    if (text != null) {
      data = { 
               title : 'Hello, ect world!',
               md : md.render(text)
             };

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(renderer.render('templates.ect', data));
      res.end();
    }
  });
}
else
{
  console.log(req['url']);
  fs.readFile('./' + req['url'], 'utf8', function ( err, text) {
  if ( text != null ){
  console.log(text);
      res.writeHead(200, {'Content-Type': ct});
      res.write(text);
      res.end();
  }
  });
}
}).listen(3000);
console.log('Server running');

var GetContentType = function(url) {
  contentType = {
    'html':'text/html',
    'css':'text/css',
    'js':'text/javascript',
    'ico':'',
  }
  point = url.lastIndexOf('.');
  return contentType[url.slice(point + 1)];
}

var insertDocuments = function(db, callback) {
  var collection = db.collection('documents');

  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err,null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted OK");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  var collection = db.collection('documents');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found OK");
    console.dir(docs);
    callback(docs);
  });
}
