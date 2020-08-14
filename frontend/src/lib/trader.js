import get from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function github (user) {
    return get(`https://api.github.com/users/${user}/repos`, fetcher)

    // const yahooPricingUrl = "https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA"
    // return get(yahooPricingUrl, fetcher)
    // return { data, error }//["chart"]["result"].pop()["meta"]["regularMarketPrice"]
}    


export default function quote(ticker) {
    return { 
        lastPrice: getLastPrice(ticker)
    }
}