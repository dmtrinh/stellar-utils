/**
 * Utility to test a Federation Server
 */
var request = require('request');

request.get({
  url: 'https://localhost:8002/',
  qs: {
    q: 'hulk*bankA.com',
    type: 'name'
  }
}, function(error, response, body) {
  console.log(body);
});
