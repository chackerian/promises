/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var con = require('../../exercises/bare_minimum/promiseConstructor.js');
var ation = require('../../exercises/bare_minimum/promisification.js');

var writeFileAsyncFunc = function(data, path, callback) {
  fs.writeFile(path, data, function(error) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, null);
    }
  });
};

const writeFileAsync = Promise.promisify(writeFileAsyncFunc);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return con.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(data) {
      return ation.getGitHubProfileAsync(data);
    })
    .then(function(data) {
      writeFileAsync(JSON.stringify(data), writeFilePath);
    })
    .catch(function(error) {
      throw error;
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
