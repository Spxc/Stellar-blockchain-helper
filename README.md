# Stellar Blockchain Helper

This is an npm module that provides helper functions for working with the Stellar blockchain.

<br>

## Installation

To use this module, you need to have Node.js installed. Then, you can install the module using npm:

```bash
npm install stellar-blockchain-helper
```
<br>

## Usage
First, require the module in your code:
```node
const { loadAccountPools, loadPoolDetails } = require('stellar-blockchain-helper');
```
<br>

### ```loadAccountPools(account)```
This function loads the liquidity pool balances for a given Stellar wallet address.

Parameters
- account (`type: String`): Stellar wallet address.

Returns
- `Promise`: A promise that resolves to an `array` of liquidity pool balances.



### ```loadPoolDetails(balance)```
This function loads the details of a liquidity pool.

Parameters
- balance (`type: JSON Object`): Account balance object.

Returns
- `Promise`: A promise that resolves to a `JSON object` containing the pool details.

<br>

## Examples
Fetch account pool balances
```
const account = 'GA5GP75JXAMWQZWQI56X46EGYSCTQEG7AC2FB6UGMLCZNBQV3LNE4EKX';

loadAccountPools(account)
  .then(pools => {
    if (pools) {
      console.log('Liquidity Pools:', pools);
    } else {
      console.log('No liquidity pools found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
````

<br>

Fetch & convert account shares into tokens based off the liquidity pool
```
const poolObject = {
  liquidity_pool_id: '1234567890',
  balance: 1000
};

loadPoolDetails(poolObject)
  .then(pool => {
    if (pool) {
      console.log('Pool Details:', pool);
    } else {
      console.log('Failed to load pool details.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
});
```

<br>

## Dependencies
- [Stellar SDK](https://www.npmjs.com/package/stellar-sdk) (to communicate with the stellar network)
- [dotenv](https://www.npmjs.com/package/dotenv) (load local .env files)
- [jest](https://www.npmjs.com/package/jest) (for running unit testing)

<br>

## License
This module is licensed under the MIT License. See the [LICENSE](#) file for details.
