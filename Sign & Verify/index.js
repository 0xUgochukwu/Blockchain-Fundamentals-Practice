const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec; 
const ec = new EC('secp256k1');


class Sender {
    constructor (){
       this.keyPair = ec.genKeyPair();
       this.publicKey = this.keyPair.getPublic();
    }

    // Signing the message
    digitalSigniture (message){
       return this.keyPair.sign(message)
     }
  }

  class Receiver {
    constructor(publicKey,digitalSigniture,message){ 
         this.publicKey = ec.keyFromPublic(publicKey,'hex');
         this.digitalSigniture = digitalSigniture;
         this.message = message;
         }

        //  Verifying the message
    verifySigniture () {
console.log(this.publicKey.verify(this.message,this.digitalSigniture));
        }
     }


// Running Tests

let message = 'payment information';
message = [SHA256(message)];
const sender = new Sender();
const publicKey = sender.publicKey;
const digitalSigniture = sender.digitalSigniture(message);
const receiver = new Receiver(publicKey,digitalSigniture,message);
receiver.verifySigniture();

// Output
// console.log(sender);
// console.log(receiver);
// console.log(digitalSigniture);