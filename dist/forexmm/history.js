'use strict';

//get exchange rate history
var http = require('http');

var getHistory = function getHistory(date) {
	return new Promise(function (resolve, reject) {
		var options = {
			hostname: 'forex.cbm.gov.mm',
			port: 80,
			path: '/api/history/' + date,
			agent: false
		};
		http.get(options, function (res) {
			var exchangeRate = '';
			res.setEncoding('utf8');
			res.on('data', function (data) {
				exchangeRate += data;
			});
			res.on('end', function () {
				var parsed = void 0;
				try {
					parsed = JSON.parse(exchangeRate);
				} catch (err) {
					reject(err);
				}
				resolve(parsed);
			});
		}).on('error', function (err) {
			reject(err);
		});
	});
};

module.exports = getHistory;