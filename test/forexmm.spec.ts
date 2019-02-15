import * as assert from 'assert';
import 'mocha';

import * as forexmm from '../src/';
import { Icurrencies } from '../src/lib/currencies';
import { IexchangeRate } from '../src/lib/exchange-rate';

describe('FOREXMM', () => {
  it('LATEST', async () => {
    const { latest } = forexmm;
    let res: IexchangeRate;
    res = await latest();
  });

  it('CURRENCIES', async () => {
    const { currencies } = forexmm;
    let res: Icurrencies;
    res = await currencies();
  });

  it('HISTORY', async () => {
    const { history } = forexmm;
    let res: IexchangeRate;
    const date = new Date(2018, 1, 4);
    res = await history(date);
  });
});
