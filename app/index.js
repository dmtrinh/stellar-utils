"use strict";

var StellarSdk = require('stellar-sdk');

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

StellarSdk.Network.useTestNetwork();
var sourceAccountId = 'GDBO2HSPIU6KXJMORGJZCQ3CTGAQI4EVJJMRTI4PJ6ZWNN7GDBEX5XEH'
var sourceAccountSecret = 'SAOOXESJE6UHQVPJCKSQHZCKULTNWRHXJDPZ4GYF7LFBCLM7VJWPH5P5';

// load a test source account and use moolah from that account to fund a NEW destination account
server.loadAccount(sourceAccountId)
  .then(function(sourceAccount) {

    console.log(`Source account current sequence number: ${sourceAccount.sequenceNumber()}`);

    console.log(`Generating keypair for new Destination account...`);
    var newAccountKeyPair = StellarSdk.Keypair.random();
    var newAccountSecretKey = newAccountKeyPair.secret();
    var newAccountPublicKey = newAccountKeyPair.publicKey();

    console.log(`New Account Secret Key: ${newAccountSecretKey}`);
    console.log(`New Account Public Key: ${newAccountPublicKey}`);

    console.log(`Building transaction to create destination account.`);
    var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.createAccount({
            destination: newAccountPublicKey,
            startingBalance: "25"  // in XLM
          }))
          .build();

    console.log(`Signing transaction with Source account private key.`);
    transaction.sign(StellarSdk.Keypair.fromSecret(sourceAccountSecret)); // sign the transaction

    // transaction is now ready to be sent to the network or saved somewhere
    console.log(transaction.toEnvelope().toXDR('base64'));

    server.submitTransaction(transaction)
      .then(function(transactionResult) {
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
      })
      .catch(function(err) {
        console.log('An error has occured:');
        console.log(err);
      });
  })
  .catch(function(e) {
    console.error(e);
  });