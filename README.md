# Stellar-Client
A super simple client using the Stellar SDK to demonstrate some basic activities including:
* retrieval of an existing account
* creation of new keypairs
* creation of a transaction
* creation of a new account
* submission of a transaction to the Stellar TestNet via a test Horizon server

## Running this client
```
git clone https://github.com/dmtrinh/stellar-client
```
Change into the `stellar-client` directory and run:
```
npm install
```
To run this client:
```
npm start
```
Sample output:
```
---------- 01:30:12 (dmtrinh) ~/Dev/stellar-client ----------
==> npm start

> stellar-client@0.0.1 start /Users/dmtrinh/Dev/stellar-client
> node index.js

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
