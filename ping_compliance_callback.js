/**
 * Utility to test the callback endpoints used by a Compliance Server
 */
var request = require('request');

const OK = 200;
const UNKNOWN = 202;
const DENIED = 403;
const SERVER_ERROR = 500;

request.post({
  url: 'http://localhost:8006/fetch_info',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    address: 'duc*bankA.com'
  }
}, function(error, response, body) {
  console.log("Invoked '/fetch_info'...");
  if (error || response.statusCode !== 200) {
    console.error('... ERROR!', error || body);
  }
  else {
    console.log('... SUCCESS!', body);
  }
});

var sender_info = {
    name: 'Tony Stark',
    address: '10880 Malibu Point, Malibu, CA, USA',
    stellar: 'ironman*ImaginaryBank.com',
    date_of_birth: '1970-05-29'
}

request.post({
  url: 'http://localhost:8006/sanctions',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    sender: JSON.stringify(sender_info)
  }
}, function(error, response, body) {
  console.log("Invoked '/sanctions'...");
  if (error || response.statusCode != 200) {
    switch (response.statusCode) {
      case UNKNOWN:
        console.log('... Additional time is needed to perform sanctions check. ' + (error || body));
        break;
      case DENIED:
        console.log('... Request was DENIED.');
        break;
      case SERVER_ERROR:
        console.log('... Something went wrong on the server.');
    } 
  } 
  else {
    console.log('... SUCCESS - Sanctions check OK!', body);
  }
});


request.post({
  url: 'http://localhost:8006/ask_user',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    amount: 100,
    asset_code: 'Moolah',
    asset_issuer: 'GDBO2HSPIU6KXJMORGJZCQ3CTGAQI4EVJJMRTI4PJ6ZWNN7GDBEX5XEH',
    sender: JSON.stringify(sender_info),
    note: 'Hello World'
  }
}, function(error, response, body) {
  console.log("Invoked '/ask_user'...");
  if (error || response.statusCode != 200) {
    switch (response.statusCode) {
      case UNKNOWN:
        console.log('... Additional time is needed to perform sanctions check. ' + (error || body));
        break;
      default:
        console.log('... Request was DENIED.');
        break;
    } 
  } 
  else {
    console.log('... SUCCESS - Sanctions check OK!', body);
  }
});
