'use strict';

//get latest exchange reate
var http = require('http');

var getLatest = new Promise(function (resolve, reject) {
	var options = {
		hostname: 'forex.cbm.gov.mm',
		port: 80,
		path: '/api/latest',
		agent: false
	};
	http.get(options, function (res) {
		var latestExchangeRate = '';
		res.setEncoding('utf8');
		res.on('data', function (data) {
			latestExchangeRate += data;
		});
		res.on('end', function () {
			var parsed = void 0;
			try {
				parsed = JSON.parse(latestExchangeRate);
			} catch (err) {
				reject(err);
			}
			resolve(parsed);
		});
	}).on('error', function (err) {
		reject(err);
	});
});

module.exports = getLatest;