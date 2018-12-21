import https from 'https';

interface Icurrencies {
  info: string;
  description: string;
  currencies: {
    [index: string]: string;
  };
}

function currencies(): Promise<Icurrencies> {
  return new Promise<Icurrencies>((resolve, reject) => {
    https
      .get('https://forex.cbm.gov.mm/api/currencies', res => {
        let currencies = '';
        res.setEncoding('utf8');
        res.on('data', data => {
          currencies += data;
        });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(currencies);
          } catch (err) {
            reject(err);
          }
          resolve(parsed);
        });
      })
      .on('err', err => {
        reject(err);
      });
  });
}

export { Icurrencies, currencies };
