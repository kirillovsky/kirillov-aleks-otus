require('log-timestamp');
const http = require('http');
const { hostname, port, timeoutInMills } = require('./command_line_arguments');

const server = http.createServer((request, response) => {
  const bodyChunks = [];

  request.on('data', data => bodyChunks.push(data));
  request.on('end', () => {
    const body = Buffer.concat(bodyChunks).toString();
    console.log(`Received request (Method: ${request.method}, URL: ${request.url}, Body: ${body})`);
    defferEcho(response, body, timeoutInMills);
  });
});

function defferEcho(response, requestString, timeoutInMills) {
  setTimeout(() => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end(`Your request - '${requestString}' received`);
    console.log('Echo response was sent to client');
  }, timeoutInMills);
}

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
