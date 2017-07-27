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
  });
  if (req.method === 'POST') {
    let body = "";
    req.on('data', (chunk) => {
      body+=chunk;
    }).on('end', () => {
      body = body.slice(4)
      archive.isUrlInList(body, function(exists){
        if (!exists) {
          fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, success) => {
            if (err) {
              console.log(err);
            } else {
              res.end(success);
              console.log(success);
            }
          });
          archive.addUrlToList(body, function(){})
        }else {

          console.log(true)//~~~~~~~~~~~~~~~~~this is where we will call a render ~~~~~~~~~~~~~~~~~~~~~~
        }
      });
  });
  }

};
