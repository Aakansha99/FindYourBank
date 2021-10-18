const CacheManager = require("./CacheManager");

exports.fetchAllBanks = async () => {
    try {
        const myCache = new CacheManager();
        const bankFromCache = myCache.getCache();
        // if found  in cache, returning data from cache ie no api call
        if (bankFromCache) {
            return (bankFromCache);
        }
        let finalData = []
        const city = ["DELHI", "MUMBAI", "BANGALORE", "PUNE", "HYDERABAD"];
        const url = "https://vast-shore-74260.herokuapp.com/banks?city=";
        for (let i = 0; i < city.length; i++) {
            let cityUrl = url + city[i];
            let response = await fetch(cityUrl)
            response = await response.json()
            finalData = [...finalData, ...response]
        }
        return (finalData)
    } catch (e) {
        return (e);
    }
}