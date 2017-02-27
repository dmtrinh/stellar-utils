var config = require('config');
var request = require('request');

request.post({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  url: config.get('Bridge.local').concat('/create-keypair'),
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS!', body);
  }
});
