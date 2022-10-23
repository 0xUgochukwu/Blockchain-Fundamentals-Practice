/**
 * Importing BlockExplorer API to search Block Data
 */
const be = require('blockexplorer');


function getBlock(index) {
  	//add your code here
	 new Promise(function(resolve) {
		be.blockIndex(index).then(function(block) {
			be.block(block.hash).then(function(block) {
				console.log(block);
				resolve();
			}).catch(function(err) {console.log("There's an Error Somewhere");});
		});
	})
  	
}

/**
 * Function to execute the `getBlock(index)` function
 * Nothing to implement here.
 */

(function theLoop (i) {
	setTimeout(function () {
        getBlock(i);
        i++;
		if (i < 3) theLoop(i);
	}, 3000);
  })(0);