interface IexchangeRate {
  info: string;
  description: string;
  timestamp: string;
  rates: {
    [index: string]: string;
  };
}

interface Icurrencies {
  info: string;
  description: string;
  currencies: {
    [index: string]: string;
  };
}

class FOREXMM {
  private latest: boolean = false;
  private date: Date;

  constructor(date: Date = new Date()) {
    this.date = date;
  }

  exchangeRate(): IexchangeRate {
    return {
      info: 'info',
      description: 'description',
      timestamp: '',
      rates: {
        USD: '1600'
      }
    };
  }

  currencies(): Icurrencies {
    return {
      info: 'info',
      description: 'description',
      currencies: {
        USD: 'USD'
      }
    };
  }
}

export default FOREXMM;

module.exports = FOREXMM;
module.exports.default = FOREXMM;
