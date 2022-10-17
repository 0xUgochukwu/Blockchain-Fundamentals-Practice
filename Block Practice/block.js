// Importing the SHA256 Hashing Algorithm
const SHA256 = require('crypto-js/sha256');

// Building a Block
class Block {
	constructor(data){
		this.id = 0;
        this.nonce = 544444;
      	this.body = data;
      	this.hash = "";
    }
    
    // Generate Hash for the Block
  	generateHash() {
      	
      	let self = this;
       
        // Generating Hash asynchronosly incase we catch any errors
        return new Promise(function(resolve, reject){
          self.hash = SHA256(JSON.stringify(self));

          if (self.hash) {
            resolve(self);
          } else {
            reject(Error("It broke"));
          }
        });
        
    }
}

// Exporting the class Block to be reuse in other files
module.exports.Block = Block;