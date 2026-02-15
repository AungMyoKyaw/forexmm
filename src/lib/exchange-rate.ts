import https from 'https';

/**
 * Exchange rate response from the Myanmar Central Bank API
 */
interface IExchangeRate {
  info: string;
  description: string;
  timestamp: string;
  rates: {
    [index: string]: string;
  };
}

/**
 * Fetch the latest exchange rates from Myanmar Central Bank
 * @returns Promise resolving to exchange rate data
 * @throws Error if the request fails or response is invalid
 */
function latest(): Promise<IExchangeRate> {
  return new Promise<IExchangeRate>((resolve, reject) => {
    const req = https.get(
      'https://forex.cbm.gov.mm/api/latest',
      (res) => {
        let latestExchangeRate = '';
        res.setEncoding('utf8');
        res.on('data', (data) => {
          latestExchangeRate += data;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
            return;
          }
          try {
            const parsed = JSON.parse(latestExchangeRate);
            resolve(parsed);
          } catch (err) {
            reject(new Error(`Failed to parse response: ${(err as Error).message}`));
          }
        });
      }
    );

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(30000, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

/**
 * Fetch historical exchange rates for a specific date
 * @param date - Date to fetch exchange rates for (Date object or string in DD-MM-YYYY format)
 * @returns Promise resolving to exchange rate data
 * @throws Error if the request fails or response is invalid
 */
function history(date: Date | string = new Date()): Promise<IExchangeRate> {
  return new Promise<IExchangeRate>((resolve, reject) => {
    let dateString: string;

    if (typeof date === 'string') {
      dateString = date;
    } else {
      dateString = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    }

    const req = https.get(
      `https://forex.cbm.gov.mm/api/history/${dateString}`,
      (res) => {
        let exchangeRate = '';
        res.setEncoding('utf8');
        res.on('data', (data) => {
          exchangeRate += data;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
            return;
          }
          try {
            const parsed = JSON.parse(exchangeRate);
            resolve(parsed);
          } catch (err) {
            reject(new Error(`Failed to parse response: ${(err as Error).message}`));
          }
        });
      }
    );

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(30000, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

export { IExchangeRate, latest, history };

// Deprecated: Keep old interface name for backward compatibility
/** @deprecated Use IExchangeRate instead */
type IexchangeRate = IExchangeRate;
