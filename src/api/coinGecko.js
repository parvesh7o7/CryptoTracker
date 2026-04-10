const BASE_URL = 'https://api.coingecko.com/api/v3/';
const apiKey = import.meta.env.VITE_API_KEY;
const options = {method: 'GET', headers: {'x-cg-demo-api-key': apiKey}};
export async function CoinData(){
    const response = await fetch(`${BASE_URL}coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`, options);

    if(!response.ok){
        throw new Error("Failed to fetch");
    }

    return response.json();
}
export async function CoinDataByID(id){
    const response = await fetch(`${BASE_URL}coins/${id}`, options);

    if(!response.ok){
        throw new Error("Failed to fetch");
    }

    return response.json();
}
export async function fetchChartData(id){
    const response = await fetch(`${BASE_URL}coins/${id}/market_chart?vs_currency=usd&days=7`, options);
    if(!response.ok){
        throw new Error("Failed to fetch");
    }
    return response.json();
}