/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  return new Promise(function(resolve, reject){
    db.put(key, value, function(err) {
      if (err) {
        console.log('Block ' + key + ' submission failed', err);
        reject(err);
      }
      resolve(value);
    });
  })
}

// Get data from levelDB with key
function getLevelDBData(key){
  return new Promise(function(resolve, reject){
    db.get(key, function(err, value) {
      if (err) {
        console.log('Not found!', err);
        reject(err);
      };
      resolve(value);
      console.log('Value = ' + value); 
    })
  })
}


// Get the Number of Blocks in the Blockchain
function getBlocksCount(){
  let height = 0;
  return new Promise(function(resolve, reject){
    db.createReadStream().on('data', function(data) {
        height++;
    }).on('error', function(err) {
        return console.log('Unable to read data stream!', err)
    }).on('close', function() {
        resolve(height);
        return height;
    });
  })
}

// Add data to levelDB with value
function addDataToLevelDB(value) {
    let i = 0;
    return new Promise(function(resolve, reject){
      db.createReadStream().on('data', function(data) {
          i++;
      }).on('error', function(err) {
          return console.log('Unable to read data stream!', err)
      }).on('close', function() {
          console.log('Block #' + i);
          addLevelDBData(i, value);
          resolve(i);
      });
    })
}

/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


(function theLoop (i) {
  setTimeout(function () {
    addDataToLevelDB('Testing data');
    if (--i) theLoop(i);
  }, 100);
})(10);
