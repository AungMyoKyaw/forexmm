import * as assert from 'assert';
import 'mocha';

import FOREXMM from '../src/';

describe('FOREXMM', () => {
  it('LATEST', done => {
    const forexmm = new FOREXMM();
    const exchangeRate = forexmm.exchangeRate();
    console.log(exchangeRate);
    done();
  });

  it('CURRENCIES', done => {
    const forexmm = new FOREXMM();
    const currencies = forexmm.currencies();
    console.log(currencies);
    done();
  });

  it('HISTORY', done => {
    const date = new Date(2018, 1, 4);
    const forexmm = new FOREXMM(date);
    const exchangeRate = forexmm.exchangeRate();
    console.log(exchangeRate);
    done();
  });
});
