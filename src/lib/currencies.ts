import https from 'https';

/**
 * Currencies response from the Myanmar Central Bank API
 */
interface ICurrencies {
  info: string;
  description: string;
  currencies: {
    [index: string]: string;
  };
}

/**
 * Fetch available currencies from Myanmar Central Bank
 * @returns Promise resolving to currencies data
 * @throws Error if the request fails or response is invalid
 */
function currencies(): Promise<ICurrencies> {
  return new Promise<ICurrencies>((resolve, reject) => {
    const req = https.get(
      'https://forex.cbm.gov.mm/api/currencies',
      (res) => {
        let currenciesData = '';
        res.setEncoding('utf8');
        res.on('data', (data) => {
          currenciesData += data;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
            return;
          }
          try {
            const parsed = JSON.parse(currenciesData);
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

export { ICurrencies, currencies };

// Deprecated: Keep old interface name for backward compatibility
/** @deprecated Use ICurrencies instead */
type Icurrencies = ICurrencies;
