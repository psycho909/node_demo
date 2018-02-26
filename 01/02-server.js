var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-type": 'text/plain'
    });
    response.write('hello!');
    response.end();
}).listen(8080)