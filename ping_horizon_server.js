// https://www.stellar.org/developers/js-stellar-sdk/reference/index.html
var config = require('config');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();

// Enable connection via non-secure HTTP in case you don't yet have TLS certs installed
var opts = {allowHttp:true};

// Point to your local Horizon server
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