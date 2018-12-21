import { currencies } from './lib/currencies';
import { latest, history } from './lib/exchange-rate';

export { currencies, latest, history };

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
