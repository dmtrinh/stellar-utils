var config = require('config');

var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server(config.get('Horizon.testnet'));

// BankA issues 'Moolah' in the form of credits.  In order for BankB to receive Moolahs, 
// it must trust BankA

var issuerPublicKey = config.get('BankA.issuingAccount.publicKey');
var receiverKeys = StellarSdk.Keypair.fromSecret(config.get('BankB.baseAccount.secretKey'));

// Create an object to represent the new asset
var moolah = new StellarSdk.Asset('Moolah', issuerPublicKey);

server.loadAccount(receiverKeys.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: moolah,
        limit: '100000'
      }))
      .build();
    transaction.sign(receiverKeys);
    return server.submitTransaction(transaction);
  });