require('dotenv').config()
const { loadPoolDetails, loadAccountPools } = require("../index");

/**
 * Test to retrieve lp data, and how much of 
 * each token the user has into the pool.
 * 
 * You need to pass the id of the pool, and balance JSON Object
 * 
 * Returned object includes shares, token data, 
 * token amount, token fiat amount
 */
test('Fetch liquidity pool data', async () => {
    return loadPoolDetails(
        {
            balance: '249.0429917',
            liquidity_pool_id: process.env.TEST_LP,
            limit: '922337203685.4775807',
            last_modified_ledger: 43342879,
            is_authorized: false,
            is_authorized_to_maintain_liabilities: false,
            asset_type: 'liquidity_pool_shares'
        }
    ).then(data => {
        expect(isNaN(data.total_shares)).toBe(false)
    })
})

/**
 * Test to retrieve account's liquidity pool shares (balances)
 * This can be used to retrieve the id of the pools, and the shares
 * 
 * This object should be passed into the loadPoolDetails() function
 */
test('Fetch liquidity pool balances from account', async () => {
    return loadAccountPools(
        process.env.TEST_WALLET,
    ).then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})