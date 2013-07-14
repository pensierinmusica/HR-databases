var mysql = require('mysql');
var url = require('url');
var fs = require('fs');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

require('http').createServer(function(request, response) {
  var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
  };

  var path = url.parse(request.url).path;

  if (path === '/' || path.match(/^\/\?/)) {
    require('fs').readFile('../2013-06-chat-client/index.html', function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    });
  } else if (path.match(/^\/css/)) {
      require('fs').readFile('../2013-06-chat-client' + path, function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.end(data);
    });
  } else if (path.match(/^\/(js|vendor)/)) {
      require('fs').readFile('../2013-06-chat-client' + path, function(err, data) {
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.end(data);
    });
  } else if (path.match(/^\/classes\//)) {
    var room = path.split('/').slice(2).join('');
    if (request.method === 'POST') {
      request.setEncoding('utf8');
      request.on('data', function(data) {
        data = JSON.parse(data);
        dbConnection.query("INSERT INTO storage SET username = ?, text = ?", [data.username, data.text]);
      });
      response.writeHead(201, headers);
      response.end();
    } else if (request.method === 'GET') {
      response.writeHead(200, headers);
      dbConnection.query("SELECT username, text FROM storage", function(err, rows) {
        response.end(JSON.stringify(rows));
      });
    } else {
      response.writeHead(404, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
}).listen(8080, '127.0.0.1');



//dbConnection.end();
