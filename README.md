# FOREXMM

> Myanmar Exchange Rate - NPM package for fetching exchange rates from the Central Bank of Myanmar

[![npm version](https://img.shields.io/npm/v/forexmm.svg?style=flat-square)](https://www.npmjs.com/package/forexmm)
[![npm downloads](https://img.shields.io/npm/dt/forexmm.svg?style=flat-square)](https://www.npmjs.com/package/forexmm)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MIT)

The [Central Bank of Myanmar API](http://forex.cbm.gov.mm/index.php/api) does not allow CORS. This NPM package helps you bypass the CORS issue and build your own Myanmar Exchange Rate API server.

## Installation

```bash
npm install forexmm
```

```bash
yarn add forexmm
```

```bash
bun add forexmm
```

## API

### latest()

Fetch the latest exchange rates.

```javascript
const forexmm = require('forexmm');

forexmm
  .latest()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

### currencies()

Fetch the list of available currencies.

```javascript
const forexmm = require('forexmm');

forexmm
  .currencies()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

### history(date)

Fetch historical exchange rates for a specific date.

```javascript
const forexmm = require('forexmm');

// Using Date object
const date = new Date(2018, 1, 4); // February 4, 2018
forexmm
  .history(date)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// Using string (DD-MM-YYYY format)
forexmm
  .history('04-02-2018')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

## TypeScript Usage

This package includes TypeScript type definitions.

```typescript
import { latest, history, currencies, IExchangeRate, ICurrencies } from 'forexmm';

// Latest exchange rates
const latestRates: IExchangeRate = await latest();
console.log(latestRates.rates);

// Historical rates
const historicalRates: IExchangeRate = await history(new Date(2018, 1, 4));
console.log(historicalRates.rates);

// Available currencies
const currencyList: ICurrencies = await currencies();
console.log(currencyList.currencies);
```

### Type Definitions

```typescript
interface IExchangeRate {
  info: string;
  description: string;
  timestamp: string;
  rates: {
    [currency: string]: string;
  };
}

interface ICurrencies {
  info: string;
  description: string;
  currencies: {
    [code: string]: string;
  };
}
```

## Express.js API Server Example

```javascript
const express = require('express');
const { latest, currencies, history } = require('forexmm');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/latest', async (req, res) => {
  try {
    const data = await latest();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/currencies', async (req, res) => {
  try {
    const data = await currencies();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/history/:date', async (req, res) => {
  try {
    const data = await history(req.params.date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`FOREXMM API server running on port ${PORT}`);
});
```

## Related Projects

- [forexmm-cli](https://github.com/AungMyoKyaw/forexmm-cli) - Command line interface for this package

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Aung Myo Kyaw](https://github.com/AungMyoKyaw)
