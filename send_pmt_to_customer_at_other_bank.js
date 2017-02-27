var config = require('config');

var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server(config.get('Horizon.testnet'));
var sourceKeys = StellarSdk.Keypair.fromSecret(config.get('BankA.baseAccount.secretKey'));
var issuerId = config.get('BankA.issuingAccount.publicKey');
var destinationKeys = StellarSdk.Keypair.fromSecret(config.get('BankB.baseAccount.secretKey'));

var moolah = new StellarSdk.Asset('Moolah', issuerId);

// Create trustline with Moolah for Destination account
server.loadAccount(destinationKeys.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: moolah,
        limit: '10000'
      }))
      .build();
    transaction.sign(destinationKeys);
    return server.submitTransaction(transaction);
  })

server.loadAccount(sourceKeys.publicKey())
  .then(function(sourceAccount) {
    var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationKeys.publicKey(),
        asset: moolah,
        amount: '3'
      }))
      // Use the memo to indicate the customer this payment is intended for.
      .addMemo(StellarSdk.Memo.text('Ducmeister'))
      .build();
    transaction.sign(sourceKeys);
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
  });
