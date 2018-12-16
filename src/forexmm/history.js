//get exchange rate history
const http = require('http');

const getHistory = function(date) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'forex.cbm.gov.mm',
      port: 80,
      path: `/api/history/${date}`,
      agent: false
    };
    http
      .get(options, res => {
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
};

module.exports = getHistory;
