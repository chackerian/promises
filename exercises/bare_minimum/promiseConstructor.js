/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content.split('\n')[0]);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function(reject, resolve) {
    request.get(url, function (err, res, body) {
      if (url.match(/:/g).length > 1) {
        var err = {};
        err.message = 'Invalid URI';
        resolve(err);
      }
      console.log(res.statusCode);
      if (err) {
        reject(err);
      } else {
        console.log(typeof res.statusCode);
        resolve(res.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
