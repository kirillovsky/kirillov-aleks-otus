require('log-timestamp');

const fetch = require('node-fetch');
const {
  requestCount,
  communicationType,
  serverHostname,
  serverPort
} = require('./command_line_arguments');

const serverUrl = `http://${serverHostname}:${serverPort}`;

switch (communicationType) {
  case 'parallel':
    sendParallelRequests(requestCount, serverUrl);
    break;
  case 'serial':
    sendSerialRequests(requestCount, serverUrl);
    break;
  default:
    throw Error(`Unknown communication type: ${communicationType}`)
}


function sendParallelRequests(count, url) {
  const requests = Array.from(Array(count), (_, i) => sendPost(url, `Parallel request #${i}`));

  Promise.all(requests)
  .then(() => console.log('All parallel requests successfully executed'))
  .catch(reason => console.log(`Error occurred on trying to send requests to server. Reason - ${reason}`));
}

function sendSerialRequests(count, url) {
  let lastRequest = Promise.resolve();

  for (let i = 0; i < count; i++) {
    lastRequest = lastRequest.then(() => sendPost(url, `Serial request #${i}`))
  }

  lastRequest.then(() => console.log('All serial requests successfully executed'))
  .catch(reason => console.log(`Error occurred on trying to send requests to server. Reason - ${reason}`));
}

function sendPost(url, body) {
  console.log(`Try to execute request to server. Body - ${body}`);
  return fetch(url, { method: 'POST', body })
  .then(rs => rs.ok ? rs.text() : Promise.reject(rs.statusText))
  .then(body => console.log(`Received response from server: ${body}`));
}