import https from 'https';

interface IexchangeRate {
  info: string;
  description: string;
  timestamp: string;
  rates: {
    [index: string]: string;
  };
}

function latest(): Promise<IexchangeRate> {
  return new Promise<IexchangeRate>((resolve, reject) => {
    https
      .get('https://forex.cbm.gov.mm/api/latest', res => {
        let latestExchangeRate = '';
        res.setEncoding('utf8');
        res.on('data', data => {
          latestExchangeRate += data;
        });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(latestExchangeRate);
          } catch (err) {
            reject(err);
          }
          resolve(parsed);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function history(date: Date = new Date()): Promise<IexchangeRate> {
  return new Promise<IexchangeRate>((resolve, reject) => {
    let dateString = date.toLocaleDateString('en-GB');
    dateString = dateString.replace(/\//g, '-');

    https
      .get(`https://forex.cbm.gov.mm/api/history/${dateString}`, res => {
        let exchangeRate = '';
        res.setEncoding('utf8');
        res.on('data', data => {
          exchangeRate += data;
        });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(exchangeRate);
          } catch (err) {
            reject(err);
          }
          resolve(parsed);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

export { IexchangeRate, latest, history };
