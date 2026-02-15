import * as assert from 'assert';
import 'mocha';

import * as forexmm from '../src/';
import { ICurrencies } from '../src/lib/currencies';
import { IExchangeRate } from '../src/lib/exchange-rate';

describe('FOREXMM', () => {
  describe('latest', () => {
    it('should fetch latest exchange rates', async () => {
      const { latest } = forexmm;
      const res: IExchangeRate = await latest();

      assert.ok(res, 'Response should exist');
      assert.ok(res.rates, 'Response should contain rates');
      assert.ok(typeof res.timestamp === 'string', 'Timestamp should be a string');
    });
  });

  describe('currencies', () => {
    it('should fetch available currencies', async () => {
      const { currencies } = forexmm;
      const res: ICurrencies = await currencies();

      assert.ok(res, 'Response should exist');
      assert.ok(res.currencies, 'Response should contain currencies');
    });
  });

  describe('history', () => {
    it('should fetch historical exchange rates with Date object', async () => {
      const { history } = forexmm;
      const date = new Date(2018, 1, 4);
      const res: IExchangeRate = await history(date);

      assert.ok(res, 'Response should exist');
      assert.ok(res.rates, 'Response should contain rates');
    });

    it('should fetch historical exchange rates with string date', async () => {
      const { history } = forexmm;
      const res: IExchangeRate = await history('04-02-2018');

      assert.ok(res, 'Response should exist');
      assert.ok(res.rates, 'Response should contain rates');
    });
  });
});
