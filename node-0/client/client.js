require('log-timestamp');
const fetch = require('node-fetch');
const args = require('./command_line_arguments');

const serverUrl = `http:\\\\${args['server.hostname']}:${args['server.port']}`;
const n = args['n'];
const requestsType = args['requestsType'];

switch (requestsType) {
  case 'parallel':
    parallelRequests(n, serverUrl);
    break;
  case 'serial':
    serialRequests(n, serverUrl);
    break;
  default:
    throw Error(`Unknown requests type: ${requestsType}`)
}


function parallelRequests(n, url) {
  const requests = Array.from(Array(n), (_, i) => post(url, `Parallel request #${i}`));

  Promise.all(requests)
  .then(() => console.log('All parallel requests successfully executed'))
  .catch(reason => console.log(`Error occurred on trying to send requests to server. Reason - ${reason}`));
}

function serialRequests(n, url) {
  let lastRequest = Promise.resolve();

  for (let i = 0; i < n; i++) {
    lastRequest = lastRequest.then(() => post(url, `Serial request #${i}`))
  }

  lastRequest.then(() => console.log('All serial requests successfully executed'))
  .catch(reason => console.log(`Error occurred on trying to send requests to server. Reason - ${reason}`));
}

function post(url, body) {
  console.log(`Try to execute request to server. Body - ${body}`);
  return fetch(url, { method: 'POST', body })
  .then(rs => rs.ok ? Promise.resolve(rs) : Promise.reject(rs.statusText))
  .then(rs => rs.text().then(
    body => console.log(`Received response from server: ${body}`)
  ));
}