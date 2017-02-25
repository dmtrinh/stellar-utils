// https://www.stellar.org/developers/js-stellar-sdk/reference/index.html
var config = require('config');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var opts = {allowHttp:true};

// Point to our local Horizon server
var server = new StellarSdk.Server(config.get('Horizon.local'), opts);

console.log('Querying test account...');

var baseAccountPublicKey = config.get('BankA.baseAccount.publicKey');

server.loadAccount(baseAccountPublicKey)
  .then(function(account) {
    console.log('Success! Results:', account);
  })
  .catch(function(error) {
    console.error('Error!', error);
  });