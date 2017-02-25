"use strict";
var config = require('config');

var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server(config.get('Horizon.testnet'));

// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair.fromSecret(config.get('BankA.issuingAccount.secretKey'));
var baseAccountPublicKey = config.get('BankA.baseAccount.publicKey');

// Create an object to represent the new asset
var moolah = new StellarSdk.Asset('Moolah', issuingKeys.publicKey());

// For this operation to be successful, there must already be a trustline between
// the issuing and base accounts.  You can use the create_trustline utility
// to establish that trust if none currently exists.  Also, note that the 
// base account can only hold up to a certain amount of moolahs as specified
// by the trustline limit.
server.loadAccount(issuingKeys.publicKey())
  .then(function(issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: baseAccountPublicKey,
        asset: moolah,
        amount: '1000'
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
