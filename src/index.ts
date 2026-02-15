import { currencies, ICurrencies } from './lib/currencies';
import { latest, history, IExchangeRate } from './lib/exchange-rate';

export {
  currencies,
  latest,
  history,
  // Export types for consumers
  ICurrencies,
  IExchangeRate
};

// CommonJS compatibility
module.exports = {
  currencies,
  latest,
  history
};

module.exports.default = {
  currencies,
  latest,
  history
};
