var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.method);
  if (req.method !== 'GET' && req.method !== 'POST') {
    //404
    res.writeHead(404, httpHelpers.headers);
    res.end();
  } else {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    }).on('end', () => {
      body = body.slice(4);
    });
    if (req.method === 'GET') {
      httpHelpers.serveAssets(res, body, function() {
        archive.isUrlInList(body, function(found) {
          if (found) {
            res.writeHead(302, {Location: '/loading.html'});
            res.end();
          } else {
            res.writeHead(404, httpHelpers.headers);
            res.end();
          }
        });
      })
    } else if (req.method === 'POST') {

    }
  }
};
















// console.log(req.method);
// fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, success) => {
//   if (err) {
//     console.log(err);
//   } else {
//     res.end();
//   }
// });
// if (req.method === 'POST') {
//   let body = "";
//   req.on('data', (chunk) => {
//     body+=chunk;
//   }).on('end', () => {
//     body = body.slice(4);
//     archive.isUrlInList(body, function(exists){
//       if (!exists) {
//         fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, success) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.end(success);
//             console.log(success);
//           }
//         });
//         archive.addUrlToList(body, function(){})
//       } else {
//         // fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, success) => {
//         //   if (err) {
//         //     console.log(err);
//         //   } else {
//         //     res.end(success);
//         //   }
//         // });
//         console.log(true)//~~~~~~~~~~~~~~~~~this is where we will call a render ~~~~~~~~~~~~~~~~~~~~~~
//       }
//     });
//   });
// } else if (req.method === 'GET') {
//   fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, success) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.end(success);
//     }
//   });
// }
