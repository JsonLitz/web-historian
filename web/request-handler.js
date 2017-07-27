var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, success) => {
    if (err) {
      console.log(err);
    } else {
      res.end(success);
    }
  })
  // res.end(archive.paths.siteAssets);
};
