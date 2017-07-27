'use strict';

//get currencies
var http = require('http');

var getcurrencies = new Promise(function (resolve, reject) {
	var options = {
		hostname: 'forex.cbm.gov.mm',
		port: 80,
		path: '/api/currencies',
		agent: false
	};
	http.get(options, function (res) {
		var currencies = '';
		res.setEncoding('utf8');
		res.on('data', function (data) {
			currencies += data;
		});
		res.on('end', function () {
			var parsed = void 0;
			try {
				parsed = JSON.parse(currencies);
			} catch (err) {
				reject(err);
			}
			resolve(parsed);
		});
	}).on('err', function (err) {
		reject(err);
	});
});

module.exports = getcurrencies;