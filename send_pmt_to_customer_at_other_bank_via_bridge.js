var config = require('config');
var request = require('request');

/**
 *  Submit a payment request (in Moolahs) to a local Bridge server.
 *  If successful, you should see the following activities in the Bridge
 *  server logs:
 *  - Account loaded for BankA's base account
 *  - Success response from horizon
 *  - New received payment with an associated operation ID
 * 
 * Note that the Bridge receive callback is NOT executed because the target
 * destination is not the same as the receiving_account_id as specified in
 * config_bridge.toml
 * 
 * For more details about valid POST request paramenters, see: 
 * https://github.com/stellar/bridge-server/blob/master/readme_bridge.md
 */

request.post({
  url: config.get('Bridge.local').concat('/payment'),
  form: {
    amount: '7',
    asset_code: 'Moolah',
    asset_issuer: config.get('BankA.issuingAccount.publicKey'),
    destination: config.get('BankB.baseAccount.publicKey'),
    // source: can be left out; will use base_seed from config_bridge.toml
    memo_type: 'text',
    memo: 'Batman*bankB.com'
  }
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS!', body);
  }
});