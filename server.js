'use strict';

var express = require('express');
var app = express();
var request = require('request');
var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var key = '&key=AIzaSyAay9JvN_HdeAxzEtSKcIgQnrRvB6uuQZ8';

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://psych-unit-locator.firebaseapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/', function(req, res) {
  console.log('write');
  res.end('Please put zipcode onto URL to get geolocation coordinates : <br>e.g. https://googlygps.herokuapp.com/90016');
});


app.get('/:zipcode', function(req, res) {
  var zip = req.params.zipcode;
  var urlComplete = url + zip + key;
  request(urlComplete, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      if (data.results[0]) {
       var loc = data.results[0].geometry.location;
       res.json(loc);
       return;
      }
    } else {
      console.log(error);
    }
  });
});


app.listen(process.env.PORT || 8080, function() {
  console.log('Started server...');
});
