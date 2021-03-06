var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, success) => {
    if (err){
      console.log(err);
    }else{
      var temp = success.split('\n');
      // console.log(temp);
      callback(temp);
    }
  });
  //this is the helper that will search through the queue of requested urls

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    // if (data.includes(url)) {
    //   callback(true);
    // }else {
    //   callback(false);
    // }
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  //takes the input from the client and adds the URL to the queue
  fs.appendFile(exports.paths.list, '\n' + url, 'utf8',  callback); // switched writeFile to appendFile and added \n

};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, 'utf8', (err, files) => {
    callback(files.indexOf(url) > -1);
  });
  //checks the archive for the existence of the requested url
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    request('http://' + urls[i]).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + urls[i]));
  }
};
