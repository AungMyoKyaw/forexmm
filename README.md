# FOREXMM

> Myanmar Exchange Rate

[![Build Status][travis]][travis-url]
[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]

[http://forex.cbm.gov.mm/index.php/api](http://forex.cbm.gov.mm/index.php/api) does not allow CORS. This npm package help you to bypass CORS issue and to build Myanmar Exchange Rate API server.

## Installation

```
npm install --save forexmm
```

## API List

- latest
- currencies
- history

### latest

```javascript
var forexmm = require('forexmm');
var latest = forexmm.latest;
latest()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

### currencies

```javascript
var forexmm = require('forexmm');
var currencies = forexmm.currencies;
currencies()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

### history

```javascript
var forexmm = require('forexmm');
var history = forexmm.history;
var date = new Date(2018, 1, 4);
history(date)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

#### Sample API Server Using Express.js

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const forexmm = require('forexmm');
const latest = forexmm.latest;
const currencies = forexmm.currencies;
const history = forexmm.history;

app.get('/latest', (req, res) => {
  latest()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
});

app.get('/currencies', (req, res) => {
  currencies()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
});

app.get('/history/:date', (req, res) => {
  let date = req.params.date;
  history(date)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({ err: err.message });
    });
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`forexmm api server is running on port ${PORT}`);
});
```

## Related

- [forexmm-cli](https://github.com/AungMyoKyaw/forexmm-cli)

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contri-url]: https://github.com/AungMyoKyaw/forexmm/issues
[travis]: https://img.shields.io/travis/AungMyoKyaw/forexmm/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/AungMyoKyaw/forexmm
[npm-download]: https://img.shields.io/npm/dt/forexmm.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/forexmm
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
