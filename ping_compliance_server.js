/**
 * Utility to send a sample Auth request directly to a Compliance Server
 * without having to go through an entire payment flow
 */
var request = require('request');
var crypto = require('crypto');

var nonce = crypto.randomBytes(16);
var attachment = {
  "transaction": {
    "nonce": nonce.toString('hex'),
    "sender_info": {
      "name": "Tony Stark",
      "address": "10880 Malibu Point",
      "city": "Malibu, CA",
      "country": "USA",
      "date_of_birth": "1970-05-29"
    }
  },
  "operations": [
    // Operation #1: Payment for Tony Stark
    {
      "route": "stark",
      "note": "Payment for delivery of Stark Industries Jericho missiles"
    },
    // Operation #2: Payment for Iron Man
    {
      "route": "ironman",
      "note": "Downpayment for War Machine prototype"
    }
  ]
};

// Calculation of Attachment hash above
var hash = crypto.createHash('sha256');
hash.update(JSON.stringify(attachment));
var memoHashHex = hash.digest('hex');
console.log("Attachment Hash = " + memoHashHex);

var data = {
    sender: 'ironman*bankA.com',
    need_info: true,
    tx: 'AAAAACWmRKivpIAYP04lBlY1vwsVqzhHysdzPRKquPDyi0LBAAAAZAAAAAAAAABkAAAAAAAAAAMyQ9plXwM8/mUo8/2RP7UQh0qX/2xW4r6F8KwDbKhlawAAAAEAAAAAAAAAAQAAAADTo2GIhFD5pzeAKk6hnv9RNYQMgmXwEKizOHy0x63dnQAAAAAAAAACVAvkAAAAAAA=',
    attachment: attachment
}

console.log(data);

request.post({
  url: 'http://localhost:8103/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    data: JSON.stringify(data),
    sig: 'GDBO2HSPIU6KXJMORGJZCQ3CTGAQI4EVJJMRTI4PJ6ZWNN7GDBEX5XEH'
  }
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS!', body);
  }
});
