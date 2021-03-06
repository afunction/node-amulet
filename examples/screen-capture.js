'use strict';

var Phantom = require('../lib');
var ph = new Phantom();
var page = new Phantom.WebPage(ph);
var address;

if (process.argv.length === 2) {
  console.log('Usage: loadspeed.js <some URL>');
  ph.exit();
  process.exit();
} else {
  address = process.argv[2];
  page.open(address, function (err, status) {
    if (status !== 'success') {
      console.log('FAIL to load the address');
    } else {
      page.evaluate(function () {
        return document.title;
      }, function (err, data) {
        page.render(data + '.png', function (err) {
          ph.exit();
          process.exit();
        });
      });
    }
  });
}
