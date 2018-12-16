//get latest exchange rate
const latest = require('./forexmm/latest');

//get currencies
const currencies = require('./forexmm/currencies');

//get history
const history = require('./forexmm/history');

module.exports = {
  latest,
  currencies,
  history
};
