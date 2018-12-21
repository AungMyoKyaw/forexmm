import * as assert from 'assert';
import 'mocha';

import * as forexmm from '../src/';
import { Icurrencies } from '../src/lib/currencies';
import { IexchangeRate } from '../src/lib/exchange-rate';

describe('FOREXMM', () => {
  it('LATEST', done => {
    const { latest } = forexmm;
    let res: IexchangeRate;
    (async function() {
      try {
        res = await latest();
        done();
      } catch (err) {
        done(err);
      }
    })();
  });

  it('CURRENCIES', function(done) {
    const { currencies } = forexmm;
    let res: Icurrencies;
    (async function() {
      try {
        res = await currencies();
        done();
      } catch (err) {
        done(err);
      }
    })();
  });

  it('HISTORY', done => {
    const { history } = forexmm;
    let res: IexchangeRate;
    (async function() {
      try {
        const date = new Date(2018, 1, 4);
        res = await history(date);
        done();
      } catch (err) {
        done(err);
      }
    })();
  });
});
