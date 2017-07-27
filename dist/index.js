'use strict';

//get latest exchange rate
var latest = require('./forexmm/latest');

//get currencies
var currencies = require('./forexmm/currencies');

//get history
var history = require('./forexmm/history');

module.exports = {
	latest: latest,
	currencies: currencies,
	history: history
};