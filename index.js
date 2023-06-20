const stellar = require('stellar-sdk')

const server = new stellar.Server('https://horizon.stellar.org')



/**
 * 
 * @param {String} account Stellar wallet address
 * @returns Array of liquidity pool balances
 */
const loadAccountPools = (account) => {
    return new Promise(async resolve => {
        try {
            let { balances } = await server.loadAccount(account)
            let liquidity_pools = balances.filter(balance => balance.liquidity_pool_id)
            if (!liquidity_pools) {
                return resolve(false)
            }
            resolve(liquidity_pools)
        } catch (error) {
            resolve(false)
            console.log(error)
        }
        
    })
}
/**
 * 
 * @param {String} id Liquidity Pool id
 * @param {JSON} balance Account balance object
 * @returns JSON Object
 */
const loadPoolDetails = (balance) => {
    return new Promise(async resolve => {
        // Run StellarSDK server request in order to obtain pool data 
        try {
            server
            .liquidityPools()
            .liquidityPoolId(balance.liquidity_pool_id)
            .call()
            .then(function (response) {
                //Set token a & b to be used for currency conversion
                let token_a = response.reserves[0].asset.split(':')
                let token_b = response.reserves[1].asset.split(':')

                // Sets up our pool object which will be returned
                let pool = {
                    shares: balance.balance,
                    total_shares: response.total_shares,
                    tta: response.reserves[0].amount,
                    ttb: response.reserves[1].amount,
                    ta: {
                        code: token_a[0],
                        issuer:  token_a[1]
                    },
                    tb: {
                        code: token_b[0],
                        issuer:  token_b[1]
                    },
                    taa: (balance.balance/response.total_shares*100)*(response.reserves[0].amount)/100,
                    tba: (balance.balance/response.total_shares*100)*(response.reserves[1].amount)/100,
                }
                resolve(pool)
            })
            .catch(function (error) {
                // Returns false
                resolve(false)
                console.error(error);
            });
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

module.exports = {
    loadAccountPools,
    loadPoolDetails
}