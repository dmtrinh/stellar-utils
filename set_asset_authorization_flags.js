var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

var flags = StellarSdk.xdr.AccountFlags;
var transaction = new StellarSdk.TransactionBuilder(issuingAccount)
  .addOperation(StellarSdk.Operation.setOptions({
    setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
  }))
  .build();
transaction.sign(issuingKeys);
server.submitTransaction(transaction);