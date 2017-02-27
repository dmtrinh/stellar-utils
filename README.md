# Stellar-Utils
This project contains a collection of utilities to test various operations on the Stellar network:
* Submission of a simple payment using native asset between two accounts
* Issuance of a new asset type (called 'Moolah') and funding of a base account
* Creation of new trustlines
* Sending payments using Moolahs

Also included are a few "smoke tests" to validate your Stellar Anchor deployment.  
Feel free to grab the [stellar-anchor](https://github.com/dmtrinh/stellar-anchor))
project which provides a basic reference implementation for you to quickly become an Anchor.

## Running these utilities
```
git clone https://github.com/dmtrinh/stellar-client
```
Change into the `stellar-client` directory and run:
```
npm install
```
To run the simple_payment utility:
```
node send_payment.js
```
Sample output:
```
---------- 01:30:12 (dmtrinh) ~/Dev/stellar-client ----------

> node send_payment.js

Source account current sequence number: 1698797004521477
Generating keypair for new Destination account...
New Account Secret Key: SDZATUNXIAOCZTLDL7J2XDSKRT45X2SV5QFIUCDG3H6G6DXY2BORPFX2
New Account Public Key: GATPPFHFKKTSWELZROVIMB4KT7DZSRV6TWSFK5OGAOHBDCGPG6SQLOX6
Building transaction to create destination account.
Signing transaction with Source account private key.
Transaction envelope:
AAAAAMLtHk9FPKuljomTkUNimYEEcJVKWRmjj0+zZrfmGEl+AAAAZAAGCQwAAAAGAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAJveU5VKnKxF5i6qGB4qfx5lGvp2kVXXGA44RiM83pQUAAAAADuaygAAAAAAAAAAB5hhJfgAAAEA57i3OXoJK05vajBJCBRu+QTfv0yIaMONDyx464EpYa1h9uBrFwhAyZz9EhbfPwPA8HUUaN5Uvak44HPrhm54K
Submitting transaction to Stellar network.
{
  "_links": {
    "transaction": {
      "href": "https://horizon-testnet.stellar.org/transactions/766ba1494b1ee62e73b4160e2bd8aa887f8f7d2ce13e184f60dfe1ec48f7dcb0"
    }
  },
  "hash": "766ba1494b1ee62e73b4160e2bd8aa887f8f7d2ce13e184f60dfe1ec48f7dcb0",
  "ledger": 432034,
  "envelope_xdr": "AAAAAMLtHk9FPKuljomTkUNimYEEcJVKWRmjj0+zZrfmGEl+AAAAZAAGCQwAAAAGAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAJveU5VKnKxF5i6qGB4qfx5lGvp2kVXXGA44RiM83pQUAAAAADuaygAAAAAAAAAAB5hhJfgAAAEA57i3OXoJK05vajBJCBRu+QTfv0yIaMONDyx464EpYa1h9uBrFwhAyZz9EhbfPwPA8HUUaN5Uvak44HPrhm54K",
  "result_xdr": "AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=",
  "result_meta_xdr": "AAAAAAAAAAEAAAACAAAAAAAGl6IAAAAAAAAAACb3lOVSpysReYuqhgeKn8eZRr6dpFV1xgOOEYjPN6UFAAAAAA7msoAABpeiAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAGl6IAAAAAAAAAAMLtHk9FPKuljomTkUNimYEEcJVKWRmjj0+zZrfmGEl+AAAAFrSlGagABgkMAAAABgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA"
}

Success! View the transaction at: 
https://horizon-testnet.stellar.org/transactions/766ba1494b1ee62e73b4160e2bd8aa887f8f7d2ce13e184f60dfe1ec48f7dcb0
---------- 01:32:02 (dmtrinh) ~/Dev/stellar-client ----------
```
Have fun!
