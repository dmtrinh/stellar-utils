var config = require('config');
var request = require('request');

request.post({
  url: config.get('Bridge.local').concat('/payment'),
  form: {
    amount: '1',
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