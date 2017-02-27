"use strict";
var config = require('config');

var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server(config.get('Horizon.testnet'));

// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair.fromSecret('SAOOXESJE6UHQVPJCKSQHZCKULTNWRHXJDPZ4GYF7LFBCLM7VJWPH5P5');
var receivingKeys = StellarSdk.Keypair.fromSecret('SAMNEWT4AF46AUM2M7LRAHDATDVFNMH2D4KLUSVWRHYAPWBE6OWBS524');

// Create an object to represent the new asset
var moolah = new StellarSdk.Asset('Moolah', issuingKeys.publicKey());

// First, the receiving account must trust the asset
server.loadAccount(receivingKeys.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: moolah,
        limit: '10000'
      }))
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })

  // Second, the issuing account actually sends a payment using the asset
  .then(function() {
    return server.loadAccount(issuingKeys.publicKey())
  })
  .then(function(issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys.publicKey(),
        asset: moolah,
        amount: '1000'
      }))
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .catch(function(error) {
    console.error('Error!', error);
  });
