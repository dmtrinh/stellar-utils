var config = require('config');

var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server(config.get('Horizon.testnet'));

var issuingKeys = StellarSdk.Keypair.fromSecret(config.get('BankA.issuingAccount.secretKey'));

server.loadAccount(issuingKeys.publicKey())
  .then(function(issuer) {
    var flags = StellarSdk.xdr.AccountFlags;
    var transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.setOptions({
        setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
      }))
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Error!', error);
  });