/**
 * 
 * @param {String} acf Asset A code
 * @param {String} aif Asset A issuer
 * @param {String} act Asset B code
 * @param {String} ait Asset B issuer
 * @returns 
 */
const convertShares = async (acf, aif, act, ait) => {
    /**
     * TODO: Redo to add dynamic input for currency conversion
     * Currently it only convert for USDC pool
     */
    try {
        let amountFrom = 1;
        let amountTo;
        try {

            
            let convertFromApi = await axios.get(`https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum12&counter_asset_code=CANNACOIN&counter_asset_issuer=GBLJ4223KUWIMV7RAPQKBA7YGR4I7H2BIV4KIMMXMQWYQBOZ6HLZR3RQ&limit=1&order=desc`);
            let convertToApi = await axios.get(`https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum12&counter_asset_code=USDC&counter_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1&order=desc`);
            
            let convertFromD = await convertFromApi.data._embedded.records[0].price.d;
            const convertFromN = await convertFromApi.data._embedded.records[0].price.n;
            //how much XLM one of this asset can buy:
            const assetOneToXlm = await convertFromD/convertFromN
            
            let convertToD = await convertToApi.data._embedded.records[0].price.d;
            const convertToN = await convertToApi.data._embedded.records[0].price.n;
            //how much XLM one of this asset can buy:
            const assetTwoToXlm = await convertToD/convertToN
            
            //example if assetOne = 0.05 per xlm and assetTwo = 0.2 per Xlm: per asset one you can buy 4X ( assetTwo / assetOne )
            
            let multiplier = assetTwoToXlm / assetOneToXlm;
            
            
            amountTo = amountFrom / multiplier;
            console.log("MULT2: "+amountTo);
            
            return amountTo;
        } catch (error) {
            console.log("Conversion Error: "+error)
        }
    } catch(e) { 
        return e
    }
}