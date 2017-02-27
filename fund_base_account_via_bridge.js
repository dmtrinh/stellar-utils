var config = require('config');
var request = require('request');

/**
 *  Submit a payment request (in Moolahs) to a local Bridge server.
 *  If successful, you should see the following activities in the Bridge
 *  server logs:
 *  - Account loaded for BankA's issuing account
 *  - Success response from horizon
 *  - New received payment with an associated operation ID
 * 
 * Subsequently, your Bridge receive callback should be executed.
 * 
 * For more details about valid POST request paramenters, see: 
 * https://github.com/stellar/bridge-server/blob/master/readme_bridge.md
 */

request.post({
  url: config.get('Bridge.local').concat('/payment'),
  form: {
    amount: '5',
    asset_code: 'Moolah',
    asset_issuer: config.get('BankA.issuingAccount.publicKey'),
    destination: config.get('BankA.baseAccount.publicKey'),
    source: config.get('BankA.issuingAccount.secretKey'),
    memo_type: 'text',
    memo: 'duc*bankfoo.com'
  }
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS!', body);
  }
});