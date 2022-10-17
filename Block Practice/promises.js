// Example 1

// new Promise(function(resolve) {
//     console.log('first');
//     resolve();
//     console.log('second');
//   }).then(function() {
//     console.log('third');
//   });


// Example 2
// function wait(ms) {

//     return new Promise(function(resolve) {
//     setTimeout(function() {
//     resolve();
//     }, ms);
//       console.log(this);
//     })
// };


// var milliseconds = 2000;
// wait(milliseconds).then(finish);


// // This is just here to help you test.
// function finish() {
//     console.log("Complete after " + milliseconds + "ms.");
// }


function examplePromise(){
    let promiseToReturn = new Promise(function (resolve, reject) {
      let sum;
      setTimeout(function(){
        sum = 5 + 6;
        if(sum > 10) {
          resolve(sum);
        }else{
          reject('The promise has been rejected');
        }     
      }, 2000);
    });
    return promiseToReturn;
  }
  
  console.log('some piece of code');
  examplePromise().then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error);
  });
  console.log('another piece of code');
